"use client";

import { useState } from "react";
import {
	Home,
	Search,
	Filter,
	Eye,
	Clock,
	CheckCircle,
	AlertCircle,
	Calendar,
	Building,
	DollarSign,
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/dashboard-layout";

const purchaseRequests = [
	{
		id: "PUR-001",
		property: "Sunrise Apartments",
		unit: "2B",
		salePrice: 3500000,
		submittedDate: "2024-12-20",
		status: "pending",
		purchaseType: "online",
		closingDate: "2025-03-01",
		response: null,
	},
	{
		id: "PUR-002",
		property: "Green Valley Complex",
		unit: "3A",
		salePrice: 4200000,
		submittedDate: "2024-12-15",
		status: "approved",
		purchaseType: "in-person",
		closingDate: "2025-02-15",
		response:
			"Approved! Please contact us to schedule the purchase agreement meeting.",
	},
	{
		id: "PUR-003",
		property: "City Center Plaza",
		unit: "1C",
		salePrice: 6800000,
		submittedDate: "2024-12-10",
		status: "rejected",
		purchaseType: "online",
		closingDate: "2025-02-01",
		response: "Unfortunately, the unit has been sold to another buyer.",
	},
	{
		id: "PUR-004",
		property: "Golden Gate Residences",
		unit: "5A",
		salePrice: 8500000,
		submittedDate: "2024-12-05",
		status: "completed",
		purchaseType: "online",
		closingDate: "2024-12-28",
		response: "Purchase completed successfully. Title transfer completed.",
	},
];

export default function PurchaseRequestsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredRequests = purchaseRequests.filter((request) => {
		const matchesSearch =
			request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.id.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			filterStatus === "all" || request.status === filterStatus;
		return matchesSearch && matchesStatus;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "approved":
				return "bg-emerald-100 text-emerald-800";
			case "rejected":
				return "bg-red-100 text-red-800";
			case "completed":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "pending":
				return Clock;
			case "approved":
				return CheckCircle;
			case "rejected":
				return AlertCircle;
			case "completed":
				return CheckCircle;
			default:
				return Clock;
		}
	};

	const pendingCount = filteredRequests.filter(
		(r) => r.status === "pending"
	).length;
	const approvedCount = filteredRequests.filter(
		(r) => r.status === "approved"
	).length;
	const completedCount = filteredRequests.filter(
		(r) => r.status === "completed"
	).length;

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
								My Purchase Requests
							</h1>
							<p className="text-lg text-gray-600">
								Track your property purchase applications and their status
							</p>
							<p className="text-sm text-gray-500">
								View responses from property owners and next steps
							</p>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-yellow-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Pending Requests
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{pendingCount}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-yellow-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Clock className="h-8 w-8 text-yellow-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Approved
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{approvedCount}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<CheckCircle className="h-8 w-8 text-emerald-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-blue-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Completed
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{completedCount}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Home className="h-8 w-8 text-blue-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-purple-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Total Value
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(
												purchaseRequests.reduce(
													(sum, r) => sum + r.salePrice,
													0
												) / 1000000
											).toFixed(1)}
											M
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<DollarSign className="h-8 w-8 text-purple-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Search and Filter */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900"
					style={{ animationFillMode: "forwards" }}
				>
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search by property, unit, or request ID..."
								className="pl-10"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
								>
									<Filter className="h-4 w-4 mr-2" />
									Status: {filterStatus === "all" ? "All" : filterStatus}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => setFilterStatus("all")}>
									All Status
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("pending")}>
									Pending
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("approved")}>
									Approved
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("rejected")}>
									Rejected
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("completed")}>
									Completed
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Requests Table */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1100"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="text-xl">
								Purchase Request History
							</CardTitle>
							<CardDescription>
								All your property purchase applications and their current status
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Request ID</TableHead>
										<TableHead>Property & Unit</TableHead>
										<TableHead>Sale Price</TableHead>
										<TableHead>Submitted Date</TableHead>
										<TableHead>Closing Date</TableHead>
										<TableHead>Purchase Type</TableHead>
										<TableHead>Status</TableHead>
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
												<TableCell>
													<div>
														<p className="font-medium text-sm">
															{request.property}
														</p>
														<p className="text-xs text-gray-500">
															Unit {request.unit}
														</p>
													</div>
												</TableCell>
												<TableCell>
													<span className="font-semibold text-emerald-600">
														{request.salePrice.toLocaleString()} ETB
													</span>
												</TableCell>
												<TableCell>
													<div className="flex items-center space-x-2">
														<Calendar className="h-4 w-4 text-gray-400" />
														<span className="text-sm">
															{new Date(
																request.submittedDate
															).toLocaleDateString()}
														</span>
													</div>
												</TableCell>
												<TableCell>
													<span className="text-sm">
														{new Date(request.closingDate).toLocaleDateString()}
													</span>
												</TableCell>
												<TableCell>
													<Badge variant="outline" className="capitalize">
														{request.purchaseType.replace("-", " ")}
													</Badge>
												</TableCell>
												<TableCell>
													<div className="flex items-center space-x-2">
														<StatusIcon className="h-4 w-4" />
														<Badge className={getStatusColor(request.status)}>
															{request.status}
														</Badge>
													</div>
												</TableCell>
												<TableCell className="text-right">
													<Button variant="ghost" size="sm">
														<Eye className="h-4 w-4" />
													</Button>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>

				{/* Empty State */}
				{filteredRequests.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No purchase requests found
							</h3>
							<p className="text-gray-600 mb-4">
								{searchTerm || filterStatus !== "all"
									? "Try adjusting your search or filter criteria."
									: "You haven't submitted any purchase requests yet."}
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
}
