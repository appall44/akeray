"use client";

import { useState } from "react";
import {
	ArrowLeft,
	Save,
	Wrench,
	User,
	Building,
	AlertTriangle,
	Calendar,
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
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function EditMaintenanceRequestPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [scheduledDate, setScheduledDate] = useState<Date>(
		new Date("2024-01-12")
	);

	// Mock existing maintenance data
	const [formData, setFormData] = useState({
		title: "Leaking Faucet in Kitchen",
		description:
			"The kitchen faucet has been leaking for the past week. Water is dripping constantly from the base of the faucet.",
		category: "plumbing",
		priority: "medium",
		tenantId: "1",
		propertyId: "1",
		unitNumber: "4A",
		assignedTo: "1",
		estimatedCost: "500",
		actualCost: "",
		status: "in_progress",
		accessInstructions:
			"Unit is on the 4th floor. Tenant will be available between 10 AM - 2 PM.",
		notes:
			"Tenant reports that the leak is getting worse. Priority should be medium to high.",
	});

	// Mock data
	const tenants = [
		{
			id: "1",
			name: "አበበ ከበደ / Abebe Kebede",
			property: "Sunrise Apartments",
			unit: "4A",
		},
		{
			id: "2",
			name: "ሳራ ለማ / Sara Lemma",
			property: "Green Valley Complex",
			unit: "2B",
		},
	];

	const technicians = [
		{ id: "1", name: "Mike Wilson", specialty: "Plumbing & HVAC" },
		{ id: "2", name: "Tom Anderson", specialty: "Electrical & General" },
		{ id: "3", name: "Sarah Johnson", specialty: "General Maintenance" },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "የጥገና ጥያቄ ተዘምኗል / Maintenance Request Updated",
				description: "Maintenance request has been updated successfully",
			});
			router.push(`/dashboard/admin/maintenance/${params.id}`);
		}, 1500);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const selectedTenant = tenants.find((t) => t.id === formData.tenantId);

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
							<Link href={`/dashboard/admin/maintenance/${params.id}`}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back
							</Link>
						</Button>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								የጥገና ጥያቄ አርም / Edit Maintenance Request
							</h1>
							<p className="text-gray-600 mt-1">
								የጥገና ጥያቄ መረጃ ያዘምኑ / Update maintenance request information
							</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Request Details */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Wrench className="h-5 w-5 text-emerald-600" />
									<span>የጥያቄ ዝርዝር / Request Details</span>
								</CardTitle>
								<CardDescription>
									የጥገና ጥያቄ መረጃ / Maintenance request information
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="title">ርዕስ / Title *</Label>
									<Input
										id="title"
										value={formData.title}
										onChange={(e) => handleInputChange("title", e.target.value)}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="description">መግለጫ / Description *</Label>
									<Textarea
										id="description"
										value={formData.description}
										onChange={(e) =>
											handleInputChange("description", e.target.value)
										}
										rows={4}
										required
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="category">ምድብ / Category *</Label>
										<Select
											value={formData.category}
											onValueChange={(value) =>
												handleInputChange("category", value)
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="plumbing">ቧንቧ / Plumbing</SelectItem>
												<SelectItem value="electrical">
													ኤሌክትሪክ / Electrical
												</SelectItem>
												<SelectItem value="hvac">HVAC</SelectItem>
												<SelectItem value="general">አጠቃላይ / General</SelectItem>
												<SelectItem value="appliance">
													መሳሪያዎች / Appliances
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="priority">ቅድሚያ / Priority *</Label>
										<Select
											value={formData.priority}
											onValueChange={(value) =>
												handleInputChange("priority", value)
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="low">ዝቅተኛ / Low</SelectItem>
												<SelectItem value="medium">መካከለኛ / Medium</SelectItem>
												<SelectItem value="high">ከፍተኛ / High</SelectItem>
												<SelectItem value="emergency">
													አደጋ / Emergency
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="status">ሁኔታ / Status *</Label>
									<Select
										value={formData.status}
										onValueChange={(value) =>
											handleInputChange("status", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="open">ክፍት / Open</SelectItem>
											<SelectItem value="in_progress">
												በሂደት ላይ / In Progress
											</SelectItem>
											<SelectItem value="completed">
												ተጠናቋል / Completed
											</SelectItem>
											<SelectItem value="cancelled">
												ተሰርዟል / Cancelled
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						{/* Assignment & Costs */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Building className="h-5 w-5 text-blue-600" />
									<span>ምደባ እና ወጪዎች / Assignment & Costs</span>
								</CardTitle>
								<CardDescription>
									ተጠሪ ሰው እና ወጪ ዝርዝር / Responsible person and cost details
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="assignedTo">ተመድቦ / Assigned To</Label>
									<Select
										value={formData.assignedTo}
										onValueChange={(value) =>
											handleInputChange("assignedTo", value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select technician" />
										</SelectTrigger>
										<SelectContent>
											{technicians.map((tech) => (
												<SelectItem key={tech.id} value={tech.id}>
													<div className="flex flex-col">
														<span>{tech.name}</span>
														<span className="text-xs text-gray-500">
															{tech.specialty}
														</span>
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label>የታቀደ ቀን / Scheduled Date</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className="w-full justify-start text-left font-normal"
											>
												<Calendar className="mr-2 h-4 w-4" />
												{scheduledDate
													? format(scheduledDate, "PPP")
													: "Pick a date"}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<CalendarComponent
												mode="single"
												selected={scheduledDate}
												onSelect={setScheduledDate}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="estimatedCost">
											የተገመተ ወጪ / Estimated Cost (ETB)
										</Label>
										<Input
											id="estimatedCost"
											type="number"
											value={formData.estimatedCost}
											onChange={(e) =>
												handleInputChange("estimatedCost", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="actualCost">
											ትክክለኛ ወጪ / Actual Cost (ETB)
										</Label>
										<Input
											id="actualCost"
											type="number"
											value={formData.actualCost}
											onChange={(e) =>
												handleInputChange("actualCost", e.target.value)
											}
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Additional Information */}
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<AlertTriangle className="h-5 w-5 text-orange-600" />
									<span>ተጨማሪ መረጃ / Additional Information</span>
								</CardTitle>
								<CardDescription>
									የመዳረሻ መመሪያዎች እና ማስታወሻዎች / Access instructions and notes
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="accessInstructions">
										የመዳረሻ መመሪያዎች / Access Instructions
									</Label>
									<Textarea
										id="accessInstructions"
										value={formData.accessInstructions}
										onChange={(e) =>
											handleInputChange("accessInstructions", e.target.value)
										}
										rows={3}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="notes">ማስታወሻዎች / Notes</Label>
									<Textarea
										id="notes"
										value={formData.notes}
										onChange={(e) => handleInputChange("notes", e.target.value)}
										rows={3}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end space-x-4">
						<Button variant="outline" type="button" asChild>
							<Link href={`/dashboard/admin/maintenance/${params.id}`}>
								ተወው / Cancel
							</Link>
						</Button>
						<Button
							type="submit"
							className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
									<span>በማዘመን ላይ... / Updating...</span>
								</div>
							) : (
								<div className="flex items-center space-x-2">
									<Save className="h-4 w-4" />
									<span>ለውጦች ቀምጥ / Save Changes</span>
								</div>
							)}
						</Button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
