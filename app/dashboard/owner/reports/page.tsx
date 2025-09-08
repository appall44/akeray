"use client";

import { useState } from "react";
import {
	BarChart3,
	Download,
	Calendar,
	TrendingUp,
	DollarSign,
	Building,
	Users,
	FileText,
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const revenueData = [
	{ month: "Jan", revenue: 180000, target: 200000 },
	{ month: "Feb", revenue: 220000, target: 200000 },
	{ month: "Mar", revenue: 150000, target: 200000 },
	{ month: "Apr", revenue: 300000, target: 200000 },
	{ month: "May", revenue: 280000, target: 200000 },
	{ month: "Jun", revenue: 320000, target: 200000 },
];

const propertyPerformance = [
	{
		name: "Bole Apartments",
		occupancy: 92,
		revenue: 180000,
		units: 12,
		trend: "up",
	},
	{
		name: "Kazanchis Complex",
		occupancy: 88,
		revenue: 220000,
		units: 16,
		trend: "stable",
	},
	{
		name: "Piassa Plaza",
		occupancy: 100,
		revenue: 150000,
		units: 8,
		trend: "up",
	},
	{
		name: "CMC Towers",
		occupancy: 85,
		revenue: 300000,
		units: 20,
		trend: "down",
	},
];

export default function OwnerReportsPage() {
	const [dateRange, setDateRange] = useState<any>(null);
	const [reportType, setReportType] = useState("revenue");
	const [propertyFilter, setPropertyFilter] = useState("all");

	const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
	const averageOccupancy = Math.round(
		propertyPerformance.reduce((sum, prop) => sum + prop.occupancy, 0) /
			propertyPerformance.length
	);
	const totalUnits = propertyPerformance.reduce(
		(sum, prop) => sum + prop.units,
		0
	);

	return (
		<DashboardLayout
			userRole="owner"
			userName="Mulugeta Assefa"
			userEmail="mulugeta@akeray.et"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Reports & Analytics
							</h1>
							<p className="text-lg text-gray-600">
								Comprehensive insights into your property portfolio performance
							</p>
							<p className="text-sm text-gray-500">
								Track revenue, occupancy, and financial metrics across all
								properties
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
						<Select value={reportType} onValueChange={setReportType}>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Report Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="revenue">Revenue Report</SelectItem>
								<SelectItem value="occupancy">Occupancy Report</SelectItem>
								<SelectItem value="maintenance">Maintenance Report</SelectItem>
								<SelectItem value="payments">Payment Report</SelectItem>
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
											Total Revenue
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(totalRevenue / 1000000).toFixed(1)}M ETB
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
											Avg Occupancy
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{averageOccupancy}%
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Building className="h-8 w-8 text-blue-600" />
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
											Total Units
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{totalUnits}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Users className="h-8 w-8 text-purple-600" />
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
											Growth Rate
										</p>
										<p className="text-3xl font-bold text-gray-900">+15.2%</p>
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
					{/* Revenue Chart */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1050"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<BarChart3 className="h-5 w-5 text-emerald-600" />
									<span>Monthly Revenue Analysis</span>
								</CardTitle>
								<CardDescription>
									Revenue performance for the last 6 months
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{revenueData.map((item, index) => (
										<div key={index} className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium">
													{item.month}
												</span>
												<div className="flex items-center space-x-2">
													<span className="text-sm text-gray-600">
														{(item.revenue / 1000).toFixed(0)}K ETB
													</span>
													<Badge
														className={
															item.revenue >= item.target
																? "bg-emerald-100 text-emerald-800"
																: "bg-red-100 text-red-800"
														}
													>
														{item.revenue >= item.target ? "Above" : "Below"}{" "}
														Target
													</Badge>
												</div>
											</div>
											<Progress
												value={(item.revenue / item.target) * 100}
												className="h-2"
											/>
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
									<Building className="h-5 w-5 text-blue-600" />
									<span>Property Performance</span>
								</CardTitle>
								<CardDescription>
									Occupancy and revenue by property
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{propertyPerformance.map((property, index) => (
										<div key={index} className="space-y-3">
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium text-sm">{property.name}</p>
													<p className="text-xs text-gray-500">
														{property.units} units
													</p>
												</div>
												<div className="text-right">
													<p className="font-semibold">
														{(property.revenue / 1000).toFixed(0)}K ETB
													</p>
													<div className="flex items-center space-x-2">
														<Badge
															className={
																property.occupancy >= 90
																	? "bg-emerald-100 text-emerald-800"
																	: property.occupancy >= 80
																	? "bg-yellow-100 text-yellow-800"
																	: "bg-red-100 text-red-800"
															}
														>
															{property.occupancy}%
														</Badge>
														{property.trend === "up" && (
															<TrendingUp className="h-4 w-4 text-emerald-500" />
														)}
														{property.trend === "down" && (
															<TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
														)}
													</div>
												</div>
											</div>
											<Progress value={property.occupancy} className="h-2" />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Additional Reports */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1350"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Additional Reports</CardTitle>
							<CardDescription>
								Other available reports and analytics for your properties
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<Button
									variant="outline"
									className="h-20 flex-col space-y-2 bg-transparent border-blue-200 hover:bg-blue-50"
								>
									<Link
										href="/dashboard/owner/reports/payment-report"
										className="flex flex-col items-center space-y-2"
									>
										<FileText className="h-6 w-6 text-blue-600" />
										<span className="text-sm">Payment Report</span>
									</Link>
								</Button>
								<Button
									variant="outline"
									className="h-20 flex-col space-y-2 bg-transparent border-emerald-200 hover:bg-emerald-50"
								>
									<Link
										href="/dashboard/owner/reports/tenant-report"
										className="flex flex-col items-center space-y-2"
									>
										<Users className="h-6 w-6 text-emerald-600" />
										<span className="text-sm">Tenant Report</span>
									</Link>
								</Button>
								<Button
									variant="outline"
									className="h-20 flex-col space-y-2 bg-transparent border-purple-200 hover:bg-purple-50"
								>
									<Link
										href="/dashboard/owner/reports/lease-report"
										className="flex flex-col items-center space-y-2"
									>
										<Calendar className="h-6 w-6 text-purple-600" />
										<span className="text-sm">Lease Report</span>
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	);
}
