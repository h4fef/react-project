import HomeIcon from "../assets/home.svg?react";
import InventoryIcon from "../assets/inventory.svg?react";
import ReportsIcon from "../assets/report.svg?react";
import SuppliersIcon from "../assets/suppliers.svg?react";
import OrdersIcon from "../assets/order.svg?react";
import StoreIcon from "../assets/store.svg?react";
import SettingsIcon from "../assets/settings.svg?react";
import LogoutIcon from "../assets/logout.svg?react";
import type {ComponentType, SVGProps} from "react";

export const linkIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    dashboard: HomeIcon,
    inventory: InventoryIcon,
    reports: ReportsIcon,
    suppliers: SuppliersIcon,
    orders: OrdersIcon,
    manageStore: StoreIcon,
    settings: SettingsIcon,
    logout: LogoutIcon
};

export type IconName = keyof typeof linkIcons;