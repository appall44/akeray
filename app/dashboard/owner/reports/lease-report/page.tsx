"use client";

import { useState } from "react";
import {
	FileText,
	Download,
	Calendar,
	TrendingUp,
	Clock,
	ArrowLeft,
	AlertTriangle,
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

const leaseData = [
	{
		id: "LSE-001",
		tenant: "Tigist Haile",
		property: "Bole Apartments",
		unit: "3B",
		startDate: "2024-01-01",
		endDate: "2024-12-31",
		monthlyRent: 25000,
		status: "active",
		daysRemaining: 365,
		avatar:
			"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "LSE-002",
		tenant: "Dawit Mekonnen",
		property: "Kazanchis Complex",
		unit: "2A",
		startDate: "2024-02-01",
		endDate: "2025-01-31",
		monthlyRent: 28000,
		status: "active",
		daysRemaining: 396,
		avatar:
			"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "LSE-003",
		tenant: "Hanan Ahmed",
		property: "Piassa Plaza",
		unit: "4A",
		startDate: "2023-12-01",
		endDate: "2024-11-30",
		monthlyRent: 22000,
		status: "expiring",
		daysRemaining: 15,
		avatar:
			"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "LSE-004",
		tenant: "Yohannes Bekele",
		property: "CMC Towers",
		unit: "5C",
		startDate: "2024-03-01",
		endDate: "2025-02-28",
		monthlyRent: 35000,
		status: "active",
		daysRemaining: 424,
		avatar:
			"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
];

const leaseStats = {
	total: leaseData.length,
	active: leaseData.filter((l) => l.status === "active").length,
	expiring: leaseData.filter((l) => l.status === "expiring").length,
	totalRevenue: leaseData.reduce((sum, l) => sum + l.monthlyRent, 0),
	averageLeaseDuration: 12, // months
};

const expiryTimeline = [
	{ period: "Next 30 days", count: 1, leases: ["Hanan Ahmed - Piassa Plaza"] },
	{ period: "Next 60 days", count: 0, leases: [] },
	{ period: "Next 90 days", count: 0, leases: [] },
	{
		period: "Next 6 months",
		count: 2,
		leases: [
			"Tigist Haile - Bole Apartments",
			"Dawit Mekonnen - Kazanchis Complex",
		],
	},
];

const renewalHistory = [
	{ month: "Jan 2024", renewed: 2, expired: 0, rate: 100 },
	{ month: "Feb 2024", renewed: 1, expired: 1, rate: 50 },
	{ month: "Mar 2024", renewed: 3, expired: 0, rate: 100 },
	{ month: "Apr 2024", renewed: 2, expired: 1, rate: 67 },
	{ month: "May 2024", renewed: 4, expired: 0, rate: 100 },
	{ month: "Jun 2024", renewed: 1, expired: 0, rate: 100 },
];

export default function LeaseReportPage() {
	const [dateRange, setDateRange] = useState<any>(null);
	const [propertyFilter, setPropertyFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredLeases = leaseData.filter((lease) => {
		const matchesProperty =
			propertyFilter === "all" ||
			lease.property.toLowerCase().includes(propertyFilter);
		const matchesStatus =
			statusFilter === "all" || lease.status === statusFilter;
		return matchesProperty && matchesStatus;
	});

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

	const getDaysRemainingColor = (days: number) => {
		if (days <= 30) return "text-red-600";
		if (days <= 90) return "text-yellow-600";
		return "text-emerald-600";
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
								Lease Report
							</h1>
							<p className="text-lg text-gray-600">
								Comprehensive analysis of lease agreements and renewals
							</p>
							<p className="text-sm text-gray-500">
								Monitor lease expiry dates, renewal rates, and tenant retention
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
								<SelectValue placeholder="Lease Status" />
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
											Total Leases
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{leaseStats.total}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<FileText className="h-8 w-8 text-blue-600" />
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
											Active Leases
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{leaseStats.active}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Clock className="h-8 w-8 text-emerald-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-yellow-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Expiring Soon
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{leaseStats.expiring}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-yellow-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<AlertTriangle className="h-8 w-8 text-yellow-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-purple-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Monthly Revenue
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(leaseStats.totalRevenue / 1000).toFixed(0)}K ETB
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<TrendingUp className="h-8 w-8 text-purple-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Lease Expiry Timeline */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1050"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Calendar className="h-5 w-5 text-emerald-600" />
									<span>Lease Expiry Timeline</span>
								</CardTitle>
								<CardDescription>
									Upcoming lease expirations and renewal opportunities
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{expiryTimeline.map((period, index) => (
										<div key={index} className="space-y-3">
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium text-sm">{period.period}</p>
													<p className="text-xs text-gray-500">
														{period.count} lease(s) expiring
													</p>
												</div>
												<div className="text-right">
													<Badge
														className={
															period.count > 0
																? "bg-yellow-100 text-yellow-800"
																: "bg-emerald-100 text-emerald-800"
														}
													>
														{period.count} leases
													</Badge>
												</div>
											</div>
											{period.leases.length > 0 && (
												<div className="ml-4 space-y-1">
													{period.leases.map((lease, i) => (
														<p key={i} className="text-xs text-gray-600">
															• {lease}
														</p>
													))}
												</div>
											)}
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Renewal Rate Trends */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<TrendingUp className="h-5 w-5 text-blue-600" />
									<span>Renewal Rate Trends</span>
								</CardTitle>
								<CardDescription>
									Historical lease renewal performance
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{renewalHistory.map((item, index) => (
										<div key={index} className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium">
													{item.month}
												</span>
												<div className="flex items-center space-x-2">
													<span className="text-sm text-gray-600">
														{item.renewed} renewed, {item.expired} expired
													</span>
													<Badge
														className={
															item.rate >= 80
																? "bg-emerald-100 text-emerald-800"
																: item.rate >= 60
																? "bg-yellow-100 text-yellow-800"
																: "bg-red-100 text-red-800"
														}
													>
														{item.rate}%
													</Badge>
												</div>
											</div>
											<Progress value={item.rate} className="h-2" />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Detailed Lease Table */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1350"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Detailed Lease Information</CardTitle>
							<CardDescription>
								Complete lease records and expiry tracking
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Lease ID</TableHead>
										<TableHead>Tenant</TableHead>
										<TableHead>Property & Unit</TableHead>
										<TableHead>Lease Period</TableHead>
										<TableHead>Monthly Rent</TableHead>
										<TableHead>Days Remaining</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredLeases.map((lease) => (
										<TableRow key={lease.id} className="hover:bg-gray-50">
											<TableCell>
												<span className="font-mono text-sm">{lease.id}</span>
											</TableCell>
											<TableCell>
												<div className="flex items-center space-x-3">
													<Avatar className="h-8 w-8">
														<AvatarImage src={lease.avatar} />
														<AvatarFallback>
															{lease.tenant
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<span className="font-medium">{lease.tenant}</span>
												</div>
											</TableCell>
											<TableCell>
												<div>
													<p className="font-medium text-sm">
														{lease.property}
													</p>
													<p className="text-xs text-gray-500">
														Unit {lease.unit}
													</p>
												</div>
											</TableCell>
											<TableCell>
												<div className="text-sm">
													<p className="font-medium">
														{new Date(lease.startDate).toLocaleDateString()}
													</p>
													<p className="text-gray-500">
														to {new Date(lease.endDate).toLocaleDateString()}
													</p>
												</div>
											</TableCell>
											<TableCell>
												<span className="font-semibold text-emerald-600">
													{lease.monthlyRent.toLocaleString()} ETB
												</span>
											</TableCell>
											<TableCell>
												<span
													className={`font-medium ${getDaysRemainingColor(
														lease.daysRemaining
													)}`}
												>
													{lease.daysRemaining} days
												</span>
											</TableCell>
											<TableCell>
												<Badge className={getStatusColor(lease.status)}>
													{lease.status}
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<Button variant="ghost" size="sm" asChild>
													<Link href={`/dashboard/owner/leases/${lease.id}`}>
														View Details
													</Link>
												</Button>
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
