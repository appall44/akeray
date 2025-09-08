"use client";

import { useState } from "react";
import {
	TrendingUp,
	User,
	Building,
	Phone,
	Mail,
	ArrowLeft,
	Save,
	Calendar,
	DollarSign,
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function EditSalesLeadPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [followUpDate, setFollowUpDate] = useState<Date>(
		new Date("2024-01-20")
	);

	// Mock existing lead data
	const [formData, setFormData] = useState({
		fullName: "ዳንኤል ተስፋዬ / Daniel Tesfaye",
		email: "daniel.tesfaye@email.com",
		phone: "+251911234567",
		occupation: "Software Engineer",
		propertyId: "1",
		interestedUnit: "5B",
		budget: "18000",
		source: "website",
		status: "interested",
		notes: "ለቤተሰብ ቤት ይፈልጋል / Looking for family home",
		requirements: "2 bedrooms, parking space, family-friendly environment",
		familySize: "3",
		moveInDate: new Date("2025-02-01"),
		currentAddress: "Bole, Addis Ababa",
	});

	const properties = [
		{
			id: "1",
			name: "Sunrise Apartments",
			units: ["1A", "1B", "2A", "2B", "5B"],
			priceRange: "15000-18000",
		},
		{
			id: "2",
			name: "Green Valley Complex",
			units: ["1A", "1B", "2A"],
			priceRange: "18000-22000",
		},
	];

	const leadStatuses = [
		{
			value: "interested",
			label: "ፍላጎት አለው / Interested",
			color: "bg-blue-100 text-blue-800",
		},
		{
			value: "qualified",
			label: "ብቁ / Qualified",
			color: "bg-yellow-100 text-yellow-800",
		},
		{
			value: "viewing-scheduled",
			label: "መመልከት ተይዟል / Viewing Scheduled",
			color: "bg-purple-100 text-purple-800",
		},
		{
			value: "negotiating",
			label: "በድርድር ላይ / Negotiating",
			color: "bg-orange-100 text-orange-800",
		},
		{
			value: "closed-won",
			label: "ተሳክቷል / Closed Won",
			color: "bg-emerald-100 text-emerald-800",
		},
		{
			value: "closed-lost",
			label: "አልተሳካም / Closed Lost",
			color: "bg-red-100 text-red-800",
		},
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "የሽያጭ እድል ተዘምኗል / Sales Lead Updated",
				description: `Lead for ${formData.fullName} has been updated successfully`,
			});
			router.push(`/dashboard/admin/sales/${params.id}`);
		}, 1500);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const selectedProperty = properties.find((p) => p.id === formData.propertyId);

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
							<Link href={`/dashboard/admin/sales/${params.id}`}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back
							</Link>
						</Button>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								የሽያጭ እድል አርም / Edit Sales Lead
							</h1>
							<p className="text-gray-600 mt-1">
								የደንበኛ መረጃ እና ሁኔታ ያዘምኑ / Update customer information and status
							</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Customer Information */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<User className="h-5 w-5 text-emerald-600" />
									<span>የደንበኛ መረጃ / Customer Information</span>
								</CardTitle>
								<CardDescription>
									የደንበኛ ግላዊ መረጃ / Customer personal information
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="fullName">ሙሉ ስም / Full Name *</Label>
									<Input
										id="fullName"
										value={formData.fullName}
										onChange={(e) =>
											handleInputChange("fullName", e.target.value)
										}
										required
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="phone">ስልክ ቁጥር / Phone *</Label>
										<Input
											id="phone"
											value={formData.phone}
											onChange={(e) =>
												handleInputChange("phone", e.target.value)
											}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">ኢሜይል / Email</Label>
										<Input
											id="email"
											type="email"
											value={formData.email}
											onChange={(e) =>
												handleInputChange("email", e.target.value)
											}
										/>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="occupation">ሙያ / Occupation</Label>
										<Input
											id="occupation"
											value={formData.occupation}
											onChange={(e) =>
												handleInputChange("occupation", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="familySize">የቤተሰብ ብዛት / Family Size</Label>
										<Input
											id="familySize"
											type="number"
											value={formData.familySize}
											onChange={(e) =>
												handleInputChange("familySize", e.target.value)
											}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="currentAddress">
										አሁን ያለበት አድራሻ / Current Address
									</Label>
									<Input
										id="currentAddress"
										value={formData.currentAddress}
										onChange={(e) =>
											handleInputChange("currentAddress", e.target.value)
										}
									/>
								</div>
							</CardContent>
						</Card>

						{/* Property Interest & Status */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Building className="h-5 w-5 text-blue-600" />
									<span>ንብረት ፍላጎት እና ሁኔታ / Property Interest & Status</span>
								</CardTitle>
								<CardDescription>
									የንብረት ምርጫ እና የእድል ሁኔታ / Property preferences and lead status
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="propertyId">
										ፍላጎት ያለው ንብረት / Interested Property
									</Label>
									<Select
										value={formData.propertyId}
										onValueChange={(value) =>
											handleInputChange("propertyId", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{properties.map((property) => (
												<SelectItem key={property.id} value={property.id}>
													{property.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="interestedUnit">
										የሚፈለግ ክፍል / Preferred Unit
									</Label>
									<Select
										value={formData.interestedUnit}
										onValueChange={(value) =>
											handleInputChange("interestedUnit", value)
										}
										disabled={!formData.propertyId}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select unit" />
										</SelectTrigger>
										<SelectContent>
											{selectedProperty?.units.map((unit) => (
												<SelectItem key={unit} value={unit}>
													Unit {unit}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="budget">በጀት / Budget (ETB) *</Label>
										<Input
											id="budget"
											type="number"
											value={formData.budget}
											onChange={(e) =>
												handleInputChange("budget", e.target.value)
											}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="source">ምንጭ / Source</Label>
										<Select
											value={formData.source}
											onValueChange={(value) =>
												handleInputChange("source", value)
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="website">Website</SelectItem>
												<SelectItem value="referral">Referral</SelectItem>
												<SelectItem value="social-media">
													Social Media
												</SelectItem>
												<SelectItem value="walk-in">Walk-in</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="status">የእድል ሁኔታ / Lead Status *</Label>
									<Select
										value={formData.status}
										onValueChange={(value) =>
											handleInputChange("status", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{leadStatuses.map((status) => (
												<SelectItem key={status.value} value={status.value}>
													{status.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label>የመከታተያ ቀን / Follow-up Date</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className="w-full justify-start text-left font-normal"
											>
												<Calendar className="mr-2 h-4 w-4" />
												{followUpDate
													? format(followUpDate, "PPP")
													: "Pick a date"}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<CalendarComponent
												mode="single"
												selected={followUpDate}
												onSelect={setFollowUpDate}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>
							</CardContent>
						</Card>

						{/* Requirements & Notes */}
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<TrendingUp className="h-5 w-5 text-purple-600" />
									<span>መስፈርቶች እና ማስታወሻዎች / Requirements & Notes</span>
								</CardTitle>
								<CardDescription>
									የደንበኛ መስፈርቶች እና ተጨማሪ መረጃ / Customer requirements and
									additional information
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="requirements">
										ልዩ መስፈርቶች / Specific Requirements
									</Label>
									<Textarea
										id="requirements"
										value={formData.requirements}
										onChange={(e) =>
											handleInputChange("requirements", e.target.value)
										}
										rows={3}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="notes">ማስታወሻዎች / Notes</Label>
									<Textarea
										id="notes"
										value={formData.notes}
										onChange={(e) => handleInputChange("notes", e.target.value)}
										rows={3}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end space-x-4">
						<Button variant="outline" type="button" asChild>
							<Link href={`/dashboard/admin/sales/${params.id}`}>
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
									<span>በማዘመን ላይ... / Updating...</span>
								</div>
							) : (
								<div className="flex items-center space-x-2">
									<Save className="h-4 w-4" />
									<span>ለውጦች ቀምጥ / Save Changes</span>
								</div>
							)}
						</Button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
