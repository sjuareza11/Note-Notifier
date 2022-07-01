
export interface Activitat {
    pacId: string;
    descripcion: string;
    nota: string;
    orden: number;
}

export interface Assignature {
    id: string;
    nom?: any;
    descripcion: string;
    notaFinal: string;
    activitats: Activitat[];
}

export interface Curso {
    nom?: any;
    id: number;
    descripcion: string;
    assignatures: Assignature[];
}

export interface NotesRequest {
    errorCode?: any;
    cursos: Curso[];
    error?: any;
}

