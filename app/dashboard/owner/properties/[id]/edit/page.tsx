"use client";

import { useState } from "react";
import {
	Building,
	Upload,
	MapPin,
	DollarSign,
	ArrowLeft,
	Save,
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
import { useParams, useRouter } from "next/navigation";
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

// Mock existing property data
const existingProperty = {
	name: "Bole Apartments",
	description:
		"Modern apartment complex located in the heart of Bole, featuring contemporary amenities and excellent connectivity to major business districts.",
	type: "apartment",
	address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	city: "Addis Ababa",
	area: "Bole",
	googleMapLink: "https://maps.google.com/...",
	totalUnits: 12,
	pricePerUnit: "15000",
	bedrooms: 2,
	bathrooms: 2,
	squareMeters: "85",
	amenities: [
		"24/7 Security",
		"Parking Space",
		"WiFi Ready",
		"Backup Generator",
		"Water Tank",
		"Elevator",
	],
	status: "active",
	featured: true,
	existingImages: [
		"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
		"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
	],
};

export default function EditPropertyPage() {
	const params = useParams();
	const [formData, setFormData] = useState({
		...existingProperty,
		newImages: [] as File[],
		imagesToRemove: [] as number[],
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const totalImages =
			formData.existingImages.length -
			formData.imagesToRemove.length +
			formData.newImages.length;
		if (files.length + totalImages > 10) {
			setError("Maximum 10 images allowed");
			return;
		}
		setFormData({ ...formData, newImages: [...formData.newImages, ...files] });
	};

	const removeNewImage = (index: number) => {
		const newImages = formData.newImages.filter((_, i) => i !== index);
		setFormData({ ...formData, newImages });
	};

	const removeExistingImage = (index: number) => {
		setFormData({
			...formData,
			imagesToRemove: [...formData.imagesToRemove, index],
		});
	};

	const restoreExistingImage = (index: number) => {
		setFormData({
			...formData,
			imagesToRemove: formData.imagesToRemove.filter((i) => i !== index),
		});
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

		const remainingImages =
			formData.existingImages.length -
			formData.imagesToRemove.length +
			formData.newImages.length;
		if (remainingImages === 0) {
			setError("Please keep at least one property image");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Property Updated Successfully!",
				description: `${formData.name} has been updated with your changes.`,
			});
			router.push(`/dashboard/owner/properties/${params.id}`);
		}, 2000);
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
					<div className="flex items-center space-x-4 mb-6">
						<Button
							variant="outline"
							asChild
							className="border-emerald-300 hover:bg-emerald-50"
						>
							<Link href={`/dashboard/owner/properties/${params.id}`}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Property Details
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Edit Property
						</h1>
						<p className="text-lg text-gray-600">
							Update your property information and settings
						</p>
						<p className="text-sm text-gray-500">
							Make changes to attract more tenants and optimize your listing
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
											Update essential property details
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
														<SelectValue />
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
												placeholder="Describe your property features..."
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

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

											<div className="space-y-2">
												<Label
													htmlFor="status"
													className="text-sm font-semibold text-gray-700"
												>
													Property Status
												</Label>
												<Select
													value={formData.status}
													onValueChange={(value) =>
														setFormData({ ...formData, status: value })
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="active">Active</SelectItem>
														<SelectItem value="inactive">Inactive</SelectItem>
														<SelectItem value="maintenance">
															Under Maintenance
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Images Management */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Manage Images
										</CardTitle>
										<CardDescription>
											Update property photos and gallery
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										{/* Existing Images */}
										{formData.existingImages.length > 0 && (
											<div>
												<h4 className="font-semibold text-gray-900 mb-3">
													Current Images
												</h4>
												<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
													{formData.existingImages.map((image, index) => (
														<div key={index} className="relative group">
															<img
																src={image}
																alt={`Property ${index + 1}`}
																className={`w-full h-32 object-cover rounded-lg border-2 transition-all ${
																	formData.imagesToRemove.includes(index)
																		? "border-red-300 opacity-50 grayscale"
																		: "border-gray-200"
																}`}
															/>
															{index === 0 &&
																!formData.imagesToRemove.includes(index) && (
																	<Badge className="absolute top-2 left-2 bg-emerald-500 text-white">
																		Main Photo
																	</Badge>
																)}
															{formData.imagesToRemove.includes(index) ? (
																<Button
																	type="button"
																	variant="outline"
																	size="sm"
																	className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 bg-white border-emerald-300"
																	onClick={() => restoreExistingImage(index)}
																>
																	↶
																</Button>
															) : (
																<Button
																	type="button"
																	variant="destructive"
																	size="sm"
																	className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
																	onClick={() => removeExistingImage(index)}
																>
																	<X className="h-3 w-3" />
																</Button>
															)}
														</div>
													))}
												</div>
											</div>
										)}

										{/* Add New Images */}
										<div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
											<Camera className="mx-auto h-10 w-10 text-gray-400 mb-3" />
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-700">
													Add More Images
												</p>
												<p className="text-xs text-gray-500">
													JPG, PNG up to 5MB each
												</p>
												<input
													type="file"
													id="newImages"
													accept="image/*"
													multiple
													onChange={handleImageUpload}
													className="hidden"
												/>
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() =>
														document.getElementById("newImages")?.click()
													}
													className="border-emerald-300 hover:bg-emerald-50"
												>
													<Upload className="h-4 w-4 mr-2" />
													Choose Images
												</Button>
											</div>
										</div>

										{/* New Images Preview */}
										{formData.newImages.length > 0 && (
											<div>
												<h4 className="font-semibold text-gray-900 mb-3">
													New Images to Add
												</h4>
												<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
													{formData.newImages.map((image, index) => (
														<div key={index} className="relative group">
															<img
																src={URL.createObjectURL(image)}
																alt={`New ${index + 1}`}
																className="w-full h-32 object-cover rounded-lg border-2 border-emerald-200"
															/>
															<Badge className="absolute top-2 left-2 bg-emerald-500 text-white">
																New
															</Badge>
															<Button
																type="button"
																variant="destructive"
																size="sm"
																className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
																onClick={() => removeNewImage(index)}
															>
																<X className="h-3 w-3" />
															</Button>
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
											Update Amenities
										</CardTitle>
										<CardDescription>
											Modify available amenities
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

							{/* Property Settings */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Property Settings
										</CardTitle>
										<CardDescription>
											Update property configurations
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
											<div className="space-y-0.5">
												<Label className="text-sm font-medium">
													Featured Listing
												</Label>
												<p className="text-xs text-gray-500">
													Premium placement in search
												</p>
											</div>
											<Checkbox
												checked={formData.featured}
												onCheckedChange={(checked) =>
													setFormData({
														...formData,
														featured: checked as boolean,
													})
												}
												className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
											/>
										</div>

										<div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
											<h4 className="font-semibold text-blue-800 mb-2">
												Update Tips
											</h4>
											<ul className="text-blue-700 text-sm space-y-1">
												<li>• Update photos regularly for better engagement</li>
												<li>• Competitive pricing attracts more tenants</li>
												<li>• Accurate amenities improve search results</li>
												<li>• Featured listings get 3x more views</li>
											</ul>
										</div>
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
								<Link href={`/dashboard/owner/properties/${params.id}`}>
									Cancel
								</Link>
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Updating Property...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>Update Property</span>
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
