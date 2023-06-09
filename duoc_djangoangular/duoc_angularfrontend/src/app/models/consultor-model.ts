export interface consultaUnidad {
    _id: any;
    id_unidad: number;
    id_facultad: number;
    nombre_calculo: string;
    nombre_depto: string;
    cant_segundos_total: number;
    cant_segundos_slm: number;
    cant_segundos_cel: number;
    cant_segundos_ldi: number;
    tarificacion_general: number;
    tarificacion_slm: number;
    tarificacion_cel: number;
    tarificacion_ldi: number;
    fecha_calculo: any;
}

export interface consultaFacultad {
    _id: any;
    id_facultad: number;
    nombre_calculo: string;
    nombre_facultad: string;
    tarificacion_general: number;
    cant_segundos_total: number;
    cant_segundos_slm: number;
    cant_segundos_cel: number;
    cant_segundos_ldi: number;
    tarificacion_slm: number;
    tarificacion_cel: number;
    tarificacion_ldi: number;
    fecha_calculo: any;
}

export interface requestData {
    type: number;
    id: number;
}

export interface requestTrafico{
    nombre_proveedor: string;
    mes: number;
}

export interface traficoData{
    costo_total_general: number;
    costo_total_cel: number;
    costo_total_ldi: number;
    costo_total_slm: number;
    duracion_total_general: number;
    duracion_total_cel: number;
    duracion_total_ldi: number;
    duracion_total_slm: number;
}