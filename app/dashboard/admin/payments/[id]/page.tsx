"use client";

import { useState } from "react";
import {
	CreditCard,
	Download,
	Calendar,
	User,
	Building,
	DollarSign,
	ArrowLeft,
	Receipt,
	CheckCircle,
	Edit,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock payment data
const getPaymentData = (paymentId: string) => ({
	id: paymentId,
	tenant: {
		name: "አበበ ከበደ / Abebe Kebede",
		phone: "+251911234567",
		email: "abebe@email.com",
		avatar: "/placeholder-user.jpg",
	},
	property: {
		name: "የፀሐይ መውጫ አፓርትመንቶች / Sunrise Apartments",
		unit: "4A",
		address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	},
	payment: {
		amount: 15000,
		dueDate: "2024-01-01",
		paidDate: "2024-01-01",
		method: "Bank Transfer",
		referenceNumber: "TXN123456789",
		receiptNumber: "RCP-001-2024",
		status: "paid",
		type: "rent",
		month: "January 2024",
		lateFee: 0,
		discount: 0,
		notes: "Payment received on time via bank transfer",
	},
	breakdown: {
		baseRent: 15000,
		lateFee: 0,
		discount: 0,
		total: 15000,
	},
});

export default function AdminPaymentDetailsPage() {
	const params = useParams();
	const paymentData = getPaymentData(params.id as string);

	const handleDownloadReceipt = () => {
		// Generate receipt content
		const receiptContent = `
PAYMENT RECEIPT

Receipt Number: ${paymentData.payment.receiptNumber}
Payment ID: ${paymentData.id}

Tenant: ${paymentData.tenant.name}
Property: ${paymentData.property.name}
Unit: ${paymentData.property.unit}

Payment Details:
Amount: ${paymentData.payment.amount.toLocaleString()} ETB
Payment Date: ${new Date(paymentData.payment.paidDate).toLocaleDateString()}
Payment Method: ${paymentData.payment.method}
Reference: ${paymentData.payment.referenceNumber}

For: ${paymentData.payment.month}
Type: ${paymentData.payment.type}

Generated on: ${new Date().toLocaleDateString()}
		`.trim();

		const blob = new Blob([receiptContent], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `receipt-${paymentData.id}-${paymentData.payment.month.replace(
			/\s+/g,
			"-"
		)}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

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
							<Link href="/dashboard/admin/payments">
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back to Payments
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								የክፍያ ዝርዝር / Payment Details
							</h1>
							<p className="text-lg text-gray-600">
								ሙሉ የክፍያ መረጃ እና ደረሰኝ / Complete payment information and receipt
							</p>
							<p className="text-sm text-gray-500">
								Payment ID: {paymentData.id} • {paymentData.payment.month}
							</p>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								onClick={handleDownloadReceipt}
								className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
							>
								<Download className="h-4 w-4 mr-2" />
								Download Receipt
							</Button>
							<Button
								variant="outline"
								className="border-blue-300 hover:bg-blue-50 bg-transparent"
							>
								<Receipt className="h-4 w-4 mr-2" />
								Print Receipt
							</Button>
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
							>
								<Link href={`/dashboard/admin/payments/${params.id}/edit`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Payment
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Payment Overview */}
				<div
					className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<CheckCircle className="h-6 w-6 text-emerald-600" />
								<span>የክፍያ አጠቃላይ እይታ / Payment Overview</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										የክፍያ መጠን / Payment Amount
									</p>
									<p className="text-3xl font-bold text-emerald-600">
										{paymentData.payment.amount.toLocaleString()} ብር
									</p>
									<p className="text-sm text-gray-600">
										For {paymentData.payment.month}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										የክፍያ ቀን / Payment Date
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{new Date(
											paymentData.payment.paidDate
										).toLocaleDateString()}
									</p>
									<p className="text-sm text-gray-600">Paid on time</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										የክፍያ ዘዴ / Payment Method
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{paymentData.payment.method}
									</p>
									<p className="text-sm text-gray-600">
										Ref: {paymentData.payment.referenceNumber}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ሁኔታ / Status
									</p>
									<Badge className="bg-emerald-100 text-emerald-800 font-semibold text-lg px-4 py-2">
										{paymentData.payment.status}
									</Badge>
									<p className="text-sm text-gray-600">
										Receipt: {paymentData.payment.receiptNumber}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Tenant Information */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<User className="h-6 w-6 text-blue-600" />
									<span>ተከራይ መረጃ / Tenant Information</span>
								</CardTitle>
								<CardDescription>
									Details about the tenant who made this payment
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									<div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100">
										<Avatar className="h-16 w-16 ring-4 ring-blue-200">
											<AvatarImage src={paymentData.tenant.avatar} />
											<AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-bold text-lg">
												{paymentData.tenant.name
													.split(" ")
													.slice(-2)
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1">
											<p className="font-semibold text-lg text-gray-900">
												{paymentData.tenant.name}
											</p>
											<p className="text-sm text-blue-600 font-medium">
												Tenant
											</p>
										</div>
									</div>

									<div className="space-y-3">
										<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
											<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
												<span className="text-emerald-600 font-bold">📞</span>
											</div>
											<div>
												<p className="text-sm font-medium text-gray-900">
													{paymentData.tenant.phone}
												</p>
												<p className="text-xs text-gray-500">Phone Number</p>
											</div>
										</div>
										<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
											<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
												<span className="text-blue-600 font-bold">✉️</span>
											</div>
											<div>
												<p className="text-sm font-medium text-gray-900">
													{paymentData.tenant.email}
												</p>
												<p className="text-xs text-gray-500">Email Address</p>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Property & Payment Breakdown */}
					<div className="space-y-8">
						{/* Property Information */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-800"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-3 text-xl">
										<Building className="h-6 w-6 text-purple-600" />
										<span>ንብረት መረጃ / Property Information</span>
									</CardTitle>
									<CardDescription>
										Details about the property for this payment
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
										<h3 className="font-semibold text-lg text-gray-900 mb-2">
											{paymentData.property.name}
										</h3>
										<p className="text-purple-600 font-medium text-lg">
											Unit {paymentData.property.unit}
										</p>
										<p className="text-sm text-gray-600 mt-2">
											{paymentData.property.address}
										</p>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Payment Breakdown */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1000"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-3 text-xl">
										<DollarSign className="h-6 w-6 text-emerald-600" />
										<span>የክፍያ ዝርዝር / Payment Breakdown</span>
									</CardTitle>
									<CardDescription>
										Detailed payment calculation
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
											<span className="text-sm font-medium text-gray-700">
												Base Rent:
											</span>
											<span className="font-semibold">
												{paymentData.breakdown.baseRent.toLocaleString()} ብር
											</span>
										</div>

										{paymentData.breakdown.lateFee > 0 && (
											<div className="flex justify-between items-center p-3 rounded-xl bg-red-50">
												<span className="text-sm font-medium text-red-700">
													Late Fee:
												</span>
												<span className="font-semibold text-red-600">
													+{paymentData.breakdown.lateFee.toLocaleString()} ብር
												</span>
											</div>
										)}

										{paymentData.breakdown.discount > 0 && (
											<div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50">
												<span className="text-sm font-medium text-emerald-700">
													Discount:
												</span>
												<span className="font-semibold text-emerald-600">
													-{paymentData.breakdown.discount.toLocaleString()} ብር
												</span>
											</div>
										)}

										<Separator />

										<div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200">
											<span className="text-lg font-bold text-gray-900">
												Total Amount:
											</span>
											<span className="text-2xl font-bold text-emerald-600">
												{paymentData.breakdown.total.toLocaleString()} ብር
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>

				{/* Payment Notes */}
				{paymentData.payment.notes && (
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<Receipt className="h-6 w-6 text-orange-600" />
									<span>የክፍያ ማስታወሻዎች / Payment Notes</span>
								</CardTitle>
								<CardDescription>
									Additional information about this payment
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
									<p className="text-gray-700 leading-relaxed">
										{paymentData.payment.notes}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}
