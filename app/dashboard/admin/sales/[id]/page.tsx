"use client";

import { useState } from "react";
import {
	TrendingUp,
	ArrowLeft,
	Edit,
	Phone,
	Mail,
	User,
	Building,
	Calendar,
	DollarSign,
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock sales lead data
const getLeadData = (leadId: string) => ({
	id: leadId,
	name: "ዳንኤል ተስፋዬ / Daniel Tesfaye",
	email: "daniel.tesfaye@email.com",
	phone: "+251911234567",
	property: "የፀሐይ መውጫ አፓርትመንቶች / Sunrise Apartments",
	unit: "5B",
	status: "interested",
	source: "website",
	budget: 18000,
	contactDate: "2024-01-15",
	followUpDate: "2024-01-20",
	notes: "ለቤተሰብ ቤት ይፈልጋል / Looking for family home",
	occupation: "Software Engineer",
	familySize: 3,
	currentAddress: "Bole, Addis Ababa",
	moveInDate: "2025-02-01",
	requirements: "2 bedrooms, parking space, family-friendly environment",
	avatar: "/placeholder-user.jpg",
	interactions: [
		{
			date: "2024-01-15T10:30:00",
			type: "initial_contact",
			message: "Initial inquiry submitted through website",
			author: "System",
		},
		{
			date: "2024-01-15T14:20:00",
			type: "phone_call",
			message: "Called customer to discuss requirements",
			author: "Sales Team",
		},
		{
			date: "2024-01-16T09:15:00",
			type: "email",
			message: "Sent property details and pricing information",
			author: "Sales Team",
		},
	],
});

export default function AdminSalesLeadDetailsPage() {
	const params = useParams();
	const { toast } = useToast();
	const leadData = getLeadData(params.id as string);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "interested":
				return "bg-blue-100 text-blue-800";
			case "qualified":
				return "bg-yellow-100 text-yellow-800";
			case "closed-won":
				return "bg-emerald-100 text-emerald-800";
			case "closed-lost":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case "interested":
				return "ፍላጎት አለው / Interested";
			case "qualified":
				return "ብቁ / Qualified";
			case "closed-won":
				return "ተሳክቷል / Closed Won";
			case "closed-lost":
				return "አልተሳካም / Closed Lost";
			default:
				return status;
		}
	};

	const handlePhoneCall = () => {
		toast({
			title: "Phone Call Initiated",
			description: `Calling ${leadData.name} at ${leadData.phone}`,
		});
	};

	const handleSendEmail = () => {
		toast({
			title: "Email Sent",
			description: `Email sent to ${leadData.email}`,
		});
	};

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
							<Link href="/dashboard/admin/sales">
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back to Sales
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								የሽያጭ እድል ዝርዝር / Sales Lead Details
							</h1>
							<p className="text-lg text-gray-600">
								ሙሉ የደንበኛ መረጃ እና ግንኙነት ታሪክ / Complete customer information and
								interaction history
							</p>
							<p className="text-sm text-gray-500">
								Lead ID: {leadData.id} • Source: {leadData.source}
							</p>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								onClick={handlePhoneCall}
								className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
							>
								<Phone className="h-4 w-4 mr-2" />
								Call Customer
							</Button>
							<Button
								variant="outline"
								onClick={handleSendEmail}
								className="border-blue-300 hover:bg-blue-50 bg-transparent"
							>
								<Mail className="h-4 w-4 mr-2" />
								Send Email
							</Button>
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
							>
								<Link href={`/dashboard/admin/sales/${params.id}/edit`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Lead
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Lead Overview */}
				<div
					className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<TrendingUp className="h-6 w-6 text-emerald-600" />
								<span>የእድል አጠቃላይ እይታ / Lead Overview</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ደንበኛ / Customer
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{leadData.name}
									</p>
									<p className="text-sm text-gray-600">{leadData.occupation}</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ፍላጎት ያለው ንብረት / Interested Property
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{leadData.property}
									</p>
									<p className="text-sm text-gray-600">Unit {leadData.unit}</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										በጀት / Budget
									</p>
									<p className="text-lg font-bold text-emerald-600">
										{leadData.budget.toLocaleString()} ብር
									</p>
									<p className="text-sm text-gray-600">per month</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ሁኔታ / Status
									</p>
									<Badge className={getStatusColor(leadData.status)}>
										{getStatusLabel(leadData.status)}
									</Badge>
									<p className="text-sm text-gray-600">
										Follow-up:{" "}
										{new Date(leadData.followUpDate).toLocaleDateString()}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Customer Information */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<User className="h-6 w-6 text-blue-600" />
									<span>የደንበኛ መረጃ / Customer Information</span>
								</CardTitle>
								<CardDescription>
									Complete customer details and preferences
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									<div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100">
										<Avatar className="h-16 w-16 ring-4 ring-blue-200">
											<AvatarImage src={leadData.avatar} />
											<AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-bold text-lg">
												{leadData.name
													.split(" ")
													.slice(-2)
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1">
											<p className="font-semibold text-lg text-gray-900">
												{leadData.name}
											</p>
											<p className="text-sm text-gray-600">
												{leadData.occupation}
											</p>
											<p className="text-sm text-blue-600 font-medium">
												Family of {leadData.familySize}
											</p>
										</div>
									</div>

									<div className="space-y-4">
										<div className="grid grid-cols-2 gap-4">
											<div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
												<p className="text-sm font-medium text-emerald-700">
													Phone
												</p>
												<p className="text-emerald-600">{leadData.phone}</p>
											</div>
											<div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
												<p className="text-sm font-medium text-blue-700">
													Email
												</p>
												<p className="text-blue-600">{leadData.email}</p>
											</div>
										</div>

										<div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
											<h4 className="font-semibold text-purple-800 mb-2">
												Requirements
											</h4>
											<p className="text-purple-700 text-sm">
												{leadData.requirements}
											</p>
										</div>

										<div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
											<h4 className="font-semibold text-yellow-800 mb-2">
												Additional Notes
											</h4>
											<p className="text-yellow-700 text-sm">
												{leadData.notes}
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Interaction History */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-800"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<Calendar className="h-6 w-6 text-purple-600" />
									<span>የግንኙነት ታሪክ / Interaction History</span>
								</CardTitle>
								<CardDescription>
									Timeline of all interactions with this lead
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{leadData.interactions.map((interaction, index) => (
										<div
											key={index}
											className="flex items-start space-x-3 p-4 rounded-xl bg-gray-50 border border-gray-200"
										>
											<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
												<span className="text-xs font-bold text-blue-600">
													{index + 1}
												</span>
											</div>
											<div className="flex-1">
												<p className="text-sm font-medium text-gray-900">
													{interaction.message}
												</p>
												<div className="flex items-center justify-between mt-1">
													<p className="text-xs text-gray-500">
														{new Date(interaction.date).toLocaleString()}
													</p>
													<p className="text-xs text-blue-600 font-medium">
														{interaction.author}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>

								<Separator className="my-6" />

								<div className="space-y-4">
									<h4 className="font-semibold text-gray-900">
										የቀጣይ እርምጃዎች / Next Actions
									</h4>
									<div className="grid grid-cols-1 gap-3">
										<Button
											onClick={handlePhoneCall}
											className="justify-start bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
										>
											<Phone className="h-4 w-4 mr-2" />
											Schedule Follow-up Call
										</Button>
										<Button
											onClick={handleSendEmail}
											className="justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
										>
											<Mail className="h-4 w-4 mr-2" />
											Send Property Information
										</Button>
										<Button
											asChild
											className="justify-start bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
										>
											<Link href={`/dashboard/admin/sales/${params.id}/edit`}>
												<Edit className="h-4 w-4 mr-2" />
												Update Lead Status
											</Link>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
