"use client";

import {
	Home,
	DollarSign,
	Calendar,
	Wrench,
	Phone,
	Mail,
	Clock,
	CheckCircle,
	Plus,
	FileText,
	CreditCard,
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const tenantInfo = {
	name: "Meron Tadesse",
	unit: "Apartment 3B",
	property: "Sunrise Apartments",
	leaseStart: "January 1, 2024",
	leaseEnd: "December 31, 2024",
	monthlyRent: "18,000 ETB",
	deposit: "36,000 ETB",
	status: "Active",
};

const paymentHistory = [
	{
		id: 1,
		month: "December 2024",
		amount: "18,000 ETB",
		status: "paid",
		date: "Dec 1, 2024",
		method: "Bank Transfer",
	},
	{
		id: 2,
		month: "November 2024",
		amount: "18,000 ETB",
		status: "paid",
		date: "Nov 1, 2024",
		method: "Bank Transfer",
	},
	{
		id: 3,
		month: "October 2024",
		amount: "18,000 ETB",
		status: "paid",
		date: "Oct 1, 2024",
		method: "Cash",
	},
	{
		id: 4,
		month: "January 2025",
		amount: "18,000 ETB",
		status: "due",
		date: "Due Jan 1, 2025",
		method: "Pending",
	},
];

const maintenanceRequests = [
	{
		id: 1,
		title: "Kitchen faucet leak",
		description: "Water dripping from kitchen sink faucet",
		status: "completed",
		date: "Dec 15, 2024",
		priority: "Medium",
	},
	{
		id: 2,
		title: "Bedroom light fixture",
		description: "Light bulb needs replacement in master bedroom",
		status: "in-progress",
		date: "Dec 20, 2024",
		priority: "Low",
	},
];

const propertyAmenities = [
	"24/7 Security",
	"Parking Space",
	"Elevator Access",
	"Backup Generator",
	"Water Tank",
	"Internet Ready",
	"Balcony",
	"Modern Kitchen",
];

const landlordInfo = {
	name: "Mulugeta Assefa",
	phone: "+251-911-123456",
	email: "mulugeta@akeray.et",
	company: "Akeray Properties",
};

export default function TenantDashboard() {
	return (
		<DashboardLayout
			userRole="tenant"
			userName="Meron Tadesse"
			userEmail="meron@email.com"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className=" animate-in fade-in duration-1000">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Tenant Dashboard
							</h1>
							<p className="text-lg text-gray-600">
								Welcome back, Meron! Here's your rental information.
							</p>
							<p className="text-sm text-gray-500">
								Manage your lease, payments, and maintenance requests.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-3">
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
							>
								<Link href="/dashboard/tenant/payments/new">
									<Plus className="h-4 w-4 mr-2" />
									Make Payment
								</Link>
							</Button>
							<Button
								variant="outline"
								asChild
								className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
							>
								<Link href="/dashboard/tenant/maintenance/new">
									<Wrench className="h-4 w-4 mr-2" />
									Request Maintenance
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Tenant Info Card */}
				<div
					className=" animate-in fade-in slide-in-from-top-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<Home className="h-6 w-6 text-emerald-600" />
								<span>Your Rental Information</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">Property</p>
									<p className="text-lg font-semibold text-gray-900">
										{tenantInfo.property}
									</p>
									<p className="text-sm text-gray-600">{tenantInfo.unit}</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Lease Period
									</p>
									<p className="text-sm font-semibold text-gray-900">
										{tenantInfo.leaseStart}
									</p>
									<p className="text-sm text-gray-600">
										to {tenantInfo.leaseEnd}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Monthly Rent
									</p>
									<p className="text-lg font-bold text-emerald-600">
										{tenantInfo.monthlyRent}
									</p>
									<p className="text-sm text-gray-600">
										Deposit: {tenantInfo.deposit}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">Status</p>
									<Badge className="bg-emerald-100 text-emerald-800 font-semibold">
										{tenantInfo.status}
									</Badge>
									<p className="text-sm text-gray-600">Lease Active</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Payment History */}
					<div
						className=" animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="flex items-center space-x-3 text-xl">
											<CreditCard className="h-6 w-6 text-purple-600" />
											<span>Payment History</span>
										</CardTitle>
										<CardDescription className="mt-2">
											Your recent rent payments
										</CardDescription>
									</div>
									<Button
										variant="outline"
										size="sm"
										asChild
										className="hover:bg-purple-50 bg-transparent"
									>
										<Link href="/dashboard/tenant/payments">View All</Link>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{paymentHistory.map((payment, index) => (
										<div
											key={payment.id}
											className="flex items-center justify-between p-4 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 border border-gray-100"
										>
											<div className="flex items-center space-x-4">
												<div className="flex-shrink-0">
													{payment.status === "paid" ? (
														<CheckCircle className="h-6 w-6 text-emerald-500" />
													) : (
														<Clock className="h-6 w-6 text-orange-500" />
													)}
												</div>
												<div>
													<p className="text-sm font-semibold text-gray-900">
														{payment.month}
													</p>
													<p className="text-xs text-gray-500">
														{payment.date}
													</p>
												</div>
											</div>
											<div className="text-right">
												<p className="text-sm font-bold text-gray-900">
													{payment.amount}
												</p>
												<Badge
													className={
														payment.status === "paid"
															? "bg-emerald-100 text-emerald-800"
															: "bg-orange-100 text-orange-800"
													}
												>
													{payment.status === "paid" ? "Paid" : "Due"}
												</Badge>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Maintenance Requests */}
					<div
						className=" animate-in fade-in slide-in-from-right-4 duration-700 delay-800"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="flex items-center space-x-3 text-xl">
											<Wrench className="h-6 w-6 text-orange-600" />
											<span>Maintenance Requests</span>
										</CardTitle>
										<CardDescription className="mt-2">
											Your recent maintenance requests
										</CardDescription>
									</div>
									<Button
										variant="outline"
										size="sm"
										asChild
										className="hover:bg-orange-50 bg-transparent"
									>
										<Link href="/dashboard/tenant/maintenance">View All</Link>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{maintenanceRequests.map((request, index) => (
										<div
											key={request.id}
											className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 transition-all duration-300 border border-gray-100"
										>
											<div className="flex-shrink-0 mt-1">
												{request.status === "completed" ? (
													<CheckCircle className="h-6 w-6 text-emerald-500" />
												) : (
													<Clock className="h-6 w-6 text-orange-500" />
												)}
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-semibold text-gray-900 mb-1">
													{request.title}
												</p>
												<p className="text-xs text-gray-600 mb-2">
													{request.description}
												</p>
												<div className="flex items-center justify-between">
													<p className="text-xs text-gray-500">
														{request.date}
													</p>
													<div className="flex items-center space-x-2">
														<Badge
															className={
																request.priority === "High"
																	? "bg-red-100 text-red-800"
																	: request.priority === "Medium"
																	? "bg-yellow-100 text-yellow-800"
																	: "bg-green-100 text-green-800"
															}
														>
															{request.priority}
														</Badge>
														<Badge
															className={
																request.status === "completed"
																	? "bg-emerald-100 text-emerald-800"
																	: "bg-orange-100 text-orange-800"
															}
														>
															{request.status === "completed"
																? "Completed"
																: "In Progress"}
														</Badge>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Property Amenities */}
					<div
						className=" animate-in fade-in slide-in-from-left-4 duration-700 delay-1000"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<Home className="h-6 w-6 text-blue-600" />
									<span>Property Amenities</span>
								</CardTitle>
								<CardDescription>
									Available amenities in your building
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-3">
									{propertyAmenities.map((amenity, index) => (
										<div
											key={index}
											className="flex items-center space-x-2 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100"
										>
											<CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
											<span className="text-sm font-medium text-gray-700">
												{amenity}
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Landlord Contact */}
					<div
						className=" animate-in fade-in slide-in-from-right-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<Phone className="h-6 w-6 text-emerald-600" />
									<span>Landlord Contact</span>
								</CardTitle>
								<CardDescription>
									Get in touch with your property manager
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100">
										<div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
											<span className="text-white font-bold text-lg">
												{landlordInfo.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</span>
										</div>
										<div className="flex-1">
											<p className="font-semibold text-gray-900">
												{landlordInfo.name}
											</p>
											<p className="text-sm text-gray-600">
												{landlordInfo.company}
											</p>
										</div>
									</div>
									<div className="space-y-3">
										<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
											<Phone className="h-5 w-5 text-emerald-600" />
											<div>
												<p className="text-sm font-medium text-gray-900">
													{landlordInfo.phone}
												</p>
												<p className="text-xs text-gray-500">Phone</p>
											</div>
										</div>
										<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
											<Mail className="h-5 w-5 text-blue-600" />
											<div>
												<p className="text-sm font-medium text-gray-900">
													{landlordInfo.email}
												</p>
												<p className="text-xs text-gray-500">Email</p>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Quick Actions */}
				<div
					className=" animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1400"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="text-xl">Quick Actions</CardTitle>
							<CardDescription>Manage your tenancy efficiently</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{[
									{
										href: "/dashboard/tenant/payments/new",
										icon: DollarSign,
										label: "Make Payment",
										color: "text-emerald-600",
										bg: "bg-emerald-50",
										border: "border-emerald-200",
									},
									{
										href: "/dashboard/tenant/maintenance/new",
										icon: Wrench,
										label: "Request Maintenance",
										color: "text-orange-600",
										bg: "bg-orange-50",
										border: "border-orange-200",
									},
									{
										href: "/dashboard/tenant/lease",
										icon: FileText,
										label: "View Lease",
										color: "text-blue-600",
										bg: "bg-blue-50",
										border: "border-blue-200",
									},
									{
										href: "/dashboard/tenant/notifications",
										icon: Calendar,
										label: "Notifications",
										color: "text-purple-600",
										bg: "bg-purple-50",
										border: "border-purple-200",
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
