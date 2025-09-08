"use client";

import { useState } from "react";
import {
	ArrowLeft,
	Save,
	FileText,
	User,
	Building,
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

export default function EditLeasePage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [startDate, setStartDate] = useState<Date>(new Date("2024-01-01"));
	const [endDate, setEndDate] = useState<Date>(new Date("2024-12-31"));

	// Mock existing lease data
	const [formData, setFormData] = useState({
		tenantId: "1",
		propertyId: "1",
		unitNumber: "4A",
		monthlyRent: "15000",
		securityDeposit: "30000",
		leaseDuration: "12",
		paymentDueDate: "1",
		lateFeePenalty: "500",
		renewalOption: "yes",
		specialTerms: "Standard lease terms apply",
		notes: "Reliable tenant with good payment history",
		status: "active",
	});

	// Mock data
	const tenants = [
		{
			id: "1",
			name: "አበበ ከበደ / Abebe Kebede",
			email: "abebe@email.com",
		},
		{
			id: "2",
			name: "ሳራ ለማ / Sara Lemma",
			email: "sara@email.com",
		},
	];

	const properties = [
		{
			id: "1",
			name: "የፀሐይ መውጫ አፓርትመንቶች / Sunrise Apartments",
			units: ["1A", "2B", "3C", "4A"],
		},
		{
			id: "2",
			name: "አረንጓዴ ሸለቆ ኮምፕሌክስ / Green Valley Complex",
			units: ["1A", "2A", "2B", "3A"],
		},
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "ውል ተዘምኗል / Lease Updated Successfully",
				description: "Lease agreement has been updated successfully",
			});
			router.push(`/dashboard/admin/leases/${params.id}`);
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
							<Link href={`/dashboard/admin/leases/${params.id}`}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back
							</Link>
						</Button>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								ውል አርም / Edit Lease
							</h1>
							<p className="text-gray-600 mt-1">
								የውል መረጃ ያዘምኑ / Update lease agreement information
							</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Tenant & Property Selection */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<User className="h-5 w-5 text-emerald-600" />
									<span>ተከራይ እና ንብረት / Tenant & Property</span>
								</CardTitle>
								<CardDescription>
									ተከራይ እና ንብረት ይምረጡ / Select tenant and property
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="tenantId">ተከራይ / Tenant *</Label>
									<Select
										value={formData.tenantId}
										onValueChange={(value) =>
											handleInputChange("tenantId", value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select tenant" />
										</SelectTrigger>
										<SelectContent>
											{tenants.map((tenant) => (
												<SelectItem key={tenant.id} value={tenant.id}>
													{tenant.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="propertyId">ንብረት / Property *</Label>
									<Select
										value={formData.propertyId}
										onValueChange={(value) =>
											handleInputChange("propertyId", value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select property" />
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
									<Label htmlFor="unitNumber">ክፍል ቁጥር / Unit Number *</Label>
									<Select
										value={formData.unitNumber}
										onValueChange={(value) =>
											handleInputChange("unitNumber", value)
										}
										disabled={!selectedProperty}
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
								<div className="space-y-2">
									<Label htmlFor="status">ሁኔታ / Status *</Label>
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
											<SelectItem value="active">ንቁ / Active</SelectItem>
											<SelectItem value="expiring">ማብቂያ / Expiring</SelectItem>
											<SelectItem value="expired">ያበቃ / Expired</SelectItem>
											<SelectItem value="terminated">
												ተቋርጧል / Terminated
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						{/* Lease Terms */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<FileText className="h-5 w-5 text-blue-600" />
									<span>የውል ውሎች / Lease Terms</span>
								</CardTitle>
								<CardDescription>
									የውል ጊዜ እና ውሎች / Lease duration and terms
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>የጀመረበት ቀን / Start Date *</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className="w-full justify-start text-left font-normal"
												>
													<Calendar className="mr-2 h-4 w-4" />
													{startDate ? format(startDate, "PPP") : "Pick a date"}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<CalendarComponent
													mode="single"
													selected={startDate}
													onSelect={setStartDate}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
									<div className="space-y-2">
										<Label>የሚያበቃበት ቀን / End Date *</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className="w-full justify-start text-left font-normal"
												>
													<Calendar className="mr-2 h-4 w-4" />
													{endDate ? format(endDate, "PPP") : "Pick a date"}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<CalendarComponent
													mode="single"
													selected={endDate}
													onSelect={setEndDate}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="renewalOption">
										የመታደስ አማራጭ / Renewal Option
									</Label>
									<Select
										value={formData.renewalOption}
										onValueChange={(value) =>
											handleInputChange("renewalOption", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="yes">አዎ / Yes</SelectItem>
											<SelectItem value="no">አይ / No</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						{/* Financial Terms */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<DollarSign className="h-5 w-5 text-purple-600" />
									<span>የገንዘብ ውሎች / Financial Terms</span>
								</CardTitle>
								<CardDescription>
									የክራይ እና ክፍያ ዝርዝር / Rent and payment details
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
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
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="securityDeposit">
										ተቀማጭ ገንዘብ / Security Deposit (ETB) *
									</Label>
									<Input
										id="securityDeposit"
										type="number"
										value={formData.securityDeposit}
										onChange={(e) =>
											handleInputChange("securityDeposit", e.target.value)
										}
										required
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="paymentDueDate">
											የክፍያ ቀን / Payment Due Date
										</Label>
										<Select
											value={formData.paymentDueDate}
											onValueChange={(value) =>
												handleInputChange("paymentDueDate", value)
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{Array.from({ length: 28 }, (_, i) => i + 1).map(
													(day) => (
														<SelectItem key={day} value={day.toString()}>
															{day}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="lateFeePenalty">
											የዘገየ ክፍያ ቅጣት / Late Fee Penalty (ETB)
										</Label>
										<Input
											id="lateFeePenalty"
											type="number"
											value={formData.lateFeePenalty}
											onChange={(e) =>
												handleInputChange("lateFeePenalty", e.target.value)
											}
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Additional Terms */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<FileText className="h-5 w-5 text-orange-600" />
									<span>ተጨማሪ ውሎች / Additional Terms</span>
								</CardTitle>
								<CardDescription>
									ልዩ ውሎች እና ማስታወሻዎች / Special terms and notes
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="specialTerms">ልዩ ውሎች / Special Terms</Label>
									<Textarea
										id="specialTerms"
										value={formData.specialTerms}
										onChange={(e) =>
											handleInputChange("specialTerms", e.target.value)
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
							<Link href={`/dashboard/admin/leases/${params.id}`}>
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
