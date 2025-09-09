"use client";

import { useState } from "react";
import {
	FileText,
	Search,
	Filter,
	Eye,
	Download,
	// Print,
	Calendar,
	Building,
	DollarSign,
	User,
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
		property: "Sunrise Apartments",
		unit: "3B",
		amount: 18000,
		vatAmount: 2700,
		total: 20700,
		date: "2024-12-01",
		dueDate: "2024-12-31",
		status: "paid",
		paymentMethod: "Bank Transfer",
		owner: {
			businessName: "Akeray Properties",
			name: "Mulugeta Assefa",
			tinNumber: "0012345678",
			phone: "+251911123456",
			email: "mulugeta@akeray.et",
			address: "Bole Road, Addis Ababa",
		},
		month: "December 2024",
	},
	{
		id: "INV-R-002",
		invoiceNumber: "INV-R-002",
		type: "rental",
		property: "Sunrise Apartments",
		unit: "3B",
		amount: 18000,
		vatAmount: 2700,
		total: 20700,
		date: "2025-01-01",
		dueDate: "2025-01-31",
		status: "sent",
		paymentMethod: null,
		owner: {
			businessName: "Akeray Properties",
			name: "Mulugeta Assefa",
			tinNumber: "0012345678",
			phone: "+251911123456",
			email: "mulugeta@akeray.et",
			address: "Bole Road, Addis Ababa",
		},
		month: "January 2025",
	},
	{
		id: "INV-S-003",
		invoiceNumber: "INV-S-003",
		type: "sale",
		property: "Green Valley Villa",
		unit: null,
		amount: 3500000,
		vatAmount: 525000,
		total: 4025000,
		date: "2024-12-15",
		dueDate: "2024-12-22",
		status: "paid",
		paymentMethod: "Bank Transfer",
		owner: {
			businessName: "Green Valley Properties",
			name: "Sarah Johnson",
			tinNumber: "0087654321",
			phone: "+251922345678",
			email: "sarah@email.com",
			address: "Kazanchis, Addis Ababa",
		},
		month: null,
	},
];

export default function TenantInvoicesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredInvoices = invoices.filter((invoice) => {
		const matchesSearch =
			invoice.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
			invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			invoice.owner.businessName
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
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
				return "Purchase";
			default:
				return type;
		}
	};

	const handleDownloadPDF = (invoice: any) => {
		const pdfContent = `
INVOICE

Invoice Number: ${invoice.invoiceNumber}
Date: ${new Date(invoice.date).toLocaleDateString()}
Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}

From:
${invoice.owner.businessName}
${invoice.owner.name}
TIN: ${invoice.owner.tinNumber}
Address: ${invoice.owner.address}
Phone: ${invoice.owner.phone}
Email: ${invoice.owner.email}

To:
Meron Tadesse
Tenant
Phone: +251911234567
Email: meron@email.com

Property Details:
${invoice.property}${invoice.unit ? ` - Unit ${invoice.unit}` : ""}
${invoice.month ? `For: ${invoice.month}` : ""}

Invoice Items:
${
	invoice.type === "rental" ? "Monthly Rent" : "Property Purchase"
}: ${invoice.amount.toLocaleString()} ETB
VAT (15%): ${invoice.vatAmount.toLocaleString()} ETB
Total: ${invoice.total.toLocaleString()} ETB

Payment Instructions:
- Bank Transfer to account provided by property owner
- Mobile Money to ${invoice.owner.phone}
- Reference: ${invoice.invoiceNumber}

Generated on: ${new Date().toLocaleDateString()}
		`.trim();

		const blob = new Blob([pdfContent], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `invoice-${invoice.invoiceNumber}.pdf`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handlePrint = (invoice: any) => {
		const printContent = `
			<html>
				<head>
					<title>Invoice ${invoice.invoiceNumber}</title>
					<style>
						body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
						.header { background: linear-gradient(135deg, #059669, #3B82F6); color: white; padding: 20px; margin: -20px -20px 20px -20px; text-align: center; }
						.invoice-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
						.invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
						.invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
						.invoice-table th { background: #f8f9fa; font-weight: bold; }
						.total-row { background: #f0f9ff; font-weight: bold; }
						.footer { margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
						.amount { color: #059669; font-weight: bold; }
					</style>
				</head>
				<body>
					<div class="header">
						<h1>AKERAY PROPERTY MANAGEMENT SYSTEM</h1>
						<h2>OFFICIAL INVOICE</h2>
					</div>
					
					<div class="invoice-details">
						<div>
							<h3>From:</h3>
							<p><strong>${invoice.owner.businessName}</strong></p>
							<p>${invoice.owner.name}</p>
							<p>TIN: ${invoice.owner.tinNumber}</p>
							<p>Address: ${invoice.owner.address}</p>
							<p>Phone: ${invoice.owner.phone}</p>
							<p>Email: ${invoice.owner.email}</p>
						</div>
						<div>
							<h3>Invoice Details:</h3>
							<p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
							<p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
							<p><strong>Due Date:</strong> ${new Date(
								invoice.dueDate
							).toLocaleDateString()}</p>
							<p><strong>Status:</strong> ${getStatusLabel(invoice.status)}</p>
							<p><strong>Type:</strong> ${getTypeLabel(invoice.type)}</p>
						</div>
					</div>
					
					<div>
						<h3>To:</h3>
						<p><strong>Meron Tadesse</strong></p>
						<p>Tenant</p>
						<p>Phone: +251911234567</p>
						<p>Email: meron@email.com</p>
					</div>
					
					<div style="margin: 20px 0;">
						<h3>Property Information:</h3>
						<p><strong>Property:</strong> ${invoice.property}${
			invoice.unit ? ` - Unit ${invoice.unit}` : ""
		}</p>
						${invoice.month ? `<p><strong>Period:</strong> ${invoice.month}</p>` : ""}
					</div>
					
					<table class="invoice-table">
						<thead>
							<tr>
								<th>Description</th>
								<th style="text-align: right;">Amount (ETB)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>${invoice.type === "rental" ? "Monthly Rent" : "Property Purchase"}</td>
								<td style="text-align: right;">${invoice.amount.toLocaleString()}</td>
							</tr>
							<tr>
								<td>VAT (15%)</td>
								<td style="text-align: right;">${invoice.vatAmount.toLocaleString()}</td>
							</tr>
							<tr class="total-row">
								<td><strong>TOTAL AMOUNT</strong></td>
								<td style="text-align: right;" class="amount"><strong>${invoice.total.toLocaleString()}</strong></td>
							</tr>
						</tbody>
					</table>
					
					<div class="footer">
						<h4>Payment Instructions:</h4>
						<p>• Bank Transfer or Mobile Money to property owner</p>
						<p>• Reference: ${invoice.invoiceNumber}</p>
						<p>• Contact: ${invoice.owner.phone} for payment queries</p>
						<p style="margin-top: 20px; font-size: 12px; color: #666;">
							Generated on: ${new Date().toLocaleDateString()} | 
							Akeray Property Management System
						</p>
					</div>
				</body>
			</html>
		`;

		const printWindow = window.open("", "_blank");
		if (printWindow) {
			printWindow.document.write(printContent);
			printWindow.document.close();
			printWindow.print();
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
								My Invoices
							</h1>
							<p className="text-lg text-gray-600">
								View and download all your rental and purchase invoices
							</p>
							<p className="text-sm text-gray-500">
								Access official invoices for tax records and payment tracking
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
								placeholder="Search by property, invoice number, or business name..."
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
										Purchase
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
								All your rental and purchase invoices with download options
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Invoice Number</TableHead>
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
												<div>
													<p className="font-medium text-sm">
														{invoice.property}
													</p>
													{invoice.unit && (
														<p className="text-xs text-gray-500">
															Unit {invoice.unit}
														</p>
													)}
													{invoice.month && (
														<p className="text-xs text-blue-600">
															{invoice.month}
														</p>
													)}
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
															href={`/dashboard/tenant/invoices/${invoice.id}`}
														>
															<Eye className="h-4 w-4" />
														</Link>
													</Button>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleDownloadPDF(invoice)}
													>
														<Download className="h-4 w-4" />
													</Button>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handlePrint(invoice)}
													>
														{/* <Print className="h-4 w-4" /> */}
													</Button>
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
