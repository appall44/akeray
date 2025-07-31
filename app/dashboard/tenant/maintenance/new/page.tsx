"use client";

import { useState } from "react";
import {
	Wrench,
	Building,
	ArrowLeft,
	Save,
	Camera,
	Upload,
	X,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const categories = [
	{
		value: "plumbing",
		label: "Plumbing",
		icon: "🔧",
		description: "Leaks, clogs, water issues",
	},
	{
		value: "electrical",
		label: "Electrical",
		icon: "⚡",
		description: "Power, lighting, outlets",
	},
	{
		value: "hvac",
		label: "HVAC",
		icon: "❄️",
		description: "Heating, cooling, ventilation",
	},
	{
		value: "appliances",
		label: "Appliances",
		icon: "🏠",
		description: "Kitchen, laundry appliances",
	},
	{
		value: "structural",
		label: "Structural",
		icon: "🏗️",
		description: "Walls, doors, windows",
	},
	{
		value: "cleaning",
		label: "Cleaning",
		icon: "🧹",
		description: "Deep cleaning, pest control",
	},
	{
		value: "security",
		label: "Security",
		icon: "🔒",
		description: "Locks, alarms, safety",
	},
	{
		value: "other",
		label: "Other",
		icon: "🔨",
		description: "General maintenance",
	},
];

const priorities = [
	{
		value: "low",
		label: "Low Priority",
		color: "bg-green-100 text-green-800",
		description: "Can wait, not urgent",
		icon: "🟢",
	},
	{
		value: "medium",
		label: "Medium Priority",
		color: "bg-yellow-100 text-yellow-800",
		description: "Should be addressed soon",
		icon: "🟡",
	},
	{
		value: "high",
		label: "High Priority",
		color: "bg-red-100 text-red-800",
		description: "Urgent, needs immediate attention",
		icon: "🔴",
	},
	{
		value: "emergency",
		label: "Emergency",
		color: "bg-red-200 text-red-900",
		description: "Critical safety concern",
		icon: "🚨",
	},
];

// Mock tenant's property info
const tenantPropertyInfo = {
	property: "Sunrise Apartments",
	unit: "Apartment 3B",
	address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	landlord: "Mulugeta Assefa",
	landlordPhone: "+251911123456",
};

export default function TenantNewMaintenanceRequestPage() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		priority: "",
		location: "",
		images: [] as File[],
		preferredTime: "",
		contactPhone: "",
		urgentContact: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	const selectedCategory = categories.find(
		(c) => c.value === formData.category
	);
	const selectedPriority = priorities.find(
		(p) => p.value === formData.priority
	);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length + formData.images.length > 5) {
			setError("Maximum 5 images allowed");
			return;
		}
		setFormData({ ...formData, images: [...formData.images, ...files] });
	};

	const removeImage = (index: number) => {
		const newImages = formData.images.filter((_, i) => i !== index);
		setFormData({ ...formData, images: newImages });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (
			!formData.title ||
			!formData.description ||
			!formData.category ||
			!formData.priority
		) {
			setError("Please fill in all required fields");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Maintenance Request Submitted!",
				description: `Your request "${formData.title}" has been submitted successfully. You'll receive updates via SMS.`,
			});
			router.push("/dashboard/tenant/maintenance");
		}, 2000);
	};

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
							<Link href="/dashboard/tenant/maintenance">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Maintenance
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Submit Maintenance Request
						</h1>
						<p className="text-lg text-gray-600">
							Report an issue that needs attention in your apartment
						</p>
						<p className="text-sm text-gray-500">
							Provide detailed information to help us resolve the issue quickly
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						{/* Main Form */}
						<div className="xl:col-span-2 space-y-8">
							{/* Request Details */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Request Details
										</CardTitle>
										<CardDescription>
											Describe the maintenance issue you're experiencing
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										{error && (
											<Alert variant="destructive">
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}

										<div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
											<div className="flex items-center space-x-3 mb-3">
												<Building className="h-5 w-5 text-blue-600" />
												<h4 className="font-semibold text-blue-800">
													Your Property Information
												</h4>
											</div>
											<div className="grid grid-cols-2 gap-4 text-sm">
												<div>
													<p className="text-blue-700 font-medium">Property:</p>
													<p className="text-blue-600">
														{tenantPropertyInfo.property}
													</p>
												</div>
												<div>
													<p className="text-blue-700 font-medium">Unit:</p>
													<p className="text-blue-600">
														{tenantPropertyInfo.unit}
													</p>
												</div>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="title"
												className="text-sm font-semibold text-gray-700"
											>
												Issue Title *
											</Label>
											<Input
												id="title"
												placeholder="e.g., Kitchen faucet is leaking"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.title}
												onChange={(e) =>
													setFormData({ ...formData, title: e.target.value })
												}
												required
											/>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="description"
												className="text-sm font-semibold text-gray-700"
											>
												Detailed Description *
											</Label>
											<Textarea
												id="description"
												placeholder="Please provide a detailed description of the issue, when it started, and any steps you've already taken..."
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
													htmlFor="location"
													className="text-sm font-semibold text-gray-700"
												>
													Specific Location in Unit
												</Label>
												<Input
													id="location"
													placeholder="e.g., Kitchen sink, Master bedroom, Living room"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.location}
													onChange={(e) =>
														setFormData({
															...formData,
															location: e.target.value,
														})
													}
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="contactPhone"
													className="text-sm font-semibold text-gray-700"
												>
													Contact Phone (Optional)
												</Label>
												<Input
													id="contactPhone"
													placeholder="+251911234567"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.contactPhone}
													onChange={(e) =>
														setFormData({
															...formData,
															contactPhone: e.target.value,
														})
													}
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="preferredTime"
												className="text-sm font-semibold text-gray-700"
											>
												Preferred Time for Repair
											</Label>
											<Select
												value={formData.preferredTime}
												onValueChange={(value) =>
													setFormData({ ...formData, preferredTime: value })
												}
											>
												<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
													<SelectValue placeholder="When would you prefer the repair?" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="morning">
														Morning (8:00 AM - 12:00 PM)
													</SelectItem>
													<SelectItem value="afternoon">
														Afternoon (12:00 PM - 5:00 PM)
													</SelectItem>
													<SelectItem value="evening">
														Evening (5:00 PM - 8:00 PM)
													</SelectItem>
													<SelectItem value="weekend">Weekend</SelectItem>
													<SelectItem value="anytime">Anytime</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Category & Priority */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Category & Priority
										</CardTitle>
										<CardDescription>
											Help us categorize and prioritize your request
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="space-y-4">
											<Label className="text-sm font-semibold text-gray-700">
												Issue Category *
											</Label>
											<RadioGroup
												value={formData.category}
												onValueChange={(value) =>
													setFormData({ ...formData, category: value })
												}
											>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
													{categories.map((category) => (
														<div
															key={category.value}
															className="flex items-center space-x-3"
														>
															<RadioGroupItem
																value={category.value}
																id={category.value}
															/>
															<Label
																htmlFor={category.value}
																className="flex-1 cursor-pointer"
															>
																<div className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-colors">
																	<span className="text-2xl">
																		{category.icon}
																	</span>
																	<div>
																		<p className="font-medium text-gray-900">
																			{category.label}
																		</p>
																		<p className="text-xs text-gray-500">
																			{category.description}
																		</p>
																	</div>
																</div>
															</Label>
														</div>
													))}
												</div>
											</RadioGroup>
										</div>

										<div className="space-y-4">
											<Label className="text-sm font-semibold text-gray-700">
												Priority Level *
											</Label>
											<RadioGroup
												value={formData.priority}
												onValueChange={(value) =>
													setFormData({ ...formData, priority: value })
												}
											>
												<div className="space-y-3">
													{priorities.map((priority) => (
														<div
															key={priority.value}
															className="flex items-center space-x-3"
														>
															<RadioGroupItem
																value={priority.value}
																id={priority.value}
															/>
															<Label
																htmlFor={priority.value}
																className="flex-1 cursor-pointer"
															>
																<div className="flex items-center space-x-4 p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-colors">
																	<span className="text-2xl">
																		{priority.icon}
																	</span>
																	<div className="flex-1">
																		<p className="font-semibold text-gray-900">
																			{priority.label}
																		</p>
																		<p className="text-sm text-gray-600">
																			{priority.description}
																		</p>
																	</div>
																</div>
															</Label>
														</div>
													))}
												</div>
											</RadioGroup>
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
											Photos (Optional)
										</CardTitle>
										<CardDescription>
											Upload photos to help us understand the issue better (Max
											5 images)
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
											<Camera className="mx-auto h-10 w-10 text-gray-400 mb-3" />
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-700">
													Upload photos of the issue
												</p>
												<p className="text-xs text-gray-500">
													JPG, PNG up to 5MB each
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
													size="sm"
													onClick={() =>
														document.getElementById("images")?.click()
													}
													className="border-emerald-300 hover:bg-emerald-50"
												>
													<Upload className="h-4 w-4 mr-2" />
													Choose Photos
												</Button>
											</div>
										</div>

										{formData.images.length > 0 && (
											<div>
												<p className="text-sm font-medium text-gray-700 mb-3">
													Uploaded Photos ({formData.images.length}/5)
												</p>
												<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
													{formData.images.map((image, index) => (
														<div key={index} className="relative group">
															<img
																src={URL.createObjectURL(image)}
																alt={`Issue ${index + 1}`}
																className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
															/>
															<Button
																type="button"
																variant="destructive"
																size="sm"
																className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
																onClick={() => removeImage(index)}
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
							{/* Request Summary */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Request Summary
										</CardTitle>
										<CardDescription>
											Review your maintenance request
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										{selectedCategory && (
											<div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
												<div className="flex items-center space-x-3 mb-2">
													<span className="text-2xl">
														{selectedCategory.icon}
													</span>
													<h4 className="font-semibold text-blue-800">
														{selectedCategory.label}
													</h4>
												</div>
												<p className="text-blue-700 text-sm">
													{selectedCategory.description}
												</p>
											</div>
										)}

										{selectedPriority && (
											<div
												className={`p-4 rounded-xl border ${
													selectedPriority.value === "low"
														? "bg-green-50 border-green-200"
														: selectedPriority.value === "medium"
														? "bg-yellow-50 border-yellow-200"
														: selectedPriority.value === "high"
														? "bg-red-50 border-red-200"
														: "bg-red-100 border-red-300"
												}`}
											>
												<div className="flex items-center space-x-3 mb-2">
													<span className="text-2xl">
														{selectedPriority.icon}
													</span>
													<h4
														className={`font-semibold ${
															selectedPriority.value === "low"
																? "text-green-800"
																: selectedPriority.value === "medium"
																? "text-yellow-800"
																: "text-red-800"
														}`}
													>
														{selectedPriority.label}
													</h4>
												</div>
												<p
													className={`text-sm ${
														selectedPriority.value === "low"
															? "text-green-700"
															: selectedPriority.value === "medium"
															? "text-yellow-700"
															: "text-red-700"
													}`}
												>
													{selectedPriority.description}
												</p>
											</div>
										)}

										<div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
											<h4 className="font-semibold text-gray-800 mb-3">
												What happens next?
											</h4>
											<div className="space-y-2 text-sm text-gray-600">
												<div className="flex items-center space-x-2">
													<div className="w-2 h-2 bg-emerald-500 rounded-full" />
													<span>Request submitted to property manager</span>
												</div>
												<div className="flex items-center space-x-2">
													<div className="w-2 h-2 bg-blue-500 rounded-full" />
													<span>You'll receive SMS confirmation</span>
												</div>
												<div className="flex items-center space-x-2">
													<div className="w-2 h-2 bg-purple-500 rounded-full" />
													<span>Technician will be assigned</span>
												</div>
												<div className="flex items-center space-x-2">
													<div className="w-2 h-2 bg-orange-500 rounded-full" />
													<span>You'll be contacted for scheduling</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Emergency Contact */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Emergency Contact
										</CardTitle>
										<CardDescription>
											For urgent issues that need immediate attention
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="bg-red-50 p-4 rounded-xl border border-red-200">
											<h4 className="font-semibold text-red-800 mb-3">
												🚨 Emergency Situations
											</h4>
											<p className="text-red-700 text-sm mb-3">
												For water leaks, electrical hazards, or security issues,
												call immediately:
											</p>
											<div className="space-y-2">
												<div className="flex items-center space-x-2">
													<span className="text-red-600 font-bold">📞</span>
													<span className="font-semibold text-red-800">
														{tenantPropertyInfo.landlordPhone}
													</span>
												</div>
												<div className="flex items-center space-x-2">
													<span className="text-red-600 font-bold">🏠</span>
													<span className="text-red-700 text-sm">
														{tenantPropertyInfo.landlord}
													</span>
												</div>
											</div>
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
						<div className="flex justify-end space-x-4 mt-8">
							<Button
								type="button"
								variant="outline"
								asChild
								className="border-gray-300 hover:bg-gray-50"
							>
								<Link href="/dashboard/tenant/maintenance">Cancel</Link>
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Submitting Request...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>Submit Request</span>
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
