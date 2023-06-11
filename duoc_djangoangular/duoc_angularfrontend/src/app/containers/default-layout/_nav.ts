import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: ''
    }
  },
  {
    title: true,
    name: 'Gestiones'
  },
  {
    name: 'Cuentas de Usuario',
    url: '/menu-usuario',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Unidades',
    url: '/menu-unidades',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Cuentas Presupuestarias',
    url: '/menu-cuentas',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Proveedores de Telefonía',
    url: '/menu-proveedores',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Anexos',
    url: '/menu-anexos',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    title: true,
    name: 'Consultas y Procesos'
  },
  {
    name: 'Calculo de Reportes',
    url: '/proceso',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Consulta de Reportes',
    url: '/consultas',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Consulta de Trafico',
    url: '/trafico',
    iconComponent: { name: 'cil-notes' }
  },
];

export const navUser: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: ''
    }
  },
  {
    title: true,
    name: 'Tarificacion'
  },
  {
    name: 'Consulta de Reportes',
    url: '/consultas',
    iconComponent: { name: 'cil-notes' }
  },
];