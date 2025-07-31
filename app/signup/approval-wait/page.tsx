"use client";

import {
	Clock,
	CheckCircle,
	Mail,
	MessageSquare,
	ArrowLeft,
	Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ApprovalWaitPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
			<div className="w-full max-w-2xl space-y-8">
				{/* Success Animation */}
				<div className="text-center animate-in fade-in duration-1000">
					<div className="mx-auto w-32 h-32 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl mb-8 relative animate-pulse">
						<CheckCircle className="h-16 w-16 text-white" />
						<div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
							<span className="text-lg font-bold text-gray-800">✓</span>
						</div>
					</div>
					<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
						Application Submitted Successfully!
					</h1>
					<p className="text-xl text-gray-600 mb-2">
						Thank you for joining the Akeray community
					</p>
				</div>

				{/* Status Card */}
				<Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
					<CardHeader className="text-center pb-6">
						<div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
							<Clock className="h-8 w-8 text-white" />
						</div>
						<CardTitle className="text-2xl font-bold text-gray-900">
							Your Account is Under Review
						</CardTitle>
						<CardDescription className="text-gray-600 text-lg">
							Our team is reviewing your application for approval
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* What Happens Next */}
						<div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl border border-emerald-200">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								What happens next?
							</h3>
							<div className="space-y-3">
								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
										<span className="text-white font-bold text-sm">1</span>
									</div>
									<div>
										<p className="font-medium text-gray-900">
											Document Verification
										</p>
										<p className="text-sm text-gray-600">
											Our team will verify your submitted documents and
											information
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
										<span className="text-white font-bold text-sm">2</span>
									</div>
									<div>
										<p className="font-medium text-gray-900">
											Background Check
										</p>
										<p className="text-sm text-gray-600">
											We'll conduct a quick background verification for security
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
										<span className="text-white font-bold text-sm">3</span>
									</div>
									<div>
										<p className="font-medium text-gray-900">
											Account Activation
										</p>
										<p className="text-sm text-gray-600">
											You'll receive SMS and email confirmation once approved
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Timeline */}
						<div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
							<div className="flex items-center space-x-3 mb-3">
								<Clock className="h-6 w-6 text-yellow-600" />
								<h3 className="text-lg font-semibold text-yellow-800">
									Expected Timeline
								</h3>
							</div>
							<p className="text-yellow-700 font-medium text-lg">
								⏰ Approval typically takes 30 minutes to 2 hours
							</p>
							<p className="text-yellow-600 text-sm mt-2">
								You'll receive notifications via SMS and email once your account
								is approved
							</p>
						</div>

						{/* Notification Info */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
								<div className="flex items-center space-x-3 mb-2">
									<MessageSquare className="h-5 w-5 text-blue-600" />
									<h4 className="font-semibold text-blue-800">
										SMS Notification
									</h4>
								</div>
								<p className="text-blue-700 text-sm">
									You'll receive an SMS confirmation at your registered phone
									number
								</p>
							</div>
							<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
								<div className="flex items-center space-x-3 mb-2">
									<Mail className="h-5 w-5 text-emerald-600" />
									<h4 className="font-semibold text-emerald-800">
										Email Notification
									</h4>
								</div>
								<p className="text-emerald-700 text-sm">
									Check your email for detailed account information and next
									steps
								</p>
							</div>
						</div>

						{/* Important Note */}
						<div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								Important Notes:
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li className="flex items-start space-x-2">
									<span className="text-emerald-500 font-bold">•</span>
									<span className="text-sm">
										Keep your phone accessible for SMS notifications
									</span>
								</li>
								<li className="flex items-start space-x-2">
									<span className="text-emerald-500 font-bold">•</span>
									<span className="text-sm">
										Check your email spam folder if you don't receive
										confirmation
									</span>
								</li>
								<li className="flex items-start space-x-2">
									<span className="text-emerald-500 font-bold">•</span>
									<span className="text-sm">
										You can try logging in once you receive approval
										notification
									</span>
								</li>
								<li className="flex items-start space-x-2">
									<span className="text-emerald-500 font-bold">•</span>
									<span className="text-sm">
										Contact support if you don't hear back within 24 hours
									</span>
								</li>
							</ul>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4">
							<Button
								asChild
								className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
							>
								<Link href="/login">Try Login (After Approval)</Link>
							</Button>
							<Button
								variant="outline"
								asChild
								className="flex-1 h-12 border-emerald-300 hover:bg-emerald-50"
							>
								<Link href="/" className="flex items-center justify-center">
									<Home className="mr-2 h-4 w-4" />
									Back to Homepage
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Contact Support */}
				<div className="text-center animate-in fade-in duration-1000 delay-600">
					<p className="text-gray-600 mb-4">Need help or have questions?</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<div className="flex items-center space-x-2 text-gray-700">
							<MessageSquare className="h-4 w-4" />
							<span className="text-sm">SMS: +251-911-123456</span>
						</div>
						<div className="flex items-center space-x-2 text-gray-700">
							<Mail className="h-4 w-4" />
							<span className="text-sm">Email: support@akeray.et</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
