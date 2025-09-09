"use client";

import { useState } from "react";
import {
	Building,
	Save,
	FileText,
	Phone,
	Mail,
	MapPin,
	CreditCard,
	AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard-layout";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function BusinessSetupPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		businessName: "Akeray Properties",
		tinNumber: "",
		businessLicense: "",
		businessAddress: "",
		businessCity: "Addis Ababa",
		businessPhone: "+251911123456",
		businessEmail: "mulugeta@akeray.et",
		bankName: "Commercial Bank of Ethiopia",
		bankAccount: "",
		vatRegistered: true,
		vatNumber: "",
		invoiceTerms:
			"Payment due within 30 days. Late payment fee of 500 ETB applies after grace period.",
		lateFeeDays: "5",
		lateFeeAmount: "500",
		invoiceFooter:
			"Thank you for your business. For inquiries, contact us at the above details.",
	});
	const router = useRouter();
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (
			!formData.businessName ||
			!formData.tinNumber ||
			!formData.businessAddress ||
			!formData.bankAccount
		) {
			setError("Please fill in all required fields");
			setIsLoading(false);
			return;
		}

		if (formData.tinNumber.length !== 10) {
			setError("TIN number must be exactly 10 digits");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Business Details Saved Successfully!",
				description:
					"Your business information has been saved and will be used for all invoices.",
			});
			router.push("/dashboard/owner/invoices");
		}, 1500);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
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
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Business Setup
						</h1>
						<p className="text-lg text-gray-600">
							Configure your business details for invoice generation
						</p>
						<p className="text-sm text-gray-500">
							This information will be used on all invoices sent to tenants
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Business Information */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Building className="h-5 w-5 text-emerald-600" />
										<span>Business Information</span>
									</CardTitle>
									<CardDescription>
										Your business details for official invoices
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
											htmlFor="businessName"
											className="text-sm font-semibold text-gray-700"
										>
											Business Name *
										</Label>
										<Input
											id="businessName"
											placeholder="e.g., Akeray Properties"
											className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
											value={formData.businessName}
											onChange={(e) =>
												handleInputChange("businessName", e.target.value)
											}
											required
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="tinNumber"
												className="text-sm font-semibold text-gray-700"
											>
												TIN Number *
											</Label>
											<div className="relative">
												<FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="tinNumber"
													placeholder="0012345678"
													maxLength={10}
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.tinNumber}
													onChange={(e) =>
														handleInputChange("tinNumber", e.target.value)
													}
													required
												/>
											</div>
											<p className="text-xs text-gray-500">
												10-digit Tax Identification Number
											</p>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="businessLicense"
												className="text-sm font-semibold text-gray-700"
											>
												Business License
											</Label>
											<Input
												id="businessLicense"
												placeholder="BL-123456789"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.businessLicense}
												onChange={(e) =>
													handleInputChange("businessLicense", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="businessAddress"
											className="text-sm font-semibold text-gray-700"
										>
											Business Address *
										</Label>
										<div className="relative">
											<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
											<Input
												id="businessAddress"
												placeholder="Street address, building name"
												className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.businessAddress}
												onChange={(e) =>
													handleInputChange("businessAddress", e.target.value)
												}
												required
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="businessPhone"
												className="text-sm font-semibold text-gray-700"
											>
												Business Phone *
											</Label>
											<div className="relative">
												<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="businessPhone"
													placeholder="+251911123456"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.businessPhone}
													onChange={(e) =>
														handleInputChange("businessPhone", e.target.value)
													}
													required
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="businessEmail"
												className="text-sm font-semibold text-gray-700"
											>
												Business Email *
											</Label>
											<div className="relative">
												<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="businessEmail"
													type="email"
													placeholder="business@example.com"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.businessEmail}
													onChange={(e) =>
														handleInputChange("businessEmail", e.target.value)
													}
													required
												/>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Banking & Tax Information */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<CreditCard className="h-5 w-5 text-blue-600" />
										<span>Banking & Tax Information</span>
									</CardTitle>
									<CardDescription>
										Financial details for payment processing
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="bankName"
												className="text-sm font-semibold text-gray-700"
											>
												Bank Name *
											</Label>
											<Input
												id="bankName"
												placeholder="Commercial Bank of Ethiopia"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.bankName}
												onChange={(e) =>
													handleInputChange("bankName", e.target.value)
												}
												required
											/>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="bankAccount"
												className="text-sm font-semibold text-gray-700"
											>
												Bank Account Number *
											</Label>
											<Input
												id="bankAccount"
												placeholder="1000123456789"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.bankAccount}
												onChange={(e) =>
													handleInputChange("bankAccount", e.target.value)
												}
												required
											/>
										</div>
									</div>

									<div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
										<div className="flex items-center space-x-3 mb-3">
											<AlertCircle className="h-5 w-5 text-blue-600" />
											<h4 className="font-semibold text-blue-800">
												VAT Registration
											</h4>
										</div>
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<span className="text-blue-700 font-medium">
													VAT Registered Business
												</span>
												<Badge className="bg-emerald-100 text-emerald-800">
													{formData.vatRegistered ? "Yes" : "No"}
												</Badge>
											</div>
											{formData.vatRegistered && (
												<div className="space-y-2">
													<Label
														htmlFor="vatNumber"
														className="text-sm font-semibold text-blue-700"
													>
														VAT Registration Number
													</Label>
													<Input
														id="vatNumber"
														placeholder="VAT-123456789"
														className="h-12 rounded-xl border-2 border-blue-200 focus:border-blue-500"
														value={formData.vatNumber}
														onChange={(e) =>
															handleInputChange("vatNumber", e.target.value)
														}
													/>
												</div>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Invoice Settings */}
						<div
							className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<FileText className="h-5 w-5 text-purple-600" />
										<span>Invoice Settings</span>
									</CardTitle>
									<CardDescription>
										Configure invoice terms and conditions
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="space-y-2">
										<Label
											htmlFor="invoiceTerms"
											className="text-sm font-semibold text-gray-700"
										>
											Invoice Terms & Conditions
										</Label>
										<Textarea
											id="invoiceTerms"
											placeholder="Payment terms, conditions, and policies..."
											className="min-h-24 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
											value={formData.invoiceTerms}
											onChange={(e) =>
												handleInputChange("invoiceTerms", e.target.value)
											}
											rows={4}
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="lateFeeDays"
												className="text-sm font-semibold text-gray-700"
											>
												Late Fee Grace Period (Days)
											</Label>
											<Input
												id="lateFeeDays"
												type="number"
												placeholder="5"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.lateFeeDays}
												onChange={(e) =>
													handleInputChange("lateFeeDays", e.target.value)
												}
											/>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="lateFeeAmount"
												className="text-sm font-semibold text-gray-700"
											>
												Late Fee Amount (ETB)
											</Label>
											<Input
												id="lateFeeAmount"
												type="number"
												placeholder="500"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.lateFeeAmount}
												onChange={(e) =>
													handleInputChange("lateFeeAmount", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="invoiceFooter"
											className="text-sm font-semibold text-gray-700"
										>
											Invoice Footer Message
										</Label>
										<Textarea
											id="invoiceFooter"
											placeholder="Footer message for invoices..."
											className="min-h-20 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
											value={formData.invoiceFooter}
											onChange={(e) =>
												handleInputChange("invoiceFooter", e.target.value)
											}
											rows={3}
										/>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Preview */}
						<div
							className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1200"
							style={{ animationFillMode: "forwards" }}
						>
							<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<FileText className="h-5 w-5 text-orange-600" />
										<span>Invoice Preview</span>
									</CardTitle>
									<CardDescription>
										How your business information will appear on invoices
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
										<div className="text-center mb-6">
											<h3 className="text-xl font-bold text-gray-900">
												INVOICE
											</h3>
											<p className="text-sm text-gray-600">Official Invoice</p>
										</div>

										<div className="space-y-4">
											<div>
												<h4 className="font-semibold text-gray-900 mb-2">
													From:
												</h4>
												<div className="text-sm space-y-1">
													<p className="font-semibold">
														{formData.businessName || "Your Business Name"}
													</p>
													<p>TIN: {formData.tinNumber || "Your TIN Number"}</p>
													<p>
														{formData.businessAddress ||
															"Your Business Address"}
													</p>
													<p>{formData.businessPhone}</p>
													<p>{formData.businessEmail}</p>
												</div>
											</div>

											<div className="border-t pt-4">
												<h4 className="font-semibold text-gray-900 mb-2">
													Sample Invoice Item:
												</h4>
												<div className="bg-white p-3 rounded border">
													<div className="flex justify-between">
														<span>Monthly Rent</span>
														<span>18,000 ETB</span>
													</div>
													<div className="flex justify-between">
														<span>VAT (15%)</span>
														<span>2,700 ETB</span>
													</div>
													<div className="flex justify-between font-bold border-t pt-2 mt-2">
														<span>Total</span>
														<span className="text-emerald-600">20,700 ETB</span>
													</div>
												</div>
											</div>

											<div className="border-t pt-4">
												<h4 className="font-semibold text-gray-900 mb-2">
													Terms:
												</h4>
												<p className="text-xs text-gray-600">
													{formData.invoiceTerms ||
														"Your invoice terms will appear here"}
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Submit Button */}
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1500"
						style={{ animationFillMode: "forwards" }}
					>
						<div className="flex justify-end space-x-4 mt-8">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.back()}
								className="border-gray-300 hover:bg-gray-50"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Saving Business Details...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>Save Business Details</span>
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
