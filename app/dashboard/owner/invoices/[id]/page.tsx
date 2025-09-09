"use client";

import { useState } from "react";
import {
	FileText,
	Download,
	Calendar,
	User,
	Building,
	DollarSign,
	ArrowLeft,
	Receipt,
	Mail,
	Phone,
	Print,
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
import { generateInvoicePDF, printInvoice, createInvoiceFromData } from "@/lib/invoice-generator";

// Mock invoice data
const getInvoiceData = (invoiceId: string) => ({
	id: invoiceId,
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
	month: "January 2025",
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
	customer: {
		name: "Tigist Haile",
		phone: "+251911234567",
		email: "tigist@email.com",
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

export default function OwnerInvoiceDetailsPage() {
	const params = useParams();
	const invoiceData = getInvoiceData(params.id as string);

	const handleDownloadPDF = () => {
		const invoiceForPDF = createInvoiceFromData({
			invoiceNumber: invoiceData.invoiceNumber,
			type: invoiceData.type as "rental" | "sale",
			customer: invoiceData.customer,
			property: {
				name: invoiceData.property,
				unit: invoiceData.unit,
				address: "Bole Road, Near Atlas Hotel, Addis Ababa",
			},
			amount: invoiceData.amount,
			vatAmount: invoiceData.vatAmount,
			total: invoiceData.total,
			date: invoiceData.date,
			dueDate: invoiceData.dueDate,
			status: invoiceData.status as "generated" | "sent" | "paid" | "overdue",
			month: invoiceData.month,
			owner: invoiceData.owner,
		});
		generateInvoicePDF(invoiceForPDF);
	};

	const handlePrintInvoice = () => {
		const invoiceForPrint = createInvoiceFromData({
			invoiceNumber: invoiceData.invoiceNumber,
			type: invoiceData.type as "rental" | "sale",
			customer: invoiceData.customer,
			property: {
				name: invoiceData.property,
				unit: invoiceData.unit,
				address: "Bole Road, Near Atlas Hotel, Addis Ababa",
			},
			amount: invoiceData.amount,
			vatAmount: invoiceData.vatAmount,
			total: invoiceData.total,
			date: invoiceData.date,
			dueDate: invoiceData.dueDate,
			status: invoiceData.status as "generated" | "sent" | "paid" | "overdue",
			month: invoiceData.month,
			owner: invoiceData.owner,
		});
		printInvoice(invoiceForPrint);
	};

	return (
		<DashboardLayout
			userRole="owner"
			userName="Mulugeta Assefa"
			userEmail="mulugeta@akeray.et"
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
							<Link href="/dashboard/owner/invoices">
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
								Invoice ID: {invoiceData.id} • {invoiceData.month || "Purchase Invoice"}
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
								onClick={handlePrintInvoice}
								className="border-blue-300 hover:bg-blue-50 bg-transparent"
							>
								<Print className="h-4 w-4 mr-2" />
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
										Status
									</p>
									<Badge className="bg-yellow-100 text-yellow-800 font-semibold text-lg px-4 py-2">
										{invoiceData.status}
									</Badge>
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

					{/* Customer Information */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-800"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<User className="h-6 w-6 text-purple-600" />
									<span>Customer Information</span>
								</CardTitle>
								<CardDescription>
									Details about the invoice recipient
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
										<h3 className="font-semibold text-lg text-gray-900 mb-2">
											{invoiceData.customer}
										</h3>
										<p className="text-purple-600 font-medium">
											{invoiceData.type === "rental" ? "Tenant" : "Buyer"}
										</p>
									</div>

									<div className="space-y-3">
										<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
											<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
												<Phone className="h-5 w-5 text-emerald-600" />
											</div>
											<div>
												<p className="text-sm font-medium text-gray-900">
													+251911234567
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
													tigist@email.com
												</p>
												<p className="text-xs text-gray-500">Email</p>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Payment Instructions */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<DollarSign className="h-6 w-6 text-emerald-600" />
								<span>Payment Instructions</span>
							</CardTitle>
							<CardDescription>
								How the customer can make payment for this invoice
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{[
									"Payment can be made via Bank Transfer or Mobile Money",
									"Bank Transfer: Commercial Bank of Ethiopia - Account: 1000123456789",
									"Mobile Money: CBE Birr, M-Birr to +251911123456",
									"Reference: INV-R-001 when making payment",
									"Late payment fee of 500 ETB applies after due date",
								].map((instruction, index) => (
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
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	);
}