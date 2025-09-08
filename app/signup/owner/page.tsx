"use client";

import { useState } from "react";
import {
	Building2,
	Upload,
	MapPin,
	Phone,
	Mail,
	User,
	FileText,
	CheckCircle,
	ArrowLeft,
	ArrowRight,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const ownerAgreements = [
	"I agree not to rent my property outside the Akeray system for 3 weeks after listing, unless no suitable tenant is found through the platform.",
	"I understand that I am free to sell my property at any time without restrictions from Akeray.",
	"I commit to providing accurate and up-to-date information about my property, including photos, descriptions, and pricing.",
	"I agree to respond to tenant inquiries within 24 hours during business days.",
	"I will maintain my property in good condition and address maintenance issues promptly.",
	"I understand that Akeray will charge a service fee for successful tenant placements and ongoing management services.",
	"I agree to comply with all local housing laws and regulations in Ethiopia.",
	"I consent to background verification of my ownership documents and identity for platform security.",
];

export default function OwnerSignupPage() {
	const [formData, setFormData] = useState({
		fullName: "",
		fatherName: "",
		idNumber: "",
		phone: "",
		email: "",
		password: "",
		confirmPassword: "",
		location: "",
		googleMapLink: "",
		ownershipProof: null as File | null,
		agreementsAccepted: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFormData({ ...formData, ownershipProof: file });
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Validation
		if (
			!formData.fullName ||
			!formData.fatherName ||
			!formData.idNumber ||
			!formData.phone ||
			!formData.password
		) {
			setError("Please fill in all required fields");
			setIsLoading(false);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (!formData.phone.startsWith("+251")) {
			setError("Phone number must start with +251");
			setIsLoading(false);
			return;
		}

		if (!formData.ownershipProof) {
			setError("Please upload ownership proof document");
			setIsLoading(false);
			return;
		}

		if (!formData.agreementsAccepted) {
			setError("Please accept all agreements to continue");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "Registration Successful!",
				description:
					"Your application has been submitted for review. You will receive SMS and email confirmation shortly.",
			});
			router.push("/signup/approval-wait");
		}, 2000);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 px-4">
			<div className="container mx-auto max-w-4xl">
				{/* Header */}
				<div className="text-center mb-8 animate-in fade-in duration-1000">
					<div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-600 via-blue-600 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 relative">
						<Building2 className="h-10 w-10 text-white" />
						<div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
							<span className="text-xs font-bold text-gray-800">A</span>
						</div>
					</div>
					<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
						Become a Property Owner
					</h1>
					<p className="text-lg text-gray-600 mb-2">
						Join Ethiopia's leading property management platform
					</p>
					<p className="text-sm text-gray-500">
						Start earning from your properties today
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Form */}
					<div className="lg:col-span-2">
						<Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
							<CardHeader>
								<CardTitle className="text-2xl font-bold text-gray-900">
									Owner Registration Form
								</CardTitle>
								<CardDescription className="text-gray-600">
									Please provide accurate information for account verification
								</CardDescription>
							</CardHeader>
							<CardContent>
								{error && (
									<Alert variant="destructive" className="mb-6">
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}

								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Personal Information */}
									<div className="space-y-4">
										<h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
											Personal Information
										</h3>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="fullName"
													className="text-sm font-semibold text-gray-700"
												>
													Full Name *
												</Label>
												<div className="relative">
													<User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
													<Input
														id="fullName"
														placeholder="Enter your full name"
														className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														value={formData.fullName}
														onChange={(e) =>
															setFormData({
																...formData,
																fullName: e.target.value,
															})
														}
														required
													/>
												</div>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="fatherName"
													className="text-sm font-semibold text-gray-700"
												>
													Father's Name *
												</Label>
												<div className="relative">
													<User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
													<Input
														id="fatherName"
														placeholder="Enter father's name"
														className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														value={formData.fatherName}
														onChange={(e) =>
															setFormData({
																...formData,
																fatherName: e.target.value,
															})
														}
														required
													/>
												</div>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="idNumber"
												className="text-sm font-semibold text-gray-700"
											>
												ID Number *
											</Label>
											<div className="relative">
												<FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="idNumber"
													placeholder="Enter your ID number"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.idNumber}
													onChange={(e) =>
														setFormData({
															...formData,
															idNumber: e.target.value,
														})
													}
													required
												/>
											</div>
										</div>
									</div>

									{/* Contact Information */}
									<div className="space-y-4">
										<h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
											Contact Information
										</h3>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="phone"
													className="text-sm font-semibold text-gray-700"
												>
													Phone Number *
												</Label>
												<div className="relative">
													<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
													<Input
														id="phone"
														placeholder="+251911234567"
														className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														value={formData.phone}
														onChange={(e) =>
															setFormData({
																...formData,
																phone: e.target.value,
															})
														}
														required
													/>
												</div>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="email"
													className="text-sm font-semibold text-gray-700"
												>
													Email Address (Optional)
												</Label>
												<div className="relative">
													<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
													<Input
														id="email"
														type="email"
														placeholder="your.email@example.com"
														className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
														value={formData.email}
														onChange={(e) =>
															setFormData({
																...formData,
																email: e.target.value,
															})
														}
													/>
												</div>
											</div>
										</div>
									</div>

									{/* Location Information */}
									<div className="space-y-4">
										<h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
											Location Information
										</h3>

										<div className="space-y-2">
											<Label
												htmlFor="location"
												className="text-sm font-semibold text-gray-700"
											>
												Property Area/Location *
											</Label>
											<div className="relative">
												<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="location"
													placeholder="e.g., Bole, Kazanchis, Piassa"
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.location}
													onChange={(e) =>
														setFormData({
															...formData,
															location: e.target.value,
														})
													}
													required
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="googleMapLink"
												className="text-sm font-semibold text-gray-700"
											>
												Google Maps Link (Optional)
											</Label>
											<div className="relative">
												<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
												<Input
													id="googleMapLink"
													placeholder="https://maps.google.com/..."
													className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.googleMapLink}
													onChange={(e) =>
														setFormData({
															...formData,
															googleMapLink: e.target.value,
														})
													}
												/>
											</div>
											<p className="text-xs text-gray-500">
												Provide a Google Maps link to your property location for
												better visibility
											</p>
										</div>
									</div>

									{/* Security */}
									<div className="space-y-4">
										<h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
											Account Security
										</h3>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="password"
													className="text-sm font-semibold text-gray-700"
												>
													Password *
												</Label>
												<Input
													id="password"
													type="password"
													placeholder="Create a strong password"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.password}
													onChange={(e) =>
														setFormData({
															...formData,
															password: e.target.value,
														})
													}
													required
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="confirmPassword"
													className="text-sm font-semibold text-gray-700"
												>
													Confirm Password *
												</Label>
												<Input
													id="confirmPassword"
													type="password"
													placeholder="Confirm your password"
													className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
													value={formData.confirmPassword}
													onChange={(e) =>
														setFormData({
															...formData,
															confirmPassword: e.target.value,
														})
													}
													required
												/>
											</div>
										</div>
									</div>

									{/* Document Upload */}
									<div className="space-y-4">
										<h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
											Ownership Verification
										</h3>

										<div className="space-y-2">
											<Label
												htmlFor="ownershipProof"
												className="text-sm font-semibold text-gray-700"
											>
												Ownership Proof Document *
											</Label>
											<div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
												<Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
												<div className="space-y-2">
													<p className="text-sm font-medium text-gray-700">
														Upload property ownership documents
													</p>
													<p className="text-xs text-gray-500">
														Accepted formats: PDF, JPG, PNG (Max 10MB)
													</p>
													<input
														type="file"
														id="ownershipProof"
														accept=".pdf,.jpg,.jpeg,.png"
														onChange={handleFileUpload}
														className="hidden"
														required
													/>
													<Button
														type="button"
														variant="outline"
														onClick={() =>
															document.getElementById("ownershipProof")?.click()
														}
														className="border-emerald-300 hover:bg-emerald-50"
													>
														Choose File
													</Button>
													{formData.ownershipProof && (
														<p className="text-sm text-emerald-600 font-medium">
															✓ {formData.ownershipProof.name}
														</p>
													)}
												</div>
											</div>
										</div>
									</div>

									{/* Submit Button */}
									<Button
										type="submit"
										className="w-full h-14 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-lg font-semibold rounded-2xl shadow-lg"
										disabled={isLoading || !formData.agreementsAccepted}
									>
										{isLoading ? (
											<div className="flex items-center space-x-3">
												<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
												<span>Submitting Application...</span>
											</div>
										) : (
											<div className="flex items-center space-x-3">
												<span>Submit Application</span>
												<ArrowRight className="h-5 w-5" />
											</div>
										)}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>

					{/* Agreements Sidebar */}
					<div className="lg:col-span-1">
						<Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-in fade-in slide-in-from-right-4 duration-1000 delay-600 sticky top-8">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-gray-900">
									Owner Agreements
								</CardTitle>
								<CardDescription className="text-gray-600">
									Please read and accept all terms
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="max-h-96 overflow-y-auto space-y-3 pr-2">
									{ownerAgreements.map((agreement, index) => (
										<div
											key={index}
											className="p-3 bg-gray-50 rounded-lg border border-gray-200"
										>
											<div className="flex items-start space-x-2">
												<div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
													<span className="text-xs font-bold text-emerald-600">
														{index + 1}
													</span>
												</div>
												<p className="text-sm text-gray-700 leading-relaxed">
													{agreement}
												</p>
											</div>
										</div>
									))}
								</div>

								<div className="border-t pt-4">
									<div className="flex items-start space-x-3">
										<Checkbox
											id="agreements"
											checked={formData.agreementsAccepted}
											onCheckedChange={(checked) =>
												setFormData({
													...formData,
													agreementsAccepted: checked as boolean,
												})
											}
											className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 mt-1"
										/>
										<Label
											htmlFor="agreements"
											className="text-sm text-gray-700 cursor-pointer leading-relaxed"
										>
											I have read and agree to all the terms and conditions
											listed above. I understand that providing false
											information may result in account suspension.
										</Label>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Back to Role Selection */}
				<div className="text-center mt-8 animate-in fade-in duration-1000 delay-900">
					<Button
						variant="outline"
						asChild
						className="border-emerald-300 hover:bg-emerald-50"
					>
						<Link href="/signup" className="flex items-center">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Role Selection
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
