"use client";

import { useState } from "react";
import {
	Wrench,
	Plus,
	Search,
	Eye,
	Edit,
	Clock,
	AlertTriangle,
	CheckCircle,
	User,
	MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const maintenanceRequests = [
	{
		id: "MNT-001",
		title: "Leaking Faucet in Kitchen",
		description:
			"The kitchen faucet has been leaking for the past week. Water is dripping constantly.",
		tenant: "Aylele Bhir",
		property: "Sunrise Apartments",
		unit: "4A",
		priority: "medium",
		status: "open",
		category: "plumbing",
		createdDate: "2024-01-10",
		assignedTo: null,
		estimatedCost: 500,
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "MNT-002",
		title: "Broken Air Conditioning",
		description: "AC unit stopped working completely. No cool air coming out.",
		tenant: "Sarah Wendeson",
		property: "Green Valley Complex",
		unit: "2B",
		priority: "high",
		status: "in_progress",
		category: "hvac",
		createdDate: "2024-01-08",
		assignedTo: "Mike Wilson",
		estimatedCost: 2500,
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "MNT-003",
		title: "Electrical Outlet Not Working",
		description:
			"Bedroom outlet has no power. Checked circuit breaker but issue persists.",
		tenant: "Belete Moges",
		property: "City Center Plaza",
		unit: "1C",
		priority: "high",
		status: "open",
		category: "electrical",
		createdDate: "2024-01-12",
		assignedTo: null,
		estimatedCost: 300,
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "MNT-004",
		title: "Squeaky Door Hinges",
		description: "Front door hinges are very squeaky and need lubrication.",
		tenant: "Meron Dawit",
		property: "Riverside Towers",
		unit: "3A",
		priority: "low",
		status: "completed",
		category: "general",
		createdDate: "2024-01-05",
		assignedTo: "Tom Anderson",
		estimatedCost: 50,
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "MNT-005",
		title: "Clogged Bathroom Drain",
		description:
			"Bathroom sink drain is completely blocked. Water not draining at all.",
		tenant: "Betel Maathos",
		property: "Sunrise Apartments",
		unit: "2C",
		priority: "medium",
		status: "in_progress",
		category: "plumbing",
		createdDate: "2024-01-11",
		assignedTo: "Mike Wilson",
		estimatedCost: 200,
		avatar: "/placeholder-user.jpg",
	},
];

export default function MaintenancePage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [filterPriority, setFilterPriority] = useState("all");
	const [filterCategory, setFilterCategory] = useState("all");

	const filteredRequests = maintenanceRequests.filter((request) => {
		const matchesSearch =
			request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.id.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			filterStatus === "all" || request.status === filterStatus;
		const matchesPriority =
			filterPriority === "all" || request.priority === filterPriority;
		const matchesCategory =
			filterCategory === "all" || request.category === filterCategory;
		return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "open":
				return "bg-red-100 text-red-800";
			case "in_progress":
				return "bg-yellow-100 text-yellow-800";
			case "completed":
				return "bg-green-100 text-green-800";
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
				return "bg-green-100 text-green-800";
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

	const getCategoryLabel = (category: string) => {
		switch (category) {
			case "plumbing":
				return "Plumbing";
			case "electrical":
				return "Electrical";
			case "hvac":
				return "HVAC";
			case "general":
				return "General";
			default:
				return category;
		}
	};

	const openRequests = filteredRequests.filter(
		(r) => r.status === "open"
	).length;
	const inProgressRequests = filteredRequests.filter(
		(r) => r.status === "in_progress"
	).length;
	const completedRequests = filteredRequests.filter(
		(r) => r.status === "completed"
	).length;
	const highPriorityRequests = filteredRequests.filter(
		(r) => r.priority === "high"
	).length;

	return (
		<DashboardLayout
			userRole="admin"
			userName="Admin User"
			userEmail="admin@apms.et"
		>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-poppins font-bold text-gray-900">
							Maintenance
						</h1>
						<p className="text-gray-600 mt-1">
							Manage maintenance requests and work orders
						</p>
					</div>
					<Button asChild className="bg-[#4A90E2] hover:bg-[#2F80ED]">
						<Link href="/dashboard/admin/maintenance/new">
							<Plus className="h-4 w-4 mr-2" />
							New Request
						</Link>
					</Button>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<AlertTriangle className="h-8 w-8 text-red-600" />
								<div>
									<p className="text-2xl font-bold">{openRequests}</p>
									<p className="text-sm text-gray-600">Open Requests</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<Clock className="h-8 w-8 text-yellow-600" />
								<div>
									<p className="text-2xl font-bold">{inProgressRequests}</p>
									<p className="text-sm text-gray-600">In Progress</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<CheckCircle className="h-8 w-8 text-green-600" />
								<div>
									<p className="text-2xl font-bold">{completedRequests}</p>
									<p className="text-sm text-gray-600">Completed</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<AlertTriangle className="h-8 w-8 text-orange-600" />
								<div>
									<p className="text-2xl font-bold">{highPriorityRequests}</p>
									<p className="text-sm text-gray-600">High Priority</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Search and Filter */}
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search by title, tenant, property, or request ID..."
							className="pl-10"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="flex space-x-2">
						<Select value={filterStatus} onValueChange={setFilterStatus}>
							<SelectTrigger className="w-32">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="open">Open</SelectItem>
								<SelectItem value="in_progress">In Progress</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
							</SelectContent>
						</Select>
						<Select value={filterPriority} onValueChange={setFilterPriority}>
							<SelectTrigger className="w-32">
								<SelectValue placeholder="Priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Priority</SelectItem>
								<SelectItem value="high">High</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="low">Low</SelectItem>
							</SelectContent>
						</Select>
						<Select value={filterCategory} onValueChange={setFilterCategory}>
							<SelectTrigger className="w-32">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Categories</SelectItem>
								<SelectItem value="plumbing">Plumbing</SelectItem>
								<SelectItem value="electrical">Electrical</SelectItem>
								<SelectItem value="hvac">HVAC</SelectItem>
								<SelectItem value="general">General</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Maintenance Requests Table */}
				<Card>
					<CardHeader>
						<CardTitle>Maintenance Requests</CardTitle>
						<CardDescription>
							All maintenance requests with their current status and priority
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Request ID</TableHead>
									<TableHead>Title & Description</TableHead>
									<TableHead>Tenant</TableHead>
									<TableHead>Property & Unit</TableHead>
									<TableHead>Priority</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Assigned To</TableHead>
									<TableHead>Cost</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredRequests.map((request) => {
									const StatusIcon = getStatusIcon(request.status);
									return (
										<TableRow key={request.id} className="hover:bg-gray-50">
											<TableCell>
												<span className="font-mono text-sm font-medium">
													{request.id}
												</span>
											</TableCell>
											<TableCell className="max-w-xs">
												<div>
													<p className="font-medium text-sm">{request.title}</p>
													<p className="text-xs text-gray-500 truncate">
														{request.description}
													</p>
													<Badge variant="outline" className="mt-1 text-xs">
														{getCategoryLabel(request.category)}
													</Badge>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center space-x-2">
													<Avatar className="h-8 w-8">
														<AvatarImage
															src={request.avatar || "/placeholder.svg"}
														/>
														<AvatarFallback>
															{request.tenant
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<span className="text-sm">{request.tenant}</span>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center space-x-2">
													<MapPin className="h-4 w-4 text-gray-400" />
													<div>
														<p className="text-sm font-medium">
															{request.property}
														</p>
														<p className="text-xs text-gray-500">
															Unit {request.unit}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<Badge className={getPriorityColor(request.priority)}>
													{request.priority}
												</Badge>
											</TableCell>
											<TableCell>
												<div className="flex items-center space-x-2">
													<StatusIcon className="h-4 w-4" />
													<Badge className={getStatusColor(request.status)}>
														{request.status.replace("_", " ")}
													</Badge>
												</div>
											</TableCell>
											<TableCell>
												{request.assignedTo ? (
													<div className="flex items-center space-x-2">
														<User className="h-4 w-4 text-gray-400" />
														<span className="text-sm">
															{request.assignedTo}
														</span>
													</div>
												) : (
													<span className="text-sm text-gray-400">
														Unassigned
													</span>
												)}
											</TableCell>
											<TableCell>
												<span className="font-medium">
													₹{request.estimatedCost}
												</span>
											</TableCell>
											<TableCell className="text-right">
												<div className="flex items-center justify-end space-x-2">
													<Button variant="ghost" size="sm" asChild>
														<Link
															href={`/dashboard/admin/maintenance/${request.id}`}
														>
															<Eye className="h-4 w-4" />
														</Link>
													</Button>
													<Button variant="ghost" size="sm" asChild>
														<Link
															href={`/dashboard/admin/maintenance/${request.id}/edit`}
														>
															<Edit className="h-4 w-4" />
														</Link>
													</Button>
												</div>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Empty State */}
				{filteredRequests.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No maintenance requests found
							</h3>
							<p className="text-gray-600 mb-4">
								{searchTerm ||
								filterStatus !== "all" ||
								filterPriority !== "all" ||
								filterCategory !== "all"
									? "Try adjusting your search or filter criteria."
									: "No maintenance requests have been submitted yet."}
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
}
