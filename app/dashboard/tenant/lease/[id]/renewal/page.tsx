"use client";

import { useState } from "react";
import {
	FileText,
	ArrowLeft,
	Save,
	Calendar,
	DollarSign,
	Building,
	User,
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

// Mock lease data
const getLeaseData = (leaseId: string) => {
	const leases = [
		{
			id: "LSE-001",
			property: {
				name: "Sunrise Apartments",
				address: "Bole Road, Addis Ababa",
			},
			unit: { name: "Unit 3B" },
			currentRent: 18000,
			currentDeposit: 36000,
			currentEndDate: "2024-12-31",
			landlord: {
				name: "Mulugeta Assefa",
				phone: "+251911123456",
				email: "mulugeta@akeray.et",
			},
		},
		{
			id: "LSE-002",
			property: {
				name: "Green Valley Villa",
				address: "Kazanchis, Addis Ababa",
			},
			unit: null,
			currentRent: 35000,
			currentDeposit: 70000,
			currentEndDate: "2025-05-31",
			landlord: {
				name: "Sarah Johnson",
				phone: "+251922345678",
				email: "sarah@email.com",
			},
		},
		{
			id: "LSE-003",
			property: { name: "City Center Complex", address: "Piassa, Addis Ababa" },
			unit: { name: "Unit 2C" },
			currentRent: 25000,
			currentDeposit: 50000,
			currentEndDate: "2025-02-28",
			landlord: {
				name: "Ahmed Hassan",
				phone: "+251933456789",
				email: "ahmed@email.com",
			},
		},
	];
	return leases.find((l) => l.id === leaseId) || leases[0];
};

export default function LeaseRenewalPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [newStartDate, setNewStartDate] = useState<Date>();
	const [newEndDate, setNewEndDate] = useState<Date>();

	const lease = getLeaseData(params.id as string);

	const [formData, setFormData] = useState({
		renewalDuration: "12",
		proposedRent: lease.currentRent.toString(),
		proposedDeposit: lease.currentDeposit.toString(),
		renewalReason: "",
		specialRequests: "",
		agreeToTerms: false,
		agreeToInspection: false,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (
			!formData.renewalDuration ||
			!formData.proposedRent ||
			!newStartDate ||
			!newEndDate
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
				title: "Renewal Request Submitted!",
				description: `Your lease renewal request for ${lease.property.name}${
					lease.unit ? ` - ${lease.unit.name}` : ""
				} has been submitted successfully.`,
			});
			router.push("/dashboard/tenant/lease");
		}, 2000);
	};

	const calculateNewEndDate = (startDate: Date, duration: string) => {
		const months = parseInt(duration);
		const endDate = new Date(startDate);
		endDate.setMonth(endDate.getMonth() + months);
		return endDate;
	};

	const handleStartDateChange = (date: Date | undefined) => {
		if (date) {
			setNewStartDate(date);
			const endDate = calculateNewEndDate(date, formData.renewalDuration);
			setNewEndDate(endDate);
		}
	};

	const handleDurationChange = (duration: string) => {
		setFormData({ ...formData, renewalDuration: duration });
		if (newStartDate) {
			const endDate = calculateNewEndDate(newStartDate, duration);
			setNewEndDate(endDate);
		}
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
							<Link href="/dashboard/tenant/lease">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Lease
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Lease Renewal Request
						</h1>
						<p className="text-lg text-gray-600">
							Request to renew your lease for {lease.property.name}
							{lease.unit ? ` - ${lease.unit.name}` : ""}
						</p>
						<p className="text-sm text-gray-500">
							Submit your renewal preferences and terms
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						{/* Main Form */}
						<div className="xl:col-span-2 space-y-8">
							{/* Current Lease Information */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="flex items-center space-x-3 text-xl">
											<Building className="h-6 w-6 text-emerald-600" />
											<span>Current Lease Information</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Property
												</p>
												<p className="text-lg font-semibold text-gray-900">
													{lease.property.name}
												</p>
												<p className="text-sm text-gray-600">
													{lease.unit ? lease.unit.name : "Entire Property"}
												</p>
											</div>
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Current Rent
												</p>
												<p className="text-lg font-bold text-emerald-600">
													{lease.currentRent.toLocaleString()} ETB
												</p>
												<p className="text-sm text-gray-600">per month</p>
											</div>
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Current End Date
												</p>
												<p className="text-lg font-semibold text-gray-900">
													{new Date(lease.currentEndDate).toLocaleDateString()}
												</p>
												<p className="text-sm text-gray-600">expires soon</p>
											</div>
											<div className="space-y-2">
												<p className="text-sm font-medium text-gray-500">
													Security Deposit
												</p>
												<p className="text-lg font-semibold text-gray-900">
													{lease.currentDeposit.toLocaleString()} ETB
												</p>
												<p className="text-sm text-gray-600">current deposit</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Renewal Terms */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Renewal Terms
										</CardTitle>
										<CardDescription>
											Specify your renewal preferences
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
													htmlFor="renewalDuration"
													className="text-sm font-semibold text-gray-700"
												>
													Renewal Duration *
												</Label>
												<Select
													value={formData.renewalDuration}
													onValueChange={handleDurationChange}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="6">6 months</SelectItem>
														<SelectItem value="12">12 months</SelectItem>
														<SelectItem value="18">18 months</SelectItem>
														<SelectItem value="24">24 months</SelectItem>
														<SelectItem value="36">36 months</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="proposedRent"
													className="text-sm font-semibold text-gray-700"
												>
													Proposed Monthly Rent (ETB) *
												</Label>
												<div className="relative">
													<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
													<Input
														id="proposedRent"
														type="number"
														placeholder="18000"
														className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														value={formData.proposedRent}
														onChange={(e) =>
															setFormData({
																...formData,
																proposedRent: e.target.value,
															})
														}
														required
													/>
												</div>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label className="text-sm font-semibold text-gray-700">
													New Start Date *
												</Label>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant="outline"
															className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
														>
															<Calendar className="mr-2 h-4 w-4" />
															{newStartDate
																? format(newStartDate, "PPP")
																: "Select start date"}
														</Button>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0">
														<CalendarComponent
															mode="single"
															selected={newStartDate}
															onSelect={handleStartDateChange}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
											</div>

											<div className="space-y-2">
												<Label className="text-sm font-semibold text-gray-700">
													New End Date
												</Label>
												<div className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50 flex items-center px-3">
													<Calendar className="mr-2 h-4 w-4 text-gray-400" />
													<span className="text-gray-600">
														{newEndDate
															? format(newEndDate, "PPP")
															: "Auto-calculated"}
													</span>
												</div>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="proposedDeposit"
												className="text-sm font-semibold text-gray-700"
											>
												Proposed Security Deposit (ETB)
											</Label>
											<div className="relative">
												<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="proposedDeposit"
													type="number"
													placeholder="36000"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.proposedDeposit}
													onChange={(e) =>
														setFormData({
															...formData,
															proposedDeposit: e.target.value,
														})
													}
												/>
											</div>
											<p className="text-xs text-gray-500">
												Leave blank to keep current deposit amount
											</p>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="renewalReason"
												className="text-sm font-semibold text-gray-700"
											>
												Reason for Renewal
											</Label>
											<Textarea
												id="renewalReason"
												placeholder="Why would you like to renew your lease? (e.g., satisfied with property, convenient location, etc.)"
												className="min-h-24 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.renewalReason}
												onChange={(e) =>
													setFormData({
														...formData,
														renewalReason: e.target.value,
													})
												}
											/>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="specialRequests"
												className="text-sm font-semibold text-gray-700"
											>
												Special Requests or Changes
											</Label>
											<Textarea
												id="specialRequests"
												placeholder="Any special requests, modifications, or changes you'd like for the new lease term..."
												className="min-h-24 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.specialRequests}
												onChange={(e) =>
													setFormData({
														...formData,
														specialRequests: e.target.value,
													})
												}
											/>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Terms and Agreements */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Terms and Agreements
										</CardTitle>
										<CardDescription>
											Please read and agree to the renewal terms
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
												I agree to the lease renewal terms and understand that
												this is a request subject to landlord approval. I
												acknowledge that the proposed terms may be subject to
												negotiation and final approval by the property owner.
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
												I agree to allow property inspection before lease
												renewal and understand that any damages beyond normal
												wear and tear may affect the renewal terms or require
												repair before renewal approval.
											</Label>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Sidebar */}
						<div className="xl:col-span-1 space-y-8">
							{/* Renewal Summary */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											Renewal Summary
										</CardTitle>
										<CardDescription>
											Review your renewal request
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
														{lease.property.name}
													</span>
												</div>
												{lease.unit && (
													<div className="flex justify-between">
														<span className="text-blue-700">Unit:</span>
														<span className="text-blue-600 font-medium">
															{lease.unit.name}
														</span>
													</div>
												)}
												<div className="flex justify-between">
													<span className="text-blue-700">Current End:</span>
													<span className="text-blue-600 font-medium">
														{new Date(
															lease.currentEndDate
														).toLocaleDateString()}
													</span>
												</div>
											</div>
										</div>

										<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
											<h4 className="font-semibold text-emerald-800 mb-3">
												Proposed Terms
											</h4>
											<div className="space-y-2 text-sm">
												<div className="flex justify-between">
													<span className="text-emerald-700">Duration:</span>
													<span className="text-emerald-600 font-medium">
														{formData.renewalDuration} months
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-emerald-700">
														Monthly Rent:
													</span>
													<span className="text-emerald-600 font-medium">
														{parseFloat(
															formData.proposedRent || "0"
														).toLocaleString()}{" "}
														ETB
													</span>
												</div>
												{newStartDate && (
													<div className="flex justify-between">
														<span className="text-emerald-700">New Start:</span>
														<span className="text-emerald-600 font-medium">
															{format(newStartDate, "PPP")}
														</span>
													</div>
												)}
												{newEndDate && (
													<div className="flex justify-between">
														<span className="text-emerald-700">New End:</span>
														<span className="text-emerald-600 font-medium">
															{format(newEndDate, "PPP")}
														</span>
													</div>
												)}
											</div>
										</div>

										<div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
											<h4 className="font-semibold text-purple-800 mb-2">
												Rent Comparison
											</h4>
											<div className="space-y-2 text-sm">
												<div className="flex justify-between">
													<span className="text-purple-700">Current:</span>
													<span className="text-purple-600">
														{lease.currentRent.toLocaleString()} ETB
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-purple-700">Proposed:</span>
													<span className="text-purple-600">
														{parseFloat(
															formData.proposedRent || "0"
														).toLocaleString()}{" "}
														ETB
													</span>
												</div>
												<div className="flex justify-between border-t border-purple-200 pt-2">
													<span className="text-purple-700 font-semibold">
														Difference:
													</span>
													<span
														className={`font-semibold ${
															parseFloat(formData.proposedRent || "0") >
															lease.currentRent
																? "text-red-600"
																: parseFloat(formData.proposedRent || "0") <
																  lease.currentRent
																? "text-emerald-600"
																: "text-purple-600"
														}`}
													>
														{parseFloat(formData.proposedRent || "0") ===
														lease.currentRent
															? "No change"
															: `${
																	parseFloat(formData.proposedRent || "0") >
																	lease.currentRent
																		? "+"
																		: ""
															  }${(
																	parseFloat(formData.proposedRent || "0") -
																	lease.currentRent
															  ).toLocaleString()} ETB`}
													</span>
												</div>
											</div>
										</div>

										<div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
											<h4 className="font-semibold text-yellow-800 mb-2">
												Next Steps
											</h4>
											<div className="text-yellow-700 text-sm space-y-1">
												<p>• Request submitted to landlord</p>
												<p>• Review and negotiation period</p>
												<p>• Property inspection (if required)</p>
												<p>• New lease agreement signing</p>
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
								<Link href="/dashboard/tenant/lease">Cancel</Link>
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Submitting Request...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>Submit Renewal Request</span>
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
