import { QTableColumn } from 'quasar';

export const columnasEstudiantes: QTableColumn[] = [
  {
    field: 'nombre',
    name: 'nombre',
    label: 'Nombre del estudiante',
    align: 'left',
    sortable: true,
  },
  {
    field: 'numero_control',
    name: 'numero_control',
    label: 'Número control',
    align: 'left',
  },
  {
    field: 'carrera',
    name: 'carrera',
    label: 'Carrera',
    align: 'left',
  },
  {
    field: 'telefono',
    name: 'telefono',
    label: 'Teléfono',
    align: 'left',
  },
  {
    field: 'accion',
    name: 'accion',
    label: 'Acción',
    align: 'right',
  },
];
