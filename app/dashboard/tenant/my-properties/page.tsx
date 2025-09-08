"use client";

import { useState } from "react";
import {
	Building,
	Search,
	Filter,
	Eye,
	Calendar,
	DollarSign,
	Wrench,
	FileText,
	Phone,
	Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const myProperties = [
	{
		id: 1,
		property: "Sunrise Apartments",
		unit: "3B",
		address: "Bole Road, Addis Ababa",
		monthlyRent: 18000,
		leaseStart: "2024-01-01",
		leaseEnd: "2024-12-31",
		status: "active",
		daysRemaining: 30,
		paymentStatus: "current",
		lastPayment: "2024-12-01",
		nextPayment: "2025-01-01",
		landlord: {
			name: "Mulugeta Assefa",
			phone: "+251911123456",
			email: "mulugeta@akeray.et",
			avatar:
				"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
		},
		maintenanceRequests: 2,
		image:
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	{
		id: 2,
		property: "Green Valley Complex",
		unit: "2A",
		address: "Kazanchis, Addis Ababa",
		monthlyRent: 22000,
		leaseStart: "2023-06-01",
		leaseEnd: "2025-05-31",
		status: "active",
		daysRemaining: 150,
		paymentStatus: "current",
		lastPayment: "2024-12-01",
		nextPayment: "2025-01-01",
		landlord: {
			name: "Sarah Johnson",
			phone: "+251922345678",
			email: "sarah@email.com",
			avatar:
				"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
		},
		maintenanceRequests: 0,
		image:
			"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
];

export default function MyPropertiesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredProperties = myProperties.filter((property) => {
		const matchesSearch =
			property.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.unit.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			filterStatus === "all" || property.status === filterStatus;
		return matchesSearch && matchesStatus;
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

	const getPaymentStatusColor = (status: string) => {
		switch (status) {
			case "current":
				return "bg-emerald-100 text-emerald-800";
			case "due":
				return "bg-yellow-100 text-yellow-800";
			case "overdue":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getLeaseProgress = (startDate: string, endDate: string) => {
		const start = new Date(startDate).getTime();
		const end = new Date(endDate).getTime();
		const now = new Date().getTime();
		const progress = ((now - start) / (end - start)) * 100;
		return Math.min(Math.max(progress, 0), 100);
	};

	const totalRent = filteredProperties.reduce(
		(sum, p) => sum + p.monthlyRent,
		0
	);
	const activeLeases = filteredProperties.filter(
		(p) => p.status === "active"
	).length;

	return (
		<DashboardLayout
			userRole="tenant"
			userName="Meron Tadesse"
			userEmail="meron@email.com"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								My Rented Properties
							</h1>
							<p className="text-lg text-gray-600">
								Manage all your current rental properties
							</p>
							<p className="text-sm text-gray-500">
								View lease details, payments, and maintenance for each property
							</p>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
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
											{activeLeases}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Building className="h-8 w-8 text-emerald-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-blue-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Total Monthly Rent
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(totalRent / 1000).toFixed(0)}K ETB
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<DollarSign className="h-8 w-8 text-blue-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-purple-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Maintenance Requests
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{myProperties.reduce(
												(sum, p) => sum + p.maintenanceRequests,
												0
											)}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Wrench className="h-8 w-8 text-purple-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Search and Filter */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750"
					style={{ animationFillMode: "forwards" }}
				>
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search by property name, unit, or address..."
								className="pl-10"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>
				</div>

				{/* Properties Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{filteredProperties.map((property, index) => (
						<div
							key={property.id}
							className="animate-in fade-in slide-in-from-bottom-4 duration-700"
							style={{
								animationDelay: `${index * 200 + 900}ms`,
								animationFillMode: "forwards",
							}}
						>
							<Card className="hover:shadow-xl transition-all duration-500 group cursor-pointer transform hover:scale-105 bg-white/90 backdrop-blur-sm">
								<div className="relative">
									<img
										src={property.image}
										alt={property.property}
										className="w-full h-48 object-cover rounded-t-lg"
									/>
									<Badge
										className={`absolute top-3 left-3 ${getStatusColor(
											property.status
										)}`}
									>
										{property.status}
									</Badge>
									<Badge
										className={`absolute top-3 right-3 ${getPaymentStatusColor(
											property.paymentStatus
										)}`}
									>
										{property.paymentStatus}
									</Badge>
								</div>

								<CardHeader className="pb-3">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<CardTitle className="text-lg font-semibold group-hover:text-emerald-600 transition-colors">
												{property.property}
											</CardTitle>
											<CardDescription className="flex items-center mt-1">
												<Building className="h-4 w-4 mr-1" />
												Unit {property.unit} • {property.address}
											</CardDescription>
										</div>
									</div>
								</CardHeader>

								<CardContent className="space-y-4">
									{/* Lease Progress */}
									<div className="space-y-2">
										<div className="flex justify-between items-center">
											<span className="text-sm font-medium text-gray-700">
												Lease Progress
											</span>
											<span className="text-sm text-gray-500">
												{property.daysRemaining} days remaining
											</span>
										</div>
										<Progress
											value={getLeaseProgress(
												property.leaseStart,
												property.leaseEnd
											)}
											className="h-2"
										/>
										<div className="flex justify-between text-xs text-gray-500">
											<span>
												{new Date(property.leaseStart).toLocaleDateString()}
											</span>
											<span>
												{new Date(property.leaseEnd).toLocaleDateString()}
											</span>
										</div>
									</div>

									{/* Financial Info */}
									<div className="grid grid-cols-2 gap-4 text-center">
										<div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
											<DollarSign className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
											<p className="text-lg font-bold text-emerald-600">
												{property.monthlyRent.toLocaleString()}
											</p>
											<p className="text-xs text-emerald-700">Monthly Rent</p>
										</div>
										<div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
											<Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
											<p className="text-sm font-medium text-blue-600">
												{new Date(property.nextPayment).toLocaleDateString()}
											</p>
											<p className="text-xs text-blue-700">Next Payment</p>
										</div>
									</div>

									{/* Landlord Info */}
									<div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
										<Avatar className="h-10 w-10">
											<AvatarImage src={property.landlord.avatar} />
											<AvatarFallback>
												{property.landlord.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1">
											<p className="font-medium text-sm text-gray-900">
												{property.landlord.name}
											</p>
											<p className="text-xs text-gray-500">Property Owner</p>
										</div>
										<div className="flex space-x-1">
											<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
												<Phone className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
												<Mail className="h-4 w-4" />
											</Button>
										</div>
									</div>

									{/* Quick Actions */}
									<div className="grid grid-cols-3 gap-2">
										<Button
											variant="outline"
											size="sm"
											className="flex-col h-16 bg-transparent"
											asChild
										>
											<Link
												href={`/dashboard/tenant/my-properties/${property.id}/payments`}
											>
												<DollarSign className="h-4 w-4 mb-1" />
												<span className="text-xs">Payments</span>
											</Link>
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="flex-col h-16 bg-transparent"
											asChild
										>
											<Link
												href={`/dashboard/tenant/my-properties/${property.id}/maintenance`}
											>
												<Wrench className="h-4 w-4 mb-1" />
												<span className="text-xs">Maintenance</span>
												{property.maintenanceRequests > 0 && (
													<Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
														{property.maintenanceRequests}
													</Badge>
												)}
											</Link>
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="flex-col h-16 bg-transparent"
											asChild
										>
											<Link
												href={`/dashboard/tenant/my-properties/${property.id}/lease`}
											>
												<FileText className="h-4 w-4 mb-1" />
												<span className="text-xs">Lease</span>
											</Link>
										</Button>
									</div>

									{/* View Details Button */}
									<Button
										variant="outline"
										className="w-full bg-transparent border-emerald-300 hover:bg-emerald-50"
										asChild
									>
										<Link
											href={`/dashboard/tenant/my-properties/${property.id}`}
										>
											<Eye className="h-4 w-4 mr-2" />
											View Full Details
										</Link>
									</Button>
								</CardContent>
							</Card>
						</div>
					))}
				</div>

				{/* Empty State */}
				{filteredProperties.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No rented properties found
							</h3>
							<p className="text-gray-600 mb-4">
								{searchTerm || filterStatus !== "all"
									? "Try adjusting your search or filter criteria."
									: "You don't have any active rental properties yet."}
							</p>
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
							>
								<Link href="/dashboard/tenant/properties">
									Browse Available Properties
								</Link>
							</Button>
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
}
