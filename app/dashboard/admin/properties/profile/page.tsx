"use client";

import { useState } from "react";
import {
	User,
	Save,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Shield,
	Camera,
	Edit,
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

export default function AdminProfilePage() {
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "Aseffa",
		lastName: "Bekele",
		email: "aseffa@akeray.et",
		phone: "+251911234567",
		address: "Bole Road, Addis Ababa",
		city: "Addis Ababa",
		bio: "Experienced property management administrator with 5+ years in the Ethiopian real estate market.",
		department: "Property Management",
		employeeId: "EMP-001",
		joinDate: "2019-03-15",
		lastLogin: "2024-01-15T10:30:00",
		profileImage: "/placeholder-user.jpg",
	});
	const { toast } = useToast();

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
			userRole="admin"
			userName="Admin Aseffa Bekele"
			userEmail="aseffa@akeray.et"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Admin Profile
							</h1>
							<p className="text-lg text-gray-600">
								Manage your administrator profile and account information
							</p>
							<p className="text-sm text-gray-500">
								Keep your profile updated for better system management
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

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Profile Picture & Basic Info */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader className="text-center">
									<div className="relative mx-auto">
										<Avatar className="h-32 w-32 ring-4 ring-emerald-200 mx-auto">
											<AvatarImage src={formData.profileImage} />
											<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold text-3xl">
												{formData.firstName[0]}
												{formData.lastName[0]}
											</AvatarFallback>
										</Avatar>
										{isEditing && (
											<Button
												type="button"
												size="sm"
												className="absolute -bottom-2 -right-2 rounded-full h-10 w-10 p-0"
											>
												<Camera className="h-4 w-4" />
											</Button>
										)}
									</div>
									<CardTitle className="text-2xl mt-4">
										{formData.firstName} {formData.lastName}
									</CardTitle>
									<div className="flex justify-center space-x-2 mt-2">
										<Badge className="bg-red-100 text-red-800">
											Administrator
										</Badge>
										<Badge className="bg-emerald-100 text-emerald-800">
											Active
										</Badge>
									</div>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="text-center space-y-2">
										<p className="text-gray-600">{formData.department}</p>
										<p className="text-sm text-gray-500">
											Employee ID: {formData.employeeId}
										</p>
										<p className="text-sm text-gray-500">
											Joined: {new Date(formData.joinDate).toLocaleDateString()}
										</p>
										<p className="text-sm text-gray-500">
											Last Login:{" "}
											{new Date(formData.lastLogin).toLocaleString()}
										</p>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Personal Information */}
						<div
							className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<User className="h-5 w-5 text-emerald-600" />
										<span>Personal Information</span>
									</CardTitle>
									<CardDescription>Your basic personal details</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
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

						{/* Account Security */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Shield className="h-5 w-5 text-purple-600" />
										<span>Account Security</span>
									</CardTitle>
									<CardDescription>
										Security settings and access information
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-3">
										<div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
											<div>
												<p className="font-medium text-emerald-800">
													Two-Factor Authentication
												</p>
												<p className="text-sm text-emerald-600">Enabled</p>
											</div>
											<Badge className="bg-emerald-100 text-emerald-800">
												Active
											</Badge>
										</div>

										<div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200">
											<div>
												<p className="font-medium text-blue-800">
													Password Strength
												</p>
												<p className="text-sm text-blue-600">Strong</p>
											</div>
											<Badge className="bg-blue-100 text-blue-800">
												Secure
											</Badge>
										</div>

										<div className="flex items-center justify-between p-3 rounded-xl bg-yellow-50 border border-yellow-200">
											<div>
												<p className="font-medium text-yellow-800">
													Session Timeout
												</p>
												<p className="text-sm text-yellow-600">30 minutes</p>
											</div>
											<Badge className="bg-yellow-100 text-yellow-800">
												Default
											</Badge>
										</div>
									</div>

									<Separator />

									<div className="space-y-3">
										<h4 className="font-semibold text-gray-900">
											Recent Activity
										</h4>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-600">Last Login:</span>
												<span className="font-medium">
													{new Date(formData.lastLogin).toLocaleString()}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Login Location:</span>
												<span className="font-medium">Addis Ababa, ET</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Device:</span>
												<span className="font-medium">Chrome Browser</span>
											</div>
										</div>
									</div>

									{isEditing && (
										<Button
											variant="outline"
											className="w-full border-purple-300 hover:bg-purple-50"
										>
											Change Password
										</Button>
									)}
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Save Button */}
					{isEditing && (
						<div
							className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200"
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
