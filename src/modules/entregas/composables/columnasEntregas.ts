import { QTableColumn } from 'quasar';

export const columnasEntregas: QTableColumn[] = [
  {
    field: 'estudiante',
    name: 'estudiante',
    label: 'Estudiante',
    align: 'left',
  },
  {
    field: 'fecha_entrega',
    name: 'fecha_entrega',
    label: 'Fecha de entrega',
    align: 'right',
  },
  {
    field: 'documento',
    name: 'documento',
    label: 'Documento',
    align: 'left',
  },
  {
    field: 'accion',
    name: 'accion',
    label: 'Accion',
    align: 'left',
  },
];
