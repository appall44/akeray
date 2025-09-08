"use client";

import { useState, useEffect } from "react";
import {
	Bell,
	CheckCircle,
	Clock,
	AlertCircle,
	Eye,
	BookMarked as MarkAsRead,
	X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuHeader,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Notification {
	id: string;
	title: string;
	message: string;
	type: "payment" | "maintenance" | "lease" | "user" | "general";
	status: "read" | "unread";
	date: string;
	priority: "high" | "normal" | "low";
	actionUrl?: string;
	relatedId?: string;
}

interface NotificationDropdownProps {
	userRole: "admin" | "owner" | "tenant";
}

const getNotificationsForRole = (role: string): Notification[] => {
	const baseNotifications = {
		admin: [
			{
				id: "NOT-001",
				title: "New User Registration",
				message: "Dawit Mekonnen has submitted a property owner application",
				type: "user" as const,
				status: "unread" as const,
				date: "2024-01-15T10:30:00",
				priority: "normal" as const,
				actionUrl: "/dashboard/admin/register",
				relatedId: "REG-001",
			},
			{
				id: "NOT-002",
				title: "Payment Received",
				message: "Payment of 15,000 ETB received from Abebe Kebede",
				type: "payment" as const,
				status: "unread" as const,
				date: "2024-01-15T09:15:00",
				priority: "normal" as const,
				actionUrl: "/dashboard/admin/payments",
				relatedId: "PAY-001",
			},
			{
				id: "NOT-003",
				title: "Urgent Maintenance Request",
				message: "High priority electrical issue reported in Unit 2B",
				type: "maintenance" as const,
				status: "unread" as const,
				date: "2024-01-15T08:45:00",
				priority: "high" as const,
				actionUrl: "/dashboard/admin/maintenance",
				relatedId: "MNT-003",
			},
		],
		owner: [
			{
				id: "NOT-001",
				title: "Payment Received",
				message: "Rent payment of 25,000 ETB received from Tigist Haile",
				type: "payment" as const,
				status: "unread" as const,
				date: "2024-01-15T10:30:00",
				priority: "normal" as const,
				actionUrl: "/dashboard/owner/payments",
				relatedId: "PAY-001",
			},
			{
				id: "NOT-002",
				title: "Lease Renewal Required",
				message: "Lease for Hanan Ahmed expires in 15 days",
				type: "lease" as const,
				status: "unread" as const,
				date: "2024-01-15T09:00:00",
				priority: "high" as const,
				actionUrl: "/dashboard/owner/leases",
				relatedId: "LSE-003",
			},
			{
				id: "NOT-003",
				title: "Maintenance Completed",
				message: "Plumbing repair in Unit 2A has been completed",
				type: "maintenance" as const,
				status: "read" as const,
				date: "2024-01-14T16:20:00",
				priority: "normal" as const,
				actionUrl: "/dashboard/owner/notifications",
			},
		],
		tenant: [
			{
				id: "NOT-001",
				title: "Payment Due Reminder",
				message: "Your rent payment of 18,000 ETB is due on January 1, 2025",
				type: "payment" as const,
				status: "unread" as const,
				date: "2024-12-25T09:00:00",
				priority: "high" as const,
				actionUrl: "/dashboard/tenant/payments",
			},
			{
				id: "NOT-002",
				title: "Maintenance Update",
				message: "Your kitchen faucet repair has been completed",
				type: "maintenance" as const,
				status: "read" as const,
				date: "2024-12-18T14:30:00",
				priority: "normal" as const,
				actionUrl: "/dashboard/tenant/maintenance",
				relatedId: "MNT-001",
			},
			{
				id: "NOT-003",
				title: "Lease Renewal Notice",
				message:
					"Your lease expires on December 31, 2024. Contact us for renewal",
				type: "lease" as const,
				status: "unread" as const,
				date: "2024-12-15T10:15:00",
				priority: "high" as const,
				actionUrl: "/dashboard/tenant/lease",
			},
		],
	};

	return baseNotifications[role] || [];
};

export default function NotificationDropdown({
	userRole,
}: NotificationDropdownProps) {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setNotifications(getNotificationsForRole(userRole));
	}, [userRole]);

	const unreadCount = notifications.filter((n) => n.status === "unread").length;

	const markAsRead = (notificationId: string) => {
		setNotifications((prev) =>
			prev.map((n) =>
				n.id === notificationId ? { ...n, status: "read" as const } : n
			)
		);
	};

	const markAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((n) => ({ ...n, status: "read" as const }))
		);
	};

	const handleNotificationClick = (notification: Notification) => {
		markAsRead(notification.id);
		setIsOpen(false);
		if (notification.actionUrl) {
			router.push(notification.actionUrl);
		}
	};

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "payment":
				return CheckCircle;
			case "maintenance":
				return AlertCircle;
			case "lease":
				return Clock;
			case "user":
				return CheckCircle;
			default:
				return Bell;
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case "payment":
				return "text-emerald-600";
			case "maintenance":
				return "text-orange-600";
			case "lease":
				return "text-purple-600";
			case "user":
				return "text-blue-600";
			default:
				return "text-gray-600";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "bg-red-100 text-red-800";
			case "normal":
				return "bg-blue-100 text-blue-800";
			case "low":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="relative hover:bg-emerald-50"
				>
					<Bell className="h-6 w-6" />
					{unreadCount > 0 && (
						<Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center animate-pulse">
							{unreadCount}
						</Badge>
					)}
					<span className="sr-only">View notifications</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-96 bg-white/95 backdrop-blur-sm border-0 shadow-2xl"
			>
				<div className="p-4">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Notifications
						</h3>
						<div className="flex items-center space-x-2">
							{unreadCount > 0 && (
								<Button
									variant="ghost"
									size="sm"
									onClick={markAllAsRead}
									className="text-emerald-600 hover:text-emerald-700"
								>
									<CheckCircle className="h-4 w-4 mr-1" />
									Mark All Read
								</Button>
							)}
							<Button
								variant="ghost"
								size="sm"
								asChild
								className="text-blue-600 hover:text-blue-700"
							>
								<Link href={`/dashboard/${userRole}/notifications`}>
									<Eye className="h-4 w-4 mr-1" />
									View All
								</Link>
							</Button>
						</div>
					</div>

					<ScrollArea className="h-96">
						<div className="space-y-3">
							{notifications.length === 0 ? (
								<div className="text-center py-8">
									<Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<p className="text-gray-500">No notifications</p>
								</div>
							) : (
								notifications.map((notification) => {
									const TypeIcon = getTypeIcon(notification.type);
									return (
										<div
											key={notification.id}
											className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-md ${
												notification.status === "unread"
													? "bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200"
													: "bg-white border-gray-100 hover:bg-gray-50"
											}`}
											onClick={() => handleNotificationClick(notification)}
										>
											<div className="flex items-start space-x-3">
												<div
													className={`p-2 rounded-full ${
														notification.status === "unread"
															? "bg-blue-100"
															: "bg-gray-100"
													}`}
												>
													<TypeIcon
														className={`h-4 w-4 ${
															notification.status === "unread"
																? getTypeColor(notification.type)
																: "text-gray-600"
														}`}
													/>
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-start justify-between mb-1">
														<h4
															className={`font-medium text-sm ${
																notification.status === "unread"
																	? "text-gray-900"
																	: "text-gray-700"
															}`}
														>
															{notification.title}
														</h4>
														<div className="flex items-center space-x-1 ml-2">
															<Badge
																className={getPriorityColor(
																	notification.priority
																)}
															>
																{notification.priority}
															</Badge>
															{notification.status === "unread" && (
																<div className="w-2 h-2 bg-blue-500 rounded-full" />
															)}
														</div>
													</div>
													<p className="text-xs text-gray-600 mb-2 line-clamp-2">
														{notification.message}
													</p>
													<p className="text-xs text-gray-500">
														{new Date(notification.date).toLocaleString()}
													</p>
												</div>
											</div>
										</div>
									);
								})
							)}
						</div>
					</ScrollArea>

					{notifications.length > 0 && (
						<>
							<Separator className="my-4" />
							<div className="flex justify-center">
								<Button
									variant="outline"
									size="sm"
									asChild
									className="border-emerald-300 hover:bg-emerald-50"
								>
									<Link href={`/dashboard/${userRole}/notifications`}>
										View All Notifications
									</Link>
								</Button>
							</div>
						</>
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
