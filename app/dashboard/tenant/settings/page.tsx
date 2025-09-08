"use client";

import { useState } from "react";
import {
	Settings,
	Save,
	Bell,
	Mail,
	Smartphone,
	Shield,
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
import { Switch } from "@/components/ui/switch";
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

export default function TenantSettingsPage() {
	const [settings, setSettings] = useState({
		// Notification Settings
		emailNotifications: true,
		smsNotifications: true,
		paymentReminders: true,
		maintenanceUpdates: true,
		leaseNotifications: true,
		propertyUpdates: true,

		// Communication Preferences
		preferredContactMethod: "sms",
		notificationFrequency: "immediate",
		quietHours: true,
		quietHoursStart: "22:00",
		quietHoursEnd: "08:00",

		// Property Preferences
		propertyAlerts: true,
		priceAlerts: true,
		newListingAlerts: false,
		favoritePropertyUpdates: true,

		// Privacy Settings
		profileVisibility: "landlords",
		contactInfoVisible: true,
		allowDirectContact: true,
		shareApplicationHistory: false,

		// Payment Settings
		autoPaymentReminders: true,
		paymentReminderDays: "3",
		preferredPaymentMethod: "bank_transfer",
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
			userRole="tenant"
			userName="Meron Tadesse"
			userEmail="meron@email.com"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								Tenant Settings
							</h1>
							<p className="text-lg text-gray-600">
								Manage your tenant preferences and notifications
							</p>
							<p className="text-sm text-gray-500">
								Customize how you receive updates about your rentals
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
										<Label>Payment Reminders</Label>
										<p className="text-sm text-gray-500">
											Get reminders for upcoming payments
										</p>
									</div>
									<Switch
										checked={settings.paymentReminders}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, paymentReminders: checked })
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Maintenance Updates</Label>
										<p className="text-sm text-gray-500">
											Get updates on maintenance requests
										</p>
									</div>
									<Switch
										checked={settings.maintenanceUpdates}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, maintenanceUpdates: checked })
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Lease Notifications</Label>
										<p className="text-sm text-gray-500">
											Get notified about lease updates
										</p>
									</div>
									<Switch
										checked={settings.leaseNotifications}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, leaseNotifications: checked })
										}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Property Preferences */}
					<div
						className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Home className="h-5 w-5 text-emerald-600" />
									<span>Property Preferences</span>
								</CardTitle>
								<CardDescription>
									Configure property search and alert preferences
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Property Alerts</Label>
										<p className="text-sm text-gray-500">
											Get alerts for new properties matching your criteria
										</p>
									</div>
									<Switch
										checked={settings.propertyAlerts}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, propertyAlerts: checked })
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Price Alerts</Label>
										<p className="text-sm text-gray-500">
											Get notified about price changes
										</p>
									</div>
									<Switch
										checked={settings.priceAlerts}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, priceAlerts: checked })
										}
									/>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>New Listing Alerts</Label>
										<p className="text-sm text-gray-500">
											Get notified about new property listings
										</p>
									</div>
									<Switch
										checked={settings.newListingAlerts}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, newListingAlerts: checked })
										}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="preferredPaymentMethod">
										Preferred Payment Method
									</Label>
									<Select
										value={settings.preferredPaymentMethod}
										onValueChange={(value) =>
											setSettings({
												...settings,
												preferredPaymentMethod: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="bank_transfer">
												Bank Transfer
											</SelectItem>
											<SelectItem value="mobile_money">Mobile Money</SelectItem>
											<SelectItem value="cash">Cash</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="paymentReminderDays">
										Payment Reminder (Days Before Due)
									</Label>
									<Input
										id="paymentReminderDays"
										type="number"
										value={settings.paymentReminderDays}
										onChange={(e) =>
											setSettings({
												...settings,
												paymentReminderDays: e.target.value,
											})
										}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Privacy Settings */}
					<div
						className="animate-in fade-in slide-in-from-left-4 duration-700 delay-1500"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Shield className="h-5 w-5 text-red-600" />
									<span>Privacy & Security</span>
								</CardTitle>
								<CardDescription>
									Control your privacy and data sharing preferences
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
											<SelectItem value="landlords">Landlords Only</SelectItem>
											<SelectItem value="public">Public</SelectItem>
											<SelectItem value="private">Private</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Contact Info Visible</Label>
										<p className="text-sm text-gray-500">
											Show contact information to landlords
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
										<Label>Allow Direct Contact</Label>
										<p className="text-sm text-gray-500">
											Allow landlords to contact you directly
										</p>
									</div>
									<Switch
										checked={settings.allowDirectContact}
										onCheckedChange={(checked) =>
											setSettings({ ...settings, allowDirectContact: checked })
										}
									/>
								</div>

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Share Application History</Label>
										<p className="text-sm text-gray-500">
											Share rental history with potential landlords
										</p>
									</div>
									<Switch
										checked={settings.shareApplicationHistory}
										onCheckedChange={(checked) =>
											setSettings({
												...settings,
												shareApplicationHistory: checked,
											})
										}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Action Buttons */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1800"
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
