import { HugeiconsIconProps } from "@hugeicons/react";
import { description } from '../components/ui/chart-bar-default';

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
    id: number;
    name: string;
    phone: string;
    address: string;
    description: string;
}

export interface BreadcrumbProps {
    title: string;
    href?: string;
}

export interface CustomersProps {
    id: number;
    name: string;
    phone: string;
    address: string;
    gender: string;
}

export interface CategoriesProps {
    id: number;
    name: string;
    description: string;
}

export interface UnitsProps {
    id: number;
    name: string;
    description: string;
}

export interface ProductProps {
    id: number;
    barcode: string;
    image:string
    name: string;
    price: number;
    unit_id: number;
    category_id: number;
}
export interface StockInProps {
    id: number;
    date: number
    product_id: number;
    supplier_id: number;
    description: string
    quantity: number;
}

export interface StockOutProps {
    id: number;
    date: number
    product_id: number;
    supplier_id: number;
    description: string
    quantity: number;
}

export interface UserProps {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    roles?: string[];
}