<<<<<<< HEAD
"use client";

import { useState } from "react";
import {
	ArrowLeft,
	Save,
	User,
	Mail,
	Phone,
	MapPin,
	Shield,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function EditUserPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const userId = params.id as string;
	const [isLoading, setIsLoading] = useState(false);

	// Mock user data - in real app, fetch from API based on userId
	const [formData, setFormData] = useState({
		firstName: "Aylele",
		lastName: "Bhir",
		email: "ayele.bhir@email.com",
		phone: "+251911234567",
		role: "tenant",
		address: "Bole Road, Addis Ababa",
		city: "Addis Ababa",
		emergencyContact: "Almaz Bhir",
		emergencyPhone: "+251922345678",
		notes: "Reliable tenant, always pays on time",
		status: "active",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: "ተጠቃሚ ተዘምኗል / User Updated Successfully",
				description: `${formData.firstName} ${formData.lastName} information has been updated`,
			});
			router.push(`/dashboard/admin/users/${userId}`);
		}, 1500);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
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
							<Link href={`/dashboard/admin/users/${userId}`}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								ተመለስ / Back
							</Link>
						</Button>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								ተጠቃሚ አርም / Edit User
							</h1>
							<p className="text-gray-600 mt-1">
								የተጠቃሚ መረጃ ያዘምኑ / Update user information
							</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Profile Section */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<User className="h-5 w-5 text-emerald-600" />
									<span>የመገለጫ መረጃ / Profile Information</span>
								</CardTitle>
								<CardDescription>
									መሰረታዊ የተጠቃሚ መረጃ / Basic user information
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-center">
									<Avatar className="h-24 w-24 ring-4 ring-emerald-200">
										<AvatarImage src="/placeholder-user.jpg" />
										<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold text-xl">
											{formData.firstName[0]}
											{formData.lastName[0]}
										</AvatarFallback>
									</Avatar>
								</div>
								<div className="space-y-2">
									<Label htmlFor="firstName">የመጀመሪያ ስም / First Name *</Label>
									<Input
										id="firstName"
										value={formData.firstName}
										onChange={(e) =>
											handleInputChange("firstName", e.target.value)
										}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">የአባት ስም / Last Name *</Label>
									<Input
										id="lastName"
										value={formData.lastName}
										onChange={(e) =>
											handleInputChange("lastName", e.target.value)
										}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="role">ሚና / Role *</Label>
									<Select
										value={formData.role}
										onValueChange={(value) => handleInputChange("role", value)}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="admin">
												አስተዳዳሪ / Administrator
											</SelectItem>
											<SelectItem value="owner">
												ባለቤት / Property Owner
											</SelectItem>
											<SelectItem value="tenant">ተከራይ / Tenant</SelectItem>
										</SelectContent>
									</Select>
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
											<SelectItem value="active">ንቁ / Active</SelectItem>
											<SelectItem value="inactive">
												ንቁ ያልሆነ / Inactive
											</SelectItem>
											<SelectItem value="pending">በመጠባበቅ / Pending</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						{/* Contact Information */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Phone className="h-5 w-5 text-blue-600" />
									<span>የመገናኛ መረጃ / Contact Information</span>
								</CardTitle>
								<CardDescription>
									የኢሜይል እና ስልክ መረጃ / Email and phone details
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">ኢሜይል / Email *</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="email"
											type="email"
											className="pl-10"
											value={formData.email}
											onChange={(e) =>
												handleInputChange("email", e.target.value)
											}
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">ስልክ ቁጥር / Phone Number *</Label>
									<div className="relative">
										<Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="phone"
											className="pl-10"
											value={formData.phone}
											onChange={(e) =>
												handleInputChange("phone", e.target.value)
											}
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="address">አድራሻ / Address</Label>
									<div className="relative">
										<MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="address"
											className="pl-10"
											value={formData.address}
											onChange={(e) =>
												handleInputChange("address", e.target.value)
											}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="city">ከተማ / City</Label>
									<Input
										id="city"
										value={formData.city}
										onChange={(e) => handleInputChange("city", e.target.value)}
									/>
								</div>
							</CardContent>
						</Card>

						{/* Emergency Contact & Notes */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Shield className="h-5 w-5 text-purple-600" />
									<span>ተጨማሪ መረጃ / Additional Information</span>
								</CardTitle>
								<CardDescription>
									የአደጋ ጊዜ መገናኛ እና ማስታወሻዎች / Emergency contact and notes
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="emergencyContact">
										የአደጋ ጊዜ መገናኛ / Emergency Contact
									</Label>
									<Input
										id="emergencyContact"
										value={formData.emergencyContact}
										onChange={(e) =>
											handleInputChange("emergencyContact", e.target.value)
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="emergencyPhone">
										የአደጋ ጊዜ ስልክ / Emergency Phone
									</Label>
									<Input
										id="emergencyPhone"
										value={formData.emergencyPhone}
										onChange={(e) =>
											handleInputChange("emergencyPhone", e.target.value)
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="notes">ማስታወሻዎች / Notes</Label>
									<Textarea
										id="notes"
										value={formData.notes}
										onChange={(e) => handleInputChange("notes", e.target.value)}
										rows={4}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end space-x-4">
						<Button variant="outline" type="button" asChild>
							<Link href={`/dashboard/admin/users/${userId}`}>
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
=======
"use client"

import { useState } from "react"
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const userId = params.id as string
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data - in real app, fetch from API based on userId
  const [formData, setFormData] = useState({
    firstName: "Aylele",
    lastName: "Bhir",
    email: "ayele.bhir@email.com",
    phone: "+251911234567",
    role: "tenant",
    address: "Bole Road, Addis Ababa",
    city: "Addis Ababa",
    emergencyContact: "Almaz Bhir",
    emergencyPhone: "+251922345678",
    notes: "Reliable tenant, always pays on time",
    status: "active",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "ተጠቃሚ ተዘምኗል / User Updated Successfully",
        description: `${formData.firstName} ${formData.lastName} information has been updated`,
      })
      router.push(`/dashboard/admin/users/${userId}`)
    }, 1500)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout userRole="admin" userName="አስተዳዳሪ አበበ / Admin Abebe" userEmail="admin@akeray.et">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/admin/users/${userId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                ተመለስ / Back
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                ተጠቃሚ አርም / Edit User
              </h1>
              <p className="text-gray-600 mt-1">የተጠቃሚ መረጃ ያዘምኑ / Update user information</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-emerald-600" />
                  <span>የመገለጫ መረጃ / Profile Information</span>
                </CardTitle>
                <CardDescription>መሰረታዊ የተጠቃሚ መረጃ / Basic user information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24 ring-4 ring-emerald-200">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold text-xl">
                      {formData.firstName[0]}{formData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">የመጀመሪያ ስም / First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">የአባት ስም / Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">ሚና / Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">አስተዳዳሪ / Administrator</SelectItem>
                      <SelectItem value="owner">ባለቤት / Property Owner</SelectItem>
                      <SelectItem value="tenant">ተከራይ / Tenant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">ሁኔታ / Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">ንቁ / Active</SelectItem>
                      <SelectItem value="inactive">ንቁ ያልሆነ / Inactive</SelectItem>
                      <SelectItem value="pending">በመጠባበቅ / Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>የመገናኛ መረጃ / Contact Information</span>
                </CardTitle>
                <CardDescription>የኢሜይል እና ስልክ መረጃ / Email and phone details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">ኢሜይል / Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">ስልክ ቁጥር / Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">አድራሻ / Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      className="pl-10"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">ከተማ / City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact & Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span>ተጨማሪ መረጃ / Additional Information</span>
                </CardTitle>
                <CardDescription>የአደጋ ጊዜ መገናኛ እና ማስታወሻዎች / Emergency contact and notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">የአደጋ ጊዜ መገናኛ / Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">የአደጋ ጊዜ ስልክ / Emergency Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">ማስታወሻዎች / Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" asChild>
              <Link href={`/dashboard/admin/users/${userId}`}>ተወው / Cancel</Link>
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
  )
}
>>>>>>> 3681449a1f16272ba4128a015d7614502cb8a992
