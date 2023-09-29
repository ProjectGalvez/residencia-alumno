export interface AuthUser {
  email: string;
  url_foto: string;
  url_portada: string;
  name: string;
  role: string[];
  user_token: string;
}
export interface Departamento {
  id: number;
  nombre: string;
  nombre_titular: string;
  apellidos_titular: string;
  created_at?: Date;
  updated_at?: Date;
  carreras?: Carrera[];
}
export interface Carrera {
  id: number;
  departamento_id: number | string;
  nombre: string;
  escudo: string;
  clave: string;
  created_at?: Date;
  updated_at?: Date;
  departamento?: Departamento;
}
export interface Documento {
  id: number;
  nombre_documento: string;
  abrev_nombre?: string;
  fecha_limite: Date | null;
  url_formato?: null | string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Periodo {
  id: number;
  nombre: string;
  fecha_inicio: Date | null;
  fecha_termino: Date | null;
  created_at?: Date;
  updated_at?: Date;
}
