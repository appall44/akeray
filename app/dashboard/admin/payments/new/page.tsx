"use client";

import { useState } from "react";
import {
	ArrowLeft,
	Save,
	CreditCard,
	User,
	Building,
	Calendar,
	DollarSign,
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function RecordPaymentPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [paymentDate, setPaymentDate] = useState<Date>(new Date());
	const [formData, setFormData] = useState({
		tenantId: "",
		propertyId: "",
		unitNumber: "",
		paymentType: "",
		amount: "",
		paymentMethod: "",
		referenceNumber: "",
		notes: "",
		lateFee: "",
		discount: "",
	});
	const router = useRouter();
	const { toast } = useToast();

	// Mock data - in real app, fetch from API
	const tenants = [
		{
			id: "1",
			name: "አበበ ከበደ / Abebe Kebede",
			property: "Sunrise Apartments",
			unit: "4A",
			dueAmount: 15000,
		},
		{
			id: "2",
			name: "ሳራ ለማ / Sara Lemma",
			property: "Green Valley Complex",
			unit: "2B",
			dueAmount: 18000,
		},
		{
			id: "3",
			name: "ሙሉጌታ አሰፋ / Mulugeta Assefa",
			property: "City Center Plaza",
			unit: "1C",
			dueAmount: 22000,
		},
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "ክፍያ ተመዝግቧል / Payment Recorded Successfully",
				description: `Payment of ${formData.amount} ETB has been recorded`,
			});
			router.push("/dashboard/admin/payments");
		}, 1500);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const selectedTenant = tenants.find((t) => t.id === formData.tenantId);

	// Auto-fill property and unit when tenant is selected
	const handleTenantChange = (tenantId: string) => {
		const tenant = tenants.find((t) => t.id === tenantId);
		if (tenant) {
			setFormData((prev) => ({
				...prev,
				tenantId,
				propertyId: tenant.property,
				unitNumber: tenant.unit,
				amount: tenant.dueAmount.toString(),
			}));
		}
	};

	const calculateTotal = () => {
		const amount = parseFloat(formData.amount) || 0;
		const lateFee = parseFloat(formData.lateFee) || 0;
		const discount = parseFloat(formData.discount) || 0;
		return amount + lateFee - discount;
	};

	return (
		<DashboardLayout
			userRole="admin"
			userName="አስተዳዳሪ አበበ / Admin Abebe"
			userEmail="admin@akeray.et"
		>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Button variant="outline" size="sm" asChild>
							<Link href="/dashboard/admin/payments">
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back
							</Link>
						</Button>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								ክፍያ መዝግብ / Record Payment
							</h1>
							<p className="text-gray-600 mt-1">
								አዲስ ክፍያ ይመዝግቡ / Record a new payment transaction
							</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Payment Details */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<CreditCard className="h-5 w-5 text-emerald-600" />
									<span>የክፍያ ዝርዝር / Payment Details</span>
								</CardTitle>
								<CardDescription>
									የክፍያ መረጃ ያስገቡ / Enter payment information
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="tenantId">ተከራይ / Tenant *</Label>
									<Select
										value={formData.tenantId}
										onValueChange={handleTenantChange}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select tenant" />
										</SelectTrigger>
										<SelectContent>
											{tenants.map((tenant) => (
												<SelectItem key={tenant.id} value={tenant.id}>
													<div className="flex flex-col">
														<span>{tenant.name}</span>
														<span className="text-xs text-gray-500">
															{tenant.property} - Unit {tenant.unit}
														</span>
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{selectedTenant && (
									<div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div>
												<p className="font-medium text-gray-700">
													ንብረት / Property:
												</p>
												<p className="text-gray-600">
													{selectedTenant.property}
												</p>
											</div>
											<div>
												<p className="font-medium text-gray-700">ክፍል / Unit:</p>
												<p className="text-gray-600">{selectedTenant.unit}</p>
											</div>
											<div>
												<p className="font-medium text-gray-700">
													የሚገባ ክፍያ / Due Amount:
												</p>
												<p className="text-emerald-600 font-bold">
													{selectedTenant.dueAmount.toLocaleString()} ETB
												</p>
											</div>
										</div>
									</div>
								)}

								<div className="space-y-2">
									<Label htmlFor="paymentType">
										የክፍያ አይነት / Payment Type *
									</Label>
									<Select
										value={formData.paymentType}
										onValueChange={(value) =>
											handleInputChange("paymentType", value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select payment type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="rent">
												ወርሃዊ ክራይ / Monthly Rent
											</SelectItem>
											<SelectItem value="deposit">
												ተቀማጭ ገንዘብ / Security Deposit
											</SelectItem>
											<SelectItem value="utilities">
												መገልገያዎች / Utilities
											</SelectItem>
											<SelectItem value="maintenance">
												ጥገና / Maintenance
											</SelectItem>
											<SelectItem value="other">ሌላ / Other</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label>የክፍያ ቀን / Payment Date *</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className="w-full justify-start text-left font-normal"
											>
												<Calendar className="mr-2 h-4 w-4" />
												{paymentDate
													? format(paymentDate, "PPP")
													: "Pick a date"}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<CalendarComponent
												mode="single"
												selected={paymentDate}
												onSelect={setPaymentDate}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>
							</CardContent>
						</Card>

						{/* Amount & Method */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<DollarSign className="h-5 w-5 text-purple-600" />
									<span>መጠን እና ዘዴ / Amount & Method</span>
								</CardTitle>
								<CardDescription>
									የክፍያ መጠን እና ዘዴ / Payment amount and method
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="amount">
										መሰረታዊ መጠን / Base Amount (ETB) *
									</Label>
									<Input
										id="amount"
										type="number"
										value={formData.amount}
										onChange={(e) =>
											handleInputChange("amount", e.target.value)
										}
										placeholder="15000"
										required
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="lateFee">
											የዘገየ ክፍያ ቅጣት / Late Fee (ETB)
										</Label>
										<Input
											id="lateFee"
											type="number"
											value={formData.lateFee}
											onChange={(e) =>
												handleInputChange("lateFee", e.target.value)
											}
											placeholder="0"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="discount">ቅናش / Discount (ETB)</Label>
										<Input
											id="discount"
											type="number"
											value={formData.discount}
											onChange={(e) =>
												handleInputChange("discount", e.target.value)
											}
											placeholder="0"
										/>
									</div>
								</div>

								<div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
									<div className="flex justify-between items-center">
										<span className="font-medium text-gray-700">
											ጠቅላላ መጠን / Total Amount:
										</span>
										<span className="text-2xl font-bold text-emerald-600">
											{calculateTotal().toLocaleString()} ETB
										</span>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="paymentMethod">
										የክፍያ ዘዴ / Payment Method *
									</Label>
									<Select
										value={formData.paymentMethod}
										onValueChange={(value) =>
											handleInputChange("paymentMethod", value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select payment method" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="cash">ጥሬ ገንዘብ / Cash</SelectItem>
											<SelectItem value="bank_transfer">
												የባንክ ዝውውር / Bank Transfer
											</SelectItem>
											<SelectItem value="mobile_money">
												ሞባይል ገንዘብ / Mobile Money
											</SelectItem>
											<SelectItem value="check">ቼክ / Check</SelectItem>
											<SelectItem value="online">
												ኦንላይን / Online Payment
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="referenceNumber">
										ማጣቀሻ ቁጥር / Reference Number
									</Label>
									<Input
										id="referenceNumber"
										value={formData.referenceNumber}
										onChange={(e) =>
											handleInputChange("referenceNumber", e.target.value)
										}
										placeholder="Transaction reference number"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="notes">ማስታወሻዎች / Notes</Label>
									<Textarea
										id="notes"
										value={formData.notes}
										onChange={(e) => handleInputChange("notes", e.target.value)}
										placeholder="Additional notes about the payment..."
										rows={3}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end space-x-4">
						<Button variant="outline" type="button" asChild>
							<Link href="/dashboard/admin/payments">ተወው / Cancel</Link>
						</Button>
						<Button
							type="submit"
							className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
									<span>በመመዝገብ ላይ... / Recording...</span>
								</div>
							) : (
								<div className="flex items-center space-x-2">
									<Save className="h-4 w-4" />
									<span>ክፍያ መዝግብ / Record Payment</span>
								</div>
							)}
						</Button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
