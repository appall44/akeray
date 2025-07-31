"use client";

import { useState } from "react";
import {
	Building,
	Plus,
	Search,
	Filter,
	Eye,
	Edit,
	Trash2,
	MapPin,
	Users,
	DollarSign,
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const properties = [
	{
		id: 1,
		name: "Sunrise Apartments",
		address: "123 Main Street, Downtown",
		totalUnits: 20,
		occupiedUnits: 18,
		monthlyRevenue: 45000,
		owner: "John Smith",
		status: "active",
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		id: 2,
		name: "Green Valley Complex",
		address: "456 Oak Avenue, Suburbs",
		totalUnits: 30,
		occupiedUnits: 24,
		monthlyRevenue: 72000,
		owner: "Sarah Johnson",
		status: "active",
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		id: 3,
		name: "City Center Plaza",
		address: "789 Business District",
		totalUnits: 15,
		occupiedUnits: 15,
		monthlyRevenue: 60000,
		owner: "Michael Brown",
		status: "active",
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		id: 4,
		name: "Riverside Towers",
		address: "321 River Road, Waterfront",
		totalUnits: 25,
		occupiedUnits: 22,
		monthlyRevenue: 88000,
		owner: "Emily Davis",
		status: "maintenance",
		image: "/placeholder.svg?height=200&width=300",
	},
];

export default function PropertiesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredProperties = properties.filter((property) => {
		const matchesSearch =
			property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.owner.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesFilter =
			filterStatus === "all" || property.status === filterStatus;
		return matchesSearch && matchesFilter;
	});

	const getOccupancyRate = (occupied: number, total: number) => {
		return Math.round((occupied / total) * 100);
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

	return (
		<DashboardLayout
			userRole="admin"
			userName="Admin User"
			userEmail="admin@apms.et"
		>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-poppins font-bold text-gray-900">
							Properties
						</h1>
						<p className="text-gray-600 mt-1">
							Manage all your properties and units
						</p>
					</div>
					<Button asChild className="bg-[#4A90E2] hover:bg-[#2F80ED]">
						<Link href="/dashboard/admin/properties/new">
							<Plus className="h-4 w-4 mr-2" />
							Add Property
						</Link>
					</Button>
				</div>

				{/* Search and Filter */}
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search properties, addresses, or owners..."
							className="pl-10"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								<Filter className="h-4 w-4 mr-2" />
								Filter: {filterStatus === "all" ? "All" : filterStatus}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setFilterStatus("all")}>
								All Properties
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("active")}>
								Active
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("maintenance")}>
								Under Maintenance
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("inactive")}>
								Inactive
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Properties Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredProperties.map((property, index) => (
						<Card
							key={property.id}
							className="hover-scale fade-in"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<div className="relative">
								<img
									src={property.image || "/placeholder.svg"}
									alt={property.name}
									className="w-full h-48 object-cover rounded-t-lg"
								/>
								<Badge
									className={`absolute top-3 right-3 ${getStatusColor(
										property.status
									)}`}
								>
									{property.status}
								</Badge>
							</div>

							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div>
										<CardTitle className="text-lg font-semibold">
											{property.name}
										</CardTitle>
										<CardDescription className="flex items-center mt-1">
											<MapPin className="h-4 w-4 mr-1" />
											{property.address}
										</CardDescription>
									</div>
								</div>
							</CardHeader>

							<CardContent className="space-y-4">
								{/* Stats */}
								<div className="grid grid-cols-3 gap-4 text-center">
									<div>
										<div className="flex items-center justify-center mb-1">
											<Building className="h-4 w-4 text-gray-500" />
										</div>
										<p className="text-sm font-medium">{property.totalUnits}</p>
										<p className="text-xs text-gray-500">Total Units</p>
									</div>
									<div>
										<div className="flex items-center justify-center mb-1">
											<Users className="h-4 w-4 text-gray-500" />
										</div>
										<p className="text-sm font-medium">
											{getOccupancyRate(
												property.occupiedUnits,
												property.totalUnits
											)}
											%
										</p>
										<p className="text-xs text-gray-500">Occupied</p>
									</div>
									<div>
										<div className="flex items-center justify-center mb-1">
											<DollarSign className="h-4 w-4 text-gray-500" />
										</div>
										<p className="text-sm font-medium">
											₹{(property.monthlyRevenue / 1000).toFixed(0)}K
										</p>
										<p className="text-xs text-gray-500">Monthly</p>
									</div>
								</div>

								{/* Owner */}
								<div className="flex items-center space-x-2 pt-2 border-t">
									<Avatar className="h-6 w-6">
										<AvatarImage src="/placeholder-user.jpg" />
										<AvatarFallback className="text-xs">
											{property.owner
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<span className="text-sm text-gray-600">
										Owner: {property.owner}
									</span>
								</div>

								{/* Actions */}
								<div className="flex space-x-2 pt-2">
									<Button
										variant="outline"
										size="sm"
										className="flex-1 bg-transparent"
										asChild
									>
										<Link href={`/dashboard/admin/properties/${property.id}`}>
											<Eye className="h-4 w-4 mr-1" />
											View
										</Link>
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="flex-1 bg-transparent"
										asChild
									>
										<Link
											href={`/dashboard/admin/properties/${property.id}/edit`}
										>
											<Edit className="h-4 w-4 mr-1" />
											Edit
										</Link>
									</Button>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant="outline"
												size="sm"
												className="text-red-600 hover:text-red-700 bg-transparent"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Delete Property</AlertDialogTitle>
												<AlertDialogDescription>
													Are you sure you want to delete "{property.name}"?
													This action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction className="bg-red-600 hover:bg-red-700">
													Delete
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Empty State */}
				{filteredProperties.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No properties found
							</h3>
							<p className="text-gray-600 mb-4">
								{searchTerm || filterStatus !== "all"
									? "Try adjusting your search or filter criteria."
									: "Get started by adding your first property."}
							</p>
							{!searchTerm && filterStatus === "all" && (
								<Button asChild>
									<Link href="/dashboard/admin/properties/new">
										<Plus className="h-4 w-4 mr-2" />
										Add Property
									</Link>
								</Button>
							)}
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
}
