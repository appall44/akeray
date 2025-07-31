"use client";

import { useState } from "react";
import {
	CreditCard,
	Plus,
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
		tenant: "Aylele Bhir",
		property: "Sunrise Apartments",
		unit: "4A",
		amount: 15000,
		dueDate: "2024-01-01",
		paidDate: "2024-01-01",
		status: "paid",
		method: "bank_transfer",
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "PAY-002",
		tenant: "Sarah Wendeson",
		property: "Green Valley Complex",
		unit: "2B",
		amount: 18000,
		dueDate: "2024-01-01",
		paidDate: null,
		status: "overdue",
		method: null,
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "PAY-003",
		tenant: "Belete Moges",
		property: "City Center Plaza",
		unit: "1C",
		amount: 22000,
		dueDate: "2024-01-15",
		paidDate: null,
		status: "pending",
		method: null,
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "PAY-004",
		tenant: "Meron Dawit",
		property: "Riverside Towers",
		unit: "3A",
		amount: 20000,
		dueDate: "2024-01-01",
		paidDate: "2023-12-30",
		status: "paid",
		method: "cash",
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "PAY-005",
		tenant: "Betel Maathos",
		property: "Sunrise Apartments",
		unit: "2C",
		amount: 16000,
		dueDate: "2024-01-10",
		paidDate: null,
		status: "pending",
		method: null,
		avatar: "/placeholder-user.jpg",
	},
];

export default function PaymentsPage() {
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
				return "bg-green-100 text-green-800";
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
			userRole="admin"
			userName="Admin User"
			userEmail="admin@apms.et"
		>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-poppins font-bold text-gray-900">
							Payments
						</h1>
						<p className="text-gray-600 mt-1">
							Track and manage all rental payments
						</p>
					</div>
					<div className="flex space-x-3">
						<Button variant="outline">
							<Download className="h-4 w-4 mr-2" />
							Export
						</Button>
						<Button asChild className="bg-[#4A90E2] hover:bg-[#2F80ED]">
							<Link href="/dashboard/admin/payments/new">
								<Plus className="h-4 w-4 mr-2" />
								Record Payment
							</Link>
						</Button>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<DollarSign className="h-8 w-8 text-blue-600" />
								<div>
									<p className="text-2xl font-bold">
										₹{(totalAmount / 1000).toFixed(0)}K
									</p>
									<p className="text-sm text-gray-600">Total Amount</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<CheckCircle className="h-8 w-8 text-green-600" />
								<div>
									<p className="text-2xl font-bold">
										₹{(paidAmount / 1000).toFixed(0)}K
									</p>
									<p className="text-sm text-gray-600">Paid</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<Clock className="h-8 w-8 text-yellow-600" />
								<div>
									<p className="text-2xl font-bold">
										₹{(pendingAmount / 1000).toFixed(0)}K
									</p>
									<p className="text-sm text-gray-600">Pending</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<AlertCircle className="h-8 w-8 text-red-600" />
								<div>
									<p className="text-2xl font-bold">
										₹{(overdueAmount / 1000).toFixed(0)}K
									</p>
									<p className="text-sm text-gray-600">Overdue</p>
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
							placeholder="Search by tenant, property, or payment ID..."
							className="pl-10"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="flex space-x-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">
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

				{/* Payments Table */}
				<Card>
					<CardHeader>
						<CardTitle>Payment Records</CardTitle>
						<CardDescription>
							Complete list of all rental payments and their status
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
														<AvatarImage
															src={payment.avatar || "/placeholder.svg"}
														/>
														<AvatarFallback>
															{payment.tenant
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<span className="font-medium">{payment.tenant}</span>
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
													₹{payment.amount.toLocaleString()}
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
														<CheckCircle className="h-4 w-4 text-green-500" />
														<span className="text-sm">
															{new Date(payment.paidDate).toLocaleDateString()}
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
															href={`/dashboard/admin/payments/${payment.id}`}
														>
															<Eye className="h-4 w-4" />
														</Link>
													</Button>
													{payment.status !== "paid" && (
														<Button
															variant="ghost"
															size="sm"
															className="text-green-600"
														>
															<CheckCircle className="h-4 w-4" />
														</Button>
													)}
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
