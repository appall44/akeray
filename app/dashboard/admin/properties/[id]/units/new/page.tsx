"use client";

import { useState } from "react";
import { ArrowLeft, Save, Home, Plus, Camera } from "lucide-react";
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function NewUnitPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		unitNumber: "",
		unitType: "apartment",
		size: "",
		bedrooms: "1",
		bathrooms: "1",
		monthlyRent: "",
		status: "vacant",
		description: "",
		images: [] as string[],
	});
	const router = useRouter();
	const { toast } = useToast();
	const { id } = useParams();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "ክፍል ተጨምሯል / Unit Added Successfully",
				description: `Unit ${formData.unitNumber} has been added to the property`,
			});
			router.push(`/dashboard/admin/properties/${id}`);
		}, 1500);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleImageChange = (images: string[]) => {
		setFormData((prev) => ({ ...prev, images }));
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
							<Link href={`/dashboard/admin/properties/${id}`}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back
							</Link>
						</Button>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								አዲስ ክፍል ጨምር / Add New Unit
							</h1>
							<p className="text-gray-600 mt-1">
								ለንብረቱ አዲስ ክፍል መረጃ ያስገቡ / Enter new unit information
							</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Home className="h-5 w-5 text-teal-600" />
								<span>የክፍል ዝርዝር / Unit Details</span>
							</CardTitle>
							<CardDescription>
								መሰረታዊ የክፍል መረጃ / Basic unit information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="unitNumber">የክፍል ቁጥር / Unit Number *</Label>
									<Input
										id="unitNumber"
										value={formData.unitNumber}
										onChange={(e) =>
											handleInputChange("unitNumber", e.target.value)
										}
										placeholder="e.g., 101"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="unitType">የክፍል አይነት / Unit Type *</Label>
									<Select
										value={formData.unitType}
										onValueChange={(value) =>
											handleInputChange("unitType", value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="apartment">Apartment</SelectItem>
											<SelectItem value="studio">Studio</SelectItem>
											<SelectItem value="adu">ADU</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="size">መጠን / Size (sq ft)</Label>
									<Input
										id="size"
										type="number"
										value={formData.size}
										onChange={(e) => handleInputChange("size", e.target.value)}
										placeholder="e.g., 800"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="bedrooms">መኝታ ቤቶች / Bedrooms *</Label>
									<Select
										value={formData.bedrooms}
										onValueChange={(value) =>
											handleInputChange("bedrooms", value)
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
									<Label htmlFor="bathrooms">መታጠቢያ ቤቶች / Bathrooms *</Label>
									<Select
										value={formData.bathrooms}
										onValueChange={(value) =>
											handleInputChange("bathrooms", value)
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
									<Label htmlFor="monthlyRent">
										ወርሃዊ ክራይ / Monthly Rent (ETB) *
									</Label>
									<Input
										id="monthlyRent"
										type="number"
										value={formData.monthlyRent}
										onChange={(e) =>
											handleInputChange("monthlyRent", e.target.value)
										}
										placeholder="e.g., 10000"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="status">ሁኔታ / Status *</Label>
									<Select
										value={formData.status}
										onValueChange={(value) =>
											handleInputChange("status", value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="vacant">Vacant</SelectItem>
											<SelectItem value="occupied">Occupied</SelectItem>
											<SelectItem value="maintenance">
												Under Maintenance
											</SelectItem>
										</SelectContent>
									</Select>
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
									placeholder="Unit description..."
									rows={3}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="images">የክፍል ምስሎች / Unit Images</Label>
								<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
									<Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<p className="text-gray-600 mb-2">
										ምስሎችን ይጎትቱ ወይም ይጫኑ / Drag images here or click to upload
									</p>
									<Button
										variant="outline"
										type="button"
										onClick={() =>
											handleImageChange([
												...formData.images,
												"/placeholder-unit.jpg",
											])
										}
									>
										<Plus className="h-4 w-4 mr-2" />
										ምስል ጨምር / Add Images
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Action Buttons */}
					<div className="flex justify-end space-x-4">
						<Button variant="outline" type="button" asChild>
							<Link href={`/dashboard/admin/properties/${id}`}>
								ተወው / Cancel
							</Link>
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
									<span>ክፍል ጨምር / Add Unit</span>
								</div>
							)}
						</Button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
