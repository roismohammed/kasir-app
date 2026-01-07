import {
    Bell,
    History,
    Home,
    User,
    Clock,
    Calendar,
    ChevronDown,
    Settings,
    LogOut,
    Search,
    X,
} from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "~/lib/utils";
import { Link } from "@inertiajs/react";

export default function CashierHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Mock notifications
    const notifications = [
        { id: 1, title: "Pesanan Baru", message: "Pesanan #ORD-1234 diterima", time: "5 menit lalu", unread: true },
        { id: 2, title: "Stok Rendah", message: "Produk Oreo Vanilla tersisa 5 pcs", time: "1 jam lalu", unread: true },
        { id: 3, title: "Pembayaran Berhasil", message: "Transaksi #TRX-5678 berhasil", time: "2 jam lalu", unread: false },
        { id: 4, title: "Pesanan Dibatalkan", message: "Pesanan #ORD-9101 dibatalkan", time: "1 hari lalu", unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4">
            {/* Left Section - Date & Time */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="gap-2 flex ">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-lg font-medium text-gray-700">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{formattedTime}</span>
                        </div>
                        <div className="md:hidden">
                            <Clock className="h-8 w-8 text-gray-600" />
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

                {/* Page Title */}
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <h1 className="text-lg font-bold text-gray-900">Kasir</h1>
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hidden md:flex">
                        Online
                    </Badge>
                </div>
            </div>

            {/* Center Section - Search (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
               
            </div>

            {/* Right Section - Actions & User */}
            <div className="flex items-center gap-2">
                {/* Mobile Search Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                    <Search className="h-5 w-5" />
                </Button>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-2 md:hidden">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="search"
                                placeholder="Cari produk, pelanggan..."
                                className="pl-9"
                                autoFocus
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                                onClick={() => setIsSearchOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4">
                    <Link
                        href={'/dashboard'}
                        className="hidden md:flex relative gap-2 hover:bg-gray-100 px-4 py-2 transition-all rounded-md items-center text-gray-700"
                        title="Dashboard"
                    >
                        <Home className="h-5 w-5" />

                        Dashboard
                    </Link>

                    <Link
                        href={'/dashboard'}
                        className="hidden md:flex relative gap-2 hover:bg-gray-100 px-4 py-2 transition-all rounded-md items-center text-gray-700"
                        title="Dashboard"
                    >
                        <History className="h-5 w-5" />

                        Riwayat
                    </Link>

                    {/* Notifications Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel className="flex items-center justify-between">
                                <span>Notifikasi</span>
                                {unreadCount > 0 && (
                                    <Badge variant="destructive" className="text-xs">
                                        {unreadCount} baru
                                    </Badge>
                                )}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className={cn(
                                            "flex flex-col items-start p-3 cursor-pointer hover:bg-gray-50",
                                            notification.unread && "bg-blue-50"
                                        )}
                                    >
                                        <div className="flex items-start justify-between w-full">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        notification.unread ? "bg-blue-500" : "bg-gray-300"
                                                    )}></div>
                                                    <span className="font-medium">{notification.title}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                <span className="text-xs text-gray-500 mt-2">{notification.time}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="justify-center text-center text-blue-600 hover:text-blue-700 cursor-pointer">
                                Lihat semua notifikasi
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Theme Toggle */}
                    <div className="px-1">
                        <ModeToggle />
                    </div>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" alt="User" />
                                    <AvatarFallback className="bg-purple-100 text-purple-600">
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden md:flex flex-col items-start">
                                    <span className="text-sm font-medium">Roisdev (Ro)</span>
                                    <span className="text-xs text-gray-500">Kasir</span>
                                </div>
                                <ChevronDown className="h-4 w-4 hidden md:block" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">sohib (so)</p>
                                    <p className="text-xs leading-none text-gray-500">
                                        kasir@payloop.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Pengaturan</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profil</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Keluar</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}