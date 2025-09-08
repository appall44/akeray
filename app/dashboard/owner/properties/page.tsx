"use client";

import { useState } from "react";
import {
	Building,
	Plus,
	Search,
	Filter,
	Eye,
	Edit,
	MapPin,
	Users,
	DollarSign,
	TrendingUp,
	Tag,
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const properties = [
	{
		id: 1,
		name: "Bole Apartments",
		address: "Bole Road, Addis Ababa",
		totalUnits: 12,
		occupiedUnits: 11,
		monthlyRevenue: 180000,
		listingType: "rent",
		salePrice: null,
		pricePerSqm: null,
		status: "active",
		image:
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	{
		id: 2,
		name: "Kazanchis Complex",
		address: "Kazanchis, Addis Ababa",
		totalUnits: 16,
		occupiedUnits: 14,
		monthlyRevenue: 220000,
		listingType: "both",
		salePrice: 8500000,
		pricePerSqm: 95000,
		status: "active",
		image:
			"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	{
		id: 3,
		name: "Piassa Plaza",
		address: "Piassa, Addis Ababa",
		totalUnits: 8,
		occupiedUnits: 8,
		monthlyRevenue: null,
		listingType: "sell",
		salePrice: 12000000,
		pricePerSqm: 110000,
		status: "active",
		image:
			"https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	{
		id: 4,
		name: "CMC Towers",
		address: "CMC Area, Addis Ababa",
		totalUnits: 20,
		occupiedUnits: 17,
		monthlyRevenue: 300000,
		listingType: "rent",
		salePrice: null,
		pricePerSqm: null,
		status: "maintenance",
		image:
			"https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
];

export default function OwnerPropertiesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredProperties = properties.filter((property) => {
		const matchesSearch =
			property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.address.toLowerCase().includes(searchTerm.toLowerCase());
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
				return "bg-emerald-100 text-emerald-800";
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
								My Properties
							</h1>
							<p className="text-lg text-gray-600">
								Manage and monitor your property portfolio
							</p>
							<p className="text-sm text-gray-500">
								Track performance, occupancy, and revenue across all properties
							</p>
						</div>
						<Button
							asChild
							className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
						>
							<Link href="/dashboard/owner/properties/new">
								<Plus className="h-4 w-4 mr-2" />
								Add Property
							</Link>
						</Button>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Total Properties
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{properties.length}
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
											Total Units
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{properties.reduce((sum, p) => sum + p.totalUnits, 0)}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Users className="h-8 w-8 text-blue-600" />
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
											Monthly Revenue
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(
												properties.reduce(
													(sum, p) => sum + p.monthlyRevenue,
													0
												) / 1000
											).toFixed(0)}
											K ETB
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<DollarSign className="h-8 w-8 text-purple-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-orange-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Avg Occupancy
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{Math.round(
												properties.reduce(
													(sum, p) =>
														sum +
														getOccupancyRate(p.occupiedUnits, p.totalUnits),
													0
												) / properties.length
											)}
											%
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-orange-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<TrendingUp className="h-8 w-8 text-orange-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Search and Filter */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900"
					style={{ animationFillMode: "forwards" }}
				>
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search properties by name or address..."
								className="pl-10"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
								>
									<Filter className="h-4 w-4 mr-2" />
									Status: {filterStatus === "all" ? "All" : filterStatus}
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
								<DropdownMenuItem
									onClick={() => setFilterStatus("maintenance")}
								>
									Under Maintenance
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("inactive")}>
									Inactive
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Properties Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredProperties.map((property, index) => (
						<div
							key={property.id}
							className="animate-in fade-in slide-in-from-bottom-4 duration-700"
							style={{
								animationDelay: `${index * 150 + 1100}ms`,
								animationFillMode: "forwards",
							}}
						>
							<Card className="hover:shadow-xl transition-all duration-500 group cursor-pointer transform hover:scale-105 bg-white/90 backdrop-blur-sm">
								<div className="relative">
									<img
										src={property.image}
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
									<Badge
										className={`absolute top-3 left-3 ${
											property.listingType === "rent"
												? "bg-blue-100 text-blue-800"
												: property.listingType === "sell"
												? "bg-emerald-100 text-emerald-800"
												: "bg-purple-100 text-purple-800"
										}`}
									>
										{property.listingType === "rent"
											? "For Rent"
											: property.listingType === "sell"
											? "For Sale"
											: "Rent & Sale"}
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
											<p className="text-sm font-medium">
												{property.totalUnits}
											</p>
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
												{property.listingType === "sell" ? (
													<Tag className="h-4 w-4 text-gray-500" />
												) : (
													<DollarSign className="h-4 w-4 text-gray-500" />
												)}
											</div>
											{property.listingType === "sell" ? (
												<>
													<p className="text-sm font-medium">
														{property.salePrice
															? (property.salePrice / 1000000).toFixed(1) + "M"
															: "N/A"}
													</p>
													<p className="text-xs text-gray-500">Sale Price</p>
												</>
											) : property.listingType === "both" ? (
												<>
													<p className="text-sm font-medium">
														{property.monthlyRevenue
															? (property.monthlyRevenue / 1000).toFixed(0) +
															  "K"
															: "N/A"}
													</p>
													<p className="text-xs text-gray-500">Rent/Sale</p>
												</>
											) : (
												<>
													<p className="text-sm font-medium">
														{(property.monthlyRevenue / 1000).toFixed(0)}K ETB
													</p>
													<p className="text-xs text-gray-500">Monthly</p>
												</>
											)}
										</div>
									</div>

									{/* Actions */}
									<div className="flex space-x-2 pt-2">
										<Button
											variant="outline"
											size="sm"
											className="flex-1 bg-transparent"
											asChild
										>
											<Link href={`/dashboard/owner/properties/${property.id}`}>
												<Eye className="h-4 w-4 mr-1" />
												View Details
											</Link>
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="flex-1 bg-transparent"
											asChild
										>
											<Link
												href={`/dashboard/owner/properties/${property.id}/edit`}
											>
												<Edit className="h-4 w-4 mr-1" />
												Edit
											</Link>
										</Button>
									</div>
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
								No properties found
							</h3>
							<p className="text-gray-600 mb-4">
								{searchTerm || filterStatus !== "all"
									? "Try adjusting your search or filter criteria."
									: "Get started by adding your first property."}
							</p>
							{!searchTerm && filterStatus === "all" && (
								<Button asChild>
									<Link href="/dashboard/owner/properties/new">
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
