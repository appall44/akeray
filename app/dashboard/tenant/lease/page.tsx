"use client";

import { useState, useRef } from "react";
import {
	FileText,
	Download,
	Calendar,
	Home,
	User,
	Clock,
	MapPin,
	ChevronLeft,
	ChevronRight,
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Mock tenant's leases data
const tenantLeases = [
	{
		id: "LSE-001",
		property: {
			id: 1,
			name: "Sunrise Apartments",
			address: "Bole Road, Addis Ababa",
			hasUnits: true,
		},
		unit: {
			id: "3B",
			name: "Unit 3B",
		},
		tenant: "Meron Tadesse",
		landlord: {
			name: "Mulugeta Assefa",
			phone: "+251911123456",
			email: "mulugeta@akeray.et",
			avatar:
				"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
		},
		startDate: "2024-01-01",
		endDate: "2024-12-31",
		monthlyRent: 18000,
		deposit: 36000,
		status: "active",
		renewalOption: true,
		noticePeriod: 30,
		lateFeePenalty: 500,
	},
	{
		id: "LSE-002",
		property: {
			id: 2,
			name: "Green Valley Villa",
			address: "Kazanchis, Addis Ababa",
			hasUnits: false,
		},
		unit: null,
		tenant: "Meron Tadesse",
		landlord: {
			name: "Sarah Johnson",
			phone: "+251922345678",
			email: "sarah@email.com",
			avatar:
				"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
		},
		startDate: "2024-06-01",
		endDate: "2025-05-31",
		monthlyRent: 35000,
		deposit: 70000,
		status: "active",
		renewalOption: true,
		noticePeriod: 60,
		lateFeePenalty: 1000,
	},
	{
		id: "LSE-003",
		property: {
			id: 3,
			name: "City Center Complex",
			address: "Piassa, Addis Ababa",
			hasUnits: true,
		},
		unit: {
			id: "2C",
			name: "Unit 2C",
		},
		tenant: "Meron Tadesse",
		landlord: {
			name: "Ahmed Hassan",
			phone: "+251933456789",
			email: "ahmed@email.com",
			avatar:
				"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
		},
		startDate: "2024-03-01",
		endDate: "2025-02-28",
		monthlyRent: 25000,
		deposit: 50000,
		status: "expiring",
		renewalOption: true,
		noticePeriod: 30,
		lateFeePenalty: 750,
	},
];

const leaseTerms = [
	"Monthly rent payment due on the 1st of each month",
	"Security deposit refundable upon lease completion",
	"Written notice required for lease termination",
	"Late payment fees apply after grace period",
	"Tenant responsible for utilities (electricity, water, internet)",
	"No pets allowed without written permission",
	"Property maintenance requests to be submitted through the system",
	"Lease automatically renewable with mutual agreement",
];

export default function TenantLeasePage() {
	const [selectedLeaseId, setSelectedLeaseId] = useState<string>(
		tenantLeases[0]?.id || ""
	);
	const pdfContentRef = useRef<HTMLDivElement>(null);

	const selectedLease =
		tenantLeases.find((lease) => lease.id === selectedLeaseId) ||
		tenantLeases[0];
	const daysUntilExpiry = selectedLease
		? Math.ceil(
				(new Date(selectedLease.endDate).getTime() - new Date().getTime()) /
					(1000 * 60 * 60 * 24)
		  )
		: 0;

	const generateLeasePDF = async (
		lease: (typeof tenantLeases)[0],
		doc: jsPDF,
		yOffset: number
	) => {
		const logoUrl = "https://via.placeholder.com/150x50.png?text=Koket+Logo"; // Replace with actual logo URL
		const pageWidth = doc.internal.pageSize.getWidth();
		const logoWidth = 50;
		const logoHeight = 15;

		// Add logo
		try {
			doc.addImage(
				logoUrl,
				"PNG",
				(pageWidth - logoWidth) / 2,
				yOffset,
				logoWidth,
				logoHeight
			);
			yOffset += logoHeight + 10;
		} catch (error) {
			console.error("Error adding logo:", error);
		}

		// Add title
		doc.setFontSize(24);
		doc.setFont("helvetica", "bold");
		doc.text("Koket Investment", pageWidth / 2, yOffset, { align: "center" });
		yOffset += 15;

		// Add lease title
		doc.setFontSize(18);
		doc.setFont("helvetica", "normal");
		doc.text(`Lease Agreement: ${lease.id}`, 20, yOffset);
		yOffset += 10;

		// Add lease details
		doc.setFontSize(12);
		doc.text(`Property: ${lease.property.name}`, 20, yOffset);
		yOffset += 8;
		doc.text(`Address: ${lease.property.address}`, 20, yOffset);
		yOffset += 8;
		if (lease.unit) {
			doc.text(`Unit: ${lease.unit.name}`, 20, yOffset);
			yOffset += 8;
		}
		doc.text(`Tenant: ${lease.tenant}`, 20, yOffset);
		yOffset += 8;
		doc.text(`Landlord: ${lease.landlord.name}`, 20, yOffset);
		yOffset += 8;
		doc.text(
			`Lease Period: ${new Date(
				lease.startDate
			).toLocaleDateString()} to ${new Date(
				lease.endDate
			).toLocaleDateString()}`,
			20,
			yOffset
		);
		yOffset += 8;
		doc.text(
			`Monthly Rent: ${lease.monthlyRent.toLocaleString()} ETB`,
			20,
			yOffset
		);
		yOffset += 8;
		doc.text(`Deposit: ${lease.deposit.toLocaleString()} ETB`, 20, yOffset);
		yOffset += 8;
		doc.text(`Status: ${lease.status}`, 20, yOffset);
		yOffset += 8;
		doc.text(`Notice Period: ${lease.noticePeriod} days`, 20, yOffset);
		yOffset += 10;

		// Add lease terms
		doc.setFontSize(14);
		doc.text("Lease Terms & Conditions", 20, yOffset);
		yOffset += 8;
		doc.setFontSize(12);
		leaseTerms.forEach((term, index) => {
			if (yOffset > 250) {
				doc.addPage();
				yOffset = 20;
			}
			doc.text(`${index + 1}. ${term}`, 20, yOffset, {
				maxWidth: pageWidth - 40,
			});
			yOffset +=
				8 *
					Math.ceil(
						doc.getTextWidth(`${index + 1}. ${term}`) / (pageWidth - 40)
					) +
				2;
		});

		// Add landlord information
		yOffset += 10;
		if (yOffset > 250) {
			doc.addPage();
			yOffset = 20;
		}
		doc.setFontSize(14);
		doc.text("Landlord Information", 20, yOffset);
		yOffset += 8;
		doc.setFontSize(12);
		doc.text(`Name: ${lease.landlord.name}`, 20, yOffset);
		yOffset += 8;
		doc.text(`Phone: ${lease.landlord.phone}`, 20, yOffset);
		yOffset += 8;
		doc.text(`Email: ${lease.landlord.email}`, 20, yOffset);
		yOffset += 8;
		doc.text("Emergency Contact: +251-911-654321 (24/7)", 20, yOffset);
		yOffset += 10;

		// Add important dates
		doc.setFontSize(14);
		doc.text("Important Dates", 20, yOffset);
		yOffset += 8;
		doc.setFontSize(12);
		doc.text(
			`Lease Start: ${new Date(lease.startDate).toLocaleDateString()}`,
			20,
			yOffset
		);
		yOffset += 8;
		doc.text(
			`Lease End: ${new Date(lease.endDate).toLocaleDateString()}`,
			20,
			yOffset
		);
		yOffset += 8;
		doc.text(`Notice Period: ${lease.noticePeriod} days`, 20, yOffset);

		return yOffset;
	};

	const handleDownloadPDF = async () => {
		const doc = new jsPDF();
		await generateLeasePDF(selectedLease, doc, 20);
		doc.save(`lease-${selectedLease.id}.pdf`);
	};

	const handleDownloadAllPDFs = async () => {
		const doc = new jsPDF();
		let yOffset = 20;

		for (const lease of tenantLeases) {
			yOffset = await generateLeasePDF(lease, doc, yOffset);
			if (lease !== tenantLeases[tenantLeases.length - 1]) {
				doc.addPage();
				yOffset = 20;
			}
		}

		doc.save("all-leases.pdf");
	};

	const handleNavigateLease = (direction: "prev" | "next") => {
		const currentIndex = tenantLeases.findIndex(
			(lease) => lease.id === selectedLeaseId
		);
		let newIndex;
		if (direction === "prev") {
			newIndex = currentIndex > 0 ? currentIndex - 1 : tenantLeases.length - 1;
		} else {
			newIndex = currentIndex < tenantLeases.length - 1 ? currentIndex + 1 : 0;
		}
		setSelectedLeaseId(tenantLeases[newIndex].id);
	};

	if (!selectedLease) {
		return (
			<DashboardLayout
				userRole="tenant"
				userName="Meron Tadesse"
				userEmail="meron@email.com"
			>
				<div className="text-center py-12 px-4">
					<FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						No Active Leases
					</h3>
					<p className="text-gray-600 mb-4">
						You don't have any active lease agreements.
					</p>
					<Button
						asChild
						className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
					>
						<Link href="/dashboard/tenant/properties">Browse Properties</Link>
					</Button>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" />
			<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" />
			<DashboardLayout
				userRole="tenant"
				userName="Meron Tadesse"
				userEmail="meron@email.com"
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
					{/* Header and Lease Selection */}
					<div className="animate-in fade-in duration-700">
						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
								<div className="space-y-2">
									<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
										My Lease Agreements
									</h1>
									<p className="text-base sm:text-lg text-gray-600">
										View and manage all your lease agreements
									</p>
									<p className="text-sm text-gray-500">
										Select a lease to view details and download documents
									</p>
								</div>
								<div className="flex flex-col sm:flex-row sm:items-center gap-3">
									<Button
										variant="outline"
										onClick={handleDownloadAllPDFs}
										className="border-emerald-300 hover:bg-emerald-50 bg-transparent"
									>
										<Download className="h-4 w-4 mr-2" />
										All PDFs
									</Button>
									<Button
										onClick={handleDownloadPDF}
										className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
									>
										<Download className="h-4 w-4 mr-2" />
										Current PDF
									</Button>
								</div>
							</div>
							<div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
								<div className="flex-1">
									<Select
										value={selectedLeaseId}
										onValueChange={setSelectedLeaseId}
									>
										<SelectTrigger className="w-full h-12 text-left">
											<SelectValue placeholder="Select a lease" />
										</SelectTrigger>
										<SelectContent className="max-h-96 overflow-y-auto">
											{tenantLeases.map((lease) => (
												<SelectItem key={lease.id} value={lease.id}>
													{lease.property.name}
													{lease.unit
														? ` - ${lease.unit.name}`
														: " (Entire Property)"}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="icon"
										onClick={() => handleNavigateLease("prev")}
										className="border-gray-300 hover:bg-gray-50"
									>
										<ChevronLeft className="h-5 w-5" />
									</Button>
									<Button
										variant="outline"
										size="icon"
										onClick={() => handleNavigateLease("next")}
										className="border-gray-300 hover:bg-gray-50"
									>
										<ChevronRight className="h-5 w-5" />
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Lease Overview */}
					<div
						className="animate-in fade-in slide-in-from-top-4 duration-700"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<Home className="h-6 w-6 text-emerald-600" />
									<span>Lease Overview</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
									<div className="space-y-2">
										<p className="text-sm font-medium text-gray-500">
											Property
										</p>
										<p className="text-base sm:text-lg font-semibold text-gray-900">
											{selectedLease.property.name}
										</p>
										<p className="text-sm text-gray-600 flex items-center">
											<MapPin className="h-4 w-4 mr-1" />
											{selectedLease.unit
												? selectedLease.unit.name
												: "Entire Property"}
										</p>
									</div>
									<div className="space-y-2">
										<p className="text-sm font-medium text-gray-500">
											Lease Period
										</p>
										<p className="text-sm font-semibold text-gray-900">
											{new Date(selectedLease.startDate).toLocaleDateString()}
										</p>
										<p className="text-sm text-gray-600">
											to {new Date(selectedLease.endDate).toLocaleDateString()}
										</p>
									</div>
									<div className="space-y-2">
										<p className="text-sm font-medium text-gray-500">
											Monthly Rent
										</p>
										<p className="text-base sm:text-lg font-bold text-emerald-600">
											{selectedLease.monthlyRent.toLocaleString()} ETB
										</p>
										<p className="text-sm text-gray-600">
											Deposit: {selectedLease.deposit.toLocaleString()} ETB
										</p>
									</div>
									<div className="space-y-2">
										<p className="text-sm font-medium text-gray-500">Status</p>
										<Badge
											className={
												selectedLease.status === "active"
													? "bg-emerald-100 text-emerald-800"
													: "bg-yellow-100 text-yellow-800"
											}
										>
											{selectedLease.status}
										</Badge>
										<p className="text-sm text-gray-600">
											{daysUntilExpiry} days remaining
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Lease Terms */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-3 text-xl">
										<FileText className="h-6 w-6 text-blue-600" />
										<span>Lease Terms & Conditions</span>
									</CardTitle>
									<CardDescription>
										Important terms and conditions of your lease agreement
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{leaseTerms.map((term, index) => (
											<div
												key={index}
												className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100"
											>
												<div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
													<span className="text-xs font-bold text-blue-600">
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

						{/* Landlord Information */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-3 text-xl">
										<User className="h-6 w-6 text-purple-600" />
										<span>Landlord Information</span>
									</CardTitle>
									<CardDescription>
										Contact details for your property owner
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-6">
										<div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
											<Avatar className="h-12 w-12 sm:h-16 sm:w-16 ring-4 ring-purple-200">
												<AvatarImage src={selectedLease.landlord.avatar} />
												<AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-lg">
													{selectedLease.landlord.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<p className="font-semibold text-base sm:text-lg text-gray-900">
													{selectedLease.landlord.name}
												</p>
												<p className="text-sm text-gray-600">Property Owner</p>
												<p className="text-sm text-purple-600 font-medium">
													Akeray Properties
												</p>
											</div>
										</div>

										<div className="space-y-4">
											<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
												<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
													<span className="text-emerald-600 font-bold">📞</span>
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{selectedLease.landlord.phone}
													</p>
													<p className="text-xs text-gray-500">Phone</p>
												</div>
											</div>
											<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
												<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
													<span className="text-blue-600 font-bold">✉️</span>
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{selectedLease.landlord.email}
													</p>
													<p className="text-xs text-gray-500">Email</p>
												</div>
											</div>
										</div>

										<Separator />

										<div className="space-y-3">
											<h4 className="font-semibold text-gray-900">
												Emergency Contact
											</h4>
											<div className="flex items-center space-x-3 p-3 rounded-xl bg-red-50 border border-red-100">
												<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
													<span className="text-red-600 font-bold">🚨</span>
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														+251-911-654321
													</p>
													<p className="text-xs text-gray-500">
														24/7 Emergency Line
													</p>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Important Dates */}
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-3 text-xl">
									<Calendar className="h-6 w-6 text-orange-600" />
									<span>Important Dates</span>
								</CardTitle>
								<CardDescription>
									Key dates and deadlines for your lease
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
									<div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100">
										<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
											<Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
										</div>
										<h3 className="font-semibold text-gray-900 mb-2">
											Lease Start
										</h3>
										<p className="text-base sm:text-lg font-bold text-emerald-600">
											{new Date(selectedLease.startDate).toLocaleDateString()}
										</p>
										<p className="text-sm text-gray-500">Agreement began</p>
									</div>
									<div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100">
										<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
											<Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
										</div>
										<h3 className="font-semibold text-gray-900 mb-2">
											Lease End
										</h3>
										<p className="text-base sm:text-lg font-bold text-yellow-600">
											{new Date(selectedLease.endDate).toLocaleDateString()}
										</p>
										<p className="text-sm text-gray-500">
											{daysUntilExpiry} days remaining
										</p>
									</div>
									<div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
										<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
											<FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
										</div>
										<h3 className="font-semibold text-gray-900 mb-2">
											Notice Period
										</h3>
										<p className="text-base sm:text-lg font-bold text-purple-600">
											{selectedLease.noticePeriod} days
										</p>
										<p className="text-sm text-gray-500">
											Required for termination
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Lease Actions */}
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-xl">Lease Actions</CardTitle>
								<CardDescription>Manage your lease agreement</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
									<Button
										asChild
										className="h-20 flex-col space-y-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
									>
										<Link
											href={`/dashboard/tenant/lease/${selectedLease.id}/renewal`}
										>
											<FileText className="h-6 w-6" />
											<span className="text-sm">Request Renewal</span>
										</Link>
									</Button>
									<Button
										variant="outline"
										onClick={handleDownloadPDF}
										className="h-20 flex-col space-y-2 bg-transparent border-blue-200 hover:bg-blue-50"
									>
										<Download className="h-6 w-6 text-blue-600" />
										<span className="text-sm">Download PDF</span>
									</Button>
									<Button
										variant="outline"
										className="h-20 flex-col space-y-2 bg-transparent border-purple-200 hover:bg-purple-50"
									>
										<User className="h-6 w-6 text-purple-600" />
										<span className="text-sm">Contact Landlord</span>
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
