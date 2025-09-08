"use client";

import { useState } from "react";
import {
	Building,
	MapPin,
	Star,
	Users,
	DollarSign,
	ArrowLeft,
	Heart,
	Phone,
	Mail,
	Calendar,
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock property data
const getPropertyData = (id: string) => ({
	id: parseInt(id),
	name: "Sunrise Apartments",
	description:
		"Modern apartment complex located in the heart of Bole, featuring contemporary amenities and excellent connectivity to major business districts. Perfect for professionals and families seeking comfort and convenience in Addis Ababa's most vibrant neighborhood.",
	address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	area: "Bole",
	totalUnits: 20,
	availableUnits: 3,
	listingType: "both", // rent, sell, both
	rentPriceRange: "15,000 - 25,000 ETB",
	salePrice: 8500000,
	pricePerSqm: 85000,
	minLeaseTerm: 12,
	rating: 4.8,
	reviews: 24,
	yearBuilt: 2020,
	propertyType: "Apartment Complex",
	images: [
		"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
		"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
		"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
		"https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
	],
	amenities: [
		"24/7 Security Guard",
		"Dedicated Parking Space",
		"High-Speed WiFi Ready",
		"Backup Generator",
		"Water Storage Tank",
		"Elevator Access",
		"Modern Kitchen Appliances",
		"Balcony/Terrace",
		"CCTV Surveillance",
		"Laundry Area",
		"Garden/Green Space",
		"Visitor Parking",
	],
	owner: {
		name: "Mulugeta Assefa",
		phone: "+251911123456",
		email: "mulugeta@akeray.et",
		company: "Akeray Properties",
		avatar:
			"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	location: {
		nearby: [
			"Atlas Hotel - 2 min walk",
			"Edna Mall - 5 min drive",
			"Bole International Airport - 15 min drive",
			"ECA Conference Center - 10 min drive",
			"Meskel Square - 20 min drive",
		],
		transportation: [
			"Public Bus Stop - 3 min walk",
			"Taxi Stand - 1 min walk",
			"Ride-hailing pickup point",
		],
	},
});

export default function PropertyDetailsPage() {
	const params = useParams();
	const [selectedImage, setSelectedImage] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);

	const property = getPropertyData(params.id as string);

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
							<Link href="/dashboard/tenant/properties">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Properties
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								{property.name}
							</h1>
							<p className="text-lg text-gray-600 flex items-center">
								<MapPin className="h-5 w-5 mr-2" />
								{property.address}
							</p>
							<div className="flex items-center space-x-4 mt-2">
								<div className="flex items-center space-x-1">
									<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
									<span className="font-medium">{property.rating}</span>
									<span className="text-sm text-gray-500">
										({property.reviews} reviews)
									</span>
								</div>
								<Badge className="bg-emerald-100 text-emerald-800">
									{property.propertyType}
								</Badge>
							</div>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								onClick={() => setIsFavorite(!isFavorite)}
								className={`border-red-300 hover:bg-red-50 ${
									isFavorite ? "bg-red-50" : ""
								}`}
							>
								<Heart
									className={`h-4 w-4 mr-2 ${
										isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
									}`}
								/>
								{isFavorite ? "Saved" : "Save"}
							</Button>
							{property.availableUnits > 0 && (
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									{property.totalUnits > 1 ? (
										<Button
											asChild
											className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
										>
											<Link
												href={`/dashboard/tenant/properties/${property.id}/units`}
											>
												View Available Units
											</Link>
										</Button>
									) : (
										<>
											{(property.listingType === "rent" ||
												property.listingType === "both") && (
												<Button
													asChild
													className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-lg transform hover:scale-105 transition-all duration-300"
												>
													<Link
														href={`/dashboard/tenant/properties/${property.id}/rent`}
													>
														Request to Rent
													</Link>
												</Button>
											)}
											{(property.listingType === "sell" ||
												property.listingType === "both") && (
												<Button
													asChild
													variant={
														property.listingType === "both"
															? "outline"
															: "default"
													}
													className={
														property.listingType === "both"
															? "border-emerald-300 hover:bg-emerald-50"
															: "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
													}
												>
													<Link
														href={`/dashboard/tenant/properties/${property.id}/buy`}
													>
														Request to Buy
													</Link>
												</Button>
											)}
										</>
									)}
								</div>
							)}
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
										Visual showcase of the property
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{/* Main Image */}
										<div className="relative">
											<img
												src={property.images[selectedImage]}
												alt={`${property.name} - Image ${selectedImage + 1}`}
												className="w-full h-96 object-cover rounded-2xl shadow-lg"
											/>
											<div className="absolute top-4 left-4">
												<Badge className="bg-white/90 text-gray-800 font-semibold">
													{selectedImage + 1} / {property.images.length}
												</Badge>
											</div>
										</div>

										{/* Thumbnail Gallery */}
										<div className="grid grid-cols-4 gap-3">
											{property.images.map((image, index) => (
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
										About This Property
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-700 leading-relaxed text-lg mb-6">
										{property.description}
									</p>

									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
										<div className="text-center p-4 rounded-xl bg-emerald-50 border border-emerald-200">
											<Building className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-emerald-600">
												{property.totalUnits}
											</p>
											<p className="text-sm text-emerald-700">Total Units</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
											<Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-blue-600">
												{property.availableUnits}
											</p>
											<p className="text-sm text-blue-700">Available</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-purple-50 border border-purple-200">
											<Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-purple-600">
												{property.yearBuilt}
											</p>
											<p className="text-sm text-purple-700">Year Built</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-yellow-50 border border-yellow-200">
											<Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-yellow-600">
												{property.rating}
											</p>
											<p className="text-sm text-yellow-700">Rating</p>
										</div>
									</div>

									<Separator className="my-6" />

									<div>
										<h4 className="font-semibold mb-3 text-gray-900">
											Property Amenities
										</h4>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
											{property.amenities.map((amenity, index) => (
												<div
													key={index}
													className="flex items-center space-x-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100"
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
					</div>

					{/* Sidebar */}
					<div className="xl:col-span-1 space-y-8">
						{/* Property Owner */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Property Owner
									</CardTitle>
									<CardDescription>Contact information</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
											<Avatar className="h-16 w-16 ring-4 ring-purple-200">
												<AvatarImage src={property.owner.avatar} />
												<AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-lg">
													{property.owner.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<p className="font-semibold text-lg text-gray-900">
													{property.owner.name}
												</p>
												<p className="text-sm text-gray-600">Property Owner</p>
												<p className="text-sm text-purple-600 font-medium">
													{property.owner.company}
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
														{property.owner.phone}
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
														{property.owner.email}
													</p>
													<p className="text-xs text-gray-500">Email</p>
												</div>
											</div>
										</div>

										<Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
											Contact Owner
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Location Info */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Location & Nearby
									</CardTitle>
									<CardDescription>What's around this property</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div>
											<h4 className="font-semibold text-gray-900 mb-3">
												Nearby Places
											</h4>
											<div className="space-y-2">
												{property.location.nearby.map((place, index) => (
													<div
														key={index}
														className="flex items-center space-x-2 text-sm"
													>
														<div className="w-2 h-2 bg-emerald-500 rounded-full" />
														<span className="text-gray-700">{place}</span>
													</div>
												))}
											</div>
										</div>

										<Separator />

										<div>
											<h4 className="font-semibold text-gray-900 mb-3">
												Transportation
											</h4>
											<div className="space-y-2">
												{property.location.transportation.map(
													(transport, index) => (
														<div
															key={index}
															className="flex items-center space-x-2 text-sm"
														>
															<div className="w-2 h-2 bg-blue-500 rounded-full" />
															<span className="text-gray-700">{transport}</span>
														</div>
													)
												)}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>

				{/* Action Section */}
				{property.availableUnits > 0 && (
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
							<CardContent className="p-8">
								<div className="text-center space-y-4">
									<h3 className="text-2xl font-bold text-gray-900">
										Ready to Make This Your Home?
									</h3>
									<p className="text-gray-600">
										{property.availableUnits} unit
										{property.availableUnits > 1 ? "s" : ""} available for rent
									</p>
									<div className="flex flex-col sm:flex-row gap-4 justify-center">
										<Button
											size="lg"
											asChild
											className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
										>
											<Link
												href={`/dashboard/tenant/properties/${property.id}/units`}
											>
												View Available Units
											</Link>
										</Button>
										<Button
											variant="outline"
											size="lg"
											className="border-emerald-300 hover:bg-emerald-50"
										>
											Schedule Property Tour
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}
