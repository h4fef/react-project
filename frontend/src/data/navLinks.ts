import type {LinkProp} from "../props/LinkProp.ts";

export const navLinks: LinkProp[] = [
    {
        href: '/',
        routeName: 'Dashboard',
        icon: 'dashboard'
    },
    {
        href: '/inventory',
        routeName: 'Inventario',
        icon: 'inventory'
    },
    {
        href: '/reports',
        routeName: 'Report',
        icon: 'reports'
    },
    {
        href: '/suppliers',
        routeName: 'Fornitori',
        icon: 'suppliers'
    },
    {
        href: '/orders',
        routeName: 'Ordini',
        icon: 'orders'
    },
    {
        href: '/manage-store',
        routeName: 'Gestione',
        icon: 'manageStore'
    },
    {
        href: '/settings',
        routeName: 'Impostazioni',
        icon: 'settings'
    },
    {
        href: '/logout',
        routeName: 'Esci',
        icon: 'logout'
    },
]