"use client";

import { useState } from "react";
import {
	Wrench,
	ArrowLeft,
	Edit,
	User,
	Building,
	Calendar,
	DollarSign,
	Clock,
	AlertTriangle,
	CheckCircle,
	Phone,
	Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock maintenance data
const getMaintenanceData = (requestId: string) => ({
	id: requestId,
	title: "Leaking Faucet in Kitchen",
	description:
		"The kitchen faucet has been leaking for the past week. Water is dripping constantly from the base of the faucet. The issue started after the water pressure increased in the building. Tenant has tried tightening the connections but the leak persists.",
	tenant: {
		name: "አበበ ከበደ / Abebe Kebede",
		phone: "+251911234567",
		email: "abebe@email.com",
		avatar: "/placeholder-user.jpg",
	},
	property: {
		name: "የፀሐይ መውጫ አፓርትመንቶች / Sunrise Apartments",
		unit: "4A",
		address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	},
	priority: "medium",
	status: "in_progress",
	category: "plumbing",
	createdDate: "2024-01-10T09:30:00",
	assignedTo: {
		name: "Mike Wilson",
		phone: "+251933456789",
		specialty: "Plumbing & HVAC",
	},
	estimatedCost: 500,
	actualCost: null,
	scheduledDate: "2024-01-12T10:00:00",
	completedDate: null,
	accessInstructions:
		"Unit is on the 4th floor. Tenant will be available between 10 AM - 2 PM. Please call before arriving.",
	notes:
		"Tenant reports that the leak is getting worse. Priority should be medium to high.",
	images: ["/placeholder-maintenance-1.jpg", "/placeholder-maintenance-2.jpg"],
	updates: [
		{
			date: "2024-01-10T09:30:00",
			message: "Maintenance request submitted by tenant",
			author: "System",
		},
		{
			date: "2024-01-10T11:15:00",
			message: "Request assigned to Mike Wilson",
			author: "Admin",
		},
		{
			date: "2024-01-11T14:20:00",
			message: "Technician contacted tenant to schedule visit",
			author: "Mike Wilson",
		},
	],
});

export default function AdminMaintenanceDetailsPage() {
	const params = useParams();
	const [newUpdate, setNewUpdate] = useState("");
	const maintenanceData = getMaintenanceData(params.id as string);
	const { toast } = useToast();

	const getStatusColor = (status: string) => {
		switch (status) {
			case "open":
				return "bg-red-100 text-red-800";
			case "in_progress":
				return "bg-yellow-100 text-yellow-800";
			case "completed":
				return "bg-emerald-100 text-emerald-800";
			case "cancelled":
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "bg-red-100 text-red-800";
			case "medium":
				return "bg-yellow-100 text-yellow-800";
			case "low":
				return "bg-emerald-100 text-emerald-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "open":
				return AlertTriangle;
			case "in_progress":
				return Clock;
			case "completed":
				return CheckCircle;
			default:
				return Clock;
		}
	};

	const handleAddUpdate = () => {
		if (newUpdate.trim()) {
			toast({
				title: "Update Added",
				description: "Maintenance request update has been added",
			});
			setNewUpdate("");
		}
	};

	const StatusIcon = getStatusIcon(maintenanceData.status);

	return (
		<DashboardLayout
			userRole="admin"
			userName="አስተዳዳሪ አበበ / Admin Abebe"
			userEmail="admin@akeray.et"
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
							<Link href="/dashboard/admin/maintenance">
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back to Maintenance
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								የጥገና ጥያቄ ዝርዝር / Maintenance Request Details
							</h1>
							<p className="text-lg text-gray-600">
								ሙሉ የጥገና ጥያቄ መረጃ እና ሁኔታ / Complete maintenance request
								information and status
							</p>
							<p className="text-sm text-gray-500">
								Request ID: {maintenanceData.id} • Created:{" "}
								{new Date(maintenanceData.createdDate).toLocaleDateString()}
							</p>
						</div>
						<div className="flex space-x-3">
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
							>
								<Link href={`/dashboard/admin/maintenance/${params.id}/edit`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Request
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Request Overview */}
				<div
					className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<StatusIcon className="h-6 w-6 text-emerald-600" />
								<span>የጥያቄ አጠቃላይ እይታ / Request Overview</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ጥያቄ ርዕስ / Request Title
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{maintenanceData.title}
									</p>
									<p className="text-sm text-gray-600">
										Category: {maintenanceData.category}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ቅድሚያ / Priority
									</p>
									<Badge className={getPriorityColor(maintenanceData.priority)}>
										{maintenanceData.priority}
									</Badge>
									<p className="text-sm text-gray-600">
										Created:{" "}
										{new Date(maintenanceData.createdDate).toLocaleDateString()}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ሁኔታ / Status
									</p>
									<Badge className={getStatusColor(maintenanceData.status)}>
										{maintenanceData.status.replace("_", " ")}
									</Badge>
									<p className="text-sm text-gray-600">
										{maintenanceData.scheduledDate
											? `Scheduled: ${new Date(
													maintenanceData.scheduledDate
											  ).toLocaleDateString()}`
											: "Not scheduled"}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										የተገመተ ወጪ / Estimated Cost
									</p>
									<p className="text-lg font-bold text-emerald-600">
										{maintenanceData.estimatedCost.toLocaleString()} ብር
									</p>
									<p className="text-sm text-gray-600">
										{maintenanceData.actualCost
											? `Actual: ${maintenanceData.actualCost.toLocaleString()} ብር`
											: "Pending completion"}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Request Details */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<Wrench className="h-6 w-6 text-orange-600" />
									<span>የጥያቄ ዝርዝር / Request Details</span>
								</CardTitle>
								<CardDescription>
									Detailed description and requirements
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<h4 className="font-semibold text-gray-900 mb-3">
										መግለጫ / Description
									</h4>
									<div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
										<p className="text-gray-700 leading-relaxed">
											{maintenanceData.description}
										</p>
									</div>
								</div>

								<div>
									<h4 className="font-semibold text-gray-900 mb-3">
										የመዳረሻ መመሪያዎች / Access Instructions
									</h4>
									<div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
										<p className="text-gray-700 leading-relaxed">
											{maintenanceData.accessInstructions}
										</p>
									</div>
								</div>

								{maintenanceData.notes && (
									<div>
										<h4 className="font-semibold text-gray-900 mb-3">
											ማስታወሻዎች / Notes
										</h4>
										<div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
											<p className="text-gray-700 leading-relaxed">
												{maintenanceData.notes}
											</p>
										</div>
									</div>
								)}

								{/* Add Update */}
								<div>
									<h4 className="font-semibold text-gray-900 mb-3">
										ዝማኔ ጨምር / Add Update
									</h4>
									<div className="space-y-3">
										<Textarea
											placeholder="Add an update about this maintenance request..."
											value={newUpdate}
											onChange={(e) => setNewUpdate(e.target.value)}
											rows={3}
										/>
										<Button
											onClick={handleAddUpdate}
											className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
										>
											Add Update
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Tenant & Assignment Info */}
					<div className="space-y-8">
						{/* Tenant Information */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-800"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-3 text-xl">
										<User className="h-6 w-6 text-blue-600" />
										<span>ተከራይ መረጃ / Tenant Information</span>
									</CardTitle>
									<CardDescription>
										Details about the tenant who submitted this request
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100">
											<Avatar className="h-16 w-16 ring-4 ring-blue-200">
												<AvatarImage src={maintenanceData.tenant.avatar} />
												<AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-bold text-lg">
													{maintenanceData.tenant.name
														.split(" ")
														.slice(-2)
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<p className="font-semibold text-lg text-gray-900">
													{maintenanceData.tenant.name}
												</p>
												<p className="text-sm text-blue-600 font-medium">
													Tenant
												</p>
											</div>
										</div>

										<div className="space-y-3">
											<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
												<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
													<Phone className="h-5 w-5 text-emerald-600" />
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{maintenanceData.tenant.phone}
													</p>
													<p className="text-xs text-gray-500">Phone</p>
												</div>
											</div>
											<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
												<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
													<Mail className="h-5 w-5 text-blue-600" />
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{maintenanceData.tenant.email}
													</p>
													<p className="text-xs text-gray-500">Email</p>
												</div>
											</div>
										</div>

										<div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
											<h4 className="font-semibold text-purple-800 mb-2">
												Property Details
											</h4>
											<p className="text-purple-700 font-medium">
												{maintenanceData.property.name}
											</p>
											<p className="text-purple-600">
												Unit {maintenanceData.property.unit}
											</p>
											<p className="text-sm text-purple-600 mt-1">
												{maintenanceData.property.address}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Assignment & Timeline */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1000"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-3 text-xl">
										<Calendar className="h-6 w-6 text-purple-600" />
										<span>ምደባ እና የጊዜ ሰሌዳ / Assignment & Timeline</span>
									</CardTitle>
									<CardDescription>
										Technician assignment and progress updates
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									{maintenanceData.assignedTo && (
										<div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
											<h4 className="font-semibold text-emerald-800 mb-2">
												Assigned Technician
											</h4>
											<p className="text-emerald-700 font-medium">
												{maintenanceData.assignedTo.name}
											</p>
											<p className="text-emerald-600 text-sm">
												{maintenanceData.assignedTo.specialty}
											</p>
											<p className="text-emerald-600 text-sm">
												{maintenanceData.assignedTo.phone}
											</p>
										</div>
									)}

									<div>
										<h4 className="font-semibold text-gray-900 mb-3">
											የሂደት ዝማኔዎች / Progress Updates
										</h4>
										<div className="space-y-3">
											{maintenanceData.updates.map((update, index) => (
												<div
													key={index}
													className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-200"
												>
													<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
														<span className="text-xs font-bold text-blue-600">
															{index + 1}
														</span>
													</div>
													<div className="flex-1">
														<p className="text-sm font-medium text-gray-900">
															{update.message}
														</p>
														<div className="flex items-center justify-between mt-1">
															<p className="text-xs text-gray-500">
																{new Date(update.date).toLocaleString()}
															</p>
															<p className="text-xs text-blue-600 font-medium">
																{update.author}
															</p>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
