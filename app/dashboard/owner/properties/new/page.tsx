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
	X,
	Home,
	Trash2,
	Upload,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const propertyTypes = [
	{ value: "apartment", label: "Apartment / አፓርትመንት", icon: "🏢" },
	{ value: "house", label: "House / ቤት", icon: "🏠" },
	{ value: "villa", label: "Villa / ቪላ", icon: "🏡" },
	{ value: "shop", label: "Shop / ሱቅ", icon: "🏪" },
	{ value: "office", label: "Office / ቢሮ", icon: "🏢" },
	{ value: "warehouse", label: "Warehouse / መጋዘን", icon: "🏭" },
];

const amenitiesList = [
	"24/7 Security / ቀን ሙሉ ጥበቃ",
	"Parking Space / መኪና ማቆሚያ",
	"WiFi Ready / ዋይፋይ ዝግጁ",
	"Backup Generator / ተጠባባቂ ጀነሬተር",
	"Water Tank / የውሃ ታንክ",
	"Elevator / ሊፍት",
	"Garden/Yard / የአትክልት ቦታ",
	"Swimming Pool / መዋኛ",
	"Gym/Fitness Center / ጂም",
	"Balcony/Terrace / በረንዳ",
	"Air Conditioning / አየር ማቀዝቀዣ",
	"Fully Furnished / ሙሉ በሙሉ የተገጠመ",
	"Modern Kitchen / ዘመናዊ ወጥ ቤት",
	"Laundry Room / የልብስ ማጠቢያ ክፍል",
	"Storage Space / ማከማቻ",
	"CCTV Surveillance / ሲሲቲቪ ክትትል",
];

const ethiopianCities = [
	"Addis Ababa / አዲስ አበባ",
	"Dire Dawa / ድሬ ዳዋ",
	"Mekelle / መቀሌ",
	"Gondar / ጎንደር",
	"Hawassa / ሀዋሳ",
	"Bahir Dar / ባህር ዳር",
	"Dessie / ደሴ",
	"Jimma / ጅማ",
	"Jijiga / ጂጂጋ",
	"Shashamane / ሻሸመኔ",
];

const addisAbabaAreas = [
	"Bole / ቦሌ",
	"Kazanchis / ቃዛንቺስ",
	"Piassa / ፒያሳ",
	"CMC / ሲኤምሲ",
	"Gerji / ገርጂ",
	"Megenagna / መገናኛ",
	"Sarbet / ሳርቤት",
	"Arat Kilo / አራት ኪሎ",
	"6 Kilo / 6 ኪሎ",
	"22 Mazoria / 22 ማዞሪያ",
	"Hayat / ሃያት",
	"Lebu / ለቡ",
];

interface FormData {
	name: string;
	description: string;
	type: string;
	address: string;
	city: string;
	area: string;
	googleMapLink: string;
	hasUnits: boolean;
	totalUnits: string;
	listingType: "rent" | "sell" | "both";
	monthlyRent: string;
	deposit: string;
	minLeaseTerm: string;
	salePrice: string;
	pricePerSqm: string;
	bedrooms: string;
	bathrooms: string;
	squareMeters: string;
	amenities: string[];
	images: File[];
	status: string;
	payForFeatured: boolean;
	featuredDuration: string;
	units: Array<{
		unitNumber: string;
		unitType: string;
		size: string;
		bedrooms: string;
		bathrooms: string;
		listingType: string;
		monthlyRent: string;
		salePrice: string;
		minLeaseTerm: string;
		status: string;
		description: string;
		images: File[];
	}>;
}

export default function OwnerAddPropertyPage() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		description: "",
		type: "",
		address: "",
		city: "Addis Ababa / አዲስ አበባ",
		area: "",
		googleMapLink: "",
		hasUnits: false,
		totalUnits: "0",
		listingType: "rent",
		monthlyRent: "",
		deposit: "",
		minLeaseTerm: "6",
		salePrice: "",
		pricePerSqm: "",
		bedrooms: "1",
		bathrooms: "1",
		squareMeters: "",
		amenities: [],
		images: [],
		status: "active",
		payForFeatured: false,
		featuredDuration: "30",
		units: [],
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleCheckboxChange = (field: string, checked: boolean) => {
		setFormData((prev) => ({
			...prev,
			[field]: checked,
			totalUnits: field === "hasUnits" && !checked ? "0" : prev.totalUnits,
			units: field === "hasUnits" && !checked ? [] : prev.units,
		}));
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length + formData.images.length > 10) {
			setError("Maximum 10 images allowed / ከፍተኛ 10 ምስሎች ተፈቅደዋል");
			return;
		}
		setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
	};

	const handleUnitImageUpload = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = Array.from(e.target.files || []);
		if (files.length + formData.units[index].images.length > 10) {
			setError(
				`Maximum 10 images allowed for unit ${index + 1} / ከፍተኛ 10 ምስሎች ለክፍል ${
					index + 1
				} ተፈቅደዋል`
			);
			return;
		}
		setFormData((prev) => {
			const newUnits = [...prev.units];
			newUnits[index] = {
				...newUnits[index],
				images: [...newUnits[index].images, ...files],
			};
			return { ...prev, units: newUnits };
		});
	};

	const removeImage = (index: number) => {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}));
	};

	const removeUnitImage = (unitIndex: number, imageIndex: number) => {
		setFormData((prev) => {
			const newUnits = [...prev.units];
			newUnits[unitIndex] = {
				...newUnits[unitIndex],
				images: newUnits[unitIndex].images.filter((_, i) => i !== imageIndex),
			};
			return { ...prev, units: newUnits };
		});
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

	const addUnit = () => {
		const totalUnitsNum = parseInt(formData.totalUnits) || 0;
		if (!formData.hasUnits) {
			toast({
				title: "ስህተት / Error",
				description:
					"Please enable units for this property / እባክዎ ለዚህ ንብረት ክፍሎችን ያንቁ",
				variant: "destructive",
			});
			return;
		}
		if (formData.units.length >= totalUnitsNum) {
			toast({
				title: "ስህተት / Error",
				description: `Cannot add more than ${totalUnitsNum} unit(s) / ከ${totalUnitsNum} ክፍሎች በላይ መጨመር አይቻልም`,
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
					listingType: formData.listingType,
					monthlyRent: "",
					salePrice: "",
					minLeaseTerm: "6",
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		if (
			!formData.name ||
			!formData.type ||
			!formData.address ||
			!formData.city ||
			!formData.area
		) {
			setError("Please fill in all required fields / እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ");
			setIsLoading(false);
			return;
		}

		if (formData.images.length === 0) {
			setError(
				"Please upload at least one property image / እባክዎ ቢያንስ አንድ የንብረት ምስል ይጫኑ"
			);
			setIsLoading(false);
			return;
		}

		if (
			(formData.listingType === "rent" || formData.listingType === "both") &&
			(!formData.monthlyRent || parseFloat(formData.monthlyRent) <= 0)
		) {
			setError(
				"Please provide a valid monthly rent amount / እባክዎ ትክክለኛ ወርሃዊ ክራይ መጠን ያቅርቡ"
			);
			setIsLoading(false);
			return;
		}

		if (
			(formData.listingType === "sell" || formData.listingType === "both") &&
			(!formData.salePrice || parseFloat(formData.salePrice) <= 0)
		) {
			setError("Please provide a valid sale price / እባክዎ ትክክለኛ የሽያጭ ዋጋ ያቅርቡ");
			setIsLoading(false);
			return;
		}

		const totalUnitsNum = parseInt(formData.totalUnits) || 0;
		if (
			formData.hasUnits &&
			totalUnitsNum > 0 &&
			formData.units.length !== totalUnitsNum
		) {
			setError(
				`Please add exactly ${totalUnitsNum} unit(s) for this property / እባክዎ ለዚህ ንብረት በትክክል ${totalUnitsNum} ክፍሎችን ይጨምሩ`
			);
			setIsLoading(false);
			return;
		}

		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "ንብረት ተጨምሯል / Property Added Successfully",
				description: `${formData.name} has been added to your portfolio with ${formData.totalUnits} unit(s) / ${formData.name} ከ${formData.totalUnits} ክፍሎች ጋር ወደ ፖርትፎሊዮዎ ተጨምሯል`,
			});
			router.push("/dashboard/owner/properties");
		}, 1500);
	};

	const featuredCost = parseInt(formData.totalUnits) * 500;

	return (
		<DashboardLayout
			userRole="owner"
			userName="Mulugeta Assefa"
			userEmail="mulugeta@akeray.et"
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
				{/* Header */}
				<div className="animate-in fade-in duration-1000 mb-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								Add New Property / አዲስ ንብረት ጨምር
							</h1>
							<p className="text-base text-gray-600 mt-1">
								List your property on Akeray marketplace and start earning /
								ንብረትዎን በአከራይ ገበያ ያስተዋውቁ እና ገቢ መፍጠር ይጀምሩ
							</p>
							<p className="text-sm text-gray-500 mt-1">
								Fill in all property details to attract quality tenants / ጥራት
								ያላቸውን ተከራዮች ለመሳብ ሁሉንም የንብረት ዝርዝሮች ይሙሉ
							</p>
						</div>
						<Button
							variant="outline"
							asChild
							className="border-emerald-300 hover:bg-emerald-50 h-10 rounded-xl w-fit"
						>
							<Link href="/dashboard/owner/properties">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Properties / ወደ ንብረቶች ተመለስ
							</Link>
						</Button>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
						<div className="xl:col-span-2 space-y-6">
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Property Information / የንብረት መረጃ
										</CardTitle>
										<CardDescription>
											Essential details about your property / ስለ ንብረትዎ መሰረታዊ
											ዝርዝሮች
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										{error && (
											<Alert variant="destructive" className="rounded-xl">
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}
										<div className="space-y-2">
											<Label className="text-sm font-semibold text-gray-700">
												Listing Type / የዝርዝር አይነት *
											</Label>
											<RadioGroup
												value={formData.listingType}
												onValueChange={(value) =>
													setFormData((prev) => ({
														...prev,
														listingType: value as "rent" | "sell" | "both",
														units: prev.units.map((unit) => ({
															...unit,
															listingType: value,
														})),
													}))
												}
												className="flex flex-col sm:flex-row gap-4"
											>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="rent" id="rent" />
													<Label htmlFor="rent">For Rent / ለኪራይ</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="sell" id="sell" />
													<Label htmlFor="sell">For Sale / ለሽያጭ</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="both" id="both" />
													<Label htmlFor="both">
														Both Rent & Sale / ለኪራይ እና ለሽያጭ
													</Label>
												</div>
											</RadioGroup>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="name"
												className="text-sm font-semibold text-gray-700"
											>
												Property Name / የንብረት ስም *
											</Label>
											<Input
												id="name"
												placeholder="e.g., Bole Modern Apartments / ለምሳሌ፣ ቦሌ ዘመናዊ አፓርትመንቶች"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
												value={formData.name}
												onChange={(e) =>
													handleInputChange("name", e.target.value)
												}
												required
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="description"
												className="text-sm font-semibold text-gray-700"
											>
												Property Description / የንብረት መግለጫ *
											</Label>
											<Textarea
												id="description"
												placeholder="Describe your property features... / የንብረትዎን ባህሪያት ይግለጹ..."
												className="min-h-32 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
												value={formData.description}
												onChange={(e) =>
													handleInputChange("description", e.target.value)
												}
												required
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="type"
													className="text-sm font-semibold text-gray-700"
												>
													Property Type / የንብረት አይነት *
												</Label>
												<Select
													value={formData.type}
													onValueChange={(value) =>
														handleInputChange("type", value)
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
														<SelectValue placeholder="Select property type / የንብረት አይነት ይምረጡ" />
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
											<div className="space-y-2">
												<Label
													htmlFor="squareMeters"
													className="text-sm font-semibold text-gray-700"
												>
													Area (Square Meters) / መጠን (ካሬ ሜትር)
												</Label>
												<Input
													id="squareMeters"
													type="number"
													placeholder="85"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
													value={formData.squareMeters}
													onChange={(e) =>
														handleInputChange("squareMeters", e.target.value)
													}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="bedrooms"
													className="text-sm font-semibold text-gray-700"
												>
													Bedrooms / መኝታ ቤቶች
												</Label>
												<Input
													id="bedrooms"
													type="number"
													min="0"
													placeholder="1"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
													value={formData.bedrooms}
													onChange={(e) =>
														handleInputChange("bedrooms", e.target.value)
													}
												/>
											</div>
											<div className="space-y-2">
												<Label
													htmlFor="bathrooms"
													className="text-sm font-semibold text-gray-700"
												>
													Bathrooms / መታጠቢያ ቤቶች
												</Label>
												<Input
													id="bathrooms"
													type="number"
													min="1"
													placeholder="1"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
													value={formData.bathrooms}
													onChange={(e) =>
														handleInputChange("bathrooms", e.target.value)
													}
												/>
											</div>
										</div>
										<div className="space-y-2">
											<div className="flex items-center space-x-2">
												<Checkbox
													id="hasUnits"
													checked={formData.hasUnits}
													onCheckedChange={(checked) =>
														handleCheckboxChange("hasUnits", checked as boolean)
													}
													className="border-gray-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
												/>
												<Label
													htmlFor="hasUnits"
													className="text-sm cursor-pointer"
												>
													Property has units / ንብረቱ ክፍሎች አሉት
												</Label>
											</div>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="totalUnits"
												className="text-sm font-semibold text-gray-700"
											>
												Total Units / ጠቅላላ ክፍሎች *
											</Label>
											<div className="relative">
												<Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="totalUnits"
													type="number"
													min="0"
													placeholder="Number of units / የክፍሎች ብዛት"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
													value={formData.totalUnits}
													onChange={(e) =>
														handleInputChange("totalUnits", e.target.value)
													}
													disabled={!formData.hasUnits}
													required={formData.hasUnits}
												/>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{(formData.listingType === "rent" ||
								formData.listingType === "both") && (
								<div
									className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
									style={{ animationFillMode: "forwards" }}
								>
									<Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
										<CardHeader>
											<CardTitle className="text-xl font-bold text-gray-900">
												Rental Information / የክራይ መረጃ
											</CardTitle>
											<CardDescription>
												Rent and deposit details / የክራይ እና ተቀማጭ መረጃ
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-6">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label
														htmlFor="monthlyRent"
														className="text-sm font-semibold text-gray-700"
													>
														Monthly Rent (ETB) / ወርሃዊ ክራይ (ብር) *
													</Label>
													<div className="relative">
														<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
														<Input
															id="monthlyRent"
															type="number"
															placeholder="15000"
															className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
															value={formData.monthlyRent}
															onChange={(e) =>
																handleInputChange("monthlyRent", e.target.value)
															}
															required
														/>
													</div>
												</div>
												<div className="space-y-2">
													<Label
														htmlFor="deposit"
														className="text-sm font-semibold text-gray-700"
													>
														Security Deposit (ETB) / ተቀማጭ (ብር) *
													</Label>
													<div className="relative">
														<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
														<Input
															id="deposit"
															type="number"
															placeholder="30000"
															className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
															value={formData.deposit}
															onChange={(e) =>
																handleInputChange("deposit", e.target.value)
															}
															required
														/>
													</div>
												</div>
											</div>
											<div className="space-y-2">
												<Label
													htmlFor="minLeaseTerm"
													className="text-sm font-semibold text-gray-700"
												>
													Minimum Lease Term (Months) / ዝቅተኛ የኪራይ ጊዜ (ወራት) *
												</Label>
												<Select
													value={formData.minLeaseTerm}
													onValueChange={(value) =>
														handleInputChange("minLeaseTerm", value)
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="1">1 Month / 1 ወር</SelectItem>
														<SelectItem value="3">3 Months / 3 ወራት</SelectItem>
														<SelectItem value="6">6 Months / 6 ወራት</SelectItem>
														<SelectItem value="12">
															12 Months / 12 ወራት
														</SelectItem>
														<SelectItem value="24">
															24 Months / 24 ወራት
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</CardContent>
									</Card>
								</div>
							)}

							{(formData.listingType === "sell" ||
								formData.listingType === "both") && (
								<div
									className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
									style={{ animationFillMode: "forwards" }}
								>
									<Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
										<CardHeader>
											<CardTitle className="text-xl font-bold text-gray-900">
												Sale Information / የሽያጭ መረጃ
											</CardTitle>
											<CardDescription>
												Sale price and details / የሽያጭ ዋጋ እና ዝርዝሮች
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-6">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label
														htmlFor="salePrice"
														className="text-sm font-semibold text-gray-700"
													>
														Sale Price (ETB) / የሽያጭ ዋጋ (ብር) *
													</Label>
													<div className="relative">
														<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
														<Input
															id="salePrice"
															type="number"
															placeholder="5000000"
															className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
															value={formData.salePrice}
															onChange={(e) =>
																handleInputChange("salePrice", e.target.value)
															}
															required
														/>
													</div>
												</div>
												<div className="space-y-2">
													<Label
														htmlFor="pricePerSqm"
														className="text-sm font-semibold text-gray-700"
													>
														Price per Sqm (ETB) / ዋጋ በካሬ ሜትር (ብር) *
													</Label>
													<div className="relative">
														<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
														<Input
															id="pricePerSqm"
															type="number"
															placeholder="75000"
															className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
															value={formData.pricePerSqm}
															onChange={(e) =>
																handleInputChange("pricePerSqm", e.target.value)
															}
															required
														/>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							)}

							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1200"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Property Images / የንብረት ምስሎች
										</CardTitle>
										<CardDescription>
											Upload high-quality images to attract more tenants (Max 10
											images) / ተጨማሪ ተከራዮችን ለመሳብ ከፍተኛ ጥራት ያላቸውን ምስሎች ይጫኑ (ከፍተኛ
											10 ምስሎች)
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors duration-300">
											<Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-700">
													Upload property images / የንብረት ምስሎችን ይጫኑ
												</p>
												<p className="text-xs text-gray-500">
													JPG, PNG up to 5MB each. First image will be the main
													photo. / JPG፣ PNG እስከ 5MB እያንዳንዳቸው። የመጀመሪያው ምስል ዋና ፎቶ
													ይሆናል።
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
													className="border-emerald-300 hover:bg-emerald-50 h-12 rounded-xl"
												>
													<Upload className="h-4 w-4 mr-2" />
													Choose Images / ምስሎችን ይምረጡ
												</Button>
											</div>
										</div>
										{formData.images.length > 0 && (
											<div>
												<p className="text-sm font-medium text-gray-700 mb-3">
													Uploaded Images ({formData.images.length}/10) / የተጫኑ
													ምስሎች ({formData.images.length}/10)
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
																	Main Photo / ዋና ፎቶ
																</Badge>
															)}
															<Button
																type="button"
																variant="destructive"
																size="sm"
																className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

							{formData.hasUnits && parseInt(formData.totalUnits) > 0 && (
								<div
									className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1500"
									style={{ animationFillMode: "forwards" }}
								>
									<Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
										<CardHeader>
											<CardTitle className="text-xl font-bold text-gray-900">
												Units / ክፍሎች
											</CardTitle>
											<CardDescription>
												Add unit details for this property / ለዚህ ንብረት የክፍል
												ዝርዝሮችን ይጨምሩ
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-6">
											<Button
												type="button"
												variant="outline"
												className="mb-4 border-emerald-300 hover:bg-emerald-50 h-12 rounded-xl"
												onClick={addUnit}
												disabled={
													formData.units.length >= parseInt(formData.totalUnits)
												}
											>
												<Plus className="h-4 w-4 mr-2" />
												Add Unit / ክፍል ጨምር
											</Button>
											{formData.units.map((unit, index) => (
												<div
													key={index}
													className="border rounded-xl p-6 space-y-4 bg-gray-50"
												>
													<div className="flex justify-between items-center">
														<h3 className="text-sm font-semibold">
															Unit {index + 1} / ክፍል {index + 1}
														</h3>
														<Button
															variant="ghost"
															size="sm"
															className="text-red-600 hover:text-red-700"
															onClick={() => removeUnit(index)}
														>
															<Trash2 className="h-4 w-4" />
															Remove / አስወግድ
														</Button>
													</div>
													<div className="space-y-2">
														<Label className="text-sm font-semibold text-gray-700">
															Unit Listing Type / የክፍል ዝርዝር አይነት *
														</Label>
														<RadioGroup
															value={unit.listingType}
															onValueChange={(value) =>
																handleUnitChange(index, "listingType", value)
															}
															className="flex flex-col sm:flex-row gap-4"
														>
															<div className="flex items-center space-x-2">
																<RadioGroupItem
																	value="rent"
																	id={`rent-${index}`}
																/>
																<Label htmlFor={`rent-${index}`}>
																	For Rent / ለኪራይ
																</Label>
															</div>
															<div className="flex items-center space-x-2">
																<RadioGroupItem
																	value="sell"
																	id={`sell-${index}`}
																/>
																<Label htmlFor={`sell-${index}`}>
																	For Sale / ለሽያጭ
																</Label>
															</div>
															<div className="flex items-center space-x-2">
																<RadioGroupItem
																	value="both"
																	id={`both-${index}`}
																/>
																<Label htmlFor={`both-${index}`}>
																	Both / ለኪራይ እና ለሽያጭ
																</Label>
															</div>
														</RadioGroup>
													</div>
													<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
														<div className="space-y-2">
															<Label
																htmlFor={`unitNumber-${index}`}
																className="text-sm font-semibold text-gray-700"
															>
																Unit Number / የክፍል ቁጥር *
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
																className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
																required
															/>
														</div>
														<div className="space-y-2">
															<Label
																htmlFor={`unitType-${index}`}
																className="text-sm font-semibold text-gray-700"
															>
																Unit Type / የክፍል አይነት *
															</Label>
															<Select
																value={unit.unitType}
																onValueChange={(value) =>
																	handleUnitChange(index, "unitType", value)
																}
															>
																<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
																	<SelectValue placeholder="Select type / አይነት ይምረጡ" />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="apartment">
																		Apartment / አፓርትመንት
																	</SelectItem>
																	<SelectItem value="studio">
																		Studio / ስቱዲዮ
																	</SelectItem>
																	<SelectItem value="adu">
																		ADU / ተጨማሪ መኖሪያ
																	</SelectItem>
																</SelectContent>
															</Select>
														</div>
														<div className="space-y-2">
															<Label
																htmlFor={`size-${index}`}
																className="text-sm font-semibold text-gray-700"
															>
																Size (sq m) / መጠን (ካሬ ሜትር)
															</Label>
															<Input
																id={`size-${index}`}
																type="number"
																value={unit.size}
																onChange={(e) =>
																	handleUnitChange(
																		index,
																		"size",
																		e.target.value
																	)
																}
																placeholder="e.g., 80"
																className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
															/>
														</div>
														<div className="space-y-2">
															<Label
																htmlFor={`bedrooms-${index}`}
																className="text-sm font-semibold text-gray-700"
															>
																Bedrooms / መኝታ ቤቶች *
															</Label>
															<Select
																value={unit.bedrooms}
																onValueChange={(value) =>
																	handleUnitChange(index, "bedrooms", value)
																}
															>
																<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
																	<SelectValue placeholder="Select / ይምረጡ" />
																</SelectTrigger>
																<SelectContent>
																	{[0, 1, 2, 3, 4, 5].map((num) => (
																		<SelectItem
																			key={num}
																			value={num.toString()}
																		>
																			{num}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
														</div>
														<div className="space-y-2">
															<Label
																htmlFor={`bathrooms-${index}`}
																className="text-sm font-semibold text-gray-700"
															>
																Bathrooms / መታጠቢያ ቤቶች *
															</Label>
															<Select
																value={unit.bathrooms}
																onValueChange={(value) =>
																	handleUnitChange(index, "bathrooms", value)
																}
															>
																<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
																	<SelectValue placeholder="Select / ይምረጡ" />
																</SelectTrigger>
																<SelectContent>
																	{[1, 1.5, 2, 2.5, 3].map((num) => (
																		<SelectItem
																			key={num}
																			value={num.toString()}
																		>
																			{num}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
														</div>
														<div className="space-y-2">
															<Label
																htmlFor={`status-${index}`}
																className="text-sm font-semibold text-gray-700"
															>
																Status / ሁኔታ *
															</Label>
															<Select
																value={unit.status}
																onValueChange={(value) =>
																	handleUnitChange(index, "status", value)
																}
															>
																<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
																	<SelectValue placeholder="Select / ይምረጡ" />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="vacant">
																		Vacant / ባዶ
																	</SelectItem>
																	<SelectItem value="occupied">
																		Occupied / ተይዟል
																	</SelectItem>
																	<SelectItem value="maintenance">
																		Under Maintenance / በጥገና ላይ
																	</SelectItem>
																</SelectContent>
															</Select>
														</div>
													</div>
													{(unit.listingType === "rent" ||
														unit.listingType === "both") && (
														<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
															<div className="space-y-2">
																<Label
																	htmlFor={`monthlyRent-${index}`}
																	className="text-sm font-semibold text-gray-700"
																>
																	Monthly Rent (ETB) / ወርሃዊ ክራይ (ብር) *
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
																	className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
																	required
																/>
															</div>
															<div className="space-y-2">
																<Label
																	htmlFor={`minLeaseTerm-${index}`}
																	className="text-sm font-semibold text-gray-700"
																>
																	Min Lease Term (Months) / ዝቅተኛ የኪራይ ጊዜ (ወራት) *
																</Label>
																<Select
																	value={unit.minLeaseTerm}
																	onValueChange={(value) =>
																		handleUnitChange(
																			index,
																			"minLeaseTerm",
																			value
																		)
																	}
																>
																	<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
																		<SelectValue />
																	</SelectTrigger>
																	<SelectContent>
																		<SelectItem value="1">
																			1 Month / 1 ወር
																		</SelectItem>
																		<SelectItem value="3">
																			3 Months / 3 ወራት
																		</SelectItem>
																		<SelectItem value="6">
																			6 Months / 6 ወራት
																		</SelectItem>
																		<SelectItem value="12">
																			12 Months / 12 ወራት
																		</SelectItem>
																		<SelectItem value="24">
																			24 Months / 24 ወራት
																		</SelectItem>
																	</SelectContent>
																</Select>
															</div>
														</div>
													)}
													{(unit.listingType === "sell" ||
														unit.listingType === "both") && (
														<div className="space-y-2">
															<Label
																htmlFor={`salePrice-${index}`}
																className="text-sm font-semibold text-gray-700"
															>
																Sale Price (ETB) / የሽያጭ ዋጋ (ብር) *
															</Label>
															<Input
																id={`salePrice-${index}`}
																type="number"
																value={unit.salePrice}
																onChange={(e) =>
																	handleUnitChange(
																		index,
																		"salePrice",
																		e.target.value
																	)
																}
																placeholder="e.g., 2500000"
																className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
																required
															/>
														</div>
													)}
													<div className="space-y-2">
														<Label
															htmlFor={`description-${index}`}
															className="text-sm font-semibold text-gray-700"
														>
															Description / መግለጫ
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
															placeholder="Unit description... / የክፍል መግለጫ..."
															className="min-h-24 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
															rows={3}
														/>
													</div>
													<div className="space-y-2">
														<Label
															htmlFor={`images-${index}`}
															className="text-sm font-semibold text-gray-700"
														>
															Unit Images / የክፍል ምስሎች
														</Label>
														<div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors duration-300">
															<Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
															<p className="text-sm font-medium text-gray-700 mb-2">
																Upload unit images / የክፍል ምስሎችን ይጫኑ
															</p>
															<input
																type="file"
																id={`images-${index}`}
																accept="image/*"
																multiple
																onChange={(e) =>
																	handleUnitImageUpload(index, e)
																}
																className="hidden"
															/>
															<Button
																type="button"
																variant="outline"
																onClick={() =>
																	document
																		.getElementById(`images-${index}`)
																		?.click()
																}
																className="border-emerald-300 hover:bg-emerald-50 h-12 rounded-xl"
															>
																<Plus className="h-4 w-4 mr-2" />
																Add Images / ምስሎች ጨምር
															</Button>
														</div>
														{unit.images.length > 0 && (
															<div className="mt-4">
																<p className="text-sm font-medium text-gray-700 mb-3">
																	Uploaded Unit Images ({unit.images.length}/10)
																	/ የተጫኑ የክፍል ምስሎች ({unit.images.length}/10)
																</p>
																<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
																	{unit.images.map((image, imgIndex) => (
																		<div
																			key={imgIndex}
																			className="relative group"
																		>
																			<img
																				src={URL.createObjectURL(image)}
																				alt={`Unit ${index + 1} Image ${
																					imgIndex + 1
																				}`}
																				className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
																			/>
																			{imgIndex === 0 && (
																				<Badge className="absolute top-2 left-2 bg-emerald-500 text-white">
																					Main Photo / ዋና ፎቶ
																				</Badge>
																			)}
																			<Button
																				type="button"
																				variant="destructive"
																				size="sm"
																				className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
																				onClick={() =>
																					removeUnitImage(index, imgIndex)
																				}
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
													</div>
												</div>
											))}
										</CardContent>
									</Card>
								</div>
							)}
						</div>

						<div className="xl:col-span-1 space-y-6">
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl sticky top-6">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Location Details / የአካባቢ መረጃ
										</CardTitle>
										<CardDescription>
											Property address and location information / የንብረት አድራሻ እና
											የአካባቢ መረጃ
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="space-y-2">
											<Label
												htmlFor="address"
												className="text-sm font-semibold text-gray-700"
											>
												Full Address / ሙሉ አድራሻ *
											</Label>
											<div className="relative">
												<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="address"
													placeholder="e.g., House No. 123, Bole Road / ለምሳሌ፣ ቤት ቁጥር 123፣ ቦሌ መንገድ"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
													value={formData.address}
													onChange={(e) =>
														handleInputChange("address", e.target.value)
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
													City / ከተማ *
												</Label>
												<Select
													value={formData.city}
													onValueChange={(value) =>
														handleInputChange("city", value)
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
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
													Area/Subcity / አካባቢ/ንዑስ ከተማ *
												</Label>
												<Select
													value={formData.area}
													onValueChange={(value) =>
														handleInputChange("area", value)
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
														<SelectValue placeholder="Select area / አካባቢ ይምረጡ" />
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
												Google Maps Link (Recommended) / የጎግል ካርታ አገናኝ (ይመከራል)
											</Label>
											<Input
												id="googleMapLink"
												placeholder="https://maps.google.com/..."
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300"
												value={formData.googleMapLink}
												onChange={(e) =>
													handleInputChange("googleMapLink", e.target.value)
												}
											/>
											<p className="text-xs text-gray-500">
												📍 Adding a Google Maps link increases tenant inquiries
												by 40% / የጎግል ካርታ አገናኝ መጨመር የተከራዮች ጥያቄዎችን በ40% ይጨምራል
											</p>
										</div>
									</CardContent>
								</Card>
							</div>

							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl sticky top-6">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Property Amenities / የንብረት ተጨማሪ አገልግሎቶች
										</CardTitle>
										<CardDescription>
											Select available amenities and features / ያሉትን ተጨማሪ
											አገልግሎቶች እና ባህሪያት ይምረጡ
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2">
											{amenitiesList.map((amenity) => (
												<div
													key={amenity}
													className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
												>
													<Checkbox
														id={amenity}
														checked={formData.amenities.includes(amenity)}
														onCheckedChange={(checked) =>
															handleAmenityChange(amenity, checked as boolean)
														}
														className="border-gray-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
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
													Selected ({formData.amenities.length}) / የተመረጡ (
													{formData.amenities.length}):
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

							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1200"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl sticky top-6">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Featured Listing / ተለይቶ የቀረበ ዝርዝር
										</CardTitle>
										<CardDescription>
											Boost your property visibility / የንብረትዎን ታይነት ያሳድጉ
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
											<div className="flex items-center space-x-3 mb-3">
												<span className="text-2xl">⭐</span>
												<h4 className="font-semibold text-yellow-800">
													Featured Benefits / ተለይቶ የቀረቡ ጥቅሞች
												</h4>
											</div>
											<ul className="text-yellow-700 text-sm space-y-1">
												<li>
													• Appear at top of search results / በፍለጋ ውጤቶች አናት ላይ
													ይታያል
												</li>
												<li>• 3x more tenant views / 3 እጥፍ ተጨማሪ የተከራዮች እይታ</li>
												<li>• Priority in recommendations / በምክሮች ውስጥ ቅድሚያ</li>
												<li>• Special featured badge / ልዩ ተለይቶ የቀረበ ባጅ</li>
											</ul>
										</div>
										<div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
											<div className="space-y-0.5">
												<Label className="text-sm font-medium">
													Make Featured Listing / ተለይቶ የቀረበ ዝርዝር ያድርጉ
												</Label>
												<p className="text-xs text-gray-500">
													Pay for premium placement / ለፕሪሚየም ቦታ ይክፈሉ
												</p>
											</div>
											<Checkbox
												checked={formData.payForFeatured}
												onCheckedChange={(checked) =>
													handleCheckboxChange(
														"payForFeatured",
														checked as boolean
													)
												}
												className="border-gray-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
											/>
										</div>
										{formData.payForFeatured && (
											<div className="space-y-4">
												<div className="space-y-2">
													<Label
														htmlFor="featuredDuration"
														className="text-sm font-semibold text-gray-700"
													>
														Featured Duration / ተለይቶ የቀረበ ጊዜ
													</Label>
													<Select
														value={formData.featuredDuration}
														onValueChange={(value) =>
															handleInputChange("featuredDuration", value)
														}
													>
														<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300">
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="30">
																30 Days / 30 ቀናት -{" "}
																{featuredCost.toLocaleString()} ETB
															</SelectItem>
															<SelectItem value="60">
																60 Days / 60 ቀናት -{" "}
																{(featuredCost * 1.8).toLocaleString()} ETB
															</SelectItem>
															<SelectItem value="90">
																90 Days / 90 ቀናት -{" "}
																{(featuredCost * 2.5).toLocaleString()} ETB
															</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
													<div className="flex justify-between items-center">
														<span className="text-sm font-medium text-emerald-700">
															Total Featured Cost / ጠቅላላ ተለይቶ የቀረበ ወጪ:
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
														Payment due after property approval / ክፍያ ከንብረት ማፅደቅ
														በኋላ ይከፈላል
													</p>
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							</div>
						</div>
					</div>

					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1800"
						style={{ animationFillMode: "forwards" }}
					>
						<div className="flex justify-end space-x-4">
							<Button
								type="button"
								variant="outline"
								asChild
								className="border-gray-300 hover:bg-gray-50 h-12 rounded-xl"
							>
								<Link href="/dashboard/owner/properties">Cancel / መሰረዝ</Link>
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300 h-12 rounded-xl"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Adding Property... / ንብረት በመጨመር ላይ...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>Add Property / ንብረት ጨምር</span>
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
