import { QTableColumn } from 'quasar';

export const columnasPeriodos: QTableColumn[] = [
  {
    field: 'nombre',
    name: 'nombre',
    label: 'Nombre del periodo',
    align: 'left',
    sortable: true,
  },
  {
    field: 'fecha_inicio',
    name: 'fecha_inicio',
    label: 'Fecha de inicio.',
    align: 'left',
    sortable: true,
  },
  {
    field: 'fecha_termino',
    name: 'fecha_termino',
    label: 'Fecha de termino',
    align: 'left',
    sortable: true,
  },
  {
    field: 'activo',
    name: 'activo',
    label: 'Activo',
    align: 'left',
    sortable: false,
  },
  {
    field: 'accion',
    name: 'accion',
    label: 'Acción',
    align: 'right',
  },
];
