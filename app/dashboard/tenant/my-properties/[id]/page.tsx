"use client";

import { useState } from "react";
import {
	Building,
	ArrowLeft,
	Calendar,
	DollarSign,
	Phone,
	Mail,
	FileText,
	Wrench,
	User,
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
import { Separator } from "@/components/ui/separator";
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
import { useParams } from "next/navigation";

// Mock property data
const getMyPropertyData = (id: string) => ({
	id: parseInt(id),
	property: "Sunrise Apartments",
	unit: "3B",
	address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	monthlyRent: 18000,
	deposit: 36000,
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
		company: "Akeray Properties",
		avatar:
			"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	unitDetails: {
		bedrooms: 2,
		bathrooms: 1,
		area: "65 sqm",
		floor: 3,
		furnished: false,
		amenities: [
			"City View",
			"Large Living Room",
			"Storage Space",
			"Modern Kitchen",
			"Private Balcony",
		],
	},
	recentPayments: [
		{
			month: "December 2024",
			amount: 18000,
			status: "paid",
			date: "2024-12-01",
			method: "Bank Transfer",
		},
		{
			month: "November 2024",
			amount: 18000,
			status: "paid",
			date: "2024-11-01",
			method: "Bank Transfer",
		},
		{
			month: "October 2024",
			amount: 18000,
			status: "paid",
			date: "2024-10-01",
			method: "Cash",
		},
	],
	maintenanceRequests: [
		{
			id: "MNT-001",
			title: "Kitchen faucet leak",
			status: "completed",
			date: "2024-12-15",
			priority: "medium",
		},
		{
			id: "MNT-002",
			title: "Bedroom light fixture",
			status: "in_progress",
			date: "2024-12-20",
			priority: "low",
		},
	],
	image:
		"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
});

export default function MyPropertyDetailsPage() {
	const params = useParams();
	const property = getMyPropertyData(params.id as string);

	const getLeaseProgress = () => {
		const start = new Date(property.leaseStart).getTime();
		const end = new Date(property.leaseEnd).getTime();
		const now = new Date().getTime();
		const progress = ((now - start) / (end - start)) * 100;
		return Math.min(Math.max(progress, 0), 100);
	};

	return (
		<DashboardLayout
			userRole="tenant"
			userName="Meron Tadesse"
			userEmail="meron@email.com"
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
							<Link href="/dashboard/tenant/my-properties">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to My Properties
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								{property.property}
							</h1>
							<p className="text-lg text-gray-600 flex items-center">
								<Building className="h-5 w-5 mr-2" />
								Unit {property.unit}
							</p>
							<p className="text-sm text-gray-500 flex items-center mt-1">
								<Calendar className="h-4 w-4 mr-1" />
								Lease: {new Date(
									property.leaseStart
								).toLocaleDateString()} -{" "}
								{new Date(property.leaseEnd).toLocaleDateString()}
							</p>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								asChild
								className="border-emerald-300 hover:bg-emerald-50"
							>
								<Link
									href={`/dashboard/tenant/my-properties/${property.id}/maintenance/new`}
								>
									<Wrench className="h-4 w-4 mr-2" />
									Request Maintenance
								</Link>
							</Button>
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
							>
								<Link
									href={`/dashboard/tenant/my-properties/${property.id}/payments/new`}
								>
									<DollarSign className="h-4 w-4 mr-2" />
									Make Payment
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Property Overview */}
				<div
					className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<Building className="h-6 w-6 text-emerald-600" />
								<span>Property Overview</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Monthly Rent
									</p>
									<p className="text-2xl font-bold text-emerald-600">
										{property.monthlyRent.toLocaleString()} ETB
									</p>
									<p className="text-sm text-gray-600">
										Due: {new Date(property.nextPayment).toLocaleDateString()}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Unit Details
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{property.unitDetails.area}
									</p>
									<p className="text-sm text-gray-600">
										{property.unitDetails.bedrooms} bed •{" "}
										{property.unitDetails.bathrooms} bath
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Lease Status
									</p>
									<Badge className="bg-emerald-100 text-emerald-800 font-semibold">
										{property.status}
									</Badge>
									<p className="text-sm text-gray-600">
										{property.daysRemaining} days remaining
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Payment Status
									</p>
									<Badge className="bg-emerald-100 text-emerald-800 font-semibold">
										{property.paymentStatus}
									</Badge>
									<p className="text-sm text-gray-600">
										Last: {new Date(property.lastPayment).toLocaleDateString()}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Lease Progress & Details */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-gray-900">
									Lease Information
								</CardTitle>
								<CardDescription>
									Your current lease details and progress
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Lease Progress */}
								<div className="space-y-3">
									<div className="flex justify-between items-center">
										<span className="text-sm font-medium text-gray-700">
											Lease Progress
										</span>
										<span className="text-sm text-gray-500">
											{property.daysRemaining} days remaining
										</span>
									</div>
									<Progress value={getLeaseProgress()} className="h-3" />
									<div className="flex justify-between text-xs text-gray-500">
										<span>
											{new Date(property.leaseStart).toLocaleDateString()}
										</span>
										<span>
											{new Date(property.leaseEnd).toLocaleDateString()}
										</span>
									</div>
								</div>

								<Separator />

								{/* Unit Details */}
								<div className="space-y-4">
									<h4 className="font-semibold text-gray-900">Unit Details</h4>
									<div className="grid grid-cols-2 gap-4">
										<div className="text-center p-3 rounded-xl bg-blue-50 border border-blue-200">
											<p className="text-lg font-bold text-blue-600">
												{property.unitDetails.bedrooms}
											</p>
											<p className="text-sm text-blue-700">Bedrooms</p>
										</div>
										<div className="text-center p-3 rounded-xl bg-purple-50 border border-purple-200">
											<p className="text-lg font-bold text-purple-600">
												{property.unitDetails.bathrooms}
											</p>
											<p className="text-sm text-purple-700">Bathrooms</p>
										</div>
										<div className="text-center p-3 rounded-xl bg-emerald-50 border border-emerald-200">
											<p className="text-lg font-bold text-emerald-600">
												{property.unitDetails.area}
											</p>
											<p className="text-sm text-emerald-700">Total Area</p>
										</div>
										<div className="text-center p-3 rounded-xl bg-orange-50 border border-orange-200">
											<p className="text-lg font-bold text-orange-600">
												{property.unitDetails.floor}
											</p>
											<p className="text-sm text-orange-700">Floor</p>
										</div>
									</div>
								</div>

								<Separator />

								{/* Unit Features */}
								<div className="space-y-3">
									<h4 className="font-semibold text-gray-900">Unit Features</h4>
									<div className="grid grid-cols-1 gap-2">
										{property.unitDetails.amenities.map((amenity, index) => (
											<div
												key={index}
												className="flex items-center space-x-2 p-2 rounded-lg bg-emerald-50 border border-emerald-100"
											>
												<div className="w-2 h-2 bg-emerald-500 rounded-full" />
												<span className="text-sm text-emerald-700 font-medium">
													{amenity}
												</span>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Landlord & Quick Actions */}
					<div className="space-y-8">
						{/* Landlord Information */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-800"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Property Owner
									</CardTitle>
									<CardDescription>
										Contact information for your landlord
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
											<Avatar className="h-16 w-16 ring-4 ring-purple-200">
												<AvatarImage src={property.landlord.avatar} />
												<AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-lg">
													{property.landlord.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<p className="font-semibold text-lg text-gray-900">
													{property.landlord.name}
												</p>
												<p className="text-sm text-gray-600">Property Owner</p>
												<p className="text-sm text-purple-600 font-medium">
													{property.landlord.company}
												</p>
											</div>
										</div>

										<div className="space-y-3">
											<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
												<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
													<Phone className="h-5 w-5 text-emerald-600" />
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{property.landlord.phone}
													</p>
													<p className="text-xs text-gray-500">Phone</p>
												</div>
											</div>
											<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
												<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
													<Mail className="h-5 w-5 text-blue-600" />
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{property.landlord.email}
													</p>
													<p className="text-xs text-gray-500">Email</p>
												</div>
											</div>
										</div>

										<Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
											Contact Landlord
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Quick Actions */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1000"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Quick Actions
									</CardTitle>
									<CardDescription>Manage your rental property</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 gap-4">
										<Button
											variant="outline"
											className="h-20 flex-col space-y-2 bg-transparent border-emerald-200 hover:bg-emerald-50"
											asChild
										>
											<Link
												href={`/dashboard/tenant/my-properties/${property.id}/payments`}
											>
												<DollarSign className="h-6 w-6 text-emerald-600" />
												<span className="text-sm">View Payments</span>
											</Link>
										</Button>
										<Button
											variant="outline"
											className="h-20 flex-col space-y-2 bg-transparent border-orange-200 hover:bg-orange-50"
											asChild
										>
											<Link
												href={`/dashboard/tenant/my-properties/${property.id}/maintenance`}
											>
												<Wrench className="h-6 w-6 text-orange-600" />
												<span className="text-sm">Maintenance</span>
											</Link>
										</Button>
										<Button
											variant="outline"
											className="h-20 flex-col space-y-2 bg-transparent border-blue-200 hover:bg-blue-50"
											asChild
										>
											<Link
												href={`/dashboard/tenant/my-properties/${property.id}/lease`}
											>
												<FileText className="h-6 w-6 text-blue-600" />
												<span className="text-sm">Lease Details</span>
											</Link>
										</Button>
										<Button
											variant="outline"
											className="h-20 flex-col space-y-2 bg-transparent border-purple-200 hover:bg-purple-50"
										>
											<User className="h-6 w-6 text-purple-600" />
											<span className="text-sm">Lease Renewal</span>
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Recent Payments */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-gray-900">
									Recent Payments
								</CardTitle>
								<CardDescription>Your latest rent payments</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Month</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Date</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{property.recentPayments.map((payment, index) => (
											<TableRow key={index}>
												<TableCell className="font-medium">
													{payment.month}
												</TableCell>
												<TableCell>
													{payment.amount.toLocaleString()} ETB
												</TableCell>
												<TableCell>
													<Badge className="bg-emerald-100 text-emerald-800">
														{payment.status}
													</Badge>
												</TableCell>
												<TableCell>
													{new Date(payment.date).toLocaleDateString()}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>

					{/* Maintenance Requests */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1400"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-gray-900">
									Maintenance Requests
								</CardTitle>
								<CardDescription>
									Recent maintenance for this property
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{property.maintenanceRequests.map((request) => (
										<div
											key={request.id}
											className="flex items-center justify-between p-4 border rounded-lg"
										>
											<div>
												<h4 className="font-semibold">{request.title}</h4>
												<p className="text-sm text-gray-500">
													{new Date(request.date).toLocaleDateString()}
												</p>
											</div>
											<div className="flex space-x-2">
												<Badge
													className={
														request.priority === "high"
															? "bg-red-100 text-red-800"
															: request.priority === "medium"
															? "bg-yellow-100 text-yellow-800"
															: "bg-green-100 text-green-800"
													}
												>
													{request.priority}
												</Badge>
												<Badge
													className={
														request.status === "completed"
															? "bg-green-100 text-green-800"
															: request.status === "in_progress"
															? "bg-yellow-100 text-yellow-800"
															: "bg-red-100 text-red-800"
													}
												>
													{request.status.replace("_", " ")}
												</Badge>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
