import "dotenv/config";
import { sendMail } from "./../mail/mail";
import { Assignature, NotesRequest } from "./../models/notes";
const puppeteer = require("puppeteer");
const axios = require("axios");
let lastNotesUpdate: Assignature[] = [];

export const startNotes = () => {
  console.log("Buscando notas....");
  handlerGetNotes();
};

const handlerGetNotes = async () => {
  try {
    const WAIT_REQUEST_TIME = secondsToMs(
      Number(process.env.WAIT_REQUEST_TIME)
    );
    const url: string = await getUrl();
    console.log("Obteniendo url... ", url);
    if (url.length) {
      let result: boolean = true;
      while (result) {
        result = await getCalifications(url);
        if (result) {
          await delay(WAIT_REQUEST_TIME);
        }
      }
      if (!result) {
        handlerGetNotes();
      }
    } else {
      handlerGetNotes();
    }
  } catch (error) {
    console.log(error);
  }
};
const getUrl = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const WAIT_INTERACTION_TIME = secondsToMs(
    Number(process.env.WAIT_INTERACTION_TIME)
  );
  const USER = process.env.USER;
  const PASSWORD = process.env.PASSWORD;
  const AUTH_URL = process.env.AUTH_URL;

  return new Promise<string>(async (resolve) => {
    try {
      console.log("s ", PASSWORD);

      const page = await browser.newPage();
      await page.setViewport({
        width: 390,
        height: 844,
        deviceScaleFactor: 1,
      });
      await page.goto(AUTH_URL);
      await page.$$eval(
        "a.virtual-campus-link.hover--dynamic-hover",
        (links: any[]) => links[0].click()
      );
      await page.waitForTimeout(WAIT_INTERACTION_TIME);
      await page.type("#username", USER);
      await page.type("#password", PASSWORD);
      await page.click("#submit-identification-form");
      await page.waitForTimeout(WAIT_INTERACTION_TIME);
      const frame = await page.frames().find((f: any) => f.name() === "nplin");

      const button = await frame.$(
        "span.icon.icon--profile.dock__icon.hidden-lg.hidden-xl"
      );
      button.click();
      let counter = 0;
      page.on("response", async (request: any) => {
        if (request.url().includes("notes") && counter < 1) {
          counter++;
        } else if (request.url().includes("notes") && counter >= 1) {
          const url = request.url();
          await browser.close();
          resolve(url);
        }
      });
    } catch (error) {
      console.log(error);
      await browser.close();
      resolve("");
    }
  });
};

const getCalifications = async (url: string) => {
  try {
    const response = await axios.get(url);

    if (
      !response.data.includes(
        "No tienes asignaturas matriculadas este semestre"
      )
    ) {
      const start = response.data.indexOf("(");
      const end = response.data.lastIndexOf(")");
      const data: NotesRequest = JSON.parse(
        response.data.substring(start + 1, end)
      );
      console.log("Response:", data);
      if (!data.errorCode) {
        const assignatures: Assignature[] = data.cursos[0].assignatures;
        let message = `------------------Notas ${data.cursos[0].descripcion} ------------------------- \n\n`;

        assignatures.forEach((assignature) => {
          message += `Asignatura: ${assignature.descripcion} \n`;
          message += `Calificación obtenida: ${
            assignature.notaFinal
          } -> ${getFullNameCalification(assignature.notaFinal)} \n\n`;
        });
        if (JSON.stringify(assignatures) !== JSON.stringify(lastNotesUpdate)) {
          sendMail(message, "Notificador de calificaciones");
          lastNotesUpdate = assignatures;
        }
        console.log(
          "Fecha: " +
            new Date() +
            "\n " +
            message.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        );
        console.log("Buscando notas....");
        return true;
      } else {
        return false;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getFullNameCalification = (abrv: string): string => {
  const dict: any = {
    M: "Matrícula de honor (9 a 10)",
    EX: "Sobresaliente (9 a 10)",
    NO: "Notable (7 a 8.99)",
    A: "Suficiente (5 a 6.99)",
    SU: "Suspenso (0 a 4.99)",
  };
  return dict[abrv.toUpperCase().trim()] || "No disponible";
};
const delay = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms));

const secondsToMs = (seconds: number) => seconds * 1000;
