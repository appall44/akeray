"use client";

import { useState } from "react";
import {
	Bell,
	ArrowLeft,
	Edit,
	Send,
	CheckCircle,
	Clock,
	AlertCircle,
	Mail,
	MessageSquare,
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
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock notification data
const getNotificationData = (notificationId: string) => ({
	id: notificationId,
	title: "የክፍያ ማስታወሻ / Payment Reminder",
	message:
		"ለአበበ ከበደ የክራይ ክፍያ ማስታወሻ ተልኳል። የጥር 1 ቀን 2025 የሚገባው 15,000 ብር ክፍያ ለማስታወስ SMS ተልኳል።",
	type: "payment",
	status: "sent",
	recipient: "አበበ ከበደ / Abebe Kebede",
	recipientPhone: "+251911234567",
	recipientEmail: "abebe@email.com",
	sentDate: "2024-01-10T10:30:00",
	method: "SMS",
	deliveryStatus: "delivered",
	relatedEntity: {
		type: "payment",
		id: "PAY-001",
		description: "Monthly rent payment for January 2025",
	},
	template: "payment_reminder",
	attempts: 1,
	lastAttempt: "2024-01-10T10:30:00",
});

export default function AdminNotificationDetailsPage() {
	const params = useParams();
	const { toast } = useToast();
	const notificationData = getNotificationData(params.id as string);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "sent":
				return "bg-emerald-100 text-emerald-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "failed":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "sent":
				return CheckCircle;
			case "pending":
				return Clock;
			case "failed":
				return AlertCircle;
			default:
				return Clock;
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case "payment":
				return "bg-emerald-100 text-emerald-800";
			case "maintenance":
				return "bg-orange-100 text-orange-800";
			case "lease":
				return "bg-purple-100 text-purple-800";
			case "general":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getTypeLabel = (type: string) => {
		switch (type) {
			case "payment":
				return "ክፍያ / Payment";
			case "maintenance":
				return "ጥገና / Maintenance";
			case "lease":
				return "ውል / Lease";
			case "general":
				return "አጠቃላይ / General";
			default:
				return type;
		}
	};

	const handleResend = () => {
		toast({
			title: "Notification Resent",
			description: `Notification resent to ${notificationData.recipient}`,
		});
	};

	const StatusIcon = getStatusIcon(notificationData.status);

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
							<Link href="/dashboard/admin/notifications">
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back to Notifications
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								የማሳወቂያ ዝርዝር / Notification Details
							</h1>
							<p className="text-lg text-gray-600">
								ሙሉ የማሳወቂያ መረጃ እና ሁኔታ / Complete notification information and
								status
							</p>
							<p className="text-sm text-gray-500">
								Notification ID: {notificationData.id} • Sent:{" "}
								{new Date(notificationData.sentDate).toLocaleDateString()}
							</p>
						</div>
						<div className="flex space-x-3">
							{notificationData.status === "failed" && (
								<Button
									onClick={handleResend}
									variant="outline"
									className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
								>
									<Send className="h-4 w-4 mr-2" />
									Resend
								</Button>
							)}
						</div>
					</div>
				</div>

				{/* Notification Overview */}
				<div
					className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<StatusIcon className="h-6 w-6 text-emerald-600" />
								<span>የማሳወቂያ አጠቃላይ እይታ / Notification Overview</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ርዕስ / Title
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{notificationData.title}
									</p>
									<Badge className={getTypeColor(notificationData.type)}>
										{getTypeLabel(notificationData.type)}
									</Badge>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ተቀባይ / Recipient
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{notificationData.recipient}
									</p>
									<p className="text-sm text-gray-600">
										{notificationData.recipientPhone}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										የላኪ ዘዴ / Delivery Method
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{notificationData.method}
									</p>
									<p className="text-sm text-gray-600">
										Status: {notificationData.deliveryStatus}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ሁኔታ / Status
									</p>
									<Badge className={getStatusColor(notificationData.status)}>
										{notificationData.status}
									</Badge>
									<p className="text-sm text-gray-600">
										Attempts: {notificationData.attempts}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Message Content */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<MessageSquare className="h-6 w-6 text-blue-600" />
									<span>የመልእክት ይዘት / Message Content</span>
								</CardTitle>
								<CardDescription>
									The actual message that was sent to the recipient
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
									<p className="text-gray-700 leading-relaxed">
										{notificationData.message}
									</p>
								</div>

								<Separator className="my-6" />

								<div className="space-y-4">
									<h4 className="font-semibold text-gray-900">
										የላኪ ዝርዝር / Delivery Details
									</h4>
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-600">Template:</span>
											<span className="font-medium">
												{notificationData.template}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Method:</span>
											<span className="font-medium">
												{notificationData.method}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Sent Date:</span>
											<span className="font-medium">
												{new Date(notificationData.sentDate).toLocaleString()}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Delivery Status:</span>
											<Badge
												className={
													notificationData.deliveryStatus === "delivered"
														? "bg-emerald-100 text-emerald-800"
														: "bg-red-100 text-red-800"
												}
											>
												{notificationData.deliveryStatus}
											</Badge>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Related Information */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-800"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<Bell className="h-6 w-6 text-purple-600" />
									<span>ተዛማጅ መረጃ / Related Information</span>
								</CardTitle>
								<CardDescription>
									Information about the related entity or action
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{notificationData.relatedEntity && (
									<div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
										<h4 className="font-semibold text-purple-800 mb-2">
											Related Entity
										</h4>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-purple-700">Type:</span>
												<span className="text-purple-600 font-medium">
													{notificationData.relatedEntity.type}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-purple-700">ID:</span>
												<span className="text-purple-600 font-medium">
													{notificationData.relatedEntity.id}
												</span>
											</div>
											<div className="mt-2">
												<p className="text-purple-700 text-sm">
													{notificationData.relatedEntity.description}
												</p>
											</div>
										</div>
									</div>
								)}

								<div className="space-y-4">
									<h4 className="font-semibold text-gray-900">
										ተቀባይ መረጃ / Recipient Information
									</h4>
									<div className="space-y-3">
										<div className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
											<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
												<span className="text-emerald-600 font-bold">👤</span>
											</div>
											<div>
												<p className="text-sm font-medium text-gray-900">
													{notificationData.recipient}
												</p>
												<p className="text-xs text-gray-500">Recipient Name</p>
											</div>
										</div>
										<div className="flex items-center space-x-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
											<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
												<span className="text-blue-600 font-bold">📞</span>
											</div>
											<div>
												<p className="text-sm font-medium text-gray-900">
													{notificationData.recipientPhone}
												</p>
												<p className="text-xs text-gray-500">Phone Number</p>
											</div>
										</div>
										{notificationData.recipientEmail && (
											<div className="flex items-center space-x-3 p-3 rounded-xl bg-yellow-50 border border-yellow-200">
												<div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
													<Mail className="h-5 w-5 text-yellow-600" />
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{notificationData.recipientEmail}
													</p>
													<p className="text-xs text-gray-500">Email Address</p>
												</div>
											</div>
										)}
									</div>
								</div>

								{notificationData.status === "failed" && (
									<div className="p-4 rounded-xl bg-red-50 border border-red-200">
										<h4 className="font-semibold text-red-800 mb-2">
											Delivery Failed
										</h4>
										<p className="text-red-700 text-sm">
											The notification could not be delivered. Please check the
											recipient's contact information and try again.
										</p>
										<Button
											onClick={() =>
												toast({
													title: "Notification Resent",
													description:
														"Notification has been queued for resending",
												})
											}
											className="mt-3 bg-red-600 hover:bg-red-700"
											size="sm"
										>
											<Send className="h-4 w-4 mr-2" />
											Retry Sending
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
