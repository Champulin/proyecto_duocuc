export interface userData {
    _id: any;
    name: string;
    last_name: string;
    email: string;
    id_unidad: number;
    id_facultad: number;
    username: string;
    password: string;
}
export interface userPatch {
    _id: any;
    name: string;
    last_name: string;
    email: string;
    id_unidad: number;
    id_facultad: number;
}

export interface userNew {
    name: string;
    last_name: string;
    email: string;
    id_unidad: number;
    id_facultad: number;
    username: string;
    password: string;
}