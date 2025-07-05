import { HugeiconsIconProps } from "@hugeicons/react";

export interface NavItem {
    title: string;
    url: string;
    icon?: HugeiconsIconProps['icon'] | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    [key: string]: unknown;
}

export interface SupplierProps {
    name: string;
    phone: string;
    address: string;
    description: string;
}