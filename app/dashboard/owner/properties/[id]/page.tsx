"use client";

import { useState } from "react";
import {
	Building,
	MapPin,
	DollarSign,
	Users,
	Edit,
	Trash2,
	Eye,
	Star,
	Calendar,
	TrendingUp,
	ArrowLeft,
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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock property data - in real app, this would come from API
const propertyData = {
	id: 1,
	name: "Bole Apartments",
	description:
		"Modern apartment complex located in the heart of Bole, featuring contemporary amenities and excellent connectivity to major business districts. Perfect for professionals and families seeking comfort and convenience.",
	type: "Apartment",
	address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	city: "Addis Ababa",
	area: "Bole",
	googleMapLink: "https://maps.google.com/...",
	totalUnits: 12,
	occupiedUnits: 11,
	availableUnits: 1,
	monthlyRevenue: 180000,
	pricePerUnit: 15000,
	bedrooms: 2,
	bathrooms: 2,
	squareMeters: 85,
	status: "active",
	featured: true,
	rating: 4.8,
	reviews: 24,
	images: [
		"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
		"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
		"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
		"https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
	],
	amenities: [
		"24/7 Security",
		"Parking Space",
		"WiFi Ready",
		"Backup Generator",
		"Water Tank",
		"Elevator",
		"Modern Kitchen",
	],
	createdDate: "2023-08-15",
	lastUpdated: "2024-01-10",
};

const tenants = [
	{
		id: 1,
		name: "Tigist Haile",
		unit: "3B",
		phone: "+251911234567",
		email: "tigist@email.com",
		leaseStart: "2024-01-01",
		leaseEnd: "2024-12-31",
		monthlyRent: 15000,
		status: "active",
		avatar:
			"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: 2,
		name: "Dawit Mekonnen",
		unit: "2A",
		phone: "+251922345678",
		email: "dawit@email.com",
		leaseStart: "2024-02-01",
		leaseEnd: "2025-01-31",
		monthlyRent: 15000,
		status: "active",
		avatar:
			"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
];

const recentActivities = [
	{
		id: 1,
		type: "payment",
		message: "Rent payment received from Tigist Haile - Unit 3B",
		amount: "15,000 ETB",
		date: "2024-01-01",
		status: "success",
	},
	{
		id: 2,
		type: "maintenance",
		message: "Maintenance request completed - Plumbing repair Unit 2A",
		date: "2023-12-28",
		status: "success",
	},
	{
		id: 3,
		type: "inquiry",
		message: "New tenant inquiry for Unit 1A",
		date: "2023-12-25",
		status: "pending",
	},
];

export default function PropertyDetailsPage() {
	const params = useParams();
	const [selectedImage, setSelectedImage] = useState(0);

	const occupancyRate = Math.round(
		(propertyData.occupiedUnits / propertyData.totalUnits) * 100
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
					<div className="flex items-center space-x-4 mb-6">
						<Button
							variant="outline"
							asChild
							className="border-emerald-300 hover:bg-emerald-50"
						>
							<Link href="/dashboard/owner/properties">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Properties
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								{propertyData.name}
							</h1>
							<p className="text-lg text-gray-600 flex items-center">
								<MapPin className="h-5 w-5 mr-2" />
								{propertyData.address}
							</p>
							<div className="flex items-center space-x-4 mt-2">
								<Badge className="bg-emerald-100 text-emerald-800">
									{propertyData.type}
								</Badge>
								<Badge className="bg-blue-100 text-blue-800">
									{propertyData.status}
								</Badge>
								{propertyData.featured && (
									<Badge className="bg-yellow-100 text-yellow-800">
										⭐ Featured
									</Badge>
								)}
							</div>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								asChild
								className="border-emerald-300 hover:bg-emerald-50"
							>
								<Link href={`/dashboard/owner/properties/${params.id}/edit`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Property
								</Link>
							</Button>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant="outline"
										className="border-red-300 hover:bg-red-50 text-red-600"
									>
										<Trash2 className="h-4 w-4 mr-2" />
										Delete
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Delete Property</AlertDialogTitle>
										<AlertDialogDescription>
											Are you sure you want to delete "{propertyData.name}"?
											This action cannot be undone and will affect all
											associated leases and tenants.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction className="bg-red-600 hover:bg-red-700">
											Delete Property
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>
				</div>

				{/* Property Overview */}
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
					{/* Images and Details */}
					<div className="xl:col-span-2 space-y-8">
						{/* Image Gallery */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Property Images
									</CardTitle>
									<CardDescription>
										Visual showcase of your property
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{/* Main Image */}
										<div className="relative">
											<img
												src={propertyData.images[selectedImage]}
												alt={`${propertyData.name} - Image ${
													selectedImage + 1
												}`}
												className="w-full h-96 object-cover rounded-2xl shadow-lg"
											/>
											<div className="absolute top-4 left-4">
												<Badge className="bg-white/90 text-gray-800 font-semibold">
													{selectedImage + 1} / {propertyData.images.length}
												</Badge>
											</div>
										</div>

										{/* Thumbnail Gallery */}
										<div className="grid grid-cols-4 gap-3">
											{propertyData.images.map((image, index) => (
												<button
													key={index}
													onClick={() => setSelectedImage(index)}
													className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
														selectedImage === index
															? "ring-4 ring-emerald-500 scale-105"
															: "hover:scale-105 hover:shadow-lg"
													}`}
												>
													<img
														src={image}
														alt={`Thumbnail ${index + 1}`}
														className="w-full h-20 object-cover"
													/>
												</button>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Property Description */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Property Description
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-700 leading-relaxed text-lg">
										{propertyData.description}
									</p>

									<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
										<div className="text-center p-4 rounded-xl bg-emerald-50 border border-emerald-200">
											<Building className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-emerald-600">
												{propertyData.totalUnits}
											</p>
											<p className="text-sm text-emerald-700">Total Units</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
											<Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-blue-600">
												{occupancyRate}%
											</p>
											<p className="text-sm text-blue-700">Occupied</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-purple-50 border border-purple-200">
											<DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-purple-600">
												{(propertyData.monthlyRevenue / 1000).toFixed(0)}K
											</p>
											<p className="text-sm text-purple-700">Monthly Revenue</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-yellow-50 border border-yellow-200">
											<Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-yellow-600">
												{propertyData.rating}
											</p>
											<p className="text-sm text-yellow-700">
												{propertyData.reviews} Reviews
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Current Tenants */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Current Tenants
									</CardTitle>
									<CardDescription>
										Active tenants in this property
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Tenant</TableHead>
												<TableHead>Unit</TableHead>
												<TableHead>Lease Period</TableHead>
												<TableHead>Monthly Rent</TableHead>
												<TableHead>Status</TableHead>
												<TableHead className="text-right">Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{tenants.map((tenant) => (
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
																<p className="text-sm text-gray-500">
																	{tenant.phone}
																</p>
															</div>
														</div>
													</TableCell>
													<TableCell>
														<Badge className="bg-blue-100 text-blue-800">
															Unit {tenant.unit}
														</Badge>
													</TableCell>
													<TableCell>
														<div className="text-sm">
															<p className="font-medium">
																{new Date(
																	tenant.leaseStart
																).toLocaleDateString()}
															</p>
															<p className="text-gray-500">
																to{" "}
																{new Date(tenant.leaseEnd).toLocaleDateString()}
															</p>
														</div>
													</TableCell>
													<TableCell>
														<span className="font-semibold">
															{tenant.monthlyRent.toLocaleString()} ETB
														</span>
													</TableCell>
													<TableCell>
														<Badge className="bg-emerald-100 text-emerald-800">
															{tenant.status}
														</Badge>
													</TableCell>
													<TableCell className="text-right">
														<Button variant="ghost" size="sm">
															<Eye className="h-4 w-4" />
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

					{/* Sidebar */}
					<div className="xl:col-span-1 space-y-8">
						{/* Property Stats */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Property Statistics
									</CardTitle>
									<CardDescription>
										Performance metrics and details
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									{/* Occupancy Rate */}
									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-sm font-medium text-gray-700">
												Occupancy Rate
											</span>
											<span className="text-lg font-bold text-emerald-600">
												{occupancyRate}%
											</span>
										</div>
										<Progress value={occupancyRate} className="h-3" />
										<p className="text-xs text-gray-500">
											{propertyData.occupiedUnits} of {propertyData.totalUnits}{" "}
											units occupied
										</p>
									</div>

									<Separator />

									{/* Financial Info */}
									<div className="space-y-4">
										<h4 className="font-semibold text-gray-900">
											Financial Overview
										</h4>
										<div className="space-y-3">
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">
													Monthly Revenue:
												</span>
												<span className="font-semibold text-emerald-600">
													{propertyData.monthlyRevenue.toLocaleString()} ETB
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">
													Price per Unit:
												</span>
												<span className="font-medium">
													{propertyData.pricePerUnit.toLocaleString()} ETB
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">
													Annual Revenue:
												</span>
												<span className="font-medium">
													{(propertyData.monthlyRevenue * 12).toLocaleString()}{" "}
													ETB
												</span>
											</div>
										</div>
									</div>

									<Separator />

									{/* Property Details */}
									<div className="space-y-4">
										<h4 className="font-semibold text-gray-900">
											Property Details
										</h4>
										<div className="space-y-3">
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Bedrooms:</span>
												<span className="font-medium">
													{propertyData.bedrooms}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">
													Bathrooms:
												</span>
												<span className="font-medium">
													{propertyData.bathrooms}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Area:</span>
												<span className="font-medium">
													{propertyData.squareMeters} sqm
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Rating:</span>
												<div className="flex items-center space-x-1">
													<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
													<span className="font-medium">
														{propertyData.rating}
													</span>
												</div>
											</div>
										</div>
									</div>

									<Separator />

									{/* Amenities */}
									<div className="space-y-4">
										<h4 className="font-semibold text-gray-900">Amenities</h4>
										<div className="grid grid-cols-1 gap-2">
											{propertyData.amenities.map((amenity, index) => (
												<div
													key={index}
													className="flex items-center space-x-2 p-2 rounded-lg bg-emerald-50 border border-emerald-100"
												>
													<div className="w-2 h-2 bg-emerald-500 rounded-full" />
													<span className="text-sm text-emerald-700">
														{amenity}
													</span>
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Recent Activities */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Recent Activities
									</CardTitle>
									<CardDescription>
										Latest updates for this property
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{recentActivities.map((activity, index) => (
											<div
												key={activity.id}
												className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
											>
												<div className="flex-shrink-0 mt-1">
													{activity.type === "payment" && (
														<div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
															<DollarSign className="h-4 w-4 text-emerald-600" />
														</div>
													)}
													{activity.type === "maintenance" && (
														<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
															<Building className="h-4 w-4 text-orange-600" />
														</div>
													)}
													{activity.type === "inquiry" && (
														<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
															<Eye className="h-4 w-4 text-blue-600" />
														</div>
													)}
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-gray-900">
														{activity.message}
													</p>
													<div className="flex items-center justify-between mt-1">
														<p className="text-xs text-gray-500">
															{new Date(activity.date).toLocaleDateString()}
														</p>
														{activity.amount && (
															<Badge className="bg-emerald-100 text-emerald-800 text-xs">
																{activity.amount}
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
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
