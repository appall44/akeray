"use client";

import { useState } from "react";
import {
	FileText,
	ArrowLeft,
	Save,
	User,
	Building,
	DollarSign,
	Calendar,
	Send,
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AdminNewInvoicePage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [dueDate, setDueDate] = useState<Date>();
	const [formData, setFormData] = useState({
		tenantId: "",
		ownerId: "",
		propertyId: "",
		unitNumber: "",
		invoiceType: "rental",
		amount: "",
		description: "",
		vatIncluded: true,
		notes: "",
		sendImmediately: false,
	});
	const router = useRouter();
	const { toast } = useToast();

	// Mock data
	const tenants = [
		{
			id: "1",
			name: "አበበ ከበደ / Abebe Kebede",
			property: "Sunrise Apartments",
			unit: "4A",
			email: "abebe@email.com",
			phone: "+251911234567",
		},
		{
			id: "2",
			name: "ሳራ ለማ / Sara Lemma",
			property: "Green Valley Complex",
			unit: "2B",
			email: "sara@email.com",
			phone: "+251922345678",
		},
	];

	const owners = [
		{
			id: "1",
			name: "Mulugeta Assefa",
			businessName: "Akeray Properties",
			tinNumber: "0012345678",
		},
		{
			id: "2",
			name: "Sarah Johnson",
			businessName: "Green Valley Properties",
			tinNumber: "0087654321",
		},
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (
			!formData.tenantId ||
			!formData.ownerId ||
			!formData.amount ||
			!formData.description ||
			!dueDate
		) {
			setError("Please fill in all required fields");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "ደረሰኝ ተፈጠረ / Invoice Created Successfully!",
				description: `Invoice has been generated${
					formData.sendImmediately ? " and sent to tenant" : ""
				}.`,
			});
			router.push("/dashboard/admin/invoices");
		}, 1500);
	};

	const selectedTenant = tenants.find((t) => t.id === formData.tenantId);
	const selectedOwner = owners.find((o) => o.id === formData.ownerId);
	const vatAmount = formData.vatIncluded
		? Math.round(parseFloat(formData.amount || "0") * 0.15)
		: 0;
	const totalAmount = parseFloat(formData.amount || "0") + vatAmount;

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
							<Link href="/dashboard/admin/invoices">
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back to Invoices
							</Link>
						</Button>
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
							አዲስ ደረሰኝ ፍጠር / Create New Invoice
						</h1>
						<p className="text-lg text-gray-600">
							አዲስ ደረሰኝ ለተከራይ ይፍጠሩ / Generate a new invoice for tenant
						</p>
						<p className="text-sm text-gray-500">
							Create professional invoices with business details
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						{/* Main Form */}
						<div className="xl:col-span-2 space-y-8">
							{/* Invoice Details */}
							<div
								className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											የደረሰኝ ዝርዝር / Invoice Details
										</CardTitle>
										<CardDescription>
											መሰረታዊ የደረሰኝ መረጃ / Basic invoice information
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
													htmlFor="ownerId"
													className="text-sm font-semibold text-gray-700"
												>
													ባለቤት ይምረጡ / Select Owner *
												</Label>
												<Select
													value={formData.ownerId}
													onValueChange={(value) =>
														setFormData({ ...formData, ownerId: value })
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue placeholder="Choose owner" />
													</SelectTrigger>
													<SelectContent>
														{owners.map((owner) => (
															<SelectItem key={owner.id} value={owner.id}>
																<div className="flex flex-col">
																	<span className="font-medium">
																		{owner.name}
																	</span>
																	<span className="text-xs text-gray-500">
																		{owner.businessName} - TIN:{" "}
																		{owner.tinNumber}
																	</span>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="tenantId"
													className="text-sm font-semibold text-gray-700"
												>
													ተከራይ ይምረጡ / Select Tenant *
												</Label>
												<Select
													value={formData.tenantId}
													onValueChange={(value) =>
														setFormData({ ...formData, tenantId: value })
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue placeholder="Choose tenant" />
													</SelectTrigger>
													<SelectContent>
														{tenants.map((tenant) => (
															<SelectItem key={tenant.id} value={tenant.id}>
																<div className="flex flex-col">
																	<span className="font-medium">
																		{tenant.name}
																	</span>
																	<span className="text-xs text-gray-500">
																		{tenant.property} - Unit {tenant.unit}
																	</span>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="invoiceType"
													className="text-sm font-semibold text-gray-700"
												>
													የደረሰኝ አይነት / Invoice Type *
												</Label>
												<Select
													value={formData.invoiceType}
													onValueChange={(value) =>
														setFormData({ ...formData, invoiceType: value })
													}
												>
													<SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="rental">
															ወርሃዊ ክራይ / Monthly Rent
														</SelectItem>
														<SelectItem value="sale">
															የንብረት ሽያጭ / Property Sale
														</SelectItem>
														<SelectItem value="deposit">
															ተቀማጭ ገንዘብ / Security Deposit
														</SelectItem>
														<SelectItem value="utilities">
															መገልገያዎች / Utilities
														</SelectItem>
														<SelectItem value="maintenance">
															የጥገና ክፍያ / Maintenance Fee
														</SelectItem>
														<SelectItem value="other">ሌላ / Other</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="amount"
													className="text-sm font-semibold text-gray-700"
												>
													መጠን / Amount (ETB) *
												</Label>
												<div className="relative">
													<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
													<Input
														id="amount"
														type="number"
														placeholder="25000"
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
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="description"
												className="text-sm font-semibold text-gray-700"
											>
												መግለጫ / Description *
											</Label>
											<Input
												id="description"
												placeholder="e.g., Monthly rent for January 2025"
												className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
												value={formData.description}
												onChange={(e) =>
													setFormData({
														...formData,
														description: e.target.value,
													})
												}
												required
											/>
										</div>

										<div className="space-y-2">
											<Label className="text-sm font-semibold text-gray-700">
												የመክፈያ ቀን / Due Date *
											</Label>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant="outline"
														className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
													>
														<Calendar className="mr-2 h-4 w-4" />
														{dueDate
															? format(dueDate, "PPP")
															: "Select due date"}
													</Button>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<CalendarComponent
														mode="single"
														selected={dueDate}
														onSelect={setDueDate}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
										</div>

										<div className="flex items-center space-x-3">
											<Checkbox
												id="vatIncluded"
												checked={formData.vatIncluded}
												onCheckedChange={(checked) =>
													setFormData({
														...formData,
														vatIncluded: checked as boolean,
													})
												}
											/>
											<Label htmlFor="vatIncluded" className="text-sm">
												VAT ያካትት / Include VAT (15%)
											</Label>
										</div>

										<div className="flex items-center space-x-3">
											<Checkbox
												id="sendImmediately"
												checked={formData.sendImmediately}
												onCheckedChange={(checked) =>
													setFormData({
														...formData,
														sendImmediately: checked as boolean,
													})
												}
											/>
											<Label htmlFor="sendImmediately" className="text-sm">
												ወዲያውኑ ላክ / Send immediately after creation
											</Label>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="notes"
												className="text-sm font-semibold text-gray-700"
											>
												ተጨማሪ ማስታወሻዎች / Additional Notes
											</Label>
											<Textarea
												id="notes"
												placeholder="Any additional information for the invoice..."
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
						</div>

						{/* Sidebar */}
						<div className="xl:col-span-1 space-y-8">
							{/* Invoice Summary */}
							<div
								className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
								style={{ animationFillMode: "forwards" }}
							>
								<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
									<CardHeader>
										<CardTitle className="text-xl font-bold text-gray-900">
											የደረሰኝ ማጠቃለያ / Invoice Summary
										</CardTitle>
										<CardDescription>
											Review invoice details before creation
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										{selectedOwner && (
											<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
												<h4 className="font-semibold text-emerald-800 mb-2">
													ባለቤት / Owner
												</h4>
												<p className="text-emerald-700 font-medium">
													{selectedOwner.businessName}
												</p>
												<p className="text-emerald-600 text-sm">
													{selectedOwner.name} - TIN: {selectedOwner.tinNumber}
												</p>
											</div>
										)}

										{selectedTenant && (
											<div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
												<h4 className="font-semibold text-blue-800 mb-2">
													ተቀባይ / Recipient
												</h4>
												<p className="text-blue-700 font-medium">
													{selectedTenant.name}
												</p>
												<p className="text-blue-600 text-sm">
													{selectedTenant.property} - Unit {selectedTenant.unit}
												</p>
											</div>
										)}

										{formData.amount && (
											<div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
												<h4 className="font-semibold text-purple-800 mb-3">
													የመጠን ዝርዝር / Amount Breakdown
												</h4>
												<div className="space-y-2 text-sm">
													<div className="flex justify-between">
														<span className="text-purple-700">
															Base Amount:
														</span>
														<span className="text-purple-600 font-medium">
															{parseFloat(formData.amount).toLocaleString()} ETB
														</span>
													</div>
													{formData.vatIncluded && (
														<div className="flex justify-between">
															<span className="text-purple-700">
																VAT (15%):
															</span>
															<span className="text-purple-600 font-medium">
																{vatAmount.toLocaleString()} ETB
															</span>
														</div>
													)}
													<div className="border-t border-purple-200 pt-2">
														<div className="flex justify-between">
															<span className="text-purple-700 font-semibold">
																Total:
															</span>
															<span className="text-purple-600 font-bold text-lg">
																{totalAmount.toLocaleString()} ETB
															</span>
														</div>
													</div>
												</div>
											</div>
										)}

										{dueDate && (
											<div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
												<h4 className="font-semibold text-orange-800 mb-2">
													የመክፈያ ቀን / Due Date
												</h4>
												<p className="text-orange-700 font-medium">
													{format(dueDate, "PPP")}
												</p>
												<p className="text-orange-600 text-sm">
													{Math.ceil(
														(dueDate.getTime() - new Date().getTime()) /
															(1000 * 60 * 60 * 24)
													)}{" "}
													days from now
												</p>
											</div>
										)}
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
								<Link href="/dashboard/admin/invoices">ተወው / Cancel</Link>
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>በመፍጠር ላይ... / Creating...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<Save className="h-5 w-5" />
										<span>
											{formData.sendImmediately
												? "ፍጠር እና ላክ / Create & Send"
												: "ደረሰኝ ፍጠር / Create Invoice"}
										</span>
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
