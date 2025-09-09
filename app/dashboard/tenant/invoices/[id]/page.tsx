"use client";

import { useState } from "react";
import {
	FileText,
	Download,
	// Print,
	Calendar,
	User,
	Building,
	DollarSign,
	ArrowLeft,
	Receipt,
	Mail,
	Phone,
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

// Mock invoice data
const getInvoiceData = (invoiceId: string) => ({
	id: invoiceId,
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
	paidDate: "2024-12-01",
	month: "December 2024",
	owner: {
		businessName: "Akeray Properties",
		name: "Mulugeta Assefa",
		tinNumber: "0012345678",
		phone: "+251911123456",
		email: "mulugeta@akeray.et",
		address: "Bole Road, Addis Ababa",
		bankAccount: "1000123456789",
		bankName: "Commercial Bank of Ethiopia",
	},
	tenant: {
		name: "Meron Tadesse",
		phone: "+251911234567",
		email: "meron@email.com",
		address: "Bole Road, Addis Ababa",
	},
	paymentInstructions: [
		"Payment can be made via Bank Transfer or Mobile Money",
		"Bank Transfer: Commercial Bank of Ethiopia - Account: 1000123456789",
		"Mobile Money: CBE Birr, M-Birr to +251911123456",
		"Reference: INV-R-001 when making payment",
		"Late payment fee of 500 ETB applies after due date",
	],
});

export default function TenantInvoiceDetailsPage() {
	const params = useParams();
	const invoiceData = getInvoiceData(params.id as string);

	const handleDownloadPDF = () => {
		const pdfContent = `
AKERAY PROPERTY MANAGEMENT SYSTEM
OFFICIAL INVOICE

Invoice Number: ${invoiceData.invoiceNumber}
Date: ${new Date(invoiceData.date).toLocaleDateString()}
Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString()}
Status: ${invoiceData.status}

FROM:
${invoiceData.owner.businessName}
${invoiceData.owner.name}
TIN: ${invoiceData.owner.tinNumber}
Address: ${invoiceData.owner.address}
Phone: ${invoiceData.owner.phone}
Email: ${invoiceData.owner.email}

TO:
${invoiceData.tenant.name}
Tenant
Phone: ${invoiceData.tenant.phone}
Email: ${invoiceData.tenant.email}
Address: ${invoiceData.tenant.address}

PROPERTY INFORMATION:
Property: ${invoiceData.property}${
			invoiceData.unit ? ` - Unit ${invoiceData.unit}` : ""
		}
${invoiceData.month ? `Period: ${invoiceData.month}` : ""}

INVOICE DETAILS:
${
	invoiceData.type === "rental" ? "Monthly Rent" : "Property Purchase"
}: ${invoiceData.amount.toLocaleString()} ETB
VAT (15%): ${invoiceData.vatAmount.toLocaleString()} ETB
TOTAL AMOUNT: ${invoiceData.total.toLocaleString()} ETB

PAYMENT INSTRUCTIONS:
${invoiceData.paymentInstructions.join("\n")}

${
	invoiceData.paidDate
		? `PAID ON: ${new Date(invoiceData.paidDate).toLocaleDateString()}`
		: ""
}

Generated on: ${new Date().toLocaleDateString()}
Akeray Property Management System
		`.trim();

		const blob = new Blob([pdfContent], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handlePrint = () => {
		const printContent = `
			<html>
				<head>
					<title>Invoice ${invoiceData.invoiceNumber}</title>
					<style>
						body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
						.header { background: linear-gradient(135deg, #059669, #3B82F6); color: white; padding: 30px; margin: -20px -20px 30px -20px; text-align: center; }
						.invoice-info { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0; }
						.invoice-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
						.invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 15px; }
						.invoice-table th { background: #f8f9fa; font-weight: bold; }
						.total-row { background: #f0f9ff; font-weight: bold; font-size: 18px; }
						.footer { margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
						.amount { color: #059669; }
						.status-paid { color: #059669; font-weight: bold; }
						.logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
					</style>
				</head>
				<body>
					<div class="header">
						<div class="logo">AKERAY PROPERTY MANAGEMENT SYSTEM</div>
						<h1>OFFICIAL INVOICE</h1>
						<p>Professional Property Management Services</p>
					</div>
					
					<div class="invoice-info">
						<div>
							<h3>From:</h3>
							<p><strong>${invoiceData.owner.businessName}</strong></p>
							<p>${invoiceData.owner.name}</p>
							<p>TIN: ${invoiceData.owner.tinNumber}</p>
							<p>Address: ${invoiceData.owner.address}</p>
							<p>Phone: ${invoiceData.owner.phone}</p>
							<p>Email: ${invoiceData.owner.email}</p>
						</div>
						<div>
							<h3>Invoice Information:</h3>
							<p><strong>Invoice #:</strong> ${invoiceData.invoiceNumber}</p>
							<p><strong>Date:</strong> ${new Date(invoiceData.date).toLocaleDateString()}</p>
							<p><strong>Due Date:</strong> ${new Date(
								invoiceData.dueDate
							).toLocaleDateString()}</p>
							<p><strong>Type:</strong> ${
								invoiceData.type === "rental" ? "Rental" : "Purchase"
							}</p>
							<p><strong>Status:</strong> <span class="status-paid">${invoiceData.status.toUpperCase()}</span></p>
							${
								invoiceData.paidDate
									? `<p><strong>Paid Date:</strong> ${new Date(
											invoiceData.paidDate
									  ).toLocaleDateString()}</p>`
									: ""
							}
						</div>
					</div>
					
					<div>
						<h3>To:</h3>
						<p><strong>${invoiceData.tenant.name}</strong></p>
						<p>Tenant</p>
						<p>Phone: ${invoiceData.tenant.phone}</p>
						<p>Email: ${invoiceData.tenant.email}</p>
						<p>Address: ${invoiceData.tenant.address}</p>
					</div>
					
					<div style="margin: 30px 0;">
						<h3>Property Information:</h3>
						<p><strong>Property:</strong> ${invoiceData.property}${
			invoiceData.unit ? ` - Unit ${invoiceData.unit}` : ""
		}</p>
						${
							invoiceData.month
								? `<p><strong>Billing Period:</strong> ${invoiceData.month}</p>`
								: ""
						}
					</div>
					
					<table class="invoice-table">
						<thead>
							<tr>
								<th>Description</th>
								<th style="text-align: center;">Quantity</th>
								<th style="text-align: right;">Unit Price (ETB)</th>
								<th style="text-align: right;">Amount (ETB)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>${invoiceData.type === "rental" ? "Monthly Rent" : "Property Purchase"}</td>
								<td style="text-align: center;">1</td>
								<td style="text-align: right;">${invoiceData.amount.toLocaleString()}</td>
								<td style="text-align: right;">${invoiceData.amount.toLocaleString()}</td>
							</tr>
							<tr>
								<td>VAT (15%)</td>
								<td style="text-align: center;">-</td>
								<td style="text-align: right;">-</td>
								<td style="text-align: right;">${invoiceData.vatAmount.toLocaleString()}</td>
							</tr>
							<tr class="total-row">
								<td colspan="3"><strong>TOTAL AMOUNT</strong></td>
								<td style="text-align: right;" class="amount"><strong>${invoiceData.total.toLocaleString()}</strong></td>
							</tr>
						</tbody>
					</table>
					
					<div class="footer">
						<h4>Payment Instructions:</h4>
						${invoiceData.paymentInstructions
							.map((instruction) => `<p>• ${instruction}</p>`)
							.join("")}
						
						<div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
							<p>Generated on: ${new Date().toLocaleDateString()}</p>
							<p>Akeray Property Management System | Professional Property Services</p>
							<p>For support: support@akeray.et | +251-911-654321</p>
						</div>
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

	return (
		<DashboardLayout
			userRole="tenant"
			userName="Meron Tadesse"
			userEmail="meron@email.com"
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
							<Link href="/dashboard/tenant/invoices">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Invoices
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Invoice Details
							</h1>
							<p className="text-lg text-gray-600">
								Complete invoice information and payment details
							</p>
							<p className="text-sm text-gray-500">
								Invoice ID: {invoiceData.id} •{" "}
								{invoiceData.month || "Purchase Invoice"}
							</p>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								onClick={handleDownloadPDF}
								className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
							>
								<Download className="h-4 w-4 mr-2" />
								Download PDF
							</Button>
							<Button
								variant="outline"
								onClick={handlePrint}
								className="border-blue-300 hover:bg-blue-50 bg-transparent"
							>
								{/* <Print className="h-4 w-4 mr-2" /> */}
								Print Invoice
							</Button>
						</div>
					</div>
				</div>

				{/* Invoice Overview */}
				<div
					className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<Receipt className="h-6 w-6 text-emerald-600" />
								<span>Invoice Overview</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Invoice Number
									</p>
									<p className="text-2xl font-bold text-gray-900">
										{invoiceData.invoiceNumber}
									</p>
									<Badge className="bg-blue-100 text-blue-800">
										{invoiceData.type === "rental" ? "Rental" : "Purchase"}
									</Badge>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Total Amount
									</p>
									<p className="text-3xl font-bold text-emerald-600">
										{invoiceData.total.toLocaleString()} ETB
									</p>
									<p className="text-sm text-gray-600">
										VAT: {invoiceData.vatAmount.toLocaleString()} ETB
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Invoice Date
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{new Date(invoiceData.date).toLocaleDateString()}
									</p>
									<p className="text-sm text-gray-600">
										Due: {new Date(invoiceData.dueDate).toLocaleDateString()}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										Payment Status
									</p>
									<Badge className="bg-emerald-100 text-emerald-800 font-semibold text-lg px-4 py-2">
										{invoiceData.status}
									</Badge>
									{invoiceData.paidDate && (
										<p className="text-sm text-gray-600">
											Paid:{" "}
											{new Date(invoiceData.paidDate).toLocaleDateString()}
										</p>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Invoice Details */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<FileText className="h-6 w-6 text-blue-600" />
									<span>Invoice Details</span>
								</CardTitle>
								<CardDescription>
									Detailed breakdown of charges and fees
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{/* Property Information */}
									<div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100">
										<h3 className="font-semibold text-lg text-gray-900 mb-2">
											{invoiceData.property}
										</h3>
										{invoiceData.unit && (
											<p className="text-blue-600 font-medium">
												Unit {invoiceData.unit}
											</p>
										)}
										{invoiceData.month && (
											<p className="text-sm text-gray-600 mt-1">
												Billing Period: {invoiceData.month}
											</p>
										)}
									</div>

									{/* Invoice Breakdown */}
									<div className="space-y-4">
										<h4 className="font-semibold text-gray-900">
											Invoice Breakdown
										</h4>
										<div className="space-y-3">
											<div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
												<span className="text-sm font-medium text-gray-700">
													{invoiceData.type === "rental"
														? "Monthly Rent"
														: "Property Purchase"}
													:
												</span>
												<span className="font-semibold">
													{invoiceData.amount.toLocaleString()} ETB
												</span>
											</div>

											<div className="flex justify-between items-center p-3 rounded-xl bg-blue-50">
												<span className="text-sm font-medium text-blue-700">
													VAT (15%):
												</span>
												<span className="font-semibold text-blue-600">
													{invoiceData.vatAmount.toLocaleString()} ETB
												</span>
											</div>

											<Separator />

											<div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200">
												<span className="text-lg font-bold text-gray-900">
													Total Amount:
												</span>
												<span className="text-2xl font-bold text-emerald-600">
													{invoiceData.total.toLocaleString()} ETB
												</span>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Owner Information & Payment Instructions */}
					<div className="space-y-8">
						{/* Owner Information */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-800"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-3 text-xl">
										<User className="h-6 w-6 text-purple-600" />
										<span>Property Owner Information</span>
									</CardTitle>
									<CardDescription>
										Business details and contact information
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
											<h3 className="font-semibold text-lg text-gray-900 mb-2">
												{invoiceData.owner.businessName}
											</h3>
											<p className="text-purple-600 font-medium">
												{invoiceData.owner.name}
											</p>
											<p className="text-sm text-gray-600 mt-1">
												TIN: {invoiceData.owner.tinNumber}
											</p>
										</div>

										<div className="space-y-3">
											<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
												<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
													<Phone className="h-5 w-5 text-emerald-600" />
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{invoiceData.owner.phone}
													</p>
													<p className="text-xs text-gray-500">Phone</p>
												</div>
											</div>
											<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
												<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
													<Mail className="h-5 w-5 text-blue-600" />
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{invoiceData.owner.email}
													</p>
													<p className="text-xs text-gray-500">Email</p>
												</div>
											</div>
											<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
												<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
													<Building className="h-5 w-5 text-purple-600" />
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{invoiceData.owner.address}
													</p>
													<p className="text-xs text-gray-500">
														Business Address
													</p>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Payment Instructions */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1000"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-3 text-xl">
										<DollarSign className="h-6 w-6 text-emerald-600" />
										<span>Payment Instructions</span>
									</CardTitle>
									<CardDescription>
										How to make payment for this invoice
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{invoiceData.paymentInstructions.map(
											(instruction, index) => (
												<div
													key={index}
													className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100"
												>
													<div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
														<span className="text-xs font-bold text-emerald-600">
															{index + 1}
														</span>
													</div>
													<p className="text-sm text-gray-700 leading-relaxed">
														{instruction}
													</p>
												</div>
											)
										)}
									</div>

									{invoiceData.status !== "paid" && (
										<div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
											<h4 className="font-semibold text-yellow-800 mb-2">
												Payment Required
											</h4>
											<p className="text-yellow-700 text-sm">
												This invoice is due on{" "}
												{new Date(invoiceData.dueDate).toLocaleDateString()}.
												Please make payment to avoid late fees.
											</p>
											<Button
												asChild
												className="mt-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
												size="sm"
											>
												<Link href="/dashboard/tenant/payments/new">
													Make Payment Now
												</Link>
											</Button>
										</div>
									)}
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
