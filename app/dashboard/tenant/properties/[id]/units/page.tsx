"use client";

import { useState } from "react";
import {
	Building,
	MapPin,
	ArrowLeft,
	Home,
	DollarSign,
	Calendar,
	Users,
	Bed,
	Bath,
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock units data
const getUnitsData = (propertyId: string) => ({
	property: {
		id: parseInt(propertyId),
		name: "Sunrise Apartments",
		address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	},
	units: [
		{
			id: "1A",
			unitNumber: "1A",
			floor: 1,
			bedrooms: 1,
			bathrooms: 1,
			area: "45 sqm",
			monthlyRent: 15000,
			deposit: 30000,
			status: "available",
			description:
				"Cozy studio apartment perfect for young professionals. Features modern kitchen and private balcony.",
			amenities: ["Balcony", "Modern Kitchen", "WiFi Ready"],
			images: [
				"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
				"https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400",
			],
			availableFrom: "2025-01-15",
		},
		{
			id: "2B",
			unitNumber: "2B",
			floor: 2,
			bedrooms: 2,
			bathrooms: 1,
			area: "65 sqm",
			monthlyRent: 20000,
			deposit: 40000,
			status: "available",
			description:
				"Spacious two-bedroom apartment with city view. Ideal for small families or roommates.",
			amenities: ["City View", "Large Living Room", "Storage Space"],
			images: [
				"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
				"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
			],
			availableFrom: "2025-02-01",
		},
		{
			id: "3C",
			unitNumber: "3C",
			floor: 3,
			bedrooms: 2,
			bathrooms: 2,
			area: "75 sqm",
			monthlyRent: 25000,
			deposit: 50000,
			status: "available",
			description:
				"Premium apartment with two full bathrooms and premium finishes. Perfect for executives.",
			amenities: ["Premium Finishes", "Two Bathrooms", "Walk-in Closet"],
			images: [
				"https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400",
				"https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=400",
			],
			availableFrom: "2025-01-20",
		},
		{
			id: "4A",
			unitNumber: "4A",
			floor: 4,
			bedrooms: 1,
			bathrooms: 1,
			area: "50 sqm",
			monthlyRent: 18000,
			deposit: 36000,
			status: "occupied",
			description: "Currently occupied by tenant.",
			amenities: [],
			images: [],
			availableFrom: null,
		},
	],
});

export default function PropertyUnitsPage() {
	const params = useParams();
	const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

	const data = getUnitsData(params.id as string);
	const availableUnits = data.units.filter(
		(unit) => unit.status === "available"
	);

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
							<Link href={`/dashboard/tenant/properties/${params.id}`}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Property Details
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Available Units
						</h1>
						<p className="text-lg text-gray-600 flex items-center">
							<Building className="h-5 w-5 mr-2" />
							{data.property.name}
						</p>
						<p className="text-sm text-gray-500 flex items-center mt-1">
							<MapPin className="h-4 w-4 mr-1" />
							{data.property.address}
						</p>
					</div>
				</div>

				{/* Available Units Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{availableUnits.map((unit, index) => (
						<div
							key={unit.id}
							className="animate-in fade-in slide-in-from-bottom-4 duration-700"
							style={{
								animationDelay: `${index * 200 + 300}ms`,
								animationFillMode: "forwards",
							}}
						>
							<Card className="hover:shadow-xl transition-all duration-500 group cursor-pointer transform hover:scale-105 bg-white/90 backdrop-blur-sm">
								<div className="relative">
									<img
										src={unit.images[0]}
										alt={`Unit ${unit.unitNumber}`}
										className="w-full h-48 object-cover rounded-t-lg"
									/>
									<div className="absolute top-3 left-3 flex space-x-2">
										<Badge className="bg-emerald-500 text-white">
											Available
										</Badge>
										{/* Add listing type badge based on unit data */}
										<Badge className="bg-blue-500 text-white">For Rent</Badge>
									</div>
									<Badge className="absolute top-3 right-3 bg-blue-500 text-white">
										Floor {unit.floor}
									</Badge>
								</div>

								<CardHeader className="pb-3">
									<div className="flex items-start justify-between">
										<div>
											<CardTitle className="text-xl font-semibold">
												Unit {unit.unitNumber}
											</CardTitle>
											<CardDescription className="mt-1">
												{unit.area} • {unit.bedrooms} bed • {unit.bathrooms}{" "}
												bath
											</CardDescription>
										</div>
										<div className="text-right">
											<p className="text-2xl font-bold text-emerald-600">
												{unit.monthlyRent.toLocaleString()} ETB
											</p>
											<p className="text-sm text-gray-500">per month</p>
										</div>
									</div>
								</CardHeader>

								<CardContent className="space-y-4">
									{/* Unit Details */}
									<div className="grid grid-cols-3 gap-4 text-center">
										<div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
											<Bed className="h-5 w-5 text-blue-600 mx-auto mb-1" />
											<p className="text-sm font-medium">{unit.bedrooms}</p>
											<p className="text-xs text-gray-500">
												Bedroom{unit.bedrooms > 1 ? "s" : ""}
											</p>
										</div>
										<div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
											<Bath className="h-5 w-5 text-purple-600 mx-auto mb-1" />
											<p className="text-sm font-medium">{unit.bathrooms}</p>
											<p className="text-xs text-gray-500">
												Bathroom{unit.bathrooms > 1 ? "s" : ""}
											</p>
										</div>
										<div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
											<Home className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
											<p className="text-sm font-medium">{unit.area}</p>
											<p className="text-xs text-gray-500">Total Area</p>
										</div>
									</div>

									{/* Description */}
									<p className="text-gray-600 text-sm leading-relaxed">
										{unit.description}
									</p>

									{/* Amenities */}
									{unit.amenities.length > 0 && (
										<div className="space-y-2">
											<p className="text-sm font-medium text-gray-700">
												Unit Features:
											</p>
											<div className="flex flex-wrap gap-1">
												{unit.amenities.map((amenity, i) => (
													<Badge key={i} variant="outline" className="text-xs">
														{amenity}
													</Badge>
												))}
											</div>
										</div>
									)}

									{/* Financial Info */}
									<div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div>
												<p className="text-gray-600">Monthly Rent:</p>
												<p className="font-semibold text-emerald-600">
													{unit.monthlyRent.toLocaleString()} ETB
												</p>
											</div>
											<div>
												<p className="text-gray-600">Security Deposit:</p>
												<p className="font-semibold">
													{unit.deposit.toLocaleString()} ETB
												</p>
											</div>
											<div>
												<p className="text-gray-600">Available From:</p>
												<p className="font-semibold">
													{unit.availableFrom
														? new Date(unit.availableFrom).toLocaleDateString()
														: "N/A"}
												</p>
											</div>
											<div>
												<p className="text-gray-600">Lease Term:</p>
												<p className="font-semibold">12 months</p>
											</div>
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
											<Link
												href={`/dashboard/tenant/properties/${params.id}/units/${unit.id}`}
											>
												View Details
											</Link>
										</Button>
										{/* Show different buttons based on listing type */}
										<div className="flex-1 flex space-x-1">
											<Button
												size="sm"
												className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
												asChild
											>
												<Link
													href={`/dashboard/tenant/properties/${params.id}/units/${unit.id}/rent`}
												>
													Rent
												</Link>
											</Button>
											{/* Add buy button for units that are for sale */}
											<Button
												size="sm"
												variant="outline"
												className="flex-1 border-emerald-300 hover:bg-emerald-50"
												asChild
											>
												<Link
													href={`/dashboard/tenant/properties/${params.id}/units/${unit.id}/buy`}
												>
													Buy
												</Link>
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					))}
				</div>

				{/* No Available Units */}
				{availableUnits.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No Available Units
							</h3>
							<p className="text-gray-600 mb-4">
								All units in this property are currently occupied. You can join
								the waiting list to be notified when units become available.
							</p>
							<Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
								Join Waiting List
							</Button>
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
}
