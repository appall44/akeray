"use client";

import type React from "react";
import { useState } from "react";
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	ArrowRight,
	Building2,
	Moon,
	Sun,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const router = useRouter();
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Basic validation
		if (!formData.email || !formData.password) {
			setError("Please fill in all fields");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			if (
				formData.email === "aseffa@akeray.et" &&
				formData.password === "admin123"
			) {
				toast({
					title: "Login Successful",
					description: "Welcome to Akeray Property Management System",
				});
				router.push("/dashboard/admin");
			} else if (
				formData.email === "mulugeta@akeray.et" &&
				formData.password === "owner123"
			) {
				toast({
					title: "Login Successful",
					description: "Welcome to Property Owner Dashboard",
				});
				router.push("/dashboard/owner");
			} else if (
				formData.email === "meron@akeray.et" &&
				formData.password === "tenant123"
			) {
				toast({
					title: "Login Successful",
					description: "Welcome to Tenant Dashboard",
				});
				router.push("/dashboard/tenant");
			} else {
				setError("Invalid email or password. Please try again.");
			}
		}, 1500);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
			{/* Back to home button */}
			<div className="absolute top-6 left-6 z-20 flex items-center gap-2">
				<Link
					href="/"
					className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 shadow-md backdrop-blur-sm transition-all"
				>
					<Home className="h-4 w-4" />
					<span className="text-sm font-medium">Back to Home</span>
				</Link>
			</div>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-10 left-10 w-20 h-20 bg-emerald-500 rounded-full"></div>
				<div className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full"></div>
				<div className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-500 rounded-full"></div>
				<div className="absolute bottom-40 right-10 w-12 h-12 bg-red-500 rounded-full"></div>
			</div>

			<div className="w-full max-w-md space-y-8 relative z-10">
				{/* Logo and Branding */}
				<div className="text-center animate-in fade-in duration-1000">
					<div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-600 via-blue-600 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 relative">
						<Building2 className="h-12 w-12 text-white" />
						<div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
							<span className="text-xs font-bold text-gray-800">A</span>
						</div>
					</div>
					<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
						Akeray PMS
					</h1>
					<p className="text-lg text-gray-600 font-medium">
						Property Management System
					</p>
					<p className="text-sm text-gray-500">
						Efficient Property Management for Ethiopia
					</p>
				</div>

				{/* Login Card */}
				<Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
					<CardHeader className="text-center pb-6 space-y-2">
						<CardTitle className="text-2xl font-bold text-gray-900">
							Welcome Back
						</CardTitle>
						<CardDescription className="text-gray-600">
							Sign in to access your dashboard
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{error && (
							<Alert
								variant="destructive"
								className="animate-in fade-in duration-300 border-red-200 bg-red-50"
							>
								<AlertDescription className="text-red-800">
									{error}
								</AlertDescription>
							</Alert>
						)}

						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="text-sm font-semibold text-gray-700"
								>
									Email Address
								</Label>
								<div className="relative group">
									<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
									<Input
										id="email"
										type="email"
										placeholder="Enter your email address"
										className="pl-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-sm font-semibold text-gray-700"
								>
									Password
								</Label>
								<div className="relative group">
									<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										className="pl-12 pr-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
										value={formData.password}
										onChange={(e) =>
											setFormData({ ...formData, password: e.target.value })
										}
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<Checkbox
										id="remember"
										checked={formData.rememberMe}
										onCheckedChange={(checked) =>
											setFormData({
												...formData,
												rememberMe: checked as boolean,
											})
										}
										className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
									/>
									<Label
										htmlFor="remember"
										className="text-sm text-gray-600 cursor-pointer"
									>
										Remember me
									</Label>
								</div>
								<Link
									href="/forgot-password"
									className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
								>
									Forgot password?
								</Link>
							</div>

							<Button
								type="submit"
								className="w-full h-14 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center space-x-3">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Signing in...</span>
									</div>
								) : (
									<div className="flex items-center space-x-3">
										<span>Sign In</span>
										<ArrowRight className="h-5 w-5" />
									</div>
								)}
							</Button>
						</form>

						<div className="text-center text-sm text-gray-500 border-t pt-6">
							Need help? Contact support at{" "}
							<a
								href="mailto:support@akeray.et"
								className="text-emerald-600 hover:underline font-semibold"
							>
								support@akeray.et
							</a>
						</div>

						<div className="text-center text-xs text-gray-400">
							<p>Demo Credentials:</p>
							<p>Admin: aseffa@akeray.et / admin123</p>
							<p>Owner: mulugeta@akeray.et / owner123</p>
							<p>Tenant: meron@akeray.et / tenant123</p>
						</div>
					</CardContent>
				</Card>

				{/* Ethiopian Flag Colors Footer */}
				<div className="flex justify-center space-x-2 animate-in fade-in duration-1000 delay-700">
					<div className="w-8 h-2 bg-green-500 rounded-full"></div>
					<div className="w-8 h-2 bg-yellow-400 rounded-full"></div>
					<div className="w-8 h-2 bg-red-500 rounded-full"></div>
				</div>
			</div>
		</div>
	);
}
