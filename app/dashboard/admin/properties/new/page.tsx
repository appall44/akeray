"use client";

import { useState } from "react";
import {
	ArrowLeft,
	Save,
	Building,
	MapPin,
	DollarSign,
	Users,
	Camera,
	Plus,
	Home,
	Trash2,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function NewPropertyPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		city: "",
		propertyType: "",
		totalUnits: "",
		description: "",
		monthlyRent: "",
		deposit: "",
		amenities: [] as string[],
		ownerName: "",
		ownerEmail: "",
		ownerPhone: "",
		images: [] as string[],
		status: "active",
		units: [] as Array<{
			unitNumber: string;
			unitType: string;
			size: string;
			bedrooms: string;
			bathrooms: string;
			monthlyRent: string;
			status: string;
			description: string;
			images: string[];
		}>,
	});
	const router = useRouter();
	const { toast } = useToast();

	const amenitiesList = [
		"24/7 Security",
		"Parking Space",
		"Elevator Access",
		"Backup Generator",
		"Water Tank",
		"Internet Ready",
		"Balcony",
		"Modern Kitchen",
		"Air Conditioning",
		"Swimming Pool",
		"Gym/Fitness Center",
		"Garden/Green Space",
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const totalUnitsNum = parseInt(formData.totalUnits) || 0;
		if (
			["apartment", "commercial"].includes(formData.propertyType) &&
			totalUnitsNum > 0 &&
			formData.units.length !== totalUnitsNum
		) {
			setIsLoading(false);
			toast({
				title: "ስህተት / Error",
				description: `Please add exactly ${totalUnitsNum} unit(s) for this property.`,
				variant: "destructive",
			});
			return;
		}

		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "ንብረት ተጨምሯል / Property Added Successfully",
				description: `${formData.name} has been added to the system`,
			});
			router.push("/dashboard/admin/properties");
		}, 1500);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleAmenityChange = (amenity: string, checked: boolean) => {
		setFormData((prev) => ({
			...prev,
			amenities: checked
				? [...prev.amenities, amenity]
				: prev.amenities.filter((a) => a !== amenity),
		}));
	};

	const handleUnitChange = (index: number, field: string, value: string) => {
		setFormData((prev) => {
			const newUnits = [...prev.units];
			newUnits[index] = { ...newUnits[index], [field]: value };
			return { ...prev, units: newUnits };
		});
	};

	const handleUnitImageChange = (index: number, images: string[]) => {
		setFormData((prev) => {
			const newUnits = [...prev.units];
			newUnits[index] = { ...newUnits[index], images };
			return { ...prev, units: newUnits };
		});
	};

	const addUnit = () => {
		const totalUnitsNum = parseInt(formData.totalUnits) || 0;
		if (formData.units.length >= totalUnitsNum) {
			toast({
				title: "ስህተት / Error",
				description: `Cannot add more than ${totalUnitsNum} unit(s).`,
				variant: "destructive",
			});
			return;
		}
		setFormData((prev) => ({
			...prev,
			units: [
				...prev.units,
				{
					unitNumber: "",
					unitType: "apartment",
					size: "",
					bedrooms: "1",
					bathrooms: "1",
					monthlyRent: "",
					status: "vacant",
					description: "",
					images: [],
				},
			],
		}));
	};

	const removeUnit = (index: number) => {
		setFormData((prev) => ({
			...prev,
			units: prev.units.filter((_, i) => i !== index),
		}));
	};

	const isMultiUnitProperty = ["apartment", "commercial"].includes(
		formData.propertyType
	);

	return (
		<DashboardLayout
			userRole="admin"
			userName="አስተዳዳሪ አበበ / Admin Abebe"
			userEmail="admin@akeray.et"
		>
			<div className="space-y-6">
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
								አዲስ ንብረት ጨምር / Add New Property
							</h1>
							<p className="text-gray-600 mt-1">
								አዲስ ንብረት መረጃ ያስገቡ / Enter new property information
							</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Building className="h-5 w-5 text-emerald-600" />
										<span>የንብረት ዝርዝር / Property Details</span>
									</CardTitle>
									<CardDescription>
										መሰረታዊ የንብረት መረጃ / Basic property information
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="name">የንብረት ስም / Property Name *</Label>
										<Input
											id="name"
											value={formData.name}
											onChange={(e) =>
												handleInputChange("name", e.target.value)
											}
											placeholder="e.g., Sunrise Apartments"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="address">አድራሻ / Address *</Label>
										<div className="relative">
											<MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
											<Input
												id="address"
												className="pl-10"
												value={formData.address}
												onChange={(e) =>
													handleInputChange("address", e.target.value)
												}
												placeholder="Street address"
												required
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="city">ከተማ / City *</Label>
											<Input
												id="city"
												value={formData.city}
												onChange={(e) =>
													handleInputChange("city", e.target.value)
												}
												placeholder="City name"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="propertyType">
												የንብረት አይነት / Property Type *
											</Label>
											<Select
												value={formData.propertyType}
												onValueChange={(value) => {
													handleInputChange("propertyType", value);
													if (!["apartment", "commercial"].includes(value)) {
														setFormData((prev) => ({
															...prev,
															totalUnits: "1",
															units: [],
														}));
													}
												}}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="apartment">
														አፓርትመንት / Apartment
													</SelectItem>
													<SelectItem value="house">ቤት / House</SelectItem>
													<SelectItem value="commercial">
														ንግድ / Commercial
													</SelectItem>
													<SelectItem value="office">ቢሮ / Office</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="totalUnits">
											ጠቅላላ ክፍሎች / Total Units *
										</Label>
										<div className="relative">
											<Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
											<Input
												id="totalUnits"
												type="number"
												className="pl-10"
												value={formData.totalUnits}
												onChange={(e) =>
													handleInputChange("totalUnits", e.target.value)
												}
												placeholder="Number of units"
												disabled={["house", "office"].includes(
													formData.propertyType
												)}
												required
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="description">መግለጫ / Description</Label>
										<Textarea
											id="description"
											value={formData.description}
											onChange={(e) =>
												handleInputChange("description", e.target.value)
											}
											placeholder="Property description..."
											rows={3}
										/>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<DollarSign className="h-5 w-5 text-purple-600" />
										<span>የገንዘብ መረጃ / Financial Information</span>
									</CardTitle>
									<CardDescription>
										የክራይ እና ተቀማጭ መረጃ / Rent and deposit details
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="monthlyRent">
												ወርሃዊ ክራይ / Monthly Rent (ETB)
											</Label>
											<Input
												id="monthlyRent"
												type="number"
												value={formData.monthlyRent}
												onChange={(e) =>
													handleInputChange("monthlyRent", e.target.value)
												}
												placeholder="15000"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="deposit">
												ተቀማጭ / Security Deposit (ETB)
											</Label>
											<Input
												id="deposit"
												type="number"
												value={formData.deposit}
												onChange={(e) =>
													handleInputChange("deposit", e.target.value)
												}
												placeholder="30000"
											/>
										</div>
									</div>
								</CardContent>
							</Card>

							{isMultiUnitProperty && parseInt(formData.totalUnits) > 0 && (
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center space-x-2">
											<Home className="h-5 w-5 text-teal-600" />
											<span>ክፍሎች / Units</span>
										</CardTitle>
										<CardDescription>
											የንብረቱ ክፍሎች ዝርዝር / Add unit details for this property
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<Button
											type="button"
											variant="outline"
											className="mb-4"
											onClick={addUnit}
											disabled={
												formData.units.length >= parseInt(formData.totalUnits)
											}
										>
											<Plus className="h-4 w-4 mr-2" />
											ክፍል ጨምር / Add Unit
										</Button>
										{formData.units.map((unit, index) => (
											<div
												key={index}
												className="border rounded-lg p-4 space-y-4 bg-gray-50"
											>
												<div className="flex justify-between items-center">
													<h3 className="text-sm font-semibold">
														ክፍል {index + 1} / Unit {index + 1}
													</h3>
													<Button
														variant="ghost"
														size="sm"
														className="text-red-600 hover:text-red-700"
														onClick={() => removeUnit(index)}
													>
														<Trash2 className="h-4 w-4" />
														አስወግድ / Remove
													</Button>
												</div>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label htmlFor={`unitNumber-${index}`}>
															የክፍል ቁጥር / Unit Number *
														</Label>
														<Input
															id={`unitNumber-${index}`}
															value={unit.unitNumber}
															onChange={(e) =>
																handleUnitChange(
																	index,
																	"unitNumber",
																	e.target.value
																)
															}
															placeholder="e.g., 101"
															required
														/>
													</div>
													<div className="space-y-2">
														<Label htmlFor={`unitType-${index}`}>
															የክፍል አይነት / Unit Type *
														</Label>
														<Select
															value={unit.unitType}
															onValueChange={(value) =>
																handleUnitChange(index, "unitType", value)
															}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select type" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="apartment">
																	Apartment
																</SelectItem>
																<SelectItem value="studio">Studio</SelectItem>
																<SelectItem value="adu">ADU</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="space-y-2">
														<Label htmlFor={`size-${index}`}>
															መጠን / Size (sq ft)
														</Label>
														<Input
															id={`size-${index}`}
															type="number"
															value={unit.size}
															onChange={(e) =>
																handleUnitChange(index, "size", e.target.value)
															}
															placeholder="e.g., 800"
														/>
													</div>
													<div className="space-y-2">
														<Label htmlFor={`bedrooms-${index}`}>
															መኝታ ቤቶች / Bedrooms *
														</Label>
														<Select
															value={unit.bedrooms}
															onValueChange={(value) =>
																handleUnitChange(index, "bedrooms", value)
															}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select" />
															</SelectTrigger>
															<SelectContent>
																{[0, 1, 2, 3, 4, 5].map((num) => (
																	<SelectItem key={num} value={num.toString()}>
																		{num}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</div>
													<div className="space-y-2">
														<Label htmlFor={`bathrooms-${index}`}>
															መታጠቢያ ቤቶች / Bathrooms *
														</Label>
														<Select
															value={unit.bathrooms}
															onValueChange={(value) =>
																handleUnitChange(index, "bathrooms", value)
															}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select" />
															</SelectTrigger>
															<SelectContent>
																{[1, 1.5, 2, 2.5, 3].map((num) => (
																	<SelectItem key={num} value={num.toString()}>
																		{num}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</div>
													<div className="space-y-2">
														<Label htmlFor={`monthlyRent-${index}`}>
															ወርሃዊ ክራይ / Monthly Rent (ETB) *
														</Label>
														<Input
															id={`monthlyRent-${index}`}
															type="number"
															value={unit.monthlyRent}
															onChange={(e) =>
																handleUnitChange(
																	index,
																	"monthlyRent",
																	e.target.value
																)
															}
															placeholder="e.g., 10000"
															required
														/>
													</div>
													<div className="space-y-2">
														<Label htmlFor={`status-${index}`}>
															ሁኔታ / Status *
														</Label>
														<Select
															value={unit.status}
															onValueChange={(value) =>
																handleUnitChange(index, "status", value)
															}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="vacant">Vacant</SelectItem>
																<SelectItem value="occupied">
																	Occupied
																</SelectItem>
																<SelectItem value="maintenance">
																	Under Maintenance
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</div>
												<div className="space-y-2">
													<Label htmlFor={`description-${index}`}>
														መግለጫ / Description
													</Label>
													<Textarea
														id={`description-${index}`}
														value={unit.description}
														onChange={(e) =>
															handleUnitChange(
																index,
																"description",
																e.target.value
															)
														}
														placeholder="Unit description..."
														rows={3}
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor={`images-${index}`}>
														የክፍል ምስሎች / Unit Images
													</Label>
													<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
														<Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
														<p className="text-gray-600 mb-2">
															ምስሎችን ይጎትቱ ወይም ይጫኑ / Drag images here or click to
															upload
														</p>
														<Button
															variant="outline"
															type="button"
															onClick={() =>
																handleUnitImageChange(index, [
																	...unit.images,
																	`/placeholder-unit-${index}.jpg`,
																])
															}
														>
															<Plus className="h-4 w-4 mr-2" />
															ምስል ጨምር / Add Images
														</Button>
													</div>
												</div>
											</div>
										))}
									</CardContent>
								</Card>
							)}
						</div>

						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Users className="h-5 w-5 text-blue-600" />
										<span>የባለቤት መረጃ / Owner Information</span>
									</CardTitle>
									<CardDescription>
										የንብረት ባለቤት ዝርዝር / Property owner details
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="ownerName">የባለቤት ስም / Owner Name *</Label>
										<Input
											id="ownerName"
											value={formData.ownerName}
											onChange={(e) =>
												handleInputChange("ownerName", e.target.value)
											}
											placeholder="Owner full name"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="ownerEmail">
											የባለቤት ኢሜይል / Owner Email *
										</Label>
										<Input
											id="ownerEmail"
											type="email"
											value={formData.ownerEmail}
											onChange={(e) =>
												handleInputChange("ownerEmail", e.target.value)
											}
											placeholder="owner@example.com"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="ownerPhone">
											የባለቤት ስልክ / Owner Phone *
										</Label>
										<Input
											id="ownerPhone"
											value={formData.ownerPhone}
											onChange={(e) =>
												handleInputChange("ownerPhone", e.target.value)
											}
											placeholder="+251911234567"
											required
										/>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Building className="h-5 w-5 text-orange-600" />
										<span>ተጨማሪ አገልግሎቶች / Amenities</span>
									</CardTitle>
									<CardDescription>
										የንብረቱ ተጨማሪ አገልግሎቶች / Available property amenities
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 gap-3">
										{amenitiesList.map((amenity) => (
											<div
												key={amenity}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={amenity}
													checked={formData.amenities.includes(amenity)}
													onCheckedChange={(checked) =>
														handleAmenityChange(amenity, checked as boolean)
													}
												/>
												<Label
													htmlFor={amenity}
													className="text-sm cursor-pointer"
												>
													{amenity}
												</Label>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Camera className="h-5 w-5 text-green-600" />
										<span>የንብረት ምስሎች / Property Images</span>
									</CardTitle>
									<CardDescription>
										የንብረቱ ምስሎች ይጨምሩ / Add property images
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
										<Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
										<p className="text-gray-600 mb-2">
											ምስሎችን ይጎትቱ ወይም ይጫኑ / Drag images here or click to upload
										</p>
										<Button
											variant="outline"
											type="button"
											onClick={() =>
												setFormData((prev) => ({
													...prev,
													images: [...prev.images, "/placeholder-property.jpg"],
												}))
											}
										>
											<Plus className="h-4 w-4 mr-2" />
											ምስል ጨምር / Add Images
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<div className="flex justify-end space-x-4">
						<Button variant="outline" type="button" asChild>
							<Link href="/dashboard/admin/properties">ተወው / Cancel</Link>
						</Button>
						<Button
							type="submit"
							className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
									<span>በመጨመር ላይ... / Adding...</span>
								</div>
							) : (
								<div className="flex items-center space-x-2">
									<Save className="h-4 w-4" />
									<span>ንብረት ጨምር / Add Property</span>
								</div>
							)}
						</Button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
