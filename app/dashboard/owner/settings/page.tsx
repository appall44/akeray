"use client";

import { useState } from "react";
import {
	Settings,
	Save,
	Bell,
	Mail,
	Smartphone,
	Shield,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

export default function OwnerSettingsPage() {
	const [settings, setSettings] = useState({
		// Notification Settings
		emailNotifications: true,
		smsNotifications: true,
		paymentNotifications: true,
		maintenanceAlerts: true,
		leaseExpiryNotices: true,
		tenantApplications: true,

		// Communication Preferences
		preferredContactMethod: "email",
		notificationFrequency: "immediate",
		quietHours: true,
		quietHoursStart: "22:00",
		quietHoursEnd: "08:00",

		// Property Management
		autoRenewalReminders: true,
		maintenanceAutoAssign: false,
		tenantScreening: true,
		backgroundCheckRequired: true,

		// Financial Settings
		currency: "ETB",
		paymentReminders: true,
		latePaymentGracePeriod: "5",
		lateFeeAmount: "500",
		autoInvoiceGeneration: true,

		// Privacy Settings
		profileVisibility: "tenants",
		contactInfoVisible: true,
		propertyListingPublic: true,
		allowDirectContact: true,
	});

	const { toast } = useToast();

	const handleSave = () => {
		toast({
			title: "Settings Saved Successfully",
			description: "Your preferences have been updated",
		});
	};

	return (
		<DashboardLayout
			userRole="owner"
			userName="Mulugeta Assefa"
			userEmail="mulugeta@akeray.et"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Owner Settings
							</h1>
							<p className="text-lg text-gray-600">
								Manage your property management preferences and notifications
							</p>
							<p className="text-sm text-gray-500">
								Customize how you receive updates and manage your properties
							</p>
						</div>
						<Button
							onClick={handleSave}
							className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
						>
							<Save className="h-4 w-4 mr-2" />
							Save Settings
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Notification Settings */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Bell className="h-5 w-5 text-blue-600" />
									<span>Notification Settings</span>
								</CardTitle>
								<CardDescription>
									Manage how you receive notifications
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Email Notifications</Label>
										<p className="text-sm text-gray-500">
											Receive notifications via email
										</p>
									</div>
									<Switch
										checked={settings.emailNotifications}
										onCheckedChange={(checked) =>
											setSettings({
												...settings,
												emailNotifications: checked,
											})
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>SMS Notifications</Label>
										<p className="text-sm text-gray-500">
											Receive notifications via SMS
										</p>
									</div>
									<Switch
										checked={settings.smsNotifications}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, smsNotifications: checked })
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Payment Notifications</Label>
										<p className="text-sm text-gray-500">
											Get notified when tenants make payments
										</p>
									</div>
									<Switch
										checked={settings.paymentNotifications}
										onCheckedChange={(checked) =>
											setSettings({
												...settings,
												paymentNotifications: checked,
											})
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Maintenance Alerts</Label>
										<p className="text-sm text-gray-500">
											Get alerts for maintenance requests
										</p>
									</div>
									<Switch
										checked={settings.maintenanceAlerts}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, maintenanceAlerts: checked })
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Lease Expiry Notices</Label>
										<p className="text-sm text-gray-500">
											Get notified about upcoming lease expirations
										</p>
									</div>
									<Switch
										checked={settings.leaseExpiryNotices}
										onCheckedChange={(checked) =>
											setSettings({
												...settings,
												leaseExpiryNotices: checked,
											})
										}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Property Management Settings */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Settings className="h-5 w-5 text-emerald-600" />
									<span>Property Management</span>
								</CardTitle>
								<CardDescription>
									Configure property management preferences
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Auto Renewal Reminders</Label>
										<p className="text-sm text-gray-500">
											Automatically send lease renewal reminders
										</p>
									</div>
									<Switch
										checked={settings.autoRenewalReminders}
										onCheckedChange={(checked) =>
											setSettings({
												...settings,
												autoRenewalReminders: checked,
											})
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Tenant Screening</Label>
										<p className="text-sm text-gray-500">
											Require tenant screening for applications
										</p>
									</div>
									<Switch
										checked={settings.tenantScreening}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, tenantScreening: checked })
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Background Check Required</Label>
										<p className="text-sm text-gray-500">
											Require background checks for new tenants
										</p>
									</div>
									<Switch
										checked={settings.backgroundCheckRequired}
										onCheckedChange={(checked) =>
											setSettings({
												...settings,
												backgroundCheckRequired: checked,
											})
										}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="preferredContactMethod">
										Preferred Contact Method
									</Label>
									<Select
										value={settings.preferredContactMethod}
										onValueChange={(value) =>
											setSettings({
												...settings,
												preferredContactMethod: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="email">Email</SelectItem>
											<SelectItem value="sms">SMS</SelectItem>
											<SelectItem value="phone">Phone Call</SelectItem>
											<SelectItem value="both">Email & SMS</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Financial Settings */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<DollarSign className="h-5 w-5 text-purple-600" />
									<span>Financial Settings</span>
								</CardTitle>
								<CardDescription>
									Configure payment and financial preferences
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="currency">Currency</Label>
									<Select
										value={settings.currency}
										onValueChange={(value) =>
											setSettings({ ...settings, currency: value })
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
											<SelectItem value="USD">US Dollar (USD)</SelectItem>
											<SelectItem value="EUR">Euro (EUR)</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="latePaymentGracePeriod">
										Late Payment Grace Period (Days)
									</Label>
									<Input
										id="latePaymentGracePeriod"
										type="number"
										value={settings.latePaymentGracePeriod}
										onChange={(e) =>
											setSettings({
												...settings,
												latePaymentGracePeriod: e.target.value,
											})
										}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="lateFeeAmount">Late Fee Amount (ETB)</Label>
									<Input
										id="lateFeeAmount"
										type="number"
										value={settings.lateFeeAmount}
										onChange={(e) =>
											setSettings({
												...settings,
												lateFeeAmount: e.target.value,
											})
										}
									/>
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Payment Reminders</Label>
										<p className="text-sm text-gray-500">
											Send automatic payment reminders
										</p>
									</div>
									<Switch
										checked={settings.paymentReminders}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, paymentReminders: checked })
										}
									/>
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Auto Invoice Generation</Label>
										<p className="text-sm text-gray-500">
											Automatically generate invoices
										</p>
									</div>
									<Switch
										checked={settings.autoInvoiceGeneration}
										onCheckedChange={(checked) =>
											setSettings({
												...settings,
												autoInvoiceGeneration: checked,
											})
										}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Privacy Settings */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-1200"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Shield className="h-5 w-5 text-orange-600" />
									<span>Privacy Settings</span>
								</CardTitle>
								<CardDescription>
									Control your privacy and visibility settings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="profileVisibility">Profile Visibility</Label>
									<Select
										value={settings.profileVisibility}
										onValueChange={(value) =>
											setSettings({ ...settings, profileVisibility: value })
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="public">Public</SelectItem>
											<SelectItem value="tenants">Tenants Only</SelectItem>
											<SelectItem value="private">Private</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Contact Info Visible</Label>
										<p className="text-sm text-gray-500">
											Show contact information to tenants
										</p>
									</div>
									<Switch
										checked={settings.contactInfoVisible}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, contactInfoVisible: checked })
										}
									/>
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Property Listing Public</Label>
										<p className="text-sm text-gray-500">
											Make property listings publicly visible
										</p>
									</div>
									<Switch
										checked={settings.propertyListingPublic}
										onCheckedChange={(checked) =>
											setSettings({
												...settings,
												propertyListingPublic: checked,
											})
										}
									/>
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Allow Direct Contact</Label>
										<p className="text-sm text-gray-500">
											Allow tenants to contact you directly
										</p>
									</div>
									<Switch
										checked={settings.allowDirectContact}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, allowDirectContact: checked })
										}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Action Buttons */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1500"
					style={{ animationFillMode: "forwards" }}
				>
					<div className="flex justify-end space-x-4">
						<Button variant="outline">Reset to Default</Button>
						<Button
							onClick={handleSave}
							className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
						>
							<Save className="h-4 w-4 mr-2" />
							Save Settings
						</Button>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
