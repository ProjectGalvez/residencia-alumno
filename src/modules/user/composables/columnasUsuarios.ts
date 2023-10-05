import { QTableColumn } from 'quasar';

export const columnasUsers: QTableColumn[] = [
  {
    field: 'name',
    name: 'name',
    label: 'Usuario',
    align: 'left',
    sortable: true,
  },
  {
    field: 'email',
    name: 'email',
    label: 'Correo electrónico',
    align: 'left',
    sortable: true,
  },
  {
    field: 'rol',
    name: 'rol',
    label: 'Rol',
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
