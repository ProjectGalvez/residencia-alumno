import { QTableColumn } from 'quasar';
export const columns: QTableColumn[] = [
  {
    field: 'nombre',
    name: 'nombre',
    label: 'Nombre de la carrera',
    align: 'left',
    sortable: true,
  },
  {
    field: 'clave',
    name: 'clave',
    label: 'Clave',
    align: 'left',
    sortable: true,
  },
  {
    field: 'departamento_id',
    name: 'departamento',
    label: 'Departamento',
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
