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
	Edit,
	Phone,
	Mail,
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { downloadLeasePDF } from "@/lib/pdf-generator";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock lease data
const getLeaseData = (leaseId: string) => ({
	id: leaseId,
	tenant: {
		name: "አበበ ከበደ / Abebe Kebede",
		phone: "+251911234567",
		email: "abebe@email.com",
		occupation: "Software Engineer",
		emergencyContact: "+251922345678",
		avatar: "/placeholder-user.jpg",
	},
	property: {
		name: "የፀሐይ መውጫ አፓርትመንቶች / Sunrise Apartments",
		address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	},
	unit: {
		name: "4A",
	},
	landlord: {
		name: "Mulugeta Assefa",
		phone: "+251911123456",
		email: "mulugeta@akeray.et",
	},
	startDate: "2024-01-01",
	endDate: "2024-12-31",
	monthlyRent: 15000,
	deposit: 30000,
	status: "active",
	renewalOption: true,
	noticePeriod: 30,
	lateFeePenalty: 500,
	payments: [
		{
			month: "January 2024",
			amount: 15000,
			status: "paid",
			date: "2024-01-01",
			method: "Bank Transfer",
		},
		{
			month: "February 2024",
			amount: 15000,
			status: "paid",
			date: "2024-02-01",
			method: "Bank Transfer",
		},
		{
			month: "March 2024",
			amount: 15000,
			status: "paid",
			date: "2024-03-01",
			method: "Cash",
		},
	],
	documents: [
		{
			name: "Lease Agreement.pdf",
			type: "lease",
			date: "2024-01-01",
			size: "2.3 MB",
		},
		{
			name: "Tenant ID Copy.pdf",
			type: "identification",
			date: "2024-01-01",
			size: "1.1 MB",
		},
	],
});

const leaseTerms = [
	"Monthly rent payment due on the 1st of each month",
	"Security deposit of 30,000 ETB (equivalent to 2 months rent)",
	"30-day notice required for lease termination",
	"Late payment fee of 500 ETB after 5 days grace period",
	"Tenant responsible for utilities (electricity, water, internet)",
	"No pets allowed without written permission",
	"Property maintenance requests to be submitted through the system",
	"Lease automatically renewable for another year with mutual agreement",
];

export default function AdminLeaseDetailsPage() {
	const params = useParams();
	const leaseData = getLeaseData(params.id as string);
	const daysUntilExpiry = Math.ceil(
		(new Date(leaseData.endDate).getTime() - new Date().getTime()) /
			(1000 * 60 * 60 * 24)
	);

	const handleDownloadPDF = () => {
		downloadLeasePDF(leaseData);
	};

	const handleDownloadExcel = () => {
		// Create Excel-like CSV content
		const csvContent = `
Lease Agreement Details
Property,${leaseData.property.name}
Unit,${leaseData.unit.name}
Tenant,${leaseData.tenant.name}
Start Date,${leaseData.startDate}
End Date,${leaseData.endDate}
Monthly Rent,${leaseData.monthlyRent} ETB
Security Deposit,${leaseData.deposit} ETB
Status,${leaseData.status}

Payment History
Month,Amount,Status,Date,Method
${leaseData.payments
	.map((p) => `${p.month},${p.amount} ETB,${p.status},${p.date},${p.method}`)
	.join("\n")}
		`.trim();

		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `lease-${leaseData.id}-${leaseData.property.name.replace(
			/\s+/g,
			"-"
		)}.csv`;
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
							<Link href="/dashboard/admin/leases">
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back to Leases
							</Link>
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								የውል ዝርዝር / Lease Agreement Details
							</h1>
							<p className="text-lg text-gray-600">
								ሙሉ የውል መረጃ እና ክፍያ ታሪክ / Complete lease information and payment
								history
							</p>
							<p className="text-sm text-gray-500">
								Lease ID: {leaseData.id} • {leaseData.property.name} - Unit{" "}
								{leaseData.unit.name}
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
								onClick={handleDownloadExcel}
								className="border-blue-300 hover:bg-blue-50 bg-transparent"
							>
								<Download className="h-4 w-4 mr-2" />
								Download Excel
							</Button>
							<Button
								asChild
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
							>
								<Link href={`/dashboard/admin/leases/${params.id}/edit`}>
									<Edit className="h-4 w-4 mr-2" />
									Edit Lease
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Lease Overview */}
				<div
					className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<FileText className="h-6 w-6 text-emerald-600" />
								<span>የውል አጠቃላይ እይታ / Lease Overview</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										የውል ጊዜ / Lease Period
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{new Date(leaseData.startDate).toLocaleDateString()}
									</p>
									<p className="text-sm text-gray-600">
										to {new Date(leaseData.endDate).toLocaleDateString()}
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ወርሃዊ ክራይ / Monthly Rent
									</p>
									<p className="text-lg font-bold text-emerald-600">
										{leaseData.monthlyRent.toLocaleString()} ብር
									</p>
									<p className="text-sm text-gray-600">Due on 1st of month</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ተቀማጭ ገንዘብ / Security Deposit
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{leaseData.deposit.toLocaleString()} ብር
									</p>
									<p className="text-sm text-gray-600">2 months rent</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm font-medium text-gray-500">
										ሁኔታ / Status
									</p>
									<Badge className="bg-emerald-100 text-emerald-800 font-semibold">
										{leaseData.status}
									</Badge>
									<p className="text-sm text-gray-600">
										{daysUntilExpiry} days remaining
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
									Complete tenant details and contact information
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									<div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100">
										<Avatar className="h-16 w-16 ring-4 ring-blue-200">
											<AvatarImage src={leaseData.tenant.avatar} />
											<AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-bold text-lg">
												{leaseData.tenant.name
													.split(" ")
													.slice(-2)
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1">
											<p className="font-semibold text-lg text-gray-900">
												{leaseData.tenant.name}
											</p>
											<p className="text-sm text-gray-600">
												{leaseData.tenant.occupation}
											</p>
											<p className="text-sm text-blue-600 font-medium">
												Tenant since{" "}
												{new Date(leaseData.startDate).toLocaleDateString()}
											</p>
										</div>
									</div>

									<div className="space-y-4">
										<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
											<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
												<Phone className="h-5 w-5 text-emerald-600" />
											</div>
											<div>
												<p className="text-sm font-medium text-gray-900">
													{leaseData.tenant.phone}
												</p>
												<p className="text-xs text-gray-500">Primary Phone</p>
											</div>
										</div>
										<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
											<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
												<Mail className="h-5 w-5 text-blue-600" />
											</div>
											<div>
												<p className="text-sm font-medium text-gray-900">
													{leaseData.tenant.email}
												</p>
												<p className="text-xs text-gray-500">Email Address</p>
											</div>
										</div>
										<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
											<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
												<Phone className="h-5 w-5 text-red-600" />
											</div>
											<div>
												<p className="text-sm font-medium text-gray-900">
													{leaseData.tenant.emergencyContact}
												</p>
												<p className="text-xs text-gray-500">
													Emergency Contact
												</p>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

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
									Details about the leased property
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									<div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
										<h3 className="font-semibold text-lg text-gray-900 mb-2">
											{leaseData.property.name}
										</h3>
										<p className="text-purple-600 font-medium">
											Unit {leaseData.unit.name}
										</p>
										<p className="text-sm text-gray-600 mt-1">
											{leaseData.property.address}
										</p>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="text-center p-4 rounded-xl bg-emerald-50 border border-emerald-200">
											<p className="text-2xl font-bold text-emerald-600">
												{leaseData.monthlyRent.toLocaleString()}
											</p>
											<p className="text-sm text-emerald-700">
												Monthly Rent (ETB)
											</p>
										</div>
										<div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
											<p className="text-2xl font-bold text-blue-600">
												{leaseData.deposit.toLocaleString()}
											</p>
											<p className="text-sm text-blue-700">Deposit (ETB)</p>
										</div>
									</div>

									<div className="space-y-3">
										<h4 className="font-semibold text-gray-900">
											የባለቤት መረጃ / Landlord Information
										</h4>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-600">Name:</span>
												<span className="font-medium">
													{leaseData.landlord.name}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Phone:</span>
												<span className="font-medium">
													{leaseData.landlord.phone}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Email:</span>
												<span className="font-medium">
													{leaseData.landlord.email}
												</span>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Payment History */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<DollarSign className="h-6 w-6 text-emerald-600" />
								<span>የክፍያ ታሪክ / Payment History</span>
							</CardTitle>
							<CardDescription>
								Complete payment record for this lease
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>ወር / Month</TableHead>
										<TableHead>መጠን / Amount</TableHead>
										<TableHead>የክፍያ ቀን / Payment Date</TableHead>
										<TableHead>ዘዴ / Method</TableHead>
										<TableHead>ሁኔታ / Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{leaseData.payments.map((payment, index) => (
										<TableRow key={index} className="hover:bg-gray-50">
											<TableCell>
												<span className="font-medium">{payment.month}</span>
											</TableCell>
											<TableCell>
												<span className="font-semibold text-emerald-600">
													{payment.amount.toLocaleString()} ብር
												</span>
											</TableCell>
											<TableCell>
												<span className="text-sm">
													{new Date(payment.date).toLocaleDateString()}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-sm">{payment.method}</span>
											</TableCell>
											<TableCell>
												<Badge className="bg-emerald-100 text-emerald-800">
													Paid
												</Badge>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>

				{/* Lease Terms & Documents */}
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Lease Terms */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<FileText className="h-6 w-6 text-orange-600" />
									<span>የውል ውሎች / Lease Terms & Conditions</span>
								</CardTitle>
								<CardDescription>
									Key terms and conditions of this lease
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{leaseTerms.map((term, index) => (
										<div
											key={index}
											className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100"
										>
											<div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
												<span className="text-xs font-bold text-orange-600">
													{index + 1}
												</span>
											</div>
											<p className="text-sm text-gray-700 leading-relaxed">
												{term}
											</p>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Documents */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1400"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<FileText className="h-6 w-6 text-purple-600" />
									<span>የውል ሰነዶች / Lease Documents</span>
								</CardTitle>
								<CardDescription>
									All documents related to this lease
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{leaseData.documents.map((doc, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
										>
											<div className="flex items-center space-x-3">
												<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
													<FileText className="h-5 w-5 text-purple-600" />
												</div>
												<div>
													<p className="font-medium text-gray-900">
														{doc.name}
													</p>
													<p className="text-xs text-gray-500">
														{doc.type} • {doc.size} •{" "}
														{new Date(doc.date).toLocaleDateString()}
													</p>
												</div>
											</div>
											<Button
												variant="ghost"
												size="sm"
												className="text-purple-600 hover:text-purple-700"
											>
												<Download className="h-4 w-4" />
											</Button>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Important Dates */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1600"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center space-x-3 text-xl">
								<Calendar className="h-6 w-6 text-red-600" />
								<span>አስፈላጊ ቀናት / Important Dates & Deadlines</span>
							</CardTitle>
							<CardDescription>
								Key dates and deadlines for this lease
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100">
									<div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
										<Calendar className="h-8 w-8 text-emerald-600" />
									</div>
									<h3 className="font-semibold text-gray-900 mb-2">
										Lease Start
									</h3>
									<p className="text-lg font-bold text-emerald-600">
										{new Date(leaseData.startDate).toLocaleDateString()}
									</p>
									<p className="text-sm text-gray-500">Agreement began</p>
								</div>
								<div className="text-center p-6 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100">
									<div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
										<Calendar className="h-8 w-8 text-yellow-600" />
									</div>
									<h3 className="font-semibold text-gray-900 mb-2">
										Lease End
									</h3>
									<p className="text-lg font-bold text-yellow-600">
										{new Date(leaseData.endDate).toLocaleDateString()}
									</p>
									<p className="text-sm text-gray-500">
										{daysUntilExpiry} days remaining
									</p>
								</div>
								<div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
									<div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
										<FileText className="h-8 w-8 text-purple-600" />
									</div>
									<h3 className="font-semibold text-gray-900 mb-2">
										Notice Period
									</h3>
									<p className="text-lg font-bold text-purple-600">
										{leaseData.noticePeriod} days
									</p>
									<p className="text-sm text-gray-500">
										Required for termination
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	);
}
