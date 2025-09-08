"use client";

import { useState } from "react";
import {
	FileText,
	Download,
	ArrowLeft,
	CreditCard,
	CheckCircle,
	Calendar,
	Building,
	Upload,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock sale agreement data
const getSaleData = (propertyId: string, unitId: string) => ({
	property: {
		id: parseInt(propertyId),
		name: "Sunrise Apartments",
		address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	},
	unit: {
		id: unitId,
		unitNumber: unitId,
		salePrice: 3500000,
		area: "65 sqm",
		bedrooms: 2,
		bathrooms: 1,
	},
	agreement: {
		closingDate: "2025-03-01",
		titleTransferFee: 35000,
		legalFee: 25000,
		registrationFee: 15000,
	},
});

const saleTerms = [
	"Purchase price of 3,500,000 ETB for Unit 2B as specified in this agreement",
	"Buyer responsible for title transfer fees, legal fees, and registration costs",
	"Property sold 'as-is' with all existing fixtures and fittings included",
	"Seller guarantees clear title and will provide all necessary documentation",
	"Closing date scheduled for March 1, 2025, subject to financing approval",
	"Property inspection period of 10 days from agreement signing",
	"Buyer has right to withdraw within inspection period with full refund",
	"All utilities and property taxes current as of closing date",
	"Possession of property transferred upon full payment and title registration",
	"Any disputes to be resolved through Ethiopian legal system and courts",
];

export default function SaleAgreementPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState({
		agreeToTerms: false,
		digitalSignature: "",
		confirmDetails: false,
		uploadedDocuments: [] as File[],
	});

	const data = getSaleData(params.id as string, params.unitId as string);
	const totalCost =
		data.unit.salePrice +
		data.agreement.titleTransferFee +
		data.agreement.legalFee +
		data.agreement.registrationFee;

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setFormData({
			...formData,
			uploadedDocuments: [...formData.uploadedDocuments, ...files],
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (
			!formData.agreeToTerms ||
			!formData.digitalSignature ||
			!formData.confirmDetails
		) {
			setError("Please complete all required fields and agreements");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Sale Agreement Signed Successfully!",
				description: `Your purchase agreement for Unit ${data.unit.unitNumber} has been created. Proceed to payment to complete the purchase.`,
			});
			router.push(
				`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/purchase-payment`
			);
		}, 2000);
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
							<Link
								href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/buy`}
							>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Application
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Digital Sale Agreement
						</h1>
						<p className="text-lg text-gray-600">
							Review and sign your purchase agreement for Unit{" "}
							{data.unit.unitNumber}
						</p>
						<p className="text-sm text-gray-500">
							Complete the digital purchase agreement process
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="xl:col-span-2 space-y-8">
							{/* Sale Overview */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="flex items-center space-x-3 text-xl">
											<Building className="h-6 w-6 text-emerald-600" />
											<span>Purchase Agreement Overview</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Property & Unit
												</p>
												<p className="text-lg font-semibold text-gray-900">
													{data.property.name}
												</p>
												<p className="text-sm text-gray-600">
													Unit {data.unit.unitNumber}
												</p>
											</div>
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Sale Price
												</p>
												<p className="text-lg font-bold text-emerald-600">
													{data.unit.salePrice.toLocaleString()} ETB
												</p>
												<p className="text-sm text-gray-600">
													{data.unit.pricePerSqm?.toLocaleString()} ETB/sqm
												</p>
											</div>
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Unit Details
												</p>
												<p className="text-sm font-semibold text-gray-900">
													{data.unit.area}
												</p>
												<p className="text-sm text-gray-600">
													{data.unit.bedrooms} bed • {data.unit.bathrooms} bath
												</p>
											</div>
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Closing Date
												</p>
												<p className="text-lg font-bold text-blue-600">
													{new Date(
														data.agreement.closingDate
													).toLocaleDateString()}
												</p>
												<p className="text-sm text-gray-600">Expected</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Sale Terms */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Sale Terms & Conditions
										</CardTitle>
										<CardDescription>
											Please read all terms carefully before signing
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4 max-h-96 overflow-y-auto">
											{saleTerms.map((term, index) => (
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

										<div className="mt-6 pt-6 border-t">
											<div className="flex items-start space-x-3">
												<Checkbox
													id="agreeToTerms"
													checked={formData.agreeToTerms}
													onCheckedChange={(checked) =>
														setFormData({
															...formData,
															agreeToTerms: checked as boolean,
														})
													}
													className="mt-1"
												/>
												<Label
													htmlFor="agreeToTerms"
													className="text-sm text-gray-700 cursor-pointer leading-relaxed"
												>
													I have read, understood, and agree to all the sale
													terms and conditions listed above. I acknowledge that
													this constitutes a legally binding purchase agreement.
												</Label>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Document Upload */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Required Documents
										</CardTitle>
										<CardDescription>
											Upload necessary documents for the purchase
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
											<Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-700">
													Upload Supporting Documents
												</p>
												<p className="text-xs text-gray-500">
													ID copy, income proof, bank statements (PDF, JPG, PNG)
												</p>
												<input
													type="file"
													id="documents"
													accept=".pdf,.jpg,.jpeg,.png"
													multiple
													onChange={handleFileUpload}
													className="hidden"
												/>
												<Button
													type="button"
													variant="outline"
													onClick={() =>
														document.getElementById("documents")?.click()
													}
													className="border-emerald-300 hover:bg-emerald-50"
												>
													<Upload className="h-4 w-4 mr-2" />
													Choose Documents
												</Button>
											</div>
										</div>

										{formData.uploadedDocuments.length > 0 && (
											<div>
												<p className="text-sm font-medium text-gray-700 mb-3">
													Uploaded Documents (
													{formData.uploadedDocuments.length})
												</p>
												<div className="space-y-2">
													{formData.uploadedDocuments.map((doc, index) => (
														<div
															key={index}
															className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
														>
															<span className="text-sm text-gray-700">
																{doc.name}
															</span>
															<Badge className="bg-emerald-100 text-emerald-800">
																Uploaded
															</Badge>
														</div>
													))}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							</div>

							{/* Digital Signature */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1200"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Digital Signature
										</CardTitle>
										<CardDescription>
											Sign the purchase agreement digitally
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										{error && (
											<Alert variant="destructive">
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}

										<div className="space-y-2">
											<Label
												htmlFor="digitalSignature"
												className="text-sm font-semibold text-gray-700"
											>
												Type Your Full Name as Digital Signature *
											</Label>
											<div className="relative">
												<input
													id="digitalSignature"
													type="text"
													placeholder="Type your full name here"
													className="w-full h-16 px-4 text-2xl font-script border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none bg-gradient-to-r from-blue-50 to-emerald-50"
													value={formData.digitalSignature}
													onChange={(e) =>
														setFormData({
															...formData,
															digitalSignature: e.target.value,
														})
													}
													required
												/>
											</div>
											<p className="text-xs text-gray-500">
												By typing your name above, you agree that this serves as
												your legal digital signature for this purchase agreement
											</p>
										</div>

										<div className="flex items-start space-x-3">
											<Checkbox
												id="confirmDetails"
												checked={formData.confirmDetails}
												onCheckedChange={(checked) =>
													setFormData({
														...formData,
														confirmDetails: checked as boolean,
													})
												}
												className="mt-1"
											/>
											<Label
												htmlFor="confirmDetails"
												className="text-sm text-gray-700 cursor-pointer leading-relaxed"
											>
												I confirm that all information provided in this
												application is accurate and complete. I understand that
												any false information may result in purchase agreement
												termination and legal consequences.
											</Label>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Sidebar */}
						<div className="xl:col-span-1 space-y-8">
							{/* Cost Summary */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Cost Summary
										</CardTitle>
										<CardDescription>
											Total cost breakdown for purchase
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-3">
											<div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 border border-emerald-200">
												<span className="text-sm font-medium text-emerald-700">
													Sale Price:
												</span>
												<span className="font-semibold text-emerald-600">
													{data.unit.salePrice.toLocaleString()} ETB
												</span>
											</div>

											<div className="flex justify-between items-center p-3 rounded-xl bg-blue-50 border border-blue-200">
												<span className="text-sm font-medium text-blue-700">
													Title Transfer Fee:
												</span>
												<span className="font-semibold text-blue-600">
													{data.agreement.titleTransferFee.toLocaleString()} ETB
												</span>
											</div>

											<div className="flex justify-between items-center p-3 rounded-xl bg-purple-50 border border-purple-200">
												<span className="text-sm font-medium text-purple-700">
													Legal Fee:
												</span>
												<span className="font-semibold text-purple-600">
													{data.agreement.legalFee.toLocaleString()} ETB
												</span>
											</div>

											<div className="flex justify-between items-center p-3 rounded-xl bg-orange-50 border border-orange-200">
												<span className="text-sm font-medium text-orange-700">
													Registration Fee:
												</span>
												<span className="font-semibold text-orange-600">
													{data.agreement.registrationFee.toLocaleString()} ETB
												</span>
											</div>

											<div className="border-t pt-3">
												<div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
													<span className="text-lg font-bold text-gray-900">
														Total Cost:
													</span>
													<span className="text-2xl font-bold text-purple-600">
														{totalCost.toLocaleString()} ETB
													</span>
												</div>
											</div>
										</div>

										<div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
											<h4 className="font-semibold text-yellow-800 mb-2">
												Important Notes
											</h4>
											<ul className="text-yellow-700 text-sm space-y-1">
												<li>• Payment required within 48 hours of signing</li>
												<li>• Property inspection period: 10 days</li>
												<li>• Title transfer upon full payment</li>
												<li>• Legal documentation provided</li>
											</ul>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Next Steps */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											After Signing
										</CardTitle>
										<CardDescription>What happens next</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="flex items-start space-x-3">
												<div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
													<span className="text-white font-bold text-sm">
														1
													</span>
												</div>
												<div>
													<p className="font-medium text-gray-900">
														Payment Processing
													</p>
													<p className="text-sm text-gray-600">
														Complete payment for purchase price and fees
													</p>
												</div>
											</div>
											<div className="flex items-start space-x-3">
												<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
													<span className="text-white font-bold text-sm">
														2
													</span>
												</div>
												<div>
													<p className="font-medium text-gray-900">
														Property Inspection
													</p>
													<p className="text-sm text-gray-600">
														10-day inspection period begins
													</p>
												</div>
											</div>
											<div className="flex items-start space-x-3">
												<div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
													<span className="text-white font-bold text-sm">
														3
													</span>
												</div>
												<div>
													<p className="font-medium text-gray-900">
														Title Transfer
													</p>
													<p className="text-sm text-gray-600">
														Legal title transfer and ownership registration
													</p>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<div className="flex justify-end space-x-4 mt-8">
							<Button
								type="button"
								variant="outline"
								asChild
								className="border-gray-300 hover:bg-gray-50"
							>
								<Link
									href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/buy`}
								>
									Cancel
								</Link>
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Processing Agreement...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<FileText className="h-5 w-5" />
										<span>Sign Agreement & Proceed to Payment</span>
									</div>
								)}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
