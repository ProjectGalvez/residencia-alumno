import { QTableColumn } from 'quasar';

export const columnasDocumentos: QTableColumn[] = [
  {
    field: 'nombre_documento',
    name: 'nombre',
    label: 'Nombre documento',
    align: 'left',
    sortable: true,
  },
  {
    field: 'abrev_nombre',
    name: 'abrev_nombre',
    label: 'Abrev.',
    align: 'left',
    sortable: true,
  },
  {
    field: 'fecha_limite',
    name: 'fecha_limite',
    label: 'Fecha límite de entrega',
    align: 'left',
    sortable: true,
  },
  {
    field: 'accion',
    name: 'accion',
    label: 'Acción',
    align: 'right',
  },
];
