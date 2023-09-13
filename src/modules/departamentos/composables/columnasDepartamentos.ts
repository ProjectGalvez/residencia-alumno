import { QTableColumn } from 'quasar';

export const columnasDepartamentos: QTableColumn[] = [
  {
    field: 'nombre',
    name: 'nombre',
    label: 'Nombre departamento',
    align: 'left',
    sortable: true,
  },
  {
    field: 'nombre_titular',
    name: 'nombre_titular',
    label: 'Nombre del titular',
    align: 'left',
    sortable: true,
  },
  {
    field: 'apellidos_titular',
    name: 'apellidos_titular',
    label: 'Apellidos del titular',
    align: 'left',
    sortable: true,
  },
  {
    field: 'accion',
    name: 'accion',
    label: 'Acción',
    align: 'right',
    sortable: true,
  },
];
