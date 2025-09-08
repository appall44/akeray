"use client";

import { useState } from "react";
import {
	Building,
	MapPin,
	ArrowLeft,
	Home,
	DollarSign,
	Calendar,
	Bed,
	Bath,
	Star,
	Phone,
	Mail,
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

// Mock unit data
const getUnitData = (propertyId: string, unitId: string) => ({
	property: {
		id: parseInt(propertyId),
		name: "Sunrise Apartments",
		address: "Bole Road, Near Atlas Hotel, Addis Ababa",
		rating: 4.8,
		reviews: 24,
	},
	unit: {
		id: unitId,
		unitNumber: unitId,
		floor: 2,
		bedrooms: 2,
		bathrooms: 1,
		area: "65 sqm",
		monthlyRent: 20000,
		deposit: 40000,
		status: "available",
		description:
			"Spacious two-bedroom apartment with city view. Ideal for small families or roommates. Features modern kitchen, large living room, and private balcony with stunning city views.",
		amenities: [
			"City View",
			"Large Living Room",
			"Storage Space",
			"Modern Kitchen",
			"Private Balcony",
			"WiFi Ready",
		],
		images: [
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
			"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
			"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
			"https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		availableFrom: "2025-02-01",
		leaseTerm: "12 months",
		furnished: false,
		petsAllowed: false,
		smokingAllowed: false,
	},
	owner: {
		name: "Mulugeta Assefa",
		phone: "+251911123456",
		email: "mulugeta@akeray.et",
		company: "Akeray Properties",
		avatar:
			"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
});

export default function UnitDetailsPage() {
	const params = useParams();
	const [selectedImage, setSelectedImage] = useState(0);

	const data = getUnitData(params.id as string, params.unitId as string);

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
							<Link href={`/dashboard/tenant/properties/${params.id}/units`}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Units
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Unit {data.unit.unitNumber}
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
						<div className="flex space-x-3">
							<Button
								variant="outline"
								className="border-blue-300 hover:bg-blue-50"
							>
								Schedule Tour
							</Button>
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
							>
								<Link
									href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/rent`}
								>
									Request to Rent
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Unit Overview */}
				<div
					className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<Home className="h-6 w-6 text-emerald-600" />
								<span>Unit Overview</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Monthly Rent
									</p>
									<p className="text-3xl font-bold text-emerald-600">
										{data.unit.monthlyRent.toLocaleString()} ETB
									</p>
									<p className="text-sm text-gray-600">
										Deposit: {data.unit.deposit.toLocaleString()} ETB
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Unit Details
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{data.unit.area}
									</p>
									<p className="text-sm text-gray-600">
										{data.unit.bedrooms} bed • {data.unit.bathrooms} bath
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Available From
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{new Date(data.unit.availableFrom).toLocaleDateString()}
									</p>
									<p className="text-sm text-gray-600">
										Lease: {data.unit.leaseTerm}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Property Rating
									</p>
									<div className="flex items-center space-x-1">
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<span className="text-lg font-semibold">
											{data.property.rating}
										</span>
									</div>
									<p className="text-sm text-gray-600">
										{data.property.reviews} reviews
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
					{/* Images and Details */}
					<div className="xl:col-span-2 space-y-8">
						{/* Image Gallery */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Unit Images
									</CardTitle>
									<CardDescription>
										Visual tour of Unit {data.unit.unitNumber}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{/* Main Image */}
										<div className="relative">
											<img
												src={data.unit.images[selectedImage]}
												alt={`Unit ${data.unit.unitNumber} - Image ${
													selectedImage + 1
												}`}
												className="w-full h-96 object-cover rounded-2xl shadow-lg"
											/>
											<div className="absolute top-4 left-4">
												<Badge className="bg-white/90 text-gray-800 font-semibold">
													{selectedImage + 1} / {data.unit.images.length}
												</Badge>
											</div>
										</div>

										{/* Thumbnail Gallery */}
										<div className="grid grid-cols-4 gap-3">
											{data.unit.images.map((image, index) => (
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

						{/* Unit Description */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										About This Unit
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-700 leading-relaxed text-lg mb-6">
										{data.unit.description}
									</p>

									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
										<div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
											<Bed className="h-8 w-8 text-blue-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-blue-600">
												{data.unit.bedrooms}
											</p>
											<p className="text-sm text-blue-700">Bedrooms</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-purple-50 border border-purple-200">
											<Bath className="h-8 w-8 text-purple-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-purple-600">
												{data.unit.bathrooms}
											</p>
											<p className="text-sm text-purple-700">Bathrooms</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-emerald-50 border border-emerald-200">
											<Home className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-emerald-600">
												{data.unit.area}
											</p>
											<p className="text-sm text-emerald-700">Total Area</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-orange-50 border border-orange-200">
											<Building className="h-8 w-8 text-orange-600 mx-auto mb-2" />
											<p className="text-2xl font-bold text-orange-600">
												{data.unit.floor}
											</p>
											<p className="text-sm text-orange-700">Floor</p>
										</div>
									</div>

									<Separator className="my-6" />

									<div>
										<h4 className="font-semibold mb-3 text-gray-900">
											Unit Features
										</h4>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
											{data.unit.amenities.map((amenity, index) => (
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
						{/* Rental Information */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Rental Information
									</CardTitle>
									<CardDescription>Financial details and terms</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-4">
										<div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 border border-emerald-200">
											<span className="text-sm font-medium text-emerald-700">
												Monthly Rent:
											</span>
											<span className="text-lg font-bold text-emerald-600">
												{data.unit.monthlyRent.toLocaleString()} ETB
											</span>
										</div>

										<div className="flex justify-between items-center p-3 rounded-xl bg-blue-50 border border-blue-200">
											<span className="text-sm font-medium text-blue-700">
												Security Deposit:
											</span>
											<span className="text-lg font-bold text-blue-600">
												{data.unit.deposit.toLocaleString()} ETB
											</span>
										</div>

										<div className="flex justify-between items-center p-3 rounded-xl bg-purple-50 border border-purple-200">
											<span className="text-sm font-medium text-purple-700">
												Available From:
											</span>
											<span className="text-sm font-bold text-purple-600">
												{new Date(data.unit.availableFrom).toLocaleDateString()}
											</span>
										</div>

										<div className="flex justify-between items-center p-3 rounded-xl bg-orange-50 border border-orange-200">
											<span className="text-sm font-medium text-orange-700">
												Lease Term:
											</span>
											<span className="text-sm font-bold text-orange-600">
												{data.unit.leaseTerm}
											</span>
										</div>
									</div>

									<Separator />

									<div className="space-y-3">
										<h4 className="font-semibold text-gray-900">
											Unit Policies
										</h4>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-600">Furnished:</span>
												<Badge
													className={
														data.unit.furnished
															? "bg-emerald-100 text-emerald-800"
															: "bg-gray-100 text-gray-800"
													}
												>
													{data.unit.furnished ? "Yes" : "No"}
												</Badge>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Pets Allowed:</span>
												<Badge
													className={
														data.unit.petsAllowed
															? "bg-emerald-100 text-emerald-800"
															: "bg-gray-100 text-gray-800"
													}
												>
													{data.unit.petsAllowed ? "Yes" : "No"}
												</Badge>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Smoking:</span>
												<Badge
													className={
														data.unit.smokingAllowed
															? "bg-emerald-100 text-emerald-800"
															: "bg-gray-100 text-gray-800"
													}
												>
													{data.unit.smokingAllowed ? "Allowed" : "Not Allowed"}
												</Badge>
											</div>
										</div>
									</div>

									<Button
										asChild
										className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
									>
										<Link
											href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/rent`}
										>
											Request to Rent This Unit
										</Link>
									</Button>
								</CardContent>
							</Card>
						</div>

						{/* Owner Contact */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="text-xl font-bold text-gray-900">
										Property Owner
									</CardTitle>
									<CardDescription>Contact for inquiries</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
											<Avatar className="h-12 w-12 ring-4 ring-purple-200">
												<AvatarImage src={data.owner.avatar} />
												<AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
													{data.owner.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<p className="font-semibold text-gray-900">
													{data.owner.name}
												</p>
												<p className="text-sm text-gray-600">Property Owner</p>
												<p className="text-sm text-purple-600 font-medium">
													{data.owner.company}
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
														{data.owner.phone}
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
														{data.owner.email}
													</p>
													<p className="text-xs text-gray-500">Email</p>
												</div>
											</div>
										</div>

										<Button
											variant="outline"
											className="w-full border-emerald-300 hover:bg-emerald-50"
										>
											Send Message
										</Button>
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
