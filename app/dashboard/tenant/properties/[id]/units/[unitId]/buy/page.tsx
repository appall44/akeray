"use client";

import { useState } from "react";
import {
	Building,
	ArrowLeft,
	Save,
	User,
	Phone,
	Mail,
	Calendar,
	DollarSign,
	FileText,
	CreditCard,
	Home,
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock data
const getUnitData = (propertyId: string, unitId: string) => ({
	property: {
		id: parseInt(propertyId),
		name: "Sunrise Apartments",
		address: "Bole Road, Near Atlas Hotel, Addis Ababa",
	},
	unit: {
		id: unitId,
		unitNumber: unitId,
		salePrice: 3500000,
		pricePerSqm: 75000,
		area: "65 sqm",
		bedrooms: 2,
		bathrooms: 1,
	},
});

export default function BuyRequestPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [preferredDate, setPreferredDate] = useState<Date>();

	const [formData, setFormData] = useState({
		// Personal Information (pre-filled from user profile)
		fullName: "Meron Tadesse",
		phone: "+251911234567",
		email: "meron@email.com",
		occupation: "Software Engineer",
		monthlyIncome: "",

		// Financial Information
		downPayment: "",
		financingType: "cash", // cash, bank_loan, installment
		bankName: "",
		loanAmount: "",

		// Purchase Preferences
		intendedUse: "personal", // personal, investment, business
		moveInDate: "",

		// Emergency Contact
		emergencyContactName: "",
		emergencyContactPhone: "",
		emergencyContactRelation: "",

		// Additional Information
		additionalRequests: "",
		agreeToTerms: false,
		agreeToInspection: false,

		// Purchase Type
		purchaseType: "online", // online or in-person
	});

	const data = getUnitData(params.id as string, params.unitId as string);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (
			!formData.monthlyIncome ||
			!formData.downPayment ||
			!formData.emergencyContactName ||
			!formData.emergencyContactPhone
		) {
			setError("Please fill in all required fields");
			setIsLoading(false);
			return;
		}

		if (!formData.agreeToTerms || !formData.agreeToInspection) {
			setError("Please agree to all terms and conditions");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Purchase Request Submitted!",
				description: `Your purchase request for Unit ${data.unit.unitNumber} has been submitted successfully. You'll receive updates via SMS and email.`,
			});

			if (formData.purchaseType === "online") {
				router.push(
					`/dashboard/tenant/properties/${params.id}/units/${params.unitId}/sale-agreement`
				);
			} else {
				router.push(`/dashboard/tenant/purchase-requests`);
			}
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
								href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}`}
							>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Unit Details
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Purchase Application
						</h1>
						<p className="text-lg text-gray-600">
							Apply to purchase Unit {data.unit.unitNumber} at{" "}
							{data.property.name}
						</p>
						<p className="text-sm text-gray-500">
							Complete the application form to submit your purchase request
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						{/* Main Form */}
						<div className="xl:col-span-2 space-y-8">
							{/* Personal Information */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Personal Information
										</CardTitle>
										<CardDescription>
											Your basic information for the purchase application
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										{error && (
											<Alert variant="destructive">
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="fullName"
													className="text-sm font-semibold text-gray-700"
												>
													Full Name *
												</Label>
												<Input
													id="fullName"
													value={formData.fullName}
													onChange={(e) =>
														setFormData({
															...formData,
															fullName: e.target.value,
														})
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="occupation"
													className="text-sm font-semibold text-gray-700"
												>
													Occupation *
												</Label>
												<Input
													id="occupation"
													value={formData.occupation}
													onChange={(e) =>
														setFormData({
															...formData,
															occupation: e.target.value,
														})
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="phone"
													className="text-sm font-semibold text-gray-700"
												>
													Phone Number *
												</Label>
												<Input
													id="phone"
													value={formData.phone}
													onChange={(e) =>
														setFormData({ ...formData, phone: e.target.value })
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="email"
													className="text-sm font-semibold text-gray-700"
												>
													Email Address *
												</Label>
												<Input
													id="email"
													type="email"
													value={formData.email}
													onChange={(e) =>
														setFormData({ ...formData, email: e.target.value })
													}
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													required
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="monthlyIncome"
												className="text-sm font-semibold text-gray-700"
											>
												Monthly Income (ETB) *
											</Label>
											<div className="relative">
												<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="monthlyIncome"
													type="number"
													placeholder="50000"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.monthlyIncome}
													onChange={(e) =>
														setFormData({
															...formData,
															monthlyIncome: e.target.value,
														})
													}
													required
												/>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Financial Information */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Financial Information
										</CardTitle>
										<CardDescription>
											Your financial details for the purchase
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="space-y-2">
											<Label
												htmlFor="downPayment"
												className="text-sm font-semibold text-gray-700"
											>
												Down Payment (ETB) *
											</Label>
											<div className="relative">
												<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="downPayment"
													type="number"
													placeholder="1000000"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.downPayment}
													onChange={(e) =>
														setFormData({
															...formData,
															downPayment: e.target.value,
														})
													}
													required
												/>
											</div>
										</div>

										<div className="space-y-4">
											<Label className="text-sm font-semibold text-gray-700">
												Financing Type *
											</Label>
											<RadioGroup
												value={formData.financingType}
												onValueChange={(value) =>
													setFormData({ ...formData, financingType: value })
												}
											>
												<div className="flex items-center space-x-3">
													<RadioGroupItem value="cash" id="cash" />
													<Label
														htmlFor="cash"
														className="flex-1 cursor-pointer"
													>
														<div className="p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-colors">
															<div className="flex items-center space-x-3">
																<DollarSign className="h-6 w-6 text-emerald-600" />
																<div>
																	<p className="font-semibold text-gray-900">
																		Cash Payment
																	</p>
																	<p className="text-sm text-gray-600">
																		Full payment in cash
																	</p>
																</div>
															</div>
														</div>
													</Label>
												</div>

												<div className="flex items-center space-x-3">
													<RadioGroupItem value="bank_loan" id="bank_loan" />
													<Label
														htmlFor="bank_loan"
														className="flex-1 cursor-pointer"
													>
														<div className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
															<div className="flex items-center space-x-3">
																<CreditCard className="h-6 w-6 text-blue-600" />
																<div>
																	<p className="font-semibold text-gray-900">
																		Bank Loan
																	</p>
																	<p className="text-sm text-gray-600">
																		Finance through bank mortgage
																	</p>
																</div>
															</div>
														</div>
													</Label>
												</div>

												<div className="flex items-center space-x-3">
													<RadioGroupItem
														value="installment"
														id="installment"
													/>
													<Label
														htmlFor="installment"
														className="flex-1 cursor-pointer"
													>
														<div className="p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors">
															<div className="flex items-center space-x-3">
																<Calendar className="h-6 w-6 text-purple-600" />
																<div>
																	<p className="font-semibold text-gray-900">
																		Installment Plan
																	</p>
																	<p className="text-sm text-gray-600">
																		Pay in monthly installments
																	</p>
																</div>
															</div>
														</div>
													</Label>
												</div>
											</RadioGroup>
										</div>

										{formData.financingType === "bank_loan" && (
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label
														htmlFor="bankName"
														className="text-sm font-semibold text-gray-700"
													>
														Bank Name
													</Label>
													<Input
														id="bankName"
														value={formData.bankName}
														onChange={(e) =>
															setFormData({
																...formData,
																bankName: e.target.value,
															})
														}
														className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														placeholder="e.g., Commercial Bank of Ethiopia"
													/>
												</div>
												<div className="space-y-2">
													<Label
														htmlFor="loanAmount"
														className="text-sm font-semibold text-gray-700"
													>
														Loan Amount (ETB)
													</Label>
													<Input
														id="loanAmount"
														type="number"
														value={formData.loanAmount}
														onChange={(e) =>
															setFormData({
																...formData,
																loanAmount: e.target.value,
															})
														}
														className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														placeholder="2500000"
													/>
												</div>
											</div>
										)}

										<div className="space-y-2">
											<Label
												htmlFor="intendedUse"
												className="text-sm font-semibold text-gray-700"
											>
												Intended Use
											</Label>
											<Select
												value={formData.intendedUse}
												onValueChange={(value) =>
													setFormData({ ...formData, intendedUse: value })
												}
											>
												<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="personal">
														Personal Residence
													</SelectItem>
													<SelectItem value="investment">
														Investment Property
													</SelectItem>
													<SelectItem value="business">Business Use</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2">
											<Label className="text-sm font-semibold text-gray-700">
												Preferred Closing Date
											</Label>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant="outline"
														className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
													>
														<Calendar className="mr-2 h-4 w-4" />
														{preferredDate
															? format(preferredDate, "PPP")
															: "Select preferred date"}
													</Button>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<CalendarComponent
														mode="single"
														selected={preferredDate}
														onSelect={setPreferredDate}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Emergency Contact & References */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Emergency Contact & References
										</CardTitle>
										<CardDescription>
											Contact information for verification
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="space-y-4">
											<h4 className="font-semibold text-gray-900">
												Emergency Contact
											</h4>
											<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
												<div className="space-y-2">
													<Label
														htmlFor="emergencyContactName"
														className="text-sm font-semibold text-gray-700"
													>
														Full Name *
													</Label>
													<Input
														id="emergencyContactName"
														value={formData.emergencyContactName}
														onChange={(e) =>
															setFormData({
																...formData,
																emergencyContactName: e.target.value,
															})
														}
														className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														required
													/>
												</div>
												<div className="space-y-2">
													<Label
														htmlFor="emergencyContactPhone"
														className="text-sm font-semibold text-gray-700"
													>
														Phone Number *
													</Label>
													<Input
														id="emergencyContactPhone"
														value={formData.emergencyContactPhone}
														onChange={(e) =>
															setFormData({
																...formData,
																emergencyContactPhone: e.target.value,
															})
														}
														className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														required
													/>
												</div>
												<div className="space-y-2">
													<Label
														htmlFor="emergencyContactRelation"
														className="text-sm font-semibold text-gray-700"
													>
														Relationship
													</Label>
													<Select
														value={formData.emergencyContactRelation}
														onValueChange={(value) =>
															setFormData({
																...formData,
																emergencyContactRelation: value,
															})
														}
													>
														<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
															<SelectValue placeholder="Select relationship" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="parent">Parent</SelectItem>
															<SelectItem value="sibling">Sibling</SelectItem>
															<SelectItem value="spouse">Spouse</SelectItem>
															<SelectItem value="friend">Friend</SelectItem>
															<SelectItem value="other">Other</SelectItem>
														</SelectContent>
													</Select>
												</div>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="additionalRequests"
												className="text-sm font-semibold text-gray-700"
											>
												Additional Requests or Comments
											</Label>
											<Textarea
												id="additionalRequests"
												placeholder="Any special requests, questions, or additional information..."
												className="min-h-20 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.additionalRequests}
												onChange={(e) =>
													setFormData({
														...formData,
														additionalRequests: e.target.value,
													})
												}
											/>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Purchase Type Selection */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1200"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Purchase Processing Method
										</CardTitle>
										<CardDescription>
											Choose how you'd like to complete the purchase agreement
										</CardDescription>
									</CardHeader>
									<CardContent>
										<RadioGroup
											value={formData.purchaseType}
											onValueChange={(value) =>
												setFormData({ ...formData, purchaseType: value })
											}
										>
											<div className="space-y-4">
												<div className="flex items-center space-x-3">
													<RadioGroupItem value="online" id="online" />
													<Label
														htmlFor="online"
														className="flex-1 cursor-pointer"
													>
														<div className="p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-colors">
															<div className="flex items-center space-x-3">
																<CreditCard className="h-6 w-6 text-emerald-600" />
																<div>
																	<p className="font-semibold text-gray-900">
																		Online Purchase Agreement
																	</p>
																	<p className="text-sm text-gray-600">
																		Complete everything digitally with online
																		payment
																	</p>
																	<p className="text-xs text-emerald-600 font-medium">
																		✓ Faster processing • ✓ Instant confirmation
																	</p>
																</div>
															</div>
														</div>
													</Label>
												</div>

												<div className="flex items-center space-x-3">
													<RadioGroupItem value="in-person" id="in-person" />
													<Label
														htmlFor="in-person"
														className="flex-1 cursor-pointer"
													>
														<div className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
															<div className="flex items-center space-x-3">
																<User className="h-6 w-6 text-blue-600" />
																<div>
																	<p className="font-semibold text-gray-900">
																		In-Person Meeting
																	</p>
																	<p className="text-sm text-gray-600">
																		Schedule a meeting with the property owner
																	</p>
																	<p className="text-xs text-blue-600 font-medium">
																		✓ Personal consultation • ✓ Property
																		inspection included
																	</p>
																</div>
															</div>
														</div>
													</Label>
												</div>
											</div>
										</RadioGroup>
									</CardContent>
								</Card>
							</div>

							{/* Terms and Conditions */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1500"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Terms and Conditions
										</CardTitle>
										<CardDescription>
											Please read and agree to the following
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
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
												I agree to the purchase terms and conditions, including
												the sale price of {data.unit.salePrice.toLocaleString()}{" "}
												ETB. I understand that providing false information may
												result in application rejection.
											</Label>
										</div>

										<div className="flex items-start space-x-3">
											<Checkbox
												id="agreeToInspection"
												checked={formData.agreeToInspection}
												onCheckedChange={(checked) =>
													setFormData({
														...formData,
														agreeToInspection: checked as boolean,
													})
												}
												className="mt-1"
											/>
											<Label
												htmlFor="agreeToInspection"
												className="text-sm text-gray-700 cursor-pointer leading-relaxed"
											>
												I consent to property inspection, title verification,
												and legal documentation review as required by the
												property owner for purchase approval.
											</Label>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Sidebar */}
						<div className="xl:col-span-1 space-y-8">
							{/* Application Summary */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Purchase Summary
										</CardTitle>
										<CardDescription>
											Review your purchase application
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
											<h4 className="font-semibold text-blue-800 mb-3">
												Property Details
											</h4>
											<div className="space-y-2 text-sm">
												<div className="flex justify-between">
													<span className="text-blue-700">Property:</span>
													<span className="text-blue-600 font-medium">
														{data.property.name}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-blue-700">Unit:</span>
													<span className="text-blue-600 font-medium">
														{data.unit.unitNumber}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-blue-700">Area:</span>
													<span className="text-blue-600 font-medium">
														{data.unit.area}
													</span>
												</div>
											</div>
										</div>

										<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
											<h4 className="font-semibold text-emerald-800 mb-3">
												Financial Summary
											</h4>
											<div className="space-y-2 text-sm">
												<div className="flex justify-between">
													<span className="text-emerald-700">Sale Price:</span>
													<span className="text-emerald-600 font-medium">
														{data.unit.salePrice.toLocaleString()} ETB
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-emerald-700">
														Price per Sqm:
													</span>
													<span className="text-emerald-600 font-medium">
														{data.unit.pricePerSqm.toLocaleString()} ETB
													</span>
												</div>
												{formData.downPayment && (
													<div className="flex justify-between">
														<span className="text-emerald-700">
															Down Payment:
														</span>
														<span className="text-emerald-600 font-medium">
															{parseFloat(
																formData.downPayment
															).toLocaleString()}{" "}
															ETB
														</span>
													</div>
												)}
											</div>
										</div>

										<div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
											<h4 className="font-semibold text-yellow-800 mb-2">
												Next Steps
											</h4>
											<div className="text-yellow-700 text-sm space-y-1">
												{formData.purchaseType === "online" ? (
													<>
														<p>• Application review (1-2 hours)</p>
														<p>• Digital purchase agreement</p>
														<p>• Online payment processing</p>
														<p>• Title transfer documentation</p>
													</>
												) : (
													<>
														<p>• Application review (1-2 hours)</p>
														<p>• Schedule in-person meeting</p>
														<p>• Property inspection and agreement signing</p>
														<p>• Payment and title transfer</p>
													</>
												)}
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1800"
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
									href={`/dashboard/tenant/properties/${params.id}/units/${params.unitId}`}
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
										<span>Submitting Application...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>Submit Purchase Application</span>
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
