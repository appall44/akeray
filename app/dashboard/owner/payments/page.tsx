"use client";

import { useState } from "react";
import {
	CreditCard,
	Search,
	Filter,
	Download,
	Eye,
	CheckCircle,
	Clock,
	AlertCircle,
	DollarSign,
	Calendar,
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const payments = [
	{
		id: "PAY-001",
		tenant: "Tigist Haile",
		property: "Bole Apartments",
		unit: "3B",
		amount: 25000,
		dueDate: "2024-01-01",
		paidDate: "2024-01-01",
		status: "paid",
		method: "bank_transfer",
		avatar:
			"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "PAY-002",
		tenant: "Dawit Mekonnen",
		property: "Kazanchis Complex",
		unit: "2A",
		amount: 28000,
		dueDate: "2024-01-01",
		paidDate: null,
		status: "overdue",
		method: null,
		avatar:
			"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "PAY-003",
		tenant: "Hanan Ahmed",
		property: "Piassa Plaza",
		unit: "4A",
		amount: 22000,
		dueDate: "2024-01-15",
		paidDate: null,
		status: "pending",
		method: null,
		avatar:
			"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "PAY-004",
		tenant: "Yohannes Bekele",
		property: "CMC Towers",
		unit: "5C",
		amount: 35000,
		dueDate: "2024-01-01",
		paidDate: "2023-12-30",
		status: "paid",
		method: "cash",
		avatar:
			"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
];

export default function OwnerPaymentsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [dateRange, setDateRange] = useState<any>(null);

	const filteredPayments = payments.filter((payment) => {
		const matchesSearch =
			payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
			payment.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
			payment.id.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			filterStatus === "all" || payment.status === filterStatus;
		return matchesSearch && matchesStatus;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "paid":
				return "bg-emerald-100 text-emerald-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "overdue":
				return "bg-red-100 text-red-800";
			case "partial":
				return "bg-orange-100 text-orange-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "paid":
				return CheckCircle;
			case "pending":
				return Clock;
			case "overdue":
				return AlertCircle;
			default:
				return Clock;
		}
	};

	const getMethodLabel = (method: string | null) => {
		if (!method) return "N/A";
		switch (method) {
			case "bank_transfer":
				return "Bank Transfer";
			case "cash":
				return "Cash";
			case "mobile_money":
				return "Mobile Money";
			default:
				return method;
		}
	};

	const totalAmount = filteredPayments.reduce(
		(sum, payment) => sum + payment.amount,
		0
	);
	const paidAmount = filteredPayments
		.filter((p) => p.status === "paid")
		.reduce((sum, payment) => sum + payment.amount, 0);
	const pendingAmount = filteredPayments
		.filter((p) => p.status === "pending")
		.reduce((sum, payment) => sum + payment.amount, 0);
	const overdueAmount = filteredPayments
		.filter((p) => p.status === "overdue")
		.reduce((sum, payment) => sum + payment.amount, 0);

	return (
		<DashboardLayout
			userRole="owner"
			userName="Mulugeta Assefa"
			userEmail="mulugeta@akeray.et"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Payment Records
							</h1>
							<p className="text-lg text-gray-600">
								Track and monitor all rental payments from your tenants
							</p>
							<p className="text-sm text-gray-500">
								View payment history, pending amounts, and generate reports
							</p>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
							>
								<Download className="h-4 w-4 mr-2" />
								Export Report
							</Button>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-blue-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Total Amount
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(totalAmount / 1000).toFixed(0)}K ETB
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<DollarSign className="h-8 w-8 text-blue-600" />
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
										<p className="text-sm font-semibold text-gray-600">Paid</p>
										<p className="text-3xl font-bold text-gray-900">
											{(paidAmount / 1000).toFixed(0)}K ETB
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
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-yellow-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Pending
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(pendingAmount / 1000).toFixed(0)}K ETB
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
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-red-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Overdue
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{(overdueAmount / 1000).toFixed(0)}K ETB
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-red-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<AlertCircle className="h-8 w-8 text-red-600" />
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
								placeholder="Search by tenant, property, or payment ID..."
								className="pl-10"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className="flex space-x-2">
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
									<DropdownMenuItem onClick={() => setFilterStatus("paid")}>
										Paid
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterStatus("pending")}>
										Pending
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterStatus("overdue")}>
										Overdue
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<DatePickerWithRange
								date={dateRange}
								setDate={setDateRange}
								placeholder="Select date range"
							/>
						</div>
					</div>
				</div>

				{/* Payments Table */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1100"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="text-xl">Payment Records</CardTitle>
							<CardDescription>
								Complete list of all rental payments from your properties
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Payment ID</TableHead>
										<TableHead>Tenant</TableHead>
										<TableHead>Property & Unit</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Due Date</TableHead>
										<TableHead>Paid Date</TableHead>
										<TableHead>Method</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredPayments.map((payment) => {
										const StatusIcon = getStatusIcon(payment.status);
										return (
											<TableRow key={payment.id} className="hover:bg-gray-50">
												<TableCell>
													<span className="font-mono text-sm font-medium">
														{payment.id}
													</span>
												</TableCell>
												<TableCell>
													<div className="flex items-center space-x-3">
														<Avatar className="h-8 w-8">
															<AvatarImage src={payment.avatar} />
															<AvatarFallback>
																{payment.tenant
																	.split(" ")
																	.map((n) => n[0])
																	.join("")}
															</AvatarFallback>
														</Avatar>
														<span className="font-medium">
															{payment.tenant}
														</span>
													</div>
												</TableCell>
												<TableCell>
													<div>
														<p className="font-medium text-sm">
															{payment.property}
														</p>
														<p className="text-xs text-gray-500">
															Unit {payment.unit}
														</p>
													</div>
												</TableCell>
												<TableCell>
													<span className="font-semibold">
														{payment.amount.toLocaleString()} ETB
													</span>
												</TableCell>
												<TableCell>
													<div className="flex items-center space-x-2">
														<Calendar className="h-4 w-4 text-gray-400" />
														<span className="text-sm">
															{new Date(payment.dueDate).toLocaleDateString()}
														</span>
													</div>
												</TableCell>
												<TableCell>
													{payment.paidDate ? (
														<div className="flex items-center space-x-2">
															<CheckCircle className="h-4 w-4 text-emerald-500" />
															<span className="text-sm">
																{new Date(
																	payment.paidDate
																).toLocaleDateString()}
															</span>
														</div>
													) : (
														<span className="text-sm text-gray-400">
															Not paid
														</span>
													)}
												</TableCell>
												<TableCell>
													<span className="text-sm">
														{getMethodLabel(payment.method)}
													</span>
												</TableCell>
												<TableCell>
													<div className="flex items-center space-x-2">
														<StatusIcon className="h-4 w-4" />
														<Badge className={getStatusColor(payment.status)}>
															{payment.status}
														</Badge>
													</div>
												</TableCell>
												<TableCell className="text-right">
													<div className="flex items-center justify-end space-x-2">
														<Button variant="ghost" size="sm" asChild>
															<Link
																href={`/dashboard/owner/payments/${payment.id}`}
															>
																<Eye className="h-4 w-4" />
															</Link>
														</Button>
														<Button variant="ghost" size="sm">
															<Download className="h-4 w-4" />
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
				</div>

				{/* Empty State */}
				{filteredPayments.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No payments found
							</h3>
							<p className="text-gray-600 mb-4">
								{searchTerm || filterStatus !== "all"
									? "Try adjusting your search or filter criteria."
									: "No payment records available yet."}
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
}
