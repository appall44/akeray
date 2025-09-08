"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
	Home,
	Users,
	Building,
	FileText,
	CreditCard,
	Wrench,
	BarChart3,
	TrendingUp,
	Bell,
	Settings,
	LogOut,
	Menu,
	User,
	ChevronDown,
	Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import NotificationDropdown from "@/components/notification-dropdown";

interface DashboardLayoutProps {
	children: React.ReactNode;
	userRole: "admin" | "owner" | "tenant";
	userName?: string;
	userEmail?: string;
}

const navigationItems = {
	admin: [
		{ name: "Dashboard", href: "/dashboard/admin", icon: Home },
		{ name: "Users", href: "/dashboard/admin/users", icon: Users },
		{ name: "Register", href: "/dashboard/admin/register", icon: User },
		{ name: "Properties", href: "/dashboard/admin/properties", icon: Building },
		{ name: "Leases", href: "/dashboard/admin/leases", icon: FileText },
		{ name: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
		{ name: "Invoices", href: "/dashboard/admin/invoices", icon: FileText },
		{ name: "Maintenance", href: "/dashboard/admin/maintenance", icon: Wrench },
		{ name: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
		{ name: "Sales", href: "/dashboard/admin/sales", icon: TrendingUp },
		{
			name: "Notifications",
			href: "/dashboard/admin/notifications",
			icon: Bell,
		},
		{ name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
	],
	owner: [
		{ name: "Dashboard", href: "/dashboard/owner", icon: Home },
		{ name: "Properties", href: "/dashboard/owner/properties", icon: Building },
		{ name: "Leases", href: "/dashboard/owner/leases", icon: FileText },
		{ name: "Payments", href: "/dashboard/owner/payments", icon: CreditCard },
		{ name: "Invoices", href: "/dashboard/owner/invoices", icon: FileText },
		{ name: "Reports", href: "/dashboard/owner/reports", icon: BarChart3 },
		{
			name: "Notifications",
			href: "/dashboard/owner/notifications",
			icon: Bell,
		},
	],
	tenant: [
		{ name: "Dashboard", href: "/dashboard/tenant", icon: Home },
		{
			name: "Browse Properties",
			href: "/dashboard/tenant/properties",
			icon: Building,
		},
		{
			name: "My Properties",
			href: "/dashboard/tenant/my-properties",
			icon: Users,
		},
		{
			name: "Rental Requests",
			href: "/dashboard/tenant/rental-requests",
			icon: FileText,
		},
		{ name: "Payments", href: "/dashboard/tenant/payments", icon: CreditCard },
		{ name: "Invoices", href: "/dashboard/tenant/invoices", icon: FileText },
		{ name: "Lease", href: "/dashboard/tenant/lease", icon: FileText },
		{
			name: "Maintenance",
			href: "/dashboard/tenant/maintenance",
			icon: Wrench,
		},
		{
			name: "Notifications",
			href: "/dashboard/tenant/notifications",
			icon: Bell,
		},
	],
};

const ethiopianNames = {
	admin: "Admin Aseffa Bekele",
	owner: "Mulugeta Assefa",
	tenant: "Meron Tadesse",
};

export default function DashboardLayout({
	children,
	userRole,
	userName,
	userEmail,
}: DashboardLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const navigation = navigationItems[userRole];
	const displayName = userName || ethiopianNames[userRole];

	// Close sidebar on route change (mobile)
	useEffect(() => {
		setSidebarOpen(false);
	}, [pathname]);

	const getRoleColor = (role: string) => {
		switch (role) {
			case "admin":
				return "bg-red-100 text-red-800";
			case "owner":
				return "bg-emerald-100 text-emerald-800";
			case "tenant":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getRoleLabel = (role: string) => {
		switch (role) {
			case "admin":
				return "Administrator";
			case "owner":
				return "Property Owner";
			case "tenant":
				return "Tenant";
			default:
				return role;
		}
	};

	const handleLogout = () => {
		router.push("/login");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
			{/* Desktop Sidebar */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
				<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-[#9D9360] to-[#4A90E2] to-blue-700 px-6 pb-4 shadow-2xl border-r border-emerald-600/50">
					{/* Logo */}
					<div className="flex h-20 shrink-0 items-center">
						<div className="flex items-center space-x-4">
							<div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-blue-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg relative">
								<Building2 className="h-6 w-6 text-white" />
								<div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
									<span className="text-xs font-bold text-gray-800">A</span>
								</div>
							</div>
							<div>
								<span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
									Akeray PMS
								</span>
								<p className="text-xs text-emerald-100 font-medium">
									Property Management System
								</p>
							</div>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex flex-1 flex-col">
						<ul role="list" className="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" className="-mx-2 space-y-2">
									{navigation.map((item, index) => {
										const isActive = pathname === item.href;
										return (
											<li
												key={item.name}
												className="animate-in fade-in slide-in-from-left-4 duration-500"
												style={{
													animationDelay: `${index * 75}ms`,
													animationFillMode: "forwards",
												}}
											>
												<Link
													href={item.href}
													className={cn(
														"group flex gap-x-3 rounded-2xl p-4 text-sm font-semibold leading-6 transition-all duration-300",
														isActive
															? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md transform scale-[1.02]"
															: "text-emerald-100 hover:text-white hover:bg-emerald-600/30 hover:scale-[1.01]"
													)}
												>
													<item.icon
														className={cn(
															"h-6 w-6 shrink-0 transition-colors",
															isActive
																? "text-white"
																: "text-emerald-200 group-hover:text-white"
														)}
													/>
													<span className="truncate">{item.name}</span>
												</Link>
											</li>
										);
									})}
								</ul>
							</li>
						</ul>
					</nav>

					{/* User Profile */}
					<div className="mt-auto">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="w-full justify-start p-4 h-auto hover:bg-emerald-600/30 rounded-2xl"
								>
									<div className="flex items-center space-x-3 w-full">
										<Avatar className="h-12 w-12 ring-2 ring-emerald-200/50">
											<AvatarImage src="/placeholder-user.jpg" />
											<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold">
												{displayName
													.split(" ")
													.slice(-2)
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 text-left">
											<p className="text-sm font-semibold text-white truncate">
												{displayName}
											</p>
											<div className="flex items-center space-x-2">
												<Badge
													className={cn(
														"text-xs font-medium",
														getRoleColor(userRole)
													)}
												>
													{getRoleLabel(userRole)}
												</Badge>
											</div>
										</div>
										<ChevronDown className="h-4 w-4 text-emerald-200" />
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-64 bg-white/95 backdrop-blur-sm"
							>
								<DropdownMenuLabel className="text-center">
									<div className="font-semibold">{displayName}</div>
									<div className="text-xs text-gray-500 font-normal">
										{userEmail || `${userRole}@akeray.et`}
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer" asChild>
									<Link href={`/dashboard/${userRole}/profile`}>
										<User className="mr-2 h-4 w-4" />
										Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer" asChild>
									<Link href={`/dashboard/${userRole}/settings`}>
										<Settings className="mr-2 h-4 w-4" />
										Settings
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className="text-red-600 cursor-pointer"
									onClick={handleLogout}
								>
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>

			{/* Mobile Sidebar */}
			<Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
				<SheetContent
					side="left"
					className="w-80 p-0 bg-gradient-to-b from-emerald-700 to-blue-700"
				>
					<div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
						{/* Logo */}
						<div className="flex h-20 shrink-0 items-center">
							<div className="flex items-center space-x-4">
								<div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-blue-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg relative">
									<Building2 className="h-6 w-6 text-white" />
									<div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
										<span className="text-xs font-bold text-gray-800">A</span>
									</div>
								</div>
								<div>
									<span className="font-bold text-xl text-emerald-100">
										Akeray PMS
									</span>
									<p className="text-xs text-emerald-100 font-medium">
										Property Management System
									</p>
								</div>
							</div>
						</div>

						{/* Navigation */}
						<nav className="flex flex-1 flex-col">
							<ul role="list" className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" className="-mx-2 space-y-2">
										{navigation.map((item) => {
											const isActive = pathname === item.href;
											return (
												<li key={item.name}>
													<Link
														href={item.href}
														className={cn(
															"group flex gap-x-3 rounded-2xl p-4 text-sm font-semibold leading-6 transition-all duration-300",
															isActive
																? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md"
																: "text-emerald-100 hover:text-white hover:bg-emerald-600/30"
														)}
														onClick={() => setSidebarOpen(false)}
													>
														<item.icon
															className={cn(
																"h-6 w-6 shrink-0 transition-colors",
																isActive
																	? "text-white"
																	: "text-emerald-200 group-hover:text-white"
															)}
														/>
														<span className="truncate">{item.name}</span>
													</Link>
												</li>
											);
										})}
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</SheetContent>
			</Sheet>

			{/* Main content */}
			<div className="lg:pl-80">
				{/* Top header */}
				<div className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
					<Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								className="lg:hidden hover:bg-emerald-50"
							>
								<Menu className="h-6 w-6" />
								<span className="sr-only">Open sidebar</span>
							</Button>
						</SheetTrigger>
					</Sheet>

					<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
						<div className="flex flex-1 items-center">
							<div className="text-sm text-gray-600">
								<span className="font-medium">Welcome,</span>{" "}
								<span className="font-semibold text-emerald-600">
									{displayName.split(" ")[0]}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-x-4 lg:gap-x-6">
							<NotificationDropdown userRole={userRole} />

							{/* Mobile Profile Dropdown */}
							<div className="lg:hidden">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="sm" className="relative">
											<Avatar className="h-8 w-8 ring-2 ring-emerald-200">
												<AvatarImage src="/placeholder-user.jpg" />
												<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold text-xs">
													{displayName
														.split(" ")
														.slice(-2)
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="w-64 bg-white/95 backdrop-blur-sm"
									>
										<DropdownMenuLabel className="text-center">
											<div className="font-semibold text-sm">{displayName}</div>
											<div className="text-xs text-gray-500 font-normal">
												{userEmail || `${userRole}@akeray.et`}
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="cursor-pointer">
											<User className="mr-2 h-4 w-4" />
											Profile
										</DropdownMenuItem>
										<DropdownMenuItem className="cursor-pointer">
											<Settings className="mr-2 h-4 w-4" />
											Settings
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											className="text-red-600 cursor-pointer"
											onClick={handleLogout}
										>
											<LogOut className="mr-2 h-4 w-4" />
											Logout
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</div>
				</div>

				{/* Page content */}
				<main className="py-8">
					<div className="px-4 sm:px-6 lg:px-8">{children}</div>
				</main>
			</div>
		</div>
	);
}
