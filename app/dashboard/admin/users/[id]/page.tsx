"use client";

import { useState } from "react";
import {
	ArrowLeft,
	Edit,
	Trash2,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Shield,
	Building,
	FileText,
	Wrench,
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function UserDetailsPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const userId = params.id as string;

	// Mock user data - in real app, fetch from API based on userId
	const user = {
		id: userId,
		name: "Aylele Bhir",
		email: "ayele.bhir@email.com",
		phone: "+251911234567",
		role: "tenant",
		status: "active",
		address: "Bole Road, Addis Ababa",
		city: "Addis Ababa",
		joinDate: "2024-01-15",
		emergencyContact: "Almaz Bhir",
		emergencyPhone: "+251922345678",
		avatar: "/placeholder-user.jpg",
		notes: "Reliable tenant, always pays on time",
		properties: [
			{
				id: "1",
				name: "Sunrise Apartments",
				unit: "4A",
				monthlyRent: 15000,
				leaseStart: "2024-01-01",
				leaseEnd: "2024-12-31",
				status: "active",
			},
		],
		paymentHistory: [
			{
				id: "1",
				month: "December 2024",
				amount: 15000,
				status: "paid",
				date: "2024-12-01",
			},
			{
				id: "2",
				month: "November 2024",
				amount: 15000,
				status: "paid",
				date: "2024-11-01",
			},
			{
				id: "3",
				month: "October 2024",
				amount: 15000,
				status: "paid",
				date: "2024-10-01",
			},
		],
		maintenanceRequests: [
			{
				id: "1",
				title: "Kitchen faucet leak",
				status: "completed",
				date: "2024-12-15",
				priority: "medium",
			},
			{
				id: "2",
				title: "Bedroom light fixture",
				status: "in_progress",
				date: "2024-12-20",
				priority: "low",
			},
		],
	};

	const handleDeactivate = () => {
		toast({
			title: "ተጠቃሚ ተሰናክሏል / User Deactivated",
			description: `${user.name} has been deactivated successfully`,
		});
		router.push("/dashboard/admin/users");
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case "admin":
				return "bg-purple-100 text-purple-800";
			case "owner":
				return "bg-blue-100 text-blue-800";
			case "tenant":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800";
			case "inactive":
				return "bg-red-100 text-red-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
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
							<Link href="/dashboard/admin/users">
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back
							</Link>
						</Button>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								የተጠቃሚ ዝርዝር / User Details
							</h1>
							<p className="text-gray-600 mt-1">
								ሙሉ የተጠቃሚ መረጃ እና ታሪክ / Complete user information and history
							</p>
						</div>
					</div>
					<div className="flex space-x-3">
						<Button variant="outline" asChild>
							<Link href={`/dashboard/admin/users/${userId}/edit`}>
								<Edit className="h-4 w-4 mr-2" />
								አርም / Edit
							</Link>
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="outline"
									className="text-red-600 hover:text-red-700"
								>
									<Trash2 className="h-4 w-4 mr-2" />
									አሰናክል / Deactivate
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										ተጠቃሚ አሰናክል / Deactivate User
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to deactivate {user.name}? This will
										prevent them from accessing the system.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>ተወው / Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleDeactivate}
										className="bg-red-600 hover:bg-red-700"
									>
										አሰናክል / Deactivate
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* User Profile */}
					<Card className="lg:col-span-1">
						<CardHeader className="text-center">
							<Avatar className="h-24 w-24 mx-auto ring-4 ring-emerald-200">
								<AvatarImage src={user.avatar || "/placeholder-user.jpg"} />
								<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold text-xl">
									{user.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<CardTitle className="text-xl">{user.name}</CardTitle>
							<div className="flex justify-center space-x-2">
								<Badge className={getRoleColor(user.role)}>{user.role}</Badge>
								<Badge className={getStatusColor(user.status)}>
									{user.status}
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex items-center space-x-3">
									<Mail className="h-4 w-4 text-gray-400" />
									<span className="text-sm">{user.email}</span>
								</div>
								<div className="flex items-center space-x-3">
									<Phone className="h-4 w-4 text-gray-400" />
									<span className="text-sm">{user.phone}</span>
								</div>
								<div className="flex items-center space-x-3">
									<MapPin className="h-4 w-4 text-gray-400" />
									<span className="text-sm">{user.address}</span>
								</div>
								<div className="flex items-center space-x-3">
									<Calendar className="h-4 w-4 text-gray-400" />
									<span className="text-sm">
										Joined {new Date(user.joinDate).toLocaleDateString()}
									</span>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<h4 className="font-semibold text-gray-900 flex items-center">
									<Shield className="h-4 w-4 mr-2 text-red-500" />
									የአደጋ ጊዜ መገናኛ / Emergency Contact
								</h4>
								<div className="text-sm space-y-1">
									<p className="font-medium">{user.emergencyContact}</p>
									<p className="text-gray-600">{user.emergencyPhone}</p>
								</div>
							</div>

							{user.notes && (
								<>
									<Separator />
									<div className="space-y-2">
										<h4 className="font-semibold text-gray-900">
											ማስታወሻዎች / Notes
										</h4>
										<p className="text-sm text-gray-600">{user.notes}</p>
									</div>
								</>
							)}
						</CardContent>
					</Card>

					{/* User Activity */}
					<div className="lg:col-span-2 space-y-6">
						{/* Properties */}
						{user.role === "tenant" && user.properties.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Building className="h-5 w-5 text-emerald-600" />
										<span>ንብረቶች / Properties</span>
									</CardTitle>
									<CardDescription>
										የተከራዩ ንብረቶች / Rented properties
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{user.properties.map((property) => (
											<div key={property.id} className="p-4 border rounded-lg">
												<div className="flex justify-between items-start">
													<div>
														<h4 className="font-semibold">{property.name}</h4>
														<p className="text-sm text-gray-600">
															Unit {property.unit}
														</p>
														<p className="text-sm text-gray-500">
															{new Date(
																property.leaseStart
															).toLocaleDateString()}{" "}
															-{" "}
															{new Date(property.leaseEnd).toLocaleDateString()}
														</p>
													</div>
													<div className="text-right">
														<p className="font-bold text-emerald-600">
															{property.monthlyRent.toLocaleString()} ETB
														</p>
														<Badge className={getStatusColor(property.status)}>
															{property.status}
														</Badge>
													</div>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)}

						{/* Payment History */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<FileText className="h-5 w-5 text-purple-600" />
									<span>የክፍያ ታሪክ / Payment History</span>
								</CardTitle>
								<CardDescription>
									የቅርብ ጊዜ ክፍያዎች / Recent payments
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>ወር / Month</TableHead>
											<TableHead>መጠን / Amount</TableHead>
											<TableHead>ሁኔታ / Status</TableHead>
											<TableHead>ቀን / Date</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{user.paymentHistory.map((payment) => (
											<TableRow key={payment.id}>
												<TableCell className="font-medium">
													{payment.month}
												</TableCell>
												<TableCell>
													{payment.amount.toLocaleString()} ETB
												</TableCell>
												<TableCell>
													<Badge
														className={
															payment.status === "paid"
																? "bg-green-100 text-green-800"
																: "bg-red-100 text-red-800"
														}
													>
														{payment.status}
													</Badge>
												</TableCell>
												<TableCell>
													{new Date(payment.date).toLocaleDateString()}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>

						{/* Maintenance Requests */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Wrench className="h-5 w-5 text-orange-600" />
									<span>የጥገና ጥያቄዎች / Maintenance Requests</span>
								</CardTitle>
								<CardDescription>
									የቅርብ ጊዜ የጥገና ጥያቄዎች / Recent maintenance requests
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{user.maintenanceRequests.map((request) => (
										<div
											key={request.id}
											className="flex items-center justify-between p-4 border rounded-lg"
										>
											<div>
												<h4 className="font-semibold">{request.title}</h4>
												<p className="text-sm text-gray-500">
													{new Date(request.date).toLocaleDateString()}
												</p>
											</div>
											<div className="flex space-x-2">
												<Badge
													className={
														request.priority === "high"
															? "bg-red-100 text-red-800"
															: request.priority === "medium"
															? "bg-yellow-100 text-yellow-800"
															: "bg-green-100 text-green-800"
													}
												>
													{request.priority}
												</Badge>
												<Badge
													className={
														request.status === "completed"
															? "bg-green-100 text-green-800"
															: request.status === "in_progress"
															? "bg-yellow-100 text-yellow-800"
															: "bg-red-100 text-red-800"
													}
												>
													{request.status}
												</Badge>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
