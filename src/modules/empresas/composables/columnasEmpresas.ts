import { QTableColumn } from 'quasar';
export const columnasEmpresas: QTableColumn[] = [
  {
    field: 'nombre',
    name: 'nombre',
    label: 'Nombre de la empresa',
    align: 'left',
    sortable: true,
  },
  {
    field: 'giro',
    name: 'giro',
    label: 'Giro',
    align: 'left',
    sortable: true,
  },
  {
    field: 'telefono',
    name: 'telefono',
    label: 'Teléfono',
    align: 'left',
    sortable: true,
  },
  {
    field: 'domicilio',
    name: 'domicilio',
    label: 'Domicilio',
    align: 'left',
    sortable: true,
  },
  {
    field: 'titular',
    name: 'titular',
    label: 'Titular',
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
