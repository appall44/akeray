"use client";

import { useState } from "react";
import {
	ArrowLeft,
	Edit,
	Trash2,
	Building,
	MapPin,
	Users,
	DollarSign,
	Eye,
	Calendar,
	Mail,
	Phone,
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
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
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
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function PropertyDetailsPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const propertyId = params.id as string;

	// Mock property data - in real app, fetch from API based on propertyId
	const property = {
		id: propertyId,
		name: "Sunrise Apartments",
		address: "123 Main Street, Downtown",
		city: "Addis Ababa",
		propertyType: "Apartment",
		totalUnits: 20,
		occupiedUnits: 18,
		monthlyRevenue: 450000,
		status: "active",
		description:
			"Modern apartment complex with excellent amenities and prime location.",
		owner: {
			name: "John Smith",
			email: "john@example.com",
			phone: "+251911234567",
		},
		amenities: [
			"24/7 Security",
			"Parking Space",
			"Elevator Access",
			"Backup Generator",
			"Water Tank",
			"Internet Ready",
			"Balcony",
			"Modern Kitchen",
		],
		images: [
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
			"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
		],
		units: [
			{
				id: "1A",
				tenant: "አበበ ከበደ",
				rent: 25000,
				status: "occupied",
				leaseEnd: "2024-12-31",
			},
			{
				id: "2A",
				tenant: "ሳራ ለማ",
				rent: 22000,
				status: "occupied",
				leaseEnd: "2025-01-31",
			},
			{ id: "3A", tenant: null, rent: 20000, status: "vacant", leaseEnd: null },
			{
				id: "4A",
				tenant: "ሙሉጌታ አሰፋ",
				rent: 28000,
				status: "occupied",
				leaseEnd: "2024-11-30",
			},
		],
		maintenanceHistory: [
			{
				id: "1",
				title: "Plumbing repair - Unit 2A",
				date: "2024-12-15",
				cost: 2500,
				status: "completed",
			},
			{
				id: "2",
				title: "Electrical maintenance",
				date: "2024-12-10",
				cost: 1800,
				status: "completed",
			},
			{
				id: "3",
				title: "Elevator service",
				date: "2024-12-05",
				cost: 5000,
				status: "completed",
			},
		],
	};

	const handleDelete = () => {
		toast({
			title: "ንብረት ተሰርዟል / Property Deleted",
			description: `${property.name} has been removed from the system`,
		});
		router.push("/dashboard/admin/properties");
	};

	const getOccupancyRate = () => {
		return Math.round((property.occupiedUnits / property.totalUnits) * 100);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800";
			case "maintenance":
				return "bg-orange-100 text-orange-800";
			case "inactive":
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getUnitStatusColor = (status: string) => {
		switch (status) {
			case "occupied":
				return "bg-green-100 text-green-800";
			case "vacant":
				return "bg-yellow-100 text-yellow-800";
			case "maintenance":
				return "bg-orange-100 text-orange-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<DashboardLayout
			userRole="admin"
			userName="አስተዳዳሪ አበበ / Admin Abebe"
			userEmail="admin@akeray.et"
		>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Button variant="outline" size="sm" asChild>
							<Link href="/dashboard/admin/properties">
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back
							</Link>
						</Button>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								የንብረት ዝርዝር / Property Details
							</h1>
							<p className="text-gray-600 mt-1">
								ሙሉ የንብረት መረጃ እና ስታቲስቲክስ / Complete property information and
								statistics
							</p>
						</div>
					</div>
					<div className="flex space-x-3">
						<Button variant="outline" asChild>
							<Link href={`/dashboard/admin/properties/${propertyId}/edit`}>
								<Edit className="h-4 w-4 mr-2" />
								አርም / Edit
							</Link>
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="outline"
									className="text-red-600 hover:text-red-700"
								>
									<Trash2 className="h-4 w-4 mr-2" />
									ሰርዝ / Delete
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										ንብረት ሰርዝ / Delete Property
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to delete {property.name}? This action
										cannot be undone.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>ተወው / Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleDelete}
										className="bg-red-600 hover:bg-red-700"
									>
										ሰርዝ / Delete
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>

				{/* Property Overview */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<Card className="lg:col-span-2">
						<CardHeader>
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-2xl">{property.name}</CardTitle>
									<CardDescription className="flex items-center mt-2">
										<MapPin className="h-4 w-4 mr-1" />
										{property.address}, {property.city}
									</CardDescription>
								</div>
								<Badge className={getStatusColor(property.status)}>
									{property.status}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
								<div className="text-center p-4 bg-emerald-50 rounded-lg">
									<Building className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
									<p className="text-2xl font-bold text-emerald-600">
										{property.totalUnits}
									</p>
									<p className="text-sm text-gray-600">
										ጠቅላላ ክፍሎች / Total Units
									</p>
								</div>
								<div className="text-center p-4 bg-blue-50 rounded-lg">
									<Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
									<p className="text-2xl font-bold text-blue-600">
										{getOccupancyRate()}%
									</p>
									<p className="text-sm text-gray-600">መኖሪያ / Occupancy</p>
								</div>
								<div className="text-center p-4 bg-purple-50 rounded-lg">
									<DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
									<p className="text-2xl font-bold text-purple-600">
										{(property.monthlyRevenue / 1000).toFixed(0)}K
									</p>
									<p className="text-sm text-gray-600">
										ወርሃዊ ገቢ / Monthly Revenue
									</p>
								</div>
								<div className="text-center p-4 bg-orange-50 rounded-lg">
									<Building className="h-8 w-8 text-orange-600 mx-auto mb-2" />
									<p className="text-2xl font-bold text-orange-600">
										{property.occupiedUnits}
									</p>
									<p className="text-sm text-gray-600">የተያዙ / Occupied</p>
								</div>
							</div>

							<div className="space-y-4">
								<div>
									<h4 className="font-semibold mb-2">መግለጫ / Description</h4>
									<p className="text-gray-600">{property.description}</p>
								</div>

								<Separator />

								<div>
									<h4 className="font-semibold mb-3">
										ተጨማሪ አገልግሎቶች / Amenities
									</h4>
									<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
										{property.amenities.map((amenity, index) => (
											<div
												key={index}
												className="flex items-center space-x-2 text-sm"
											>
												<div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
												<span>{amenity}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Owner Information */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Users className="h-5 w-5 text-blue-600" />
								<span>የባለቤት መረጃ / Owner Information</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center space-x-4">
									<Avatar className="h-12 w-12">
										<AvatarImage src="/placeholder-user.jpg" />
										<AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
											{property.owner.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-semibold">{property.owner.name}</p>
										<p className="text-sm text-gray-600">Property Owner</p>
									</div>
								</div>
								<Separator />
								<div className="space-y-3">
									<div className="flex items-center space-x-3">
										<Mail className="h-4 w-4 text-gray-400" />
										<span className="text-sm">{property.owner.email}</span>
									</div>
									<div className="flex items-center space-x-3">
										<Phone className="h-4 w-4 text-gray-400" />
										<span className="text-sm">{property.owner.phone}</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Property Images */}
				<Card>
					<CardHeader>
						<CardTitle>የንብረት ምስሎች / Property Images</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{property.images.map((image, index) => (
								<div key={index} className="relative group">
									<img
										src={image}
										alt={`${property.name} - Image ${index + 1}`}
										className="w-full h-32 object-cover rounded-lg"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
										<Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Units Overview */}
				<Card>
					<CardHeader>
						<CardTitle>የክፍሎች ዝርዝር / Units Overview</CardTitle>
						<CardDescription>
							ሁሉም ክፍሎች እና ሁኔታቸው / All units and their status
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ክፍል / Unit</TableHead>
									<TableHead>ተከራይ / Tenant</TableHead>
									<TableHead>ወርሃዊ ክራይ / Monthly Rent</TableHead>
									<TableHead>ሁኔታ / Status</TableHead>
									<TableHead>የውል ማብቂያ / Lease End</TableHead>
									<TableHead className="text-right">እርምጃዎች / Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{property.units.map((unit) => (
									<TableRow key={unit.id}>
										<TableCell className="font-medium">
											Unit {unit.id}
										</TableCell>
										<TableCell>{unit.tenant || "N/A"}</TableCell>
										<TableCell>{unit.rent.toLocaleString()} ETB</TableCell>
										<TableCell>
											<Badge className={getUnitStatusColor(unit.status)}>
												{unit.status}
											</Badge>
										</TableCell>
										<TableCell>
											{unit.leaseEnd
												? new Date(unit.leaseEnd).toLocaleDateString()
												: "N/A"}
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

				{/* Maintenance History */}
				<Card>
					<CardHeader>
						<CardTitle>የጥገና ታሪክ / Maintenance History</CardTitle>
						<CardDescription>
							የቅርብ ጊዜ የጥገና ስራዎች / Recent maintenance work
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ርዕስ / Title</TableHead>
									<TableHead>ቀን / Date</TableHead>
									<TableHead>ወጪ / Cost</TableHead>
									<TableHead>ሁኔታ / Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{property.maintenanceHistory.map((maintenance) => (
									<TableRow key={maintenance.id}>
										<TableCell className="font-medium">
											{maintenance.title}
										</TableCell>
										<TableCell>
											{new Date(maintenance.date).toLocaleDateString()}
										</TableCell>
										<TableCell>
											{maintenance.cost.toLocaleString()} ETB
										</TableCell>
										<TableCell>
											<Badge className="bg-green-100 text-green-800">
												{maintenance.status}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
}
