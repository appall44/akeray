"use client";

import { useState } from "react";
import {
	CreditCard,
	Download,
	Calendar,
	TrendingUp,
	DollarSign,
	ArrowLeft,
	Filter,
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

const paymentData = [
	{ month: "Jan 2024", collected: 180000, expected: 180000, rate: 100 },
	{ month: "Feb 2024", collected: 165000, expected: 180000, rate: 92 },
	{ month: "Mar 2024", collected: 180000, expected: 180000, rate: 100 },
	{ month: "Apr 2024", collected: 195000, expected: 195000, rate: 100 },
	{ month: "May 2024", collected: 180000, expected: 195000, rate: 92 },
	{ month: "Jun 2024", collected: 195000, expected: 195000, rate: 100 },
];

const propertyPayments = [
	{
		property: "Bole Apartments",
		collected: 180000,
		expected: 180000,
		rate: 100,
		trend: "stable",
	},
	{
		property: "Kazanchis Complex",
		collected: 220000,
		expected: 240000,
		rate: 92,
		trend: "down",
	},
	{
		property: "Piassa Plaza",
		collected: 150000,
		expected: 150000,
		rate: 100,
		trend: "up",
	},
	{
		property: "CMC Towers",
		collected: 280000,
		expected: 300000,
		rate: 93,
		trend: "down",
	},
];

const recentPayments = [
	{
		id: "PAY-001",
		tenant: "Tigist Haile",
		property: "Bole Apartments",
		unit: "3B",
		amount: 25000,
		date: "2024-01-01",
		status: "paid",
		method: "Bank Transfer",
	},
	{
		id: "PAY-002",
		tenant: "Dawit Mekonnen",
		property: "Kazanchis Complex",
		unit: "2A",
		amount: 28000,
		date: "2024-01-01",
		status: "paid",
		method: "Cash",
	},
	{
		id: "PAY-003",
		tenant: "Hanan Ahmed",
		property: "Piassa Plaza",
		unit: "4A",
		amount: 22000,
		date: "2024-01-02",
		status: "paid",
		method: "Mobile Money",
	},
];

export default function PaymentReportPage() {
	const [dateRange, setDateRange] = useState<any>(null);
	const [propertyFilter, setPropertyFilter] = useState("all");
	const [reportPeriod, setReportPeriod] = useState("monthly");

	const totalCollected = paymentData.reduce(
		(sum, item) => sum + item.collected,
		0
	);
	const totalExpected = paymentData.reduce(
		(sum, item) => sum + item.expected,
		0
	);
	const collectionRate = Math.round((totalCollected / totalExpected) * 100);
	const averageMonthly = Math.round(totalCollected / paymentData.length);

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
								Payment Report
							</h1>
							<p className="text-lg text-gray-600">
								Comprehensive analysis of rental payment collections
							</p>
							<p className="text-sm text-gray-500">
								Track payment trends, collection rates, and financial
								performance
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
						<Select value={reportPeriod} onValueChange={setReportPeriod}>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Report Period" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="daily">Daily Report</SelectItem>
								<SelectItem value="weekly">Weekly Report</SelectItem>
								<SelectItem value="monthly">Monthly Report</SelectItem>
								<SelectItem value="yearly">Yearly Report</SelectItem>
							</SelectContent>
						</Select>

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
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Total Collected
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(totalCollected / 1000000).toFixed(1)}M ETB
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<DollarSign className="h-8 w-8 text-emerald-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-blue-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Collection Rate
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{collectionRate}%
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<TrendingUp className="h-8 w-8 text-blue-600" />
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
											Average Monthly
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(averageMonthly / 1000).toFixed(0)}K ETB
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
											Outstanding
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{((totalExpected - totalCollected) / 1000).toFixed(0)}K
											ETB
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-orange-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<CreditCard className="h-8 w-8 text-orange-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Monthly Payment Trends */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1050"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<TrendingUp className="h-5 w-5 text-emerald-600" />
									<span>Monthly Payment Trends</span>
								</CardTitle>
								<CardDescription>
									Payment collection performance over time
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{paymentData.map((item, index) => (
										<div key={index} className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium">
													{item.month}
												</span>
												<div className="flex items-center space-x-2">
													<span className="text-sm text-gray-600">
														{(item.collected / 1000).toFixed(0)}K /{" "}
														{(item.expected / 1000).toFixed(0)}K ETB
													</span>
													<Badge
														className={
															item.rate >= 95
																? "bg-emerald-100 text-emerald-800"
																: item.rate >= 85
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

					{/* Property Performance */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<CreditCard className="h-5 w-5 text-blue-600" />
									<span>Payment by Property</span>
								</CardTitle>
								<CardDescription>
									Collection performance by property
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{propertyPayments.map((property, index) => (
										<div key={index} className="space-y-3">
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium text-sm">
														{property.property}
													</p>
													<p className="text-xs text-gray-500">
														{(property.collected / 1000).toFixed(0)}K of{" "}
														{(property.expected / 1000).toFixed(0)}K ETB
													</p>
												</div>
												<div className="text-right">
													<Badge
														className={
															property.rate >= 95
																? "bg-emerald-100 text-emerald-800"
																: property.rate >= 85
																? "bg-yellow-100 text-yellow-800"
																: "bg-red-100 text-red-800"
														}
													>
														{property.rate}%
													</Badge>
													{property.trend === "up" && (
														<TrendingUp className="h-4 w-4 text-emerald-500 inline ml-2" />
													)}
													{property.trend === "down" && (
														<TrendingUp className="h-4 w-4 text-red-500 rotate-180 inline ml-2" />
													)}
												</div>
											</div>
											<Progress value={property.rate} className="h-2" />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Recent Payments Table */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1350"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Recent Payment Transactions</CardTitle>
							<CardDescription>
								Latest payment records across all properties
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Payment ID</TableHead>
										<TableHead>Tenant</TableHead>
										<TableHead>Property & Unit</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Date</TableHead>
										<TableHead>Method</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{recentPayments.map((payment) => (
										<TableRow key={payment.id} className="hover:bg-gray-50">
											<TableCell>
												<span className="font-mono text-sm">{payment.id}</span>
											</TableCell>
											<TableCell>
												<span className="font-medium">{payment.tenant}</span>
											</TableCell>
											<TableCell>
												<div>
													<p className="font-medium text-sm">
														{payment.property}
													</p>
													<p className="text-xs text-gray-500">
														Unit {payment.unit}
													</p>
												</div>
											</TableCell>
											<TableCell>
												<span className="font-semibold text-emerald-600">
													{payment.amount.toLocaleString()} ETB
												</span>
											</TableCell>
											<TableCell>
												<span className="text-sm">
													{new Date(payment.date).toLocaleDateString()}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-sm">{payment.method}</span>
											</TableCell>
											<TableCell>
												<Badge className="bg-emerald-100 text-emerald-800">
													Paid
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
