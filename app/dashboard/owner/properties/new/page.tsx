"use client";

import { useState } from "react";
import {
	Building,
	Upload,
	MapPin,
	DollarSign,
	Users,
	ArrowLeft,
	Save,
	Plus,
	X,
	Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const propertyTypes = [
	{ value: "apartment", label: "Apartment", icon: "🏢" },
	{ value: "house", label: "House", icon: "🏠" },
	{ value: "villa", label: "Villa", icon: "🏡" },
	{ value: "shop", label: "Shop", icon: "🏪" },
	{ value: "office", label: "Office", icon: "🏢" },
	{ value: "warehouse", label: "Warehouse", icon: "🏭" },
];

const amenitiesList = [
	"24/7 Security",
	"Parking Space",
	"WiFi Ready",
	"Backup Generator",
	"Water Tank",
	"Elevator",
	"Garden/Yard",
	"Swimming Pool",
	"Gym/Fitness Center",
	"Balcony/Terrace",
	"Air Conditioning",
	"Fully Furnished",
	"Modern Kitchen",
	"Laundry Room",
	"Storage Space",
	"CCTV Surveillance",
];

const ethiopianCities = [
	"Addis Ababa",
	"Dire Dawa",
	"Mekelle",
	"Gondar",
	"Hawassa",
	"Bahir Dar",
	"Dessie",
	"Jimma",
	"Jijiga",
	"Shashamane",
];

const addisAbabaAreas = [
	"Bole",
	"Kazanchis",
	"Piassa",
	"CMC",
	"Gerji",
	"Megenagna",
	"Sarbet",
	"Arat Kilo",
	"6 Kilo",
	"22 Mazoria",
	"Hayat",
	"Lebu",
];

export default function OwnerAddPropertyPage() {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		type: "",
		address: "",
		city: "Addis Ababa",
		area: "",
		googleMapLink: "",
		totalUnits: 1,
		pricePerUnit: "",
		bedrooms: 1,
		bathrooms: 1,
		squareMeters: "",
		amenities: [] as string[],
		images: [] as File[],
		featured: false,
		status: "active",
		payForFeatured: false,
		featuredDuration: "30",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length + formData.images.length > 10) {
			setError("Maximum 10 images allowed");
			return;
		}
		setFormData({ ...formData, images: [...formData.images, ...files] });
	};

	const removeImage = (index: number) => {
		const newImages = formData.images.filter((_, i) => i !== index);
		setFormData({ ...formData, images: newImages });
	};

	const toggleAmenity = (amenity: string) => {
		const newAmenities = formData.amenities.includes(amenity)
			? formData.amenities.filter((a) => a !== amenity)
			: [...formData.amenities, amenity];
		setFormData({ ...formData, amenities: newAmenities });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (
			!formData.name ||
			!formData.type ||
			!formData.address ||
			!formData.pricePerUnit
		) {
			setError("Please fill in all required fields");
			setIsLoading(false);
			return;
		}

		if (formData.images.length === 0) {
			setError("Please upload at least one property image");
			setIsLoading(false);
			return;
		}

		if (parseFloat(formData.pricePerUnit) <= 0) {
			setError("Price per unit must be greater than 0");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Property Added Successfully!",
				description: `${formData.name} has been added to your portfolio with ${formData.totalUnits} units.`,
			});
			router.push("/dashboard/owner/properties");
		}, 2000);
	};

	const featuredCost = formData.totalUnits * 500; // 500 ETB per unit for featured listing

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
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Add New Property
						</h1>
						<p className="text-lg text-gray-600">
							List your property on Akeray marketplace and start earning
						</p>
						<p className="text-sm text-gray-500">
							Fill in all property details to attract quality tenants
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-8">
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						{/* Main Form */}
						<div className="xl:col-span-2 space-y-8">
							{/* Basic Information */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Property Information
										</CardTitle>
										<CardDescription>
											Essential details about your property
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										{error && (
											<Alert variant="destructive">
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="name"
													className="text-sm font-semibold text-gray-700"
												>
													Property Name *
												</Label>
												<Input
													id="name"
													placeholder="e.g., Bole Modern Apartments"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.name}
													onChange={(e) =>
														setFormData({ ...formData, name: e.target.value })
													}
													required
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="type"
													className="text-sm font-semibold text-gray-700"
												>
													Property Type *
												</Label>
												<Select
													value={formData.type}
													onValueChange={(value) =>
														setFormData({ ...formData, type: value })
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue placeholder="Select property type" />
													</SelectTrigger>
													<SelectContent>
														{propertyTypes.map((type) => (
															<SelectItem key={type.value} value={type.value}>
																<div className="flex items-center space-x-3">
																	<span className="text-lg">{type.icon}</span>
																	<span>{type.label}</span>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="description"
												className="text-sm font-semibold text-gray-700"
											>
												Property Description *
											</Label>
											<Textarea
												id="description"
												placeholder="Describe your property features, location benefits, nearby amenities, and what makes it special for potential tenants..."
												className="min-h-32 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.description}
												onChange={(e) =>
													setFormData({
														...formData,
														description: e.target.value,
													})
												}
												required
											/>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="totalUnits"
													className="text-sm font-semibold text-gray-700"
												>
													Number of Units *
												</Label>
												<Input
													id="totalUnits"
													type="number"
													min="1"
													placeholder="1"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.totalUnits}
													onChange={(e) =>
														setFormData({
															...formData,
															totalUnits: parseInt(e.target.value) || 1,
														})
													}
													required
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="bedrooms"
													className="text-sm font-semibold text-gray-700"
												>
													Bedrooms
												</Label>
												<Input
													id="bedrooms"
													type="number"
													min="0"
													placeholder="1"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.bedrooms}
													onChange={(e) =>
														setFormData({
															...formData,
															bedrooms: parseInt(e.target.value) || 0,
														})
													}
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="bathrooms"
													className="text-sm font-semibold text-gray-700"
												>
													Bathrooms
												</Label>
												<Input
													id="bathrooms"
													type="number"
													min="1"
													placeholder="1"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.bathrooms}
													onChange={(e) =>
														setFormData({
															...formData,
															bathrooms: parseInt(e.target.value) || 1,
														})
													}
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="squareMeters"
													className="text-sm font-semibold text-gray-700"
												>
													Area (Square Meters)
												</Label>
												<Input
													id="squareMeters"
													type="number"
													placeholder="85"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.squareMeters}
													onChange={(e) =>
														setFormData({
															...formData,
															squareMeters: e.target.value,
														})
													}
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="pricePerUnit"
													className="text-sm font-semibold text-gray-700"
												>
													Rent per Unit (ETB/month) *
												</Label>
												<div className="relative">
													<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
													<Input
														id="pricePerUnit"
														type="number"
														placeholder="25000"
														className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														value={formData.pricePerUnit}
														onChange={(e) =>
															setFormData({
																...formData,
																pricePerUnit: e.target.value,
															})
														}
														required
													/>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Location Information */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Location Details
										</CardTitle>
										<CardDescription>
											Property address and location information
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="space-y-2">
											<Label
												htmlFor="address"
												className="text-sm font-semibold text-gray-700"
											>
												Full Address *
											</Label>
											<div className="relative">
												<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="address"
													placeholder="e.g., House No. 123, Bole Road, Near Atlas Hotel"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.address}
													onChange={(e) =>
														setFormData({
															...formData,
															address: e.target.value,
														})
													}
													required
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="city"
													className="text-sm font-semibold text-gray-700"
												>
													City *
												</Label>
												<Select
													value={formData.city}
													onValueChange={(value) =>
														setFormData({ ...formData, city: value })
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														{ethiopianCities.map((city) => (
															<SelectItem key={city} value={city}>
																{city}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="area"
													className="text-sm font-semibold text-gray-700"
												>
													Area/Subcity *
												</Label>
												<Select
													value={formData.area}
													onValueChange={(value) =>
														setFormData({ ...formData, area: value })
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue placeholder="Select area" />
													</SelectTrigger>
													<SelectContent>
														{addisAbabaAreas.map((area) => (
															<SelectItem key={area} value={area}>
																{area}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="googleMapLink"
												className="text-sm font-semibold text-gray-700"
											>
												Google Maps Link (Recommended)
											</Label>
											<Input
												id="googleMapLink"
												placeholder="https://maps.google.com/... (helps tenants find your property easily)"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.googleMapLink}
												onChange={(e) =>
													setFormData({
														...formData,
														googleMapLink: e.target.value,
													})
												}
											/>
											<p className="text-xs text-gray-500">
												📍 Adding a Google Maps link increases tenant inquiries
												by 40%
											</p>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Images Upload */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Property Images
										</CardTitle>
										<CardDescription>
											Upload high-quality images to attract more tenants (Max 10
											images)
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors">
											<Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-700">
													Upload property images
												</p>
												<p className="text-xs text-gray-500">
													JPG, PNG up to 5MB each. First image will be the main
													photo.
												</p>
												<input
													type="file"
													id="images"
													accept="image/*"
													multiple
													onChange={handleImageUpload}
													className="hidden"
												/>
												<Button
													type="button"
													variant="outline"
													onClick={() =>
														document.getElementById("images")?.click()
													}
													className="border-emerald-300 hover:bg-emerald-50"
												>
													<Upload className="h-4 w-4 mr-2" />
													Choose Images
												</Button>
											</div>
										</div>

										{formData.images.length > 0 && (
											<div>
												<p className="text-sm font-medium text-gray-700 mb-3">
													Uploaded Images ({formData.images.length}/10)
												</p>
												<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
													{formData.images.map((image, index) => (
														<div key={index} className="relative group">
															<img
																src={URL.createObjectURL(image)}
																alt={`Property ${index + 1}`}
																className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
															/>
															{index === 0 && (
																<Badge className="absolute top-2 left-2 bg-emerald-500 text-white">
																	Main Photo
																</Badge>
															)}
															<Button
																type="button"
																variant="destructive"
																size="sm"
																className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
																onClick={() => removeImage(index)}
															>
																<X className="h-3 w-3" />
															</Button>
															<p className="text-xs text-gray-500 mt-1 truncate">
																{image.name}
															</p>
														</div>
													))}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Sidebar */}
						<div className="xl:col-span-1 space-y-8">
							{/* Amenities */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Property Amenities
										</CardTitle>
										<CardDescription>
											Select available amenities and features
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
											{amenitiesList.map((amenity) => (
												<div
													key={amenity}
													className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
												>
													<Checkbox
														id={amenity}
														checked={formData.amenities.includes(amenity)}
														onCheckedChange={() => toggleAmenity(amenity)}
														className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
													/>
													<Label
														htmlFor={amenity}
														className="text-sm cursor-pointer flex-1"
													>
														{amenity}
													</Label>
												</div>
											))}
										</div>

										{formData.amenities.length > 0 && (
											<div className="mt-4 pt-4 border-t">
												<p className="text-sm font-medium text-gray-700 mb-2">
													Selected ({formData.amenities.length}):
												</p>
												<div className="flex flex-wrap gap-2">
													{formData.amenities.map((amenity) => (
														<Badge
															key={amenity}
															className="bg-emerald-100 text-emerald-800 text-xs"
														>
															{amenity}
														</Badge>
													))}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							</div>

							{/* Featured Listing */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Featured Listing
										</CardTitle>
										<CardDescription>
											Boost your property visibility
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
											<div className="flex items-center space-x-3 mb-3">
												<span className="text-2xl">⭐</span>
												<h4 className="font-semibold text-yellow-800">
													Featured Benefits
												</h4>
											</div>
											<ul className="text-yellow-700 text-sm space-y-1">
												<li>• Appear at top of search results</li>
												<li>• 3x more tenant views</li>
												<li>• Priority in recommendations</li>
												<li>• Special featured badge</li>
											</ul>
										</div>

										<div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
											<div className="space-y-0.5">
												<Label className="text-sm font-medium">
													Make Featured Listing
												</Label>
												<p className="text-xs text-gray-500">
													Pay for premium placement
												</p>
											</div>
											<Checkbox
												checked={formData.payForFeatured}
												onCheckedChange={(checked) =>
													setFormData({
														...formData,
														payForFeatured: checked as boolean,
													})
												}
												className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
											/>
										</div>

										{formData.payForFeatured && (
											<div className="space-y-4">
												<div className="space-y-2">
													<Label
														htmlFor="featuredDuration"
														className="text-sm font-semibold text-gray-700"
													>
														Featured Duration
													</Label>
													<Select
														value={formData.featuredDuration}
														onValueChange={(value) =>
															setFormData({
																...formData,
																featuredDuration: value,
															})
														}
													>
														<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="30">
																30 Days - {featuredCost.toLocaleString()} ETB
															</SelectItem>
															<SelectItem value="60">
																60 Days -{" "}
																{(featuredCost * 1.8).toLocaleString()} ETB
															</SelectItem>
															<SelectItem value="90">
																90 Days -{" "}
																{(featuredCost * 2.5).toLocaleString()} ETB
															</SelectItem>
														</SelectContent>
													</Select>
												</div>

												<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
													<div className="flex justify-between items-center">
														<span className="text-sm font-medium text-emerald-700">
															Total Featured Cost:
														</span>
														<span className="text-lg font-bold text-emerald-600">
															{(
																featuredCost *
																(formData.featuredDuration === "60"
																	? 1.8
																	: formData.featuredDuration === "90"
																	? 2.5
																	: 1)
															).toLocaleString()}{" "}
															ETB
														</span>
													</div>
													<p className="text-xs text-emerald-600 mt-1">
														Payment due after property approval
													</p>
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<div className="flex justify-end space-x-4">
							<Button
								type="button"
								variant="outline"
								asChild
								className="border-gray-300 hover:bg-gray-50"
							>
								<Link href="/dashboard/owner/properties">Cancel</Link>
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Adding Property...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>Add Property</span>
									</div>
								)}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
