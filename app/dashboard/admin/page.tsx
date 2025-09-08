"use client";

import {
	Building,
	Users,
	CreditCard,
	Wrench,
	TrendingUp,
	AlertCircle,
	CheckCircle,
	Clock,
	DollarSign,
	ArrowUpRight,
	ArrowDownRight,
	Plus,
	MapPin,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const statsCards = [
	{
		title: "Total Properties",
		value: "24",
		change: "+2 this month",
		changeType: "positive",
		icon: Building,
		color: "text-emerald-600",
		bgColor: "bg-emerald-50",
		borderColor: "border-emerald-200",
		href: "/dashboard/admin/properties",
	},
	{
		title: "Active Tenants",
		value: "156",
		change: "+12 this month",
		changeType: "positive",
		icon: Users,
		color: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
		href: "/dashboard/admin/users",
	},
	{
		title: "Monthly Revenue",
		value: "2,450,000 ETB",
		change: "+8.2% from last month",
		changeType: "positive",
		icon: DollarSign,
		color: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
		href: "/dashboard/admin/payments",
	},
	{
		title: "Pending Maintenance",
		value: "8",
		change: "3 urgent",
		changeType: "negative",
		icon: Wrench,
		color: "text-orange-600",
		bgColor: "bg-orange-50",
		borderColor: "border-orange-200",
		href: "/dashboard/admin/maintenance",
	},
];

const recentActivities = [
	{
		id: 1,
		type: "payment",
		message: "Payment received from Abebe Kebede - Unit 4A",
		time: "2 hours ago",
		status: "success",
		amount: "15,000 ETB",
	},
	{
		id: 2,
		type: "maintenance",
		message: "New maintenance request - Plumbing issue in Unit 2B",
		time: "4 hours ago",
		status: "pending",
		priority: "High",
	},
	{
		id: 3,
		type: "lease",
		message: "Lease agreement signed for Unit 3C",
		time: "1 day ago",
		status: "success",
		tenant: "Sara Lemma",
	},
	{
		id: 4,
		type: "alert",
		message: "Lease expiring soon - Unit 1A (30 days)",
		time: "2 days ago",
		status: "warning",
		action: "Renewal Required",
	},
];

const occupancyData = [
	{
		property: "Sunrise Apartments",
		occupied: 18,
		total: 20,
		rate: 90,
		trend: "up",
	},
	{
		property: "Green Valley Complex",
		occupied: 24,
		total: 30,
		rate: 80,
		trend: "stable",
	},
	{
		property: "City Center Plaza",
		occupied: 15,
		total: 15,
		rate: 100,
		trend: "up",
	},
	{
		property: "Riverside Towers",
		occupied: 22,
		total: 25,
		rate: 88,
		trend: "down",
	},
];

export default function AdminDashboard() {
	return (
		<DashboardLayout
			userRole="admin"
			userName="Admin Aseffa Bekele"
			userEmail="aseffa@akeray.et"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Admin Dashboard
							</h1>
							<p className="text-lg text-gray-600">
								Welcome back! Here's what's happening with your properties.
							</p>
							<p className="text-sm text-gray-500">
								Manage your property portfolio efficiently with real-time
								insights.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-3">
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
							>
								<Link href="/dashboard/admin/properties/new">
									<Plus className="h-4 w-4 mr-2" />
									Add Property
								</Link>
							</Button>
							<Button
								variant="outline"
								asChild
								className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
							>
								<Link href="/dashboard/admin/users/new">
									<Plus className="h-4 w-4 mr-2" />
									Add User
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
					{statsCards.map((stat, index) => (
						<div
							key={index}
							className="animate-in fade-in slide-in-from-bottom-4 duration-700"
							style={{
								animationDelay: `${index * 150 + 300}ms`,
								animationFillMode: "forwards",
							}}
						>
							<Card
								className={`hover:shadow-xl transition-all duration-500 border-l-4 ${stat.borderColor} group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm`}
							>
								<Link href={stat.href}>
									<CardContent className="p-6">
										<div className="flex items-center justify-between">
											<div className="space-y-3">
												<p className="text-sm font-semibold text-gray-600">
													{stat.title}
												</p>
												<p className="text-3xl font-bold text-gray-700">
													{stat.value}
												</p>
												<div className="flex items-center space-x-2">
													{stat.changeType === "positive" ? (
														<ArrowUpRight className="h-4 w-4 text-emerald-500" />
													) : (
														<ArrowDownRight className="h-4 w-4 text-red-500" />
													)}
													<p
														className={`text-sm font-medium ${
															stat.changeType === "positive"
																? "text-emerald-600"
																: "text-red-600"
														}`}
													>
														{stat.change}
													</p>
												</div>
											</div>
											<div
												className={`p-4 rounded-3xl ${stat.bgColor} group-hover:scale-125 transition-transform duration-500 shadow-lg`}
											>
												<stat.icon className={`h-8 w-8 ${stat.color}`} />
											</div>
										</div>
									</CardContent>
								</Link>
							</Card>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Recent Activities */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1000"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="flex items-center space-x-3 text-xl">
											<Clock className="h-6 w-6 text-emerald-600" />
											<span>Recent Activities</span>
										</CardTitle>
										<CardDescription className="mt-2">
											Latest updates from your property management system
										</CardDescription>
									</div>
									<Button
										variant="outline"
										size="sm"
										asChild
										className="hover:bg-emerald-50 bg-transparent"
									>
										<Link href="/dashboard/admin/notifications">View All</Link>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{recentActivities.map((activity, index) => (
										<div
											key={activity.id}
											className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-300 border border-gray-100 group"
											style={{ animationDelay: `${index * 100 + 1200}ms` }}
										>
											<div className="flex-shrink-0 mt-1">
												{activity.status === "success" && (
													<CheckCircle className="h-6 w-6 text-emerald-500" />
												)}
												{activity.status === "pending" && (
													<Clock className="h-6 w-6 text-orange-500" />
												)}
												{activity.status === "warning" && (
													<AlertCircle className="h-6 w-6 text-red-500" />
												)}
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 mb-2 leading-relaxed">
													{activity.message}
												</p>
												<div className="flex items-center justify-between">
													<p className="text-xs text-gray-500">
														{activity.time}
													</p>
													{activity.amount && (
														<Badge className="bg-emerald-100 text-emerald-800 font-semibold">
															{activity.amount}
														</Badge>
													)}
													{activity.priority && (
														<Badge className="bg-red-100 text-red-800 font-semibold">
															{activity.priority}
														</Badge>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Occupancy Overview */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="flex items-center space-x-3 text-xl">
											<TrendingUp className="h-6 w-6 text-blue-600" />
											<span>Occupancy Overview</span>
										</CardTitle>
										<CardDescription className="mt-2">
											Occupancy rates across all properties
										</CardDescription>
									</div>
									<Button
										variant="outline"
										size="sm"
										asChild
										className="hover:bg-blue-50 bg-transparent"
									>
										<Link href="/dashboard/admin/reports">View Reports</Link>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{occupancyData.map((property, index) => (
										<div key={index} className="space-y-3">
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-3">
													<MapPin className="h-4 w-4 text-gray-400" />
													<span className="text-sm font-semibold text-gray-900">
														{property.property}
													</span>
													{property.trend === "up" && (
														<ArrowUpRight className="h-4 w-4 text-emerald-500" />
													)}
													{property.trend === "down" && (
														<ArrowDownRight className="h-4 w-4 text-red-500" />
													)}
												</div>
												<div className="flex items-center space-x-3">
													<span className="text-sm text-gray-600 font-medium">
														{property.occupied}/{property.total}
													</span>
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
											<Progress
												value={property.rate}
												className="h-3 bg-gray-200"
												style={{
													animationDelay: `${index * 200 + 1400}ms`,
												}}
											/>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Quick Actions */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1600"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="text-xl">Quick Actions</CardTitle>
							<CardDescription>
								Frequently used actions for efficient property management
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{[
									{
										href: "/dashboard/admin/users/new",
										icon: Users,
										label: "Add Tenant",
										color: "text-blue-600",
										bg: "bg-blue-50",
										border: "border-blue-200",
									},
									{
										href: "/dashboard/admin/properties/new",
										icon: Building,
										label: "Add Property",
										color: "text-emerald-600",
										bg: "bg-emerald-50",
										border: "border-emerald-200",
									},
									{
										href: "/dashboard/admin/payments/new",
										icon: CreditCard,
										label: "Record Payment",
										color: "text-purple-600",
										bg: "bg-purple-50",
										border: "border-purple-200",
									},
									{
										href: "/dashboard/admin/maintenance",
										icon: Wrench,
										label: "Maintenance",
										color: "text-orange-600",
										bg: "bg-orange-50",
										border: "border-orange-200",
									},
								].map((action, index) => (
									<Button
										key={index}
										variant="outline"
										asChild
										className={`h-28 flex-col space-y-3 ${action.border} hover:shadow-lg transition-all duration-500 group bg-transparent hover:scale-105`}
									>
										<Link href={action.href}>
											<div
												className={`p-3 rounded-2xl ${action.bg} group-hover:scale-125 transition-transform duration-500 shadow-md`}
											>
												<action.icon className={`h-6 w-6 ${action.color}`} />
											</div>
											<span className="text-sm font-semibold text-center leading-tight">
												{action.label}
											</span>
										</Link>
									</Button>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	);
}
