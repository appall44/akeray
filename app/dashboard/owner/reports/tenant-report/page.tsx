"use client";

import { useState } from "react";
import {
	Users,
	Download,
	Calendar,
	TrendingUp,
	User,
	ArrowLeft,
	MapPin,
	Phone,
	Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const tenantData = [
	{
		id: 1,
		name: "Tigist Haile",
		property: "Bole Apartments",
		unit: "3B",
		phone: "+251911234567",
		email: "tigist@email.com",
		leaseStart: "2024-01-01",
		leaseEnd: "2024-12-31",
		monthlyRent: 25000,
		paymentHistory: "Excellent",
		status: "active",
		daysAsTenat: 365,
		avatar:
			"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: 2,
		name: "Dawit Mekonnen",
		property: "Kazanchis Complex",
		unit: "2A",
		phone: "+251922345678",
		email: "dawit@email.com",
		leaseStart: "2024-02-01",
		leaseEnd: "2025-01-31",
		monthlyRent: 28000,
		paymentHistory: "Good",
		status: "active",
		daysAsTenat: 334,
		avatar:
			"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: 3,
		name: "Hanan Ahmed",
		property: "Piassa Plaza",
		unit: "4A",
		phone: "+251933456789",
		email: "hanan@email.com",
		leaseStart: "2023-12-01",
		leaseEnd: "2024-11-30",
		monthlyRent: 22000,
		paymentHistory: "Fair",
		status: "expiring",
		daysAsTenat: 396,
		avatar:
			"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: 4,
		name: "Yohannes Bekele",
		property: "CMC Towers",
		unit: "5C",
		phone: "+251944567890",
		email: "yohannes@email.com",
		leaseStart: "2024-03-01",
		leaseEnd: "2025-02-28",
		monthlyRent: 35000,
		paymentHistory: "Excellent",
		status: "active",
		daysAsTenat: 305,
		avatar:
			"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
];

const tenantStats = {
	total: tenantData.length,
	active: tenantData.filter((t) => t.status === "active").length,
	expiring: tenantData.filter((t) => t.status === "expiring").length,
	averageStay: Math.round(
		tenantData.reduce((sum, t) => sum + t.daysAsTenat, 0) / tenantData.length
	),
	totalRevenue: tenantData.reduce((sum, t) => sum + t.monthlyRent, 0),
};

const occupancyByProperty = [
	{ property: "Bole Apartments", occupied: 11, total: 12, rate: 92 },
	{ property: "Kazanchis Complex", occupied: 14, total: 16, rate: 88 },
	{ property: "Piassa Plaza", occupied: 8, total: 8, rate: 100 },
	{ property: "CMC Towers", occupied: 17, total: 20, rate: 85 },
];

export default function TenantReportPage() {
	const [dateRange, setDateRange] = useState<any>(null);
	const [propertyFilter, setPropertyFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredTenants = tenantData.filter((tenant) => {
		const matchesProperty =
			propertyFilter === "all" ||
			tenant.property.toLowerCase().includes(propertyFilter);
		const matchesStatus =
			statusFilter === "all" || tenant.status === statusFilter;
		return matchesProperty && matchesStatus;
	});

	const getPaymentHistoryColor = (history: string) => {
		switch (history) {
			case "Excellent":
				return "bg-emerald-100 text-emerald-800";
			case "Good":
				return "bg-blue-100 text-blue-800";
			case "Fair":
				return "bg-yellow-100 text-yellow-800";
			case "Poor":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-emerald-100 text-emerald-800";
			case "expiring":
				return "bg-yellow-100 text-yellow-800";
			case "expired":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<DashboardLayout
			userRole="owner"
			userName="Mulugeta Assefa"
			userEmail="mulugeta@akeray.et"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex items-center space-x-4 mb-6">
						<Button
							variant="outline"
							asChild
							className="border-emerald-300 hover:bg-emerald-50"
						>
							<Link href="/dashboard/owner/reports">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Reports
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Tenant Report
							</h1>
							<p className="text-lg text-gray-600">
								Comprehensive analysis of your tenant portfolio
							</p>
							<p className="text-sm text-gray-500">
								Track tenant relationships, lease status, and occupancy metrics
							</p>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
							>
								<Download className="h-4 w-4 mr-2" />
								Export PDF
							</Button>
							<Button
								variant="outline"
								className="border-blue-300 hover:bg-blue-50 bg-transparent"
							>
								<Download className="h-4 w-4 mr-2" />
								Export Excel
							</Button>
						</div>
					</div>
				</div>

				{/* Filters */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<div className="flex flex-col sm:flex-row gap-4">
						<Select value={propertyFilter} onValueChange={setPropertyFilter}>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Select Property" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Properties</SelectItem>
								<SelectItem value="bole">Bole Apartments</SelectItem>
								<SelectItem value="kazanchis">Kazanchis Complex</SelectItem>
								<SelectItem value="piassa">Piassa Plaza</SelectItem>
								<SelectItem value="cmc">CMC Towers</SelectItem>
							</SelectContent>
						</Select>

						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Tenant Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="expiring">Expiring Soon</SelectItem>
								<SelectItem value="expired">Expired</SelectItem>
							</SelectContent>
						</Select>

						<DatePickerWithRange
							date={dateRange}
							setDate={setDateRange}
							placeholder="Select date range"
						/>
					</div>
				</div>

				{/* Summary Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-blue-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Total Tenants
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{tenantStats.total}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Users className="h-8 w-8 text-blue-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Active Tenants
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{tenantStats.active}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<User className="h-8 w-8 text-emerald-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-purple-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Avg Stay
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{Math.round(tenantStats.averageStay / 30)} mo
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Calendar className="h-8 w-8 text-purple-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-orange-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Monthly Revenue
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(tenantStats.totalRevenue / 1000).toFixed(0)}K ETB
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-orange-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<TrendingUp className="h-8 w-8 text-orange-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Occupancy by Property */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1050"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<TrendingUp className="h-5 w-5 text-emerald-600" />
									<span>Occupancy by Property</span>
								</CardTitle>
								<CardDescription>
									Current occupancy rates across properties
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{occupancyByProperty.map((property, index) => (
										<div key={index} className="space-y-3">
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium text-sm">
														{property.property}
													</p>
													<p className="text-xs text-gray-500">
														{property.occupied} of {property.total} units
													</p>
												</div>
												<div className="text-right">
													<Badge
														className={
															property.rate >= 90
																? "bg-emerald-100 text-emerald-800"
																: property.rate >= 80
																? "bg-yellow-100 text-yellow-800"
																: "bg-red-100 text-red-800"
														}
													>
														{property.rate}%
													</Badge>
												</div>
											</div>
											<Progress value={property.rate} className="h-2" />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Tenant Performance */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Users className="h-5 w-5 text-blue-600" />
									<span>Tenant Performance</span>
								</CardTitle>
								<CardDescription>
									Payment history and tenant ratings
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{filteredTenants.slice(0, 4).map((tenant, index) => (
										<div
											key={tenant.id}
											className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
										>
											<Avatar className="h-12 w-12">
												<AvatarImage src={tenant.avatar} />
												<AvatarFallback>
													{tenant.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<p className="font-medium text-gray-900">
													{tenant.name}
												</p>
												<p className="text-sm text-gray-500">
													{tenant.property} - Unit {tenant.unit}
												</p>
												<div className="flex items-center space-x-2 mt-1">
													<Badge
														className={getPaymentHistoryColor(
															tenant.paymentHistory
														)}
													>
														{tenant.paymentHistory}
													</Badge>
													<span className="text-xs text-gray-500">
														{Math.round(tenant.daysAsTenat / 30)} months
													</span>
												</div>
											</div>
											<div className="text-right">
												<p className="font-semibold text-emerald-600">
													{tenant.monthlyRent.toLocaleString()} ETB
												</p>
												<p className="text-xs text-gray-500">monthly</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Detailed Tenant Table */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1350"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Detailed Tenant Information</CardTitle>
							<CardDescription>
								Complete tenant records and contact information
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Tenant</TableHead>
										<TableHead>Property & Unit</TableHead>
										<TableHead>Contact</TableHead>
										<TableHead>Lease Period</TableHead>
										<TableHead>Monthly Rent</TableHead>
										<TableHead>Payment History</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredTenants.map((tenant) => (
										<TableRow key={tenant.id} className="hover:bg-gray-50">
											<TableCell>
												<div className="flex items-center space-x-3">
													<Avatar className="h-10 w-10">
														<AvatarImage src={tenant.avatar} />
														<AvatarFallback>
															{tenant.name
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="font-medium text-gray-900">
															{tenant.name}
														</p>
														<p className="text-xs text-gray-500">
															{Math.round(tenant.daysAsTenat / 30)} months as
															tenant
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center space-x-2">
													<MapPin className="h-4 w-4 text-gray-400" />
													<div>
														<p className="font-medium text-sm">
															{tenant.property}
														</p>
														<p className="text-xs text-gray-500">
															Unit {tenant.unit}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="space-y-1">
													<div className="flex items-center space-x-2">
														<Phone className="h-3 w-3 text-gray-400" />
														<span className="text-xs">{tenant.phone}</span>
													</div>
													<div className="flex items-center space-x-2">
														<Mail className="h-3 w-3 text-gray-400" />
														<span className="text-xs">{tenant.email}</span>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="text-sm">
													<p className="font-medium">
														{new Date(tenant.leaseStart).toLocaleDateString()}
													</p>
													<p className="text-gray-500">
														to {new Date(tenant.leaseEnd).toLocaleDateString()}
													</p>
												</div>
											</TableCell>
											<TableCell>
												<span className="font-semibold text-emerald-600">
													{tenant.monthlyRent.toLocaleString()} ETB
												</span>
											</TableCell>
											<TableCell>
												<Badge
													className={getPaymentHistoryColor(
														tenant.paymentHistory
													)}
												>
													{tenant.paymentHistory}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge className={getStatusColor(tenant.status)}>
													{tenant.status}
												</Badge>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	);
}
