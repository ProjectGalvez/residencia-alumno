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
  fecha_inicio: Date | null | string;
  fecha_termino: Date | null | string;
  activo: number | boolean;
  created_at?: Date;
  updated_at?: Date;
}
export interface Empresa {
  id: string;
  nombre: string;
  giro: string;
  rfc?: string;
  domicilio: string;
  colonia: string;
  cp?: string;
  ciudad?: string;
  telefono?: string;
  mision?: string;
  titular: string;
  titular_puesto: string;
  asesor_externo?: string;
  asesor_externo_puesto?: string;
  nombre_firmara?: string;
  nombre_firmara_puesto?: string;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;
}
export interface User {
  email: string;
  id: string;
  url_portada?: string;
  url_foto?: string;
  name: string;
  roles?: Role[];
  password?: string;
  rol?: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Estudiante {
  id: string;
  user_id: string;
  carrera_id: number | null;
  nombre: string;
  apellidos: string;
  numero_control: string;
  domicilio?: string;
  email: string;
  seguridad_social?: string;
  no_seguridad_social?: string | null;
  ciudad?: string;
  telefono?: string;
  password?: string;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;
  user?: User;
  carrera?: Carrera;
  empresas?: Empresa[];
  periodos: Periodo[];
}
