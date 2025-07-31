"use client";

import { useState } from "react";
import {
	CreditCard,
	DollarSign,
	Calendar,
	Building,
	ArrowLeft,
	Save,
	Receipt,
	Smartphone,
	CreditCard as CardIcon,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
	{
		value: "bank_transfer",
		label: "Bank Transfer",
		icon: "🏦",
		description: "Transfer to landlord's bank account",
		processingTime: "Instant verification",
	},
	{
		value: "mobile_money",
		label: "Mobile Money",
		icon: "📱",
		description: "CBE Birr, M-Birr, HelloCash",
		processingTime: "Instant verification",
	},
	{
		value: "cash",
		label: "Cash Payment",
		icon: "💵",
		description: "Pay directly to property manager",
		processingTime: "Manual verification required",
	},
];

// Mock tenant's current lease info
const tenantLeaseInfo = {
	property: "Sunrise Apartments",
	unit: "Apartment 3B",
	monthlyRent: 18000,
	dueDate: "2025-01-01",
	landlord: "Mulugeta Assefa",
	landlordPhone: "+251911123456",
	landlordEmail: "mulugeta@akeray.et",
};

export default function TenantMakePaymentPage() {
	const [formData, setFormData] = useState({
		amount: tenantLeaseInfo.monthlyRent.toString(),
		paymentMethod: "",
		referenceNumber: "",
		notes: "",
		paymentType: "rent",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	const selectedMethod = paymentMethods.find(
		(m) => m.value === formData.paymentMethod
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (!formData.amount || !formData.paymentMethod) {
			setError("Please fill in all required fields");
			setIsLoading(false);
			return;
		}

		if (parseFloat(formData.amount) <= 0) {
			setError("Payment amount must be greater than 0");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Payment Submitted Successfully!",
				description: `Your payment of ${formData.amount} ETB has been submitted for verification.`,
			});
			router.push("/dashboard/tenant/payments");
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
							<Link href="/dashboard/tenant/payments">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Payments
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Make Payment
						</h1>
						<p className="text-lg text-gray-600">
							Submit your rental payment securely
						</p>
						<p className="text-sm text-gray-500">
							Choose your preferred payment method and submit for verification
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						{/* Main Form */}
						<div className="xl:col-span-2 space-y-8">
							{/* Payment Information */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Payment Information
										</CardTitle>
										<CardDescription>
											Enter your payment details
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										{error && (
											<Alert variant="destructive">
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}

										<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
											<div className="flex items-center space-x-3 mb-3">
												<Building className="h-5 w-5 text-emerald-600" />
												<h4 className="font-semibold text-emerald-800">
													Your Rental Information
												</h4>
											</div>
											<div className="grid grid-cols-2 gap-4 text-sm">
												<div>
													<p className="text-emerald-700 font-medium">
														Property:
													</p>
													<p className="text-emerald-600">
														{tenantLeaseInfo.property}
													</p>
												</div>
												<div>
													<p className="text-emerald-700 font-medium">Unit:</p>
													<p className="text-emerald-600">
														{tenantLeaseInfo.unit}
													</p>
												</div>
												<div>
													<p className="text-emerald-700 font-medium">
														Monthly Rent:
													</p>
													<p className="text-emerald-600">
														{tenantLeaseInfo.monthlyRent.toLocaleString()} ETB
													</p>
												</div>
												<div>
													<p className="text-emerald-700 font-medium">
														Due Date:
													</p>
													<p className="text-emerald-600">
														{new Date(
															tenantLeaseInfo.dueDate
														).toLocaleDateString()}
													</p>
												</div>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="amount"
													className="text-sm font-semibold text-gray-700"
												>
													Payment Amount (ETB) *
												</Label>
												<div className="relative">
													<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
													<Input
														id="amount"
														type="number"
														placeholder="18000"
														className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														value={formData.amount}
														onChange={(e) =>
															setFormData({
																...formData,
																amount: e.target.value,
															})
														}
														required
													/>
												</div>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="paymentType"
													className="text-sm font-semibold text-gray-700"
												>
													Payment Type
												</Label>
												<Select
													value={formData.paymentType}
													onValueChange={(value) =>
														setFormData({ ...formData, paymentType: value })
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="rent">Monthly Rent</SelectItem>
														<SelectItem value="utilities">Utilities</SelectItem>
														<SelectItem value="maintenance">
															Maintenance Fee
														</SelectItem>
														<SelectItem value="other">Other</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="referenceNumber"
												className="text-sm font-semibold text-gray-700"
											>
												Reference Number (Optional)
											</Label>
											<Input
												id="referenceNumber"
												placeholder="Transaction reference or receipt number"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.referenceNumber}
												onChange={(e) =>
													setFormData({
														...formData,
														referenceNumber: e.target.value,
													})
												}
											/>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="notes"
												className="text-sm font-semibold text-gray-700"
											>
												Payment Notes (Optional)
											</Label>
											<Textarea
												id="notes"
												placeholder="Any additional information about this payment..."
												className="min-h-20 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.notes}
												onChange={(e) =>
													setFormData({ ...formData, notes: e.target.value })
												}
											/>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Payment Method Selection */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Payment Method
										</CardTitle>
										<CardDescription>
											Choose how you want to make your payment
										</CardDescription>
									</CardHeader>
									<CardContent>
										<RadioGroup
											value={formData.paymentMethod}
											onValueChange={(value) =>
												setFormData({ ...formData, paymentMethod: value })
											}
										>
											<div className="space-y-4">
												{paymentMethods.map((method) => (
													<div
														key={method.value}
														className="flex items-center space-x-3"
													>
														<RadioGroupItem
															value={method.value}
															id={method.value}
														/>
														<Label
															htmlFor={method.value}
															className="flex-1 cursor-pointer"
														>
															<div className="flex items-center space-x-4 p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-colors">
																<span className="text-3xl">{method.icon}</span>
																<div className="flex-1">
																	<p className="font-semibold text-gray-900">
																		{method.label}
																	</p>
																	<p className="text-sm text-gray-600">
																		{method.description}
																	</p>
																	<p className="text-xs text-emerald-600 font-medium">
																		{method.processingTime}
																	</p>
																</div>
															</div>
														</Label>
													</div>
												))}
											</div>
										</RadioGroup>

										{selectedMethod && (
											<div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
												<h4 className="font-semibold text-blue-800 mb-2">
													Payment Instructions for {selectedMethod.label}
												</h4>
												{selectedMethod.value === "bank_transfer" && (
													<div className="text-blue-700 text-sm space-y-1">
														<p>• Bank: Commercial Bank of Ethiopia</p>
														<p>• Account Name: {tenantLeaseInfo.landlord}</p>
														<p>• Account Number: 1000123456789</p>
														<p>• Reference: Your name and unit number</p>
													</div>
												)}
												{selectedMethod.value === "mobile_money" && (
													<div className="text-blue-700 text-sm space-y-1">
														<p>• CBE Birr: {tenantLeaseInfo.landlordPhone}</p>
														<p>• M-Birr: {tenantLeaseInfo.landlordPhone}</p>
														<p>• Reference: Your name and unit number</p>
														<p>• Send screenshot of transaction as proof</p>
													</div>
												)}
												{selectedMethod.value === "cash" && (
													<div className="text-blue-700 text-sm space-y-1">
														<p>
															• Contact property manager to arrange cash payment
														</p>
														<p>• Phone: {tenantLeaseInfo.landlordPhone}</p>
														<p>• Ensure you receive a proper receipt</p>
														<p>• Payment verification may take 24-48 hours</p>
													</div>
												)}
											</div>
										)}
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Sidebar */}
						<div className="xl:col-span-1 space-y-8">
							{/* Payment Summary */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Payment Summary
										</CardTitle>
										<CardDescription>
											Review your payment details
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-3">
											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600">
													Payment Amount:
												</span>
												<span className="font-semibold text-lg">
													{parseFloat(formData.amount || "0").toLocaleString()}{" "}
													ETB
												</span>
											</div>

											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600">
													Payment Type:
												</span>
												<Badge className="bg-blue-100 text-blue-800">
													{formData.paymentType === "rent"
														? "Monthly Rent"
														: formData.paymentType}
												</Badge>
											</div>

											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600">Due Date:</span>
												<span className="font-medium">
													{new Date(
														tenantLeaseInfo.dueDate
													).toLocaleDateString()}
												</span>
											</div>

											<div className="border-t pt-3">
												<div className="flex justify-between items-center">
													<span className="text-lg font-semibold text-gray-900">
														Total Amount:
													</span>
													<span className="text-2xl font-bold text-emerald-600">
														{parseFloat(
															formData.amount || "0"
														).toLocaleString()}{" "}
														ETB
													</span>
												</div>
											</div>
										</div>

										<div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mt-6">
											<h4 className="font-semibold text-yellow-800 mb-2">
												Important Notes
											</h4>
											<ul className="text-yellow-700 text-sm space-y-1">
												<li>
													• Payment verification may take 1-2 business days
												</li>
												<li>• Keep your payment receipt/screenshot</li>
												<li>• Contact landlord if payment is urgent</li>
												<li>• Late payments may incur additional fees</li>
											</ul>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Landlord Contact */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Landlord Contact
										</CardTitle>
										<CardDescription>
											Contact information for payment queries
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
												<p className="font-semibold text-lg text-gray-900">
													{tenantLeaseInfo.landlord}
												</p>
												<p className="text-sm text-purple-600">
													Property Owner
												</p>
											</div>

											<div className="space-y-3">
												<div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
													<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
														<span className="text-emerald-600 font-bold">
															📞
														</span>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-900">
															{tenantLeaseInfo.landlordPhone}
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
															{tenantLeaseInfo.landlordEmail}
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
								<Link href="/dashboard/tenant/payments">Cancel</Link>
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Submitting Payment...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>Submit Payment</span>
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
