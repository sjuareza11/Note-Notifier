Notificador de calificaciones UOC

Este aplicación desarrollada en NodeJS usa Puppeteer para loguearse en la web y obtener la url de consulta de las notas antes de que se publiquen.

El intervalo de consulta de las notas es de 1 minuto. (Se puede ajustar desde el .env)
La aplicación está preparada para notificar las calificaciones vía email, para ello es necesario configurar una cuenta de google para envíar email . Ejemplo aqui: https://www.youtube.com/watch?v=RpSQQIGTpTM .

Los pasos a seguir para la ejecución de la aplicación son los siguientes:

Tener instalado NodeJS lo puedes instalar desde aqui: https://nodejs.org/es/download/

1. Clonar el repositorio
2. En la raíz de la aplicación abrir un terminarl ejecutar "npm i"
3. Configurar el fichero .env introduciendo nuestro usuario de la uoc y la contraseña. (Los demás son parámetros de configuración NO TOCAR sino se sabe lo que se está haciendo). Los campos son : USER y PASSWORD
4. En la raíz de la aplicación abrir un terminal y ejecutar "npm run start"

ADICIONAL (Envío de email):

Los campos a rellenar para el envío del email son:
ENABLE_SEND_MAIL => Activar envío de emails (Valores: true/false)
USER_AUTH_EMAIL => Email configurado para el envío del email
USER_AUTH_PASSWORD => =Contraseña obtenida durante la configuración de gmail de aplicaciones menos segura
USER_NOTIFICATION_EMAIL => Email donde llegará la notificación de las notas obtenidas
