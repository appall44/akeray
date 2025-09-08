"use client";

import { useState } from "react";
import {
	FileText,
	Plus,
	Search,
	Filter,
	Eye,
	Edit,
	Download,
	Send,
	Calendar,
	Building,
	DollarSign,
	Settings,
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const invoices = [
	{
		id: "INV-R-001",
		invoiceNumber: "INV-R-001",
		type: "rental",
		customer: "Tigist Haile",
		property: "Bole Apartments",
		unit: "3B",
		amount: 25000,
		vatAmount: 3750,
		total: 28750,
		date: "2024-01-01",
		dueDate: "2024-01-31",
		status: "sent",
		paymentMethod: "Bank Transfer",
		avatar:
			"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "INV-S-002",
		invoiceNumber: "INV-S-002",
		type: "sale",
		customer: "Dawit Mekonnen",
		property: "Kazanchis Complex",
		unit: "2A",
		amount: 4200000,
		vatAmount: 630000,
		total: 4830000,
		date: "2024-01-05",
		dueDate: "2024-01-12",
		status: "paid",
		paymentMethod: "Bank Transfer",
		avatar:
			"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "INV-R-003",
		invoiceNumber: "INV-R-003",
		type: "rental",
		customer: "Hanan Ahmed",
		property: "Piassa Plaza",
		unit: "4A",
		amount: 22000,
		vatAmount: 3300,
		total: 25300,
		date: "2024-01-10",
		dueDate: "2024-02-09",
		status: "overdue",
		paymentMethod: "Cash",
		avatar:
			"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
];

export default function OwnerInvoicesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredInvoices = invoices.filter((invoice) => {
		const matchesSearch =
			invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
			invoice.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
			invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = filterType === "all" || invoice.type === filterType;
		const matchesStatus =
			filterStatus === "all" || invoice.status === filterStatus;
		return matchesSearch && matchesType && matchesStatus;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "generated":
				return "bg-blue-100 text-blue-800";
			case "sent":
				return "bg-yellow-100 text-yellow-800";
			case "paid":
				return "bg-emerald-100 text-emerald-800";
			case "overdue":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case "rental":
				return "bg-blue-100 text-blue-800";
			case "sale":
				return "bg-emerald-100 text-emerald-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case "generated":
				return "Generated";
			case "sent":
				return "Sent";
			case "paid":
				return "Paid";
			case "overdue":
				return "Overdue";
			default:
				return status;
		}
	};

	const getTypeLabel = (type: string) => {
		switch (type) {
			case "rental":
				return "Rental";
			case "sale":
				return "Sale";
			default:
				return type;
		}
	};

	const totalInvoices = filteredInvoices.length;
	const paidInvoices = filteredInvoices.filter(
		(i) => i.status === "paid"
	).length;
	const overdueInvoices = filteredInvoices.filter(
		(i) => i.status === "overdue"
	).length;
	const totalAmount = filteredInvoices.reduce(
		(sum, invoice) => sum + invoice.total,
		0
	);

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
								My Invoices
							</h1>
							<p className="text-lg text-gray-600">
								Manage invoices for your rental and sale transactions
							</p>
							<p className="text-sm text-gray-500">
								Track billing, payments, and generate professional invoices
							</p>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								asChild
								className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
							>
								<Link href="/dashboard/owner/invoices/settings">
									<Settings className="h-4 w-4 mr-2" />
									Invoice Settings
								</Link>
							</Button>
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
							>
								<Link href="/dashboard/owner/invoices/new">
									<Plus className="h-4 w-4 mr-2" />
									Create Invoice
								</Link>
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
											Total Invoices
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{totalInvoices}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<FileText className="h-8 w-8 text-blue-600" />
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
											Paid Invoices
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{paidInvoices}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<DollarSign className="h-8 w-8 text-emerald-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600"
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
											{overdueInvoices}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-red-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Calendar className="h-8 w-8 text-red-600" />
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
											{(totalAmount / 1000000).toFixed(1)}M ETB
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Building className="h-8 w-8 text-purple-600" />
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
								placeholder="Search by customer, property, or invoice number..."
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
										Type:{" "}
										{filterType === "all" ? "All" : getTypeLabel(filterType)}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => setFilterType("all")}>
										All Types
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterType("rental")}>
										Rental
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterType("sale")}>
										Sale
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="border-blue-300 hover:bg-blue-50 bg-transparent"
									>
										<Filter className="h-4 w-4 mr-2" />
										Status:{" "}
										{filterStatus === "all"
											? "All"
											: getStatusLabel(filterStatus)}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => setFilterStatus("all")}>
										All Status
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setFilterStatus("generated")}
									>
										Generated
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterStatus("sent")}>
										Sent
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterStatus("paid")}>
										Paid
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterStatus("overdue")}>
										Overdue
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>

				{/* Invoices Table */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1100"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="text-xl">Invoice Records</CardTitle>
							<CardDescription>
								All invoices generated for your properties
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Invoice Number</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead>Property & Unit</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Date</TableHead>
										<TableHead>Due Date</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredInvoices.map((invoice) => (
										<TableRow key={invoice.id} className="hover:bg-gray-50">
											<TableCell>
												<span className="font-mono text-sm font-medium">
													{invoice.invoiceNumber}
												</span>
											</TableCell>
											<TableCell>
												<div className="flex items-center space-x-3">
													<Avatar className="h-8 w-8">
														<AvatarImage src={invoice.avatar} />
														<AvatarFallback>
															{invoice.customer
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<span className="font-medium">
														{invoice.customer}
													</span>
												</div>
											</TableCell>
											<TableCell>
												<div>
													<p className="font-medium text-sm">
														{invoice.property}
													</p>
													<p className="text-xs text-gray-500">
														Unit {invoice.unit}
													</p>
												</div>
											</TableCell>
											<TableCell>
												<Badge className={getTypeColor(invoice.type)}>
													{getTypeLabel(invoice.type)}
												</Badge>
											</TableCell>
											<TableCell>
												<div>
													<p className="font-semibold">
														{invoice.total.toLocaleString()} ETB
													</p>
													<p className="text-xs text-gray-500">
														VAT: {invoice.vatAmount.toLocaleString()} ETB
													</p>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center space-x-2">
													<Calendar className="h-4 w-4 text-gray-400" />
													<span className="text-sm">
														{new Date(invoice.date).toLocaleDateString()}
													</span>
												</div>
											</TableCell>
											<TableCell>
												<span className="text-sm">
													{new Date(invoice.dueDate).toLocaleDateString()}
												</span>
											</TableCell>
											<TableCell>
												<Badge className={getStatusColor(invoice.status)}>
													{getStatusLabel(invoice.status)}
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<div className="flex items-center justify-end space-x-2">
													<Button variant="ghost" size="sm" asChild>
														<Link
															href={`/dashboard/owner/invoices/${invoice.id}`}
														>
															<Eye className="h-4 w-4" />
														</Link>
													</Button>
													<Button variant="ghost" size="sm">
														<Download className="h-4 w-4" />
													</Button>
													{invoice.status === "generated" && (
														<Button
															variant="ghost"
															size="sm"
															className="text-blue-600"
														>
															<Send className="h-4 w-4" />
														</Button>
													)}
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>

				{/* Empty State */}
				{filteredInvoices.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No invoices found
							</h3>
							<p className="text-gray-600 mb-4">
								{searchTerm || filterType !== "all" || filterStatus !== "all"
									? "Try adjusting your search or filter criteria."
									: "No invoice records available yet."}
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
}
