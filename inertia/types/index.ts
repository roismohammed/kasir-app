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
    active?: boolean
    stock?: number
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
    quantity: number;
    stock: number;
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
export interface RoleProps{
    id: number;
    name: string;
}

export interface SalesProps {
    id: number;
    date: number
    product_id: number;
    customer_id: number;
    payment_type: string
    discount: number;
    grand_total: number;
    total_price: number;
    tax: number;
    notes: string
}

export interface OrderData {
  invoice_number: string
  customer_id: string
  amount_paid: number
  payment_type: string
  discount: number
  tax: number
  total_price: number
  grand_total: number
  notes: string
  items:OrderItem[]
}

export interface OrderItem {
  product_id: number
  quantity: number
  price: number
  subtotal: number
}
type PageProps = {
  sale: OrderData[];
  totalSales: number;        // total uang hasil penjualan
  totalProducts: number;     // jumlah produk di katalog
  totalSold: number;         // jumlah unit terjual
  productTerlaris: OrderData[];
};
