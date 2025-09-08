"use client";

import { useState } from "react";
import {
	CreditCard,
	ArrowLeft,
	CheckCircle,
	Building,
	DollarSign,
	Calendar,
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
		monthlyRent: 20000,
		deposit: 40000,
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
		value: "mobile_money",
		label: "Mobile Money",
		icon: "📱",
		description: "CBE Birr, M-Birr, HelloCash",
		processingTime: "Instant verification with screenshot",
	},
];

export default function LeasePaymentPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState({
		paymentMethod: "",
		referenceNumber: "",
		notes: "",
	});

	const data = getPaymentData(params.id as string, params.unitId as string);
	const totalAmount = data.unit.monthlyRent + data.unit.deposit;
	const selectedMethod = paymentMethods.find(
		(m) => m.value === formData.paymentMethod
	);

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

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Payment Submitted Successfully!",
				description: `Your payment of ${totalAmount.toLocaleString()} ETB has been submitted for verification. You'll receive confirmation shortly.`,
			});
			router.push(`/dashboard/tenant/lease`);
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
								href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/lease`}
							>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Lease Agreement
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Complete Payment
						</h1>
						<p className="text-lg text-gray-600">
							Pay for Unit {data.unit.unitNumber} to finalize your lease
						</p>
						<p className="text-sm text-gray-500">
							Submit payment for first month rent and security deposit
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
													Payment Breakdown
												</p>
												<p className="text-sm text-gray-600">
													Rent: {data.unit.monthlyRent.toLocaleString()} ETB
												</p>
												<p className="text-sm text-gray-600">
													Deposit: {data.unit.deposit.toLocaleString()} ETB
												</p>
											</div>
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Total Amount
												</p>
												<p className="text-2xl font-bold text-emerald-600">
													{totalAmount.toLocaleString()} ETB
												</p>
												<p className="text-sm text-gray-600">Due immediately</p>
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
															• Reference: Unit {data.unit.unitNumber} -{" "}
															{data.property.name}
														</p>
													</div>
												)}
												{selectedMethod.value === "mobile_money" && (
													<div className="text-blue-700 text-sm space-y-1">
														<p>• CBE Birr: {data.owner.phone}</p>
														<p>• M-Birr: {data.owner.phone}</p>
														<p>• Amount: {totalAmount.toLocaleString()} ETB</p>
														<p>
															• Reference: Unit {data.unit.unitNumber} - Your
															Name
														</p>
														<p>
															• Please take a screenshot of the transaction for
															verification
														</p>
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
													Transaction Reference Number
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
													First Month Rent:
												</span>
												<span className="font-semibold">
													{data.unit.monthlyRent.toLocaleString()} ETB
												</span>
											</div>

											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600">
													Security Deposit:
												</span>
												<span className="font-semibold">
													{data.unit.deposit.toLocaleString()} ETB
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
												✓ Lease Agreement Signed
											</h4>
											<p className="text-emerald-700 text-sm">
												Your digital lease agreement has been successfully
												signed and is now active.
											</p>
										</div>

										<div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
											<h4 className="font-semibold text-yellow-800 mb-2">
												Payment Verification
											</h4>
											<ul className="text-yellow-700 text-sm space-y-1">
												<li>• Payment verification: 1-24 hours</li>
												<li>• SMS confirmation upon verification</li>
												<li>• Key collection details will be sent</li>
												<li>• Move-in inspection scheduled</li>
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
									href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/lease`}
								>
									Back to Lease
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
				ACZ
			</div>
		</DashboardLayout>
	);
}
