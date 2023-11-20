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
  color?: string;
  abrev?: string;
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
  entrega_estudiante: number | null;
  descripcion: string;
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
  genero: string;
  seguridad_social?: string;
  no_seguridad_social?: string | null;
  ciudad?: string;
  telefono?: string;
  password?: string;
  url_foto?: string;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;
  user?: User;
  carrera?: Carrera;
  empresas?: Empresa[];
  periodos?: Periodo[];
}

export interface Entrega {
  id: string;
  estudiante?: Estudiante;
  documento?: Documento;
  url_documento: null;
  fecha_entrega: Date | string | null;
  estado?: boolean;
  documento_id: number;
  estudiante_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CarreraNumeroResidente {
  carrera_id: number;
  carrera: string;
  numero_estudiantes: number;
  color?: string;
  escudo?: string;
}

export interface Tabla {
  estudiantes: Estudiante[];
  documentos: Documento[];
  data: { [key: string]: { [key: string]: number } };
}

export interface AutocompletarEstudiante {
  estudiante_id: string;
  nombre_completo: string;
}

export interface EntregaPaginado {
  data: Entrega[];
  links: Links;
  meta: Meta;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface DocumentoEstudiante {
  Id: string;
  NombreDocumento: string;
  FechaEntrega: Date;
  FechaLimite: Date;
  URLDocumento: null | string;
  ExtensionDocumento: null | string;
  Icono: string;
}

export interface DocumentoPendiente {
  id: number;
  nombre: string;
}

export interface Formato {
  id: number;
  nombre_documento: string;
  fecha_limite: Date;
  url_formato: null | string;
  extencion_documento: null | string;
  icono: Icono;
}

export enum Icono {
  Clear = 'clear',
  Description = 'description',
  PDF = 'picture_as_pdf',
}

export interface EntregaEstudiante {
  id: string;
  nombre_documento: string;
  fecha_entrega: Date;
  fecha_limite: Date;
  url_formato: null | string;
  extencion_documento: null | string;
  icono: string;
}

//Datos des residente que ve el estudiante
export interface ResidenciaEstudiante {
  estudiante_id: string;
  periodo_id: number;
  nombre_periodo: string;
  empresa_id: string;
  nombre_empresa: string;
  rfc: string;
  domicilio: string;
  colonia: string;
  cp: string;
  ciudad: string;
  telefono: string;
  titular: string;
  titular_puesto: string;
  proyecto: string;
}

export interface EstudiantePaginado {
  data: Estudiante[];
  links: Links;
  meta: Meta;
}

export interface ResultadoBusqueda {
  url_foto: null | string;
  nombre_completo_estudiante: string;
  numero_control_estudiante: string;
  nombre_carrera: string;
  color_carrera: string;
  id_estudiante: string;
  id_carrera: number;
  tiene_relacion_empresa: number;
  nombre_empresa: null | string;
  nombre_periodo: null | string;
  id_empresa: null | string;
  iniciales_nombre_apellido: string;
  id_periodo: number | null;
  perido_activo: number | null;
}

//Residente en el admin
export interface Residente {
  estudiante_id: string;
  nombre_completo: string;
  url_foto: null | string;
  iniciales_nombre_apellido: string;
  nombre_carrera: string;
  color_carrera: string;
  nombre_empresa: string;
  telefono_empresa: string;
  telefono_estudiante: string;
  numero_control_estudiante: string;
  proyecto: string;
  total_documentos: number;
  documentos_entregados?: number;
}

export interface VerResidente {
  id: string;
  user_id: string;
  carrera_id: number;
  nombre: string;
  apellidos: string;
  numero_control: string;
  domicilio: string;
  email: string;
  seguridad_social: string;
  no_seguridad_social: string;
  ciudad: string;
  telefono: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  nombre_estudiante: string;
  telefono_estudiante: string;
  domicilio_estudiante: string;
  ciudad_estudiante: null;
  id_estudiante: string;
  nombre_carrera: string;
  color_carrera: string;
  escudo_carrera: string;
  nombre_periodo: string;
  id_periodo: number;
  url_foto: string;
  giro: string;
  rfc: string;
  colonia: string;
  cp: string;
  mision: string;
  titular: string;
  titular_puesto: string;
  asesor_externo: string;
  asesor_externo_puesto: string;
  nombre_firmara: string;
  nombre_firmara_puesto: string;
  id_empresa: string;
  proyecto: string;
}

export interface DocumentoPendienteRes {
  documento_id: number;
  nombre_documento: string;
  abrev_nombre: null | string;
  fecha_limite: Date;
  url_formato: null | string;
  created_at: Date;
  entrega_id: null | string;
  documento_entregado: null | string;
  fecha_limite_vencida: number;
}
