"use client";

import { useState } from "react";
import {
	User,
	Save,
	Mail,
	Phone,
	MapPin,
	Briefcase,
	Camera,
	Edit,
	Home,
	Calendar,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

export default function TenantProfilePage() {
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "Meron",
		lastName: "Tadesse",
		email: "meron@email.com",
		phone: "+251911234567",
		address: "Bole Road, Addis Ababa",
		city: "Addis Ababa",
		occupation: "Software Engineer",
		employer: "Tech Solutions Ethiopia",
		monthlyIncome: "45000",
		bio: "Software engineer passionate about technology and innovation. Looking for comfortable and modern living spaces.",
		emergencyContactName: "Almaz Tadesse",
		emergencyContactPhone: "+251922345678",
		emergencyContactRelation: "Mother",
		joinDate: "2024-01-15",
		lastLogin: "2024-01-15T16:45:00",
		profileImage: "/placeholder-user.jpg",
	});
	const { toast } = useToast();

	const tenantStats = {
		activeLeases: 2,
		totalPayments: 24,
		maintenanceRequests: 3,
		membershipDuration: "11 months",
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			setIsEditing(false);
			toast({
				title: "Profile Updated Successfully",
				description: "Your profile information has been updated",
			});
		}, 1500);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
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
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Tenant Profile
							</h1>
							<p className="text-lg text-gray-600">
								Manage your tenant profile and personal information
							</p>
							<p className="text-sm text-gray-500">
								Keep your profile updated for better rental applications
							</p>
						</div>
						<Button
							onClick={() => setIsEditing(!isEditing)}
							className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
						>
							<Edit className="h-4 w-4 mr-2" />
							{isEditing ? "Cancel Edit" : "Edit Profile"}
						</Button>
					</div>
				</div>

				{/* Tenant Overview */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Active Leases
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{tenantStats.activeLeases}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Home className="h-8 w-8 text-emerald-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-blue-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Total Payments
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{tenantStats.totalPayments}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Calendar className="h-8 w-8 text-blue-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-purple-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Maintenance Requests
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{tenantStats.maintenanceRequests}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<User className="h-8 w-8 text-purple-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-orange-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Member For
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{tenantStats.membershipDuration}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-orange-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Calendar className="h-8 w-8 text-orange-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Personal Information */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<User className="h-5 w-5 text-emerald-600" />
										<span>Personal Information</span>
									</CardTitle>
									<CardDescription>
										Your personal details and contact information
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex justify-center mb-6">
										<div className="relative">
											<Avatar className="h-24 w-24 ring-4 ring-emerald-200">
												<AvatarImage src={formData.profileImage} />
												<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold text-2xl">
													{formData.firstName[0]}
													{formData.lastName[0]}
												</AvatarFallback>
											</Avatar>
											{isEditing && (
												<Button
													type="button"
													size="sm"
													className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
												>
													<Camera className="h-4 w-4" />
												</Button>
											)}
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="firstName">First Name</Label>
											<Input
												id="firstName"
												value={formData.firstName}
												onChange={(e) =>
													handleInputChange("firstName", e.target.value)
												}
												disabled={!isEditing}
												className={
													isEditing
														? "border-emerald-300 focus:border-emerald-500"
														: "bg-gray-50"
												}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="lastName">Last Name</Label>
											<Input
												id="lastName"
												value={formData.lastName}
												onChange={(e) =>
													handleInputChange("lastName", e.target.value)
												}
												disabled={!isEditing}
												className={
													isEditing
														? "border-emerald-300 focus:border-emerald-500"
														: "bg-gray-50"
												}
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="email">Email Address</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
											<Input
												id="email"
												type="email"
												className={`pl-10 ${
													isEditing
														? "border-emerald-300 focus:border-emerald-500"
														: "bg-gray-50"
												}`}
												value={formData.email}
												onChange={(e) =>
													handleInputChange("email", e.target.value)
												}
												disabled={!isEditing}
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="phone">Phone Number</Label>
										<div className="relative">
											<Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
											<Input
												id="phone"
												className={`pl-10 ${
													isEditing
														? "border-emerald-300 focus:border-emerald-500"
														: "bg-gray-50"
												}`}
												value={formData.phone}
												onChange={(e) =>
													handleInputChange("phone", e.target.value)
												}
												disabled={!isEditing}
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="address">Address</Label>
										<div className="relative">
											<MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
											<Input
												id="address"
												className={`pl-10 ${
													isEditing
														? "border-emerald-300 focus:border-emerald-500"
														: "bg-gray-50"
												}`}
												value={formData.address}
												onChange={(e) =>
													handleInputChange("address", e.target.value)
												}
												disabled={!isEditing}
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="bio">Bio</Label>
										<Textarea
											id="bio"
											value={formData.bio}
											onChange={(e) => handleInputChange("bio", e.target.value)}
											disabled={!isEditing}
											className={
												isEditing
													? "border-emerald-300 focus:border-emerald-500"
													: "bg-gray-50"
											}
											rows={3}
										/>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Professional Information */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1200"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Briefcase className="h-5 w-5 text-blue-600" />
										<span>Professional Information</span>
									</CardTitle>
									<CardDescription>
										Your employment and financial details
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="occupation">Occupation</Label>
										<Input
											id="occupation"
											value={formData.occupation}
											onChange={(e) =>
												handleInputChange("occupation", e.target.value)
											}
											disabled={!isEditing}
											className={
												isEditing
													? "border-emerald-300 focus:border-emerald-500"
													: "bg-gray-50"
											}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="employer">Employer</Label>
										<Input
											id="employer"
											value={formData.employer}
											onChange={(e) =>
												handleInputChange("employer", e.target.value)
											}
											disabled={!isEditing}
											className={
												isEditing
													? "border-emerald-300 focus:border-emerald-500"
													: "bg-gray-50"
											}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="monthlyIncome">Monthly Income (ETB)</Label>
										<Input
											id="monthlyIncome"
											type="number"
											value={formData.monthlyIncome}
											onChange={(e) =>
												handleInputChange("monthlyIncome", e.target.value)
											}
											disabled={!isEditing}
											className={
												isEditing
													? "border-emerald-300 focus:border-emerald-500"
													: "bg-gray-50"
											}
										/>
									</div>

									<Separator />

									<div className="space-y-4">
										<h4 className="font-semibold text-gray-900">
											Emergency Contact
										</h4>
										<div className="space-y-2">
											<Label htmlFor="emergencyContactName">
												Emergency Contact Name
											</Label>
											<Input
												id="emergencyContactName"
												value={formData.emergencyContactName}
												onChange={(e) =>
													handleInputChange(
														"emergencyContactName",
														e.target.value
													)
												}
												disabled={!isEditing}
												className={
													isEditing
														? "border-emerald-300 focus:border-emerald-500"
														: "bg-gray-50"
												}
											/>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="emergencyContactPhone">
													Emergency Phone
												</Label>
												<Input
													id="emergencyContactPhone"
													value={formData.emergencyContactPhone}
													onChange={(e) =>
														handleInputChange(
															"emergencyContactPhone",
															e.target.value
														)
													}
													disabled={!isEditing}
													className={
														isEditing
															? "border-emerald-300 focus:border-emerald-500"
															: "bg-gray-50"
													}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="emergencyContactRelation">
													Relationship
												</Label>
												<Input
													id="emergencyContactRelation"
													value={formData.emergencyContactRelation}
													onChange={(e) =>
														handleInputChange(
															"emergencyContactRelation",
															e.target.value
														)
													}
													disabled={!isEditing}
													className={
														isEditing
															? "border-emerald-300 focus:border-emerald-500"
															: "bg-gray-50"
													}
												/>
											</div>
										</div>
									</div>

									<Separator />

									<div className="space-y-3">
										<h4 className="font-semibold text-gray-900">
											Account Information
										</h4>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-600">Member Since:</span>
												<span className="font-medium">
													{new Date(formData.joinDate).toLocaleDateString()}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Last Login:</span>
												<span className="font-medium">
													{new Date(formData.lastLogin).toLocaleString()}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Account Status:</span>
												<Badge className="bg-emerald-100 text-emerald-800">
													Active
												</Badge>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Save Button */}
					{isEditing && (
						<div
							className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1500"
							style={{ animationFillMode: "forwards" }}
						>
							<div className="flex justify-end space-x-4 mt-8">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsEditing(false)}
									className="border-gray-300 hover:bg-gray-50"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
									disabled={isLoading}
								>
									{isLoading ? (
										<div className="flex items-center space-x-3">
											<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
											<span>Saving Changes...</span>
										</div>
									) : (
										<div className="flex items-center space-x-3">
											<Save className="h-5 w-5" />
											<span>Save Changes</span>
										</div>
									)}
								</Button>
							</div>
						</div>
					)}
				</form>
			</div>
		</DashboardLayout>
	);
}
