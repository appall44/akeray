"use client";

import { Building2, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignupRoleSelection() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
			<div className="w-full max-w-4xl space-y-8">
				{/* Header */}
				<div className="text-center animate-in fade-in duration-1000">
					<div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-600 via-blue-600 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 relative">
						<Building2 className="h-12 w-12 text-white" />
						<div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
							<span className="text-xs font-bold text-gray-800">A</span>
						</div>
					</div>
					<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
						Join Akeray Community
					</h1>
					<p className="text-xl text-gray-600 mb-2">
						Choose how you'd like to get started
					</p>
					<p className="text-sm text-gray-500">
						Select your role to create the right account for your needs
					</p>
				</div>

				{/* Role Selection Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
					{/* Property Owner Card */}
					<Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/95 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400">
						<CardHeader className="text-center pb-6">
							<div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
								<Building2 className="h-10 w-10 text-white" />
							</div>
							<CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
								Property Owner
							</CardTitle>
							<CardDescription className="text-gray-600 text-lg">
								List and manage your properties to earn rental income
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-3">
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-emerald-500" />
									<span className="text-gray-700">
										List unlimited properties
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-emerald-500" />
									<span className="text-gray-700">
										Manage tenants and leases
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-emerald-500" />
									<span className="text-gray-700">
										Track payments and income
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-emerald-500" />
									<span className="text-gray-700">
										Professional property management tools
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-emerald-500" />
									<span className="text-gray-700">
										Featured listing opportunities
									</span>
								</div>
							</div>

							<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
								<h4 className="font-semibold text-emerald-800 mb-2">
									Perfect for:
								</h4>
								<p className="text-emerald-700 text-sm">
									Property investors, landlords, and real estate professionals
									looking to maximize their rental income
								</p>
							</div>

							<Button
								asChild
								className="w-full h-14 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-lg font-semibold shadow-lg"
							>
								<Link
									href="/signup/owner"
									className="flex items-center justify-center"
								>
									<span>Join as Property Owner</span>
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Tenant Card */}
					<Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/95 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-400">
						<CardHeader className="text-center pb-6">
							<div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
								<Users className="h-10 w-10 text-white" />
							</div>
							<CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
								Tenant
							</CardTitle>
							<CardDescription className="text-gray-600 text-lg">
								Find and rent your perfect home with ease
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-3">
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-blue-500" />
									<span className="text-gray-700">
										Browse verified properties
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-blue-500" />
									<span className="text-gray-700">
										Direct contact with property owners
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-blue-500" />
									<span className="text-gray-700">
										Online payment and lease management
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-blue-500" />
									<span className="text-gray-700">
										Maintenance request system
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-blue-500" />
									<span className="text-gray-700">
										Save favorite properties
									</span>
								</div>
							</div>

							<div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
								<h4 className="font-semibold text-blue-800 mb-2">
									Perfect for:
								</h4>
								<p className="text-blue-700 text-sm">
									Individuals and families looking for apartments, houses, or
									commercial spaces to rent
								</p>
							</div>

							<Button
								asChild
								variant="outline"
								className="w-full h-14 border-2 border-blue-300 hover:bg-blue-50 text-lg font-semibold"
							>
								<Link
									href="/signup/tenant"
									className="flex items-center justify-center text-blue-600"
								>
									<span>Join as Tenant</span>
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Already have account */}
				<div className="text-center animate-in fade-in duration-1000 delay-600">
					<p className="text-gray-600 mb-4">Already have an account?</p>
					<Button
						variant="outline"
						asChild
						className="border-emerald-300 hover:bg-emerald-50"
					>
						<Link href="/login">Sign In to Your Account</Link>
					</Button>
					<Button
						variant="link"
						asChild
						className="border-emerald-300 hover:bg-emerald-50"
					>
						<Link href={"/ "}>Home</Link>
					</Button>
				</div>

				{/* Admin Note */}
				<div className="text-center text-sm text-gray-500 animate-in fade-in duration-1000 delay-800">
					{/* <p>
						<strong>Note:</strong> Admin accounts are created by existing
						administrators only. Contact support if you need administrative
						access.
					</p> */}
				</div>
			</div>
		</div>
	);
}
