import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/modules/home/pages/HomePage.vue'),
    name: 'home',
  },
  {
    path: '/login',
    component: () => import('src/modules/auth/pages/LoginPage.vue'),
    name: 'login',
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: '/dashboard',
    component: () => import('src/modules/layouts/DashboardLayout.vue'),
    name: 'dashboard',
    meta: {
      requiresAuth: true,
      roles: ['admin', 'capturista'],
    },
    children: [
      {
        path: '',
        component: () =>
          import('src/modules/dashboard/pages/DashboardPage.vue'),
        name: 'dashboard-home',
      },
      {
        path: '/perfil',
        component: () => import('src/modules/auth/pages/PerfilPage.vue'),
        name: 'perfil-admin',
      },
      {
        path: '/cambiar-password',
        component: () => import('src/modules/auth/pages/CambiarPassword.vue'),
        name: 'cambiar-password',
      },
      {
        path: '/buscar',
        component: () =>
          import('src/modules/dashboard/pages/ResultadosBusqueda.vue'),
        name: 'buscar',
      },

      {
        path: '/estadisticas',
        component: () =>
          import('src/modules/estadisticas/pages/CarreraPeriodosPage.vue'),
        name: 'estadisticas',
      },
      //Usuarios *************************
      {
        path: '/usuarios',
        component: () => import('src/modules/user/pages/ListarUsuario.vue'),
        name: 'listar-usuario',
      },
      {
        path: '/usuarios/:id',
        component: () => import('src/modules/user/pages/VerUsuario.vue'),
        name: 'ver-usuario',
      },
      {
        path: '/usuarios/crear',
        component: () => import('src/modules/user/pages/CrearUsuario.vue'),
        name: 'crear-usuario',
      },
      {
        path: '/usuarios/:id/editar',
        component: () => import('src/modules/user/pages/EditarUsuario.vue'),
        name: 'editar-usuario',
      },
      //Residentes
      {
        path: '/asignardocumento-residente/:id',
        component: () =>
          import('src/modules/residentes/pages/AgregarDocumentoResidente.vue'),
        name: 'asignar-documento-residente',
      },
      {
        path: '/residentes/crear',
        component: () =>
          import('src/modules/residentes/pages/CrearResidente.vue'),
        name: 'crear-residente',
      },
      {
        path: '/residentes',
        component: () =>
          import('src/modules/residentes/pages/ListarResidente.vue'),
        name: 'listar-residente',
      },
      {
        path: '/residentes/:id',
        component: () =>
          import('src/modules/residentes/pages/VerResidente.vue'),
        name: 'ver-residente',
      },
      {
        path: '/residentes/:id/editar',
        component: () =>
          import('src/modules/residentes/pages/EditarResidente.vue'),
        name: 'editar-residente',
      },

      //Estudiantes
      {
        path: '/asignardocumento/:id',
        component: () =>
          import('src/modules/estudiantes/pages/AgregarDocumento.vue'),
        name: 'asignar-documento',
      },
      {
        path: '/asignarresidencia/:id',
        component: () =>
          import('src/modules/estudiantes/pages/AsignarResidencia.vue'),
        name: 'asignar-residencia',
      },
      {
        path: '/estudiantes',
        component: () =>
          import('src/modules/estudiantes/pages/ListarEstudiante.vue'),
        name: 'listar-estudiante',
      },
      {
        path: '/estudiantes/:id',
        component: () =>
          import('src/modules/estudiantes/pages/VerEstudiante.vue'),
        name: 'ver-estudiante',
      },
      {
        path: '/estudiantes/crear',
        component: () =>
          import('src/modules/estudiantes/pages/CrearEstudiante.vue'),
        name: 'crear-estudiante',
      },
      {
        path: '/estudiantes/:id/editar',
        component: () =>
          import('src/modules/estudiantes/pages/EditarEstudiante.vue'),
        name: 'editar-estudiante',
      },

      //Entregas
      {
        path: '/entregas',
        component: () => import('src/modules/entregas/pages/ListarEntrega.vue'),
        name: 'listar-entrega',
      },
      {
        path: '/entregas/:id',
        component: () => import('src/modules/entregas/pages/VerEntrega.vue'),
        name: 'ver-entrega',
      },
      {
        path: '/entregas/crear',
        component: () => import('src/modules/entregas/pages/CrearEntrega.vue'),
        name: 'crear-entrega',
      },
      {
        path: '/entregas/:id/editar',
        component: () => import('src/modules/entregas/pages/EditarEntrega.vue'),
        name: 'editar-entrega',
      },

      //Departamentos
      {
        path: '/departamentos',
        component: () =>
          import('src/modules/departamentos/pages/ListarDepartamento.vue'),
        name: 'listar-departamento',
      },
      {
        path: '/departamentos/:id',
        component: () =>
          import('src/modules/departamentos/pages/VerDepartamento.vue'),
        name: 'ver-departamento',
      },
      {
        path: '/departamentos/crear',
        component: () =>
          import('src/modules/departamentos/pages/CrearDepartamento.vue'),
        name: 'crear-departamento',
      },
      {
        path: '/departamentos/:id/editar',
        component: () =>
          import('src/modules/departamentos/pages/EditarDepartamento.vue'),
        name: 'editar-departamento',
      },

      // Carreras
      {
        path: '/carreras',
        component: () => import('src/modules/carreras/pages/ListarCarrera.vue'),
        name: 'listar-carrera',
      },
      {
        path: '/carreras/:id',
        component: () => import('src/modules/carreras/pages/VerCarrera.vue'),
        name: 'ver-carrera',
      },
      {
        path: '/carreras/crear',
        component: () => import('src/modules/carreras/pages/CrearCarrera.vue'),
        name: 'crear-carrera',
      },
      {
        path: '/carreras/:id/editar',
        component: () => import('src/modules/carreras/pages/EditarCarrera.vue'),
        name: 'editar-carrera',
      },

      // Documentos
      {
        path: '/documentos',
        component: () =>
          import('src/modules/documentos/pages/ListarDocumento.vue'),
        name: 'listar-documento',
      },
      {
        path: '/documentos/:id',
        component: () =>
          import('src/modules/documentos/pages/VerDocumento.vue'),
        name: 'ver-documento',
      },
      {
        path: '/documentos/crear',
        component: () =>
          import('src/modules/documentos/pages/CrearDocumento.vue'),
        name: 'crear-documento',
      },
      {
        path: '/documentos/:id/editar',
        component: () =>
          import('src/modules/documentos/pages/EditarDocumento.vue'),
        name: 'editar-documento',
      },

      // Periodos
      {
        path: '/periodos',
        component: () => import('src/modules/periodos/pages/ListarPeriodo.vue'),
        name: 'listar-periodo',
      },
      {
        path: '/periodos/:id',
        component: () => import('src/modules/periodos/pages/VerPeriodo.vue'),
        name: 'ver-periodo',
      },
      {
        path: '/periodos/crear',
        component: () => import('src/modules/periodos/pages/CrearPeriodo.vue'),
        name: 'crear-periodo',
      },
      {
        path: '/periodos/:id/editar',
        component: () => import('src/modules/periodos/pages/EditarPeriodo.vue'),
        name: 'editar-periodo',
      },

      // Empresas
      {
        path: '/empresas',
        component: () => import('src/modules/empresas/pages/ListarEmpresa.vue'),
        name: 'listar-empresa',
      },
      {
        path: '/empresas/:id',
        component: () => import('src/modules/empresas/pages/VerEmpresa.vue'),
        name: 'ver-empresa',
      },
      {
        path: '/empresas/crear',
        component: () => import('src/modules/empresas/pages/CrearEmpresa.vue'),
        name: 'crear-empresa',
      },
      {
        path: '/empresas/:id/editar',
        component: () => import('src/modules/empresas/pages/EditarEmpresa.vue'),
        name: 'editar-empresa',
      },
    ],
  },
  {
    path: '/administracion',
    component: () => import('src/modules/layouts/EstudianteLayout.vue'),
    name: 'layout-estudiante',
    meta: {
      requiresAuth: true,
      roles: ['admin', 'capturista', 'estudiante'],
    },
    children: [
      {
        path: '',
        component: () =>
          import(
            'src/modules/layouts/components/estudiante/DashboardEstudiante.vue'
          ),
        name: 'dashboard-estudiante',
      },
      {
        path: '/perfil-estudiante',
        component: () =>
          import(
            'src/modules/layouts/components/estudiante/PerfilEstudiante.vue'
          ),
        name: 'perfil-estudiante',
      },
      {
        path: '/cambiar-password-estudiante',
        component: () =>
          import(
            'src/modules/layouts/components/estudiante/CambiarPassword.vue'
          ),
        name: 'cambiar-password-estudiante',
      },
      {
        path: '/estudiante-inicio',
        component: () =>
          import(
            'src/modules/layouts/components/estudiante/DashboardEstudiante.vue'
          ),
        name: 'estudiante-inicio',
      },
      {
        path: '/formatos',
        component: () =>
          import(
            'src/modules/layouts/components/estudiante/FormatosDocumentos.vue'
          ),
        name: 'estudiante-formatos',
      },
      {
        path: '/documentos-entregados',
        component: () =>
          import(
            'src/modules/layouts/components/estudiante/DocumentosEntregados.vue'
          ),
        name: 'documentos-entregados',
      },
      {
        path: '/acerca-de',
        component: () =>
          import('src/modules/layouts/components/estudiante/AcercaDe.vue'),
        name: 'acerca-de',
      },
    ],
  },

  {
    path: '/about',
    component: () => import('src/modules/home/pages/AcercaDe.vue'),
    name: 'about',
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/errors/ErrorNotFound.vue'),
    name: 'not-found',
  },
];

export default routes;
