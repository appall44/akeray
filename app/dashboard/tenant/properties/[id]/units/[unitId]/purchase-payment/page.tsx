"use client";

import { useState } from "react";
import {
	CreditCard,
	ArrowLeft,
	CheckCircle,
	Building,
	DollarSign,
	Calendar,
	Upload,
	Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock data
const getPaymentData = (propertyId: string, unitId: string) => ({
	property: {
		id: parseInt(propertyId),
		name: "Sunrise Apartments",
		address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	},
	unit: {
		id: unitId,
		unitNumber: unitId,
		salePrice: 3500000,
	},
	fees: {
		titleTransferFee: 35000,
		legalFee: 25000,
		registrationFee: 15000,
	},
	owner: {
		name: "Mulugeta Assefa",
		phone: "+251911123456",
		bankAccount: "1000123456789",
		bankName: "Commercial Bank of Ethiopia",
	},
});

const paymentMethods = [
	{
		value: "bank_transfer",
		label: "Bank Transfer",
		icon: "🏦",
		description: "Transfer to property owner's bank account",
		processingTime: "1-2 business days verification",
	},
	{
		value: "certified_check",
		label: "Certified Check",
		icon: "📋",
		description: "Bank-certified check payment",
		processingTime: "Same day verification",
	},
	{
		value: "cash_deposit",
		label: "Cash Deposit",
		icon: "💵",
		description: "Cash deposit at designated bank",
		processingTime: "Instant verification with receipt",
	},
];

export default function PurchasePaymentPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState({
		paymentMethod: "",
		referenceNumber: "",
		notes: "",
		receiptImages: [] as File[],
	});

	const data = getPaymentData(params.id as string, params.unitId as string);
	const totalAmount =
		data.unit.salePrice +
		data.fees.titleTransferFee +
		data.fees.legalFee +
		data.fees.registrationFee;
	const selectedMethod = paymentMethods.find(
		(m) => m.value === formData.paymentMethod
	);

	const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setFormData({
			...formData,
			receiptImages: [...formData.receiptImages, ...files],
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (!formData.paymentMethod) {
			setError("Please select a payment method");
			setIsLoading(false);
			return;
		}

		if (!formData.referenceNumber) {
			setError("Please provide a transaction reference number");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Purchase Payment Submitted Successfully!",
				description: `Your payment of ${totalAmount.toLocaleString()} ETB has been submitted for verification. You'll receive confirmation shortly.`,
			});
			router.push(`/dashboard/tenant/purchase-requests`);
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
								href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/sale-agreement`}
							>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Sale Agreement
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Complete Purchase Payment
						</h1>
						<p className="text-lg text-gray-600">
							Pay for Unit {data.unit.unitNumber} to finalize your purchase
						</p>
						<p className="text-sm text-gray-500">
							Submit payment for purchase price and associated fees
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						{/* Main Form */}
						<div className="xl:col-span-2 space-y-8">
							{/* Payment Overview */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="flex items-center space-x-3 text-xl">
											<Building className="h-6 w-6 text-emerald-600" />
											<span>Payment Overview</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
												<p className="text-2xl font-bold text-emerald-600">
													{data.unit.salePrice.toLocaleString()} ETB
												</p>
												<p className="text-sm text-gray-600">Base price</p>
											</div>
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Total Amount
												</p>
												<p className="text-2xl font-bold text-purple-600">
													{totalAmount.toLocaleString()} ETB
												</p>
												<p className="text-sm text-gray-600">Including fees</p>
											</div>
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
									<CardContent className="space-y-6">
										{error && (
											<Alert variant="destructive">
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}

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
														<p>• Bank: {data.owner.bankName}</p>
														<p>• Account Name: {data.owner.name}</p>
														<p>• Account Number: {data.owner.bankAccount}</p>
														<p>• Amount: {totalAmount.toLocaleString()} ETB</p>
														<p>
															• Reference: Unit {data.unit.unitNumber} Purchase
															- {data.property.name}
														</p>
													</div>
												)}
												{selectedMethod.value === "certified_check" && (
													<div className="text-blue-700 text-sm space-y-1">
														<p>• Payable to: {data.owner.name}</p>
														<p>• Amount: {totalAmount.toLocaleString()} ETB</p>
														<p>• Memo: Unit {data.unit.unitNumber} Purchase</p>
														<p>• Deliver to property management office</p>
													</div>
												)}
												{selectedMethod.value === "cash_deposit" && (
													<div className="text-blue-700 text-sm space-y-1">
														<p>• Bank: {data.owner.bankName}</p>
														<p>• Account: {data.owner.bankAccount}</p>
														<p>• Amount: {totalAmount.toLocaleString()} ETB</p>
														<p>• Bring valid ID and deposit slip</p>
													</div>
												)}
											</div>
										)}

										<div className="space-y-4">
											<div className="space-y-2">
												<Label
													htmlFor="referenceNumber"
													className="text-sm font-semibold text-gray-700"
												>
													Transaction Reference Number *
												</Label>
												<Input
													id="referenceNumber"
													placeholder="Enter transaction reference or receipt number"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.referenceNumber}
													onChange={(e) =>
														setFormData({
															...formData,
															referenceNumber: e.target.value,
														})
													}
													required
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
													placeholder="Any additional information about the payment..."
													className="min-h-20 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.notes}
													onChange={(e) =>
														setFormData({ ...formData, notes: e.target.value })
													}
												/>
											</div>

											<div className="space-y-2">
												<Label className="text-sm font-semibold text-gray-700">
													Upload Payment Receipt/Screenshot
												</Label>
												<div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
													<Receipt className="mx-auto h-10 w-10 text-gray-400 mb-3" />
													<div className="space-y-2">
														<p className="text-sm font-medium text-gray-700">
															Upload payment proof
														</p>
														<p className="text-xs text-gray-500">
															Receipt, screenshot, or bank slip (JPG, PNG, PDF)
														</p>
														<input
															type="file"
															id="receipts"
															accept="image/*,.pdf"
															multiple
															onChange={handleReceiptUpload}
															className="hidden"
														/>
														<Button
															type="button"
															variant="outline"
															onClick={() =>
																document.getElementById("receipts")?.click()
															}
															className="border-emerald-300 hover:bg-emerald-50"
														>
															<Upload className="h-4 w-4 mr-2" />
															Choose Files
														</Button>
													</div>
												</div>

												{formData.receiptImages.length > 0 && (
													<div className="mt-4">
														<p className="text-sm font-medium text-gray-700 mb-2">
															Uploaded Files ({formData.receiptImages.length})
														</p>
														<div className="space-y-2">
															{formData.receiptImages.map((file, index) => (
																<div
																	key={index}
																	className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
																>
																	<span className="text-sm text-gray-700">
																		{file.name}
																	</span>
																	<Badge className="bg-emerald-100 text-emerald-800">
																		Uploaded
																	</Badge>
																</div>
															))}
														</div>
													</div>
												)}
											</div>
										</div>
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
										<CardDescription>Final payment breakdown</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-3">
											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600">
													Sale Price:
												</span>
												<span className="font-semibold">
													{data.unit.salePrice.toLocaleString()} ETB
												</span>
											</div>

											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600">
													Title Transfer Fee:
												</span>
												<span className="font-semibold">
													{data.fees.titleTransferFee.toLocaleString()} ETB
												</span>
											</div>

											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600">
													Legal Fee:
												</span>
												<span className="font-semibold">
													{data.fees.legalFee.toLocaleString()} ETB
												</span>
											</div>

											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600">
													Registration Fee:
												</span>
												<span className="font-semibold">
													{data.fees.registrationFee.toLocaleString()} ETB
												</span>
											</div>

											<div className="border-t pt-3">
												<div className="flex justify-between items-center">
													<span className="text-lg font-bold text-gray-900">
														Total Amount:
													</span>
													<span className="text-2xl font-bold text-emerald-600">
														{totalAmount.toLocaleString()} ETB
													</span>
												</div>
											</div>
										</div>

										<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
											<h4 className="font-semibold text-emerald-800 mb-2">
												✓ Purchase Agreement Signed
											</h4>
											<p className="text-emerald-700 text-sm">
												Your digital purchase agreement has been successfully
												signed and is now active.
											</p>
										</div>

										<div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
											<h4 className="font-semibold text-yellow-800 mb-2">
												Payment Verification
											</h4>
											<ul className="text-yellow-700 text-sm space-y-1">
												<li>• Payment verification: 1-48 hours</li>
												<li>• SMS confirmation upon verification</li>
												<li>• Title transfer process begins</li>
												<li>• Legal documentation prepared</li>
											</ul>
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
									href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/sale-agreement`}
								>
									Back to Agreement
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
										<span>Processing Payment...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<CreditCard className="h-5 w-5" />
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
