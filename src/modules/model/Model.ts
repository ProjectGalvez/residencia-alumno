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
  departamento_id: number;
  nombre: string;
  escudo: string;
  clave: string;
  created_at?: Date;
  updated_at?: Date;
  departamento?: Departamento;
}
