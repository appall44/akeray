"use client";

import { useState } from "react";
import {
	Users,
	Plus,
	Search,
	Filter,
	Eye,
	Check,
	X,
	Phone,
	Mail,
	FileText,
	Calendar,
	User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

const pendingRegistrations = [
	{
		id: "REG-001",
		fullName: "Dawit Mekonnen",
		fatherName: "Mekonnen Tadesse",
		idNumber: "ID123456789",
		phone: "+251911234567",
		email: "dawit.mekonnen@email.com",
		role: "owner",
		occupation: null,
		location: "Bole, Addis Ababa",
		googleMapLink: "https://maps.google.com/...",
		ownershipProof: "ownership_proof_001.pdf",
		submittedDate: "2024-01-15T10:30:00",
		status: "pending",
		avatar:
			"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "REG-002",
		fullName: "Hanan Ahmed",
		fatherName: "Ahmed Hassan",
		idNumber: "ID987654321",
		phone: "+251922345678",
		email: "hanan.ahmed@email.com",
		role: "tenant",
		occupation: "Software Engineer",
		location: null,
		googleMapLink: null,
		ownershipProof: null,
		submittedDate: "2024-01-14T14:15:00",
		status: "pending",
		avatar:
			"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
	{
		id: "REG-003",
		fullName: "Yohannes Bekele",
		fatherName: "Bekele Girma",
		idNumber: "ID456789123",
		phone: "+251933456789",
		email: "yohannes.bekele@email.com",
		role: "owner",
		occupation: null,
		location: "Kazanchis, Addis Ababa",
		googleMapLink: null,
		ownershipProof: "ownership_proof_003.pdf",
		submittedDate: "2024-01-13T09:45:00",
		status: "pending",
		avatar:
			"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
	},
];

export default function AdminRegisterPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterRole, setFilterRole] = useState("all");
	const [filterStatus, setFilterStatus] = useState("pending");
	const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
	const [newAdminData, setNewAdminData] = useState({
		fullName: "",
		email: "",
		phone: "",
		password: "",
		role: "admin",
	});
	const { toast } = useToast();

	const filteredRegistrations = pendingRegistrations.filter((registration) => {
		const matchesSearch =
			registration.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			registration.phone.includes(searchTerm) ||
			registration.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesRole =
			filterRole === "all" || registration.role === filterRole;
		const matchesStatus =
			filterStatus === "all" || registration.status === filterStatus;
		return matchesSearch && matchesRole && matchesStatus;
	});

	const handleApprove = (registrationId: string) => {
		toast({
			title: "Application Approved",
			description: "User has been approved and SMS notification sent.",
		});
		// Here you would update the registration status in your backend
	};

	const handleReject = (registrationId: string) => {
		toast({
			title: "Application Rejected",
			description: "User has been notified of the rejection via SMS.",
			variant: "destructive",
		});
		// Here you would update the registration status in your backend
	};

	const handleCreateAdmin = () => {
		if (
			!newAdminData.fullName ||
			!newAdminData.email ||
			!newAdminData.phone ||
			!newAdminData.password
		) {
			toast({
				title: "Error",
				description: "Please fill in all required fields",
				variant: "destructive",
			});
			return;
		}

		toast({
			title: "Admin Created Successfully",
			description: `New admin account created for ${newAdminData.fullName}`,
		});

		// Reset form
		setNewAdminData({
			fullName: "",
			email: "",
			phone: "",
			password: "",
			role: "admin",
		});
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case "owner":
				return "bg-emerald-100 text-emerald-800";
			case "tenant":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "approved":
				return "bg-emerald-100 text-emerald-800";
			case "rejected":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<DashboardLayout
			userRole="admin"
			userName="Admin Aseffa Bekele"
			userEmail="aseffa@akeray.et"
		>
			<div className="space-y-8">
				{/* Header */}
				<div className="animate-in fade-in duration-1000">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
								User Registration Management
							</h1>
							<p className="text-lg text-gray-600">
								Review and approve new user registrations
							</p>
							<p className="text-sm text-gray-500">
								Manage pending applications and create admin accounts
							</p>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300">
									<Plus className="h-4 w-4 mr-2" />
									Create Admin
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-md">
								<DialogHeader>
									<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
										Create New Admin
									</DialogTitle>
									<DialogDescription>
										Add a new administrator to the system
									</DialogDescription>
								</DialogHeader>
								<div className="space-y-4 py-4">
									<div className="space-y-2">
										<Label htmlFor="adminFullName">Full Name</Label>
										<Input
											id="adminFullName"
											placeholder="Enter full name"
											value={newAdminData.fullName}
											onChange={(e) =>
												setNewAdminData({
													...newAdminData,
													fullName: e.target.value,
												})
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="adminEmail">Email</Label>
										<Input
											id="adminEmail"
											type="email"
											placeholder="admin@akeray.et"
											value={newAdminData.email}
											onChange={(e) =>
												setNewAdminData({
													...newAdminData,
													email: e.target.value,
												})
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="adminPhone">Phone</Label>
										<Input
											id="adminPhone"
											placeholder="+251911234567"
											value={newAdminData.phone}
											onChange={(e) =>
												setNewAdminData({
													...newAdminData,
													phone: e.target.value,
												})
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="adminPassword">Password</Label>
										<Input
											id="adminPassword"
											type="password"
											placeholder="Create password"
											value={newAdminData.password}
											onChange={(e) =>
												setNewAdminData({
													...newAdminData,
													password: e.target.value,
												})
											}
										/>
									</div>
									<Button
										onClick={handleCreateAdmin}
										className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
									>
										Create Admin Account
									</Button>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-yellow-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Pending Applications
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{pendingRegistrations.length}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-yellow-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Users className="h-8 w-8 text-yellow-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Owner Applications
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{
												pendingRegistrations.filter((r) => r.role === "owner")
													.length
											}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<User className="h-8 w-8 text-emerald-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-blue-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Tenant Applications
										</p>
										<p className="text-3xl font-bold text-gray-900">
											{
												pendingRegistrations.filter((r) => r.role === "tenant")
													.length
											}
										</p>
									</div>
									<div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Users className="h-8 w-8 text-blue-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div
						className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750"
						style={{ animationFillMode: "forwards" }}
					>
						<Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-purple-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="space-y-3">
										<p className="text-sm font-semibold text-gray-600">
											Today's Applications
										</p>
										<p className="text-3xl font-bold text-gray-900">2</p>
									</div>
									<div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
										<Calendar className="h-8 w-8 text-purple-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Search and Filter */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900"
					style={{ animationFillMode: "forwards" }}
				>
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search by name, phone, or email..."
								className="pl-10"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className="flex space-x-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="border-emerald-300 hover:bg-emerald-50"
									>
										<Filter className="h-4 w-4 mr-2" />
										Role: {filterRole === "all" ? "All" : filterRole}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => setFilterRole("all")}>
										All Roles
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterRole("owner")}>
										Property Owner
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterRole("tenant")}>
										Tenant
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="border-blue-300 hover:bg-blue-50"
									>
										<Filter className="h-4 w-4 mr-2" />
										Status: {filterStatus === "all" ? "All" : filterStatus}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => setFilterStatus("all")}>
										All Status
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterStatus("pending")}>
										Pending
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterStatus("approved")}>
										Approved
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setFilterStatus("rejected")}>
										Rejected
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>

				{/* Registrations Table */}
				<div
					className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1100"
					style={{ animationFillMode: "forwards" }}
				>
					<Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="text-xl">Pending Registrations</CardTitle>
							<CardDescription>
								Review and approve new user applications
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>User</TableHead>
										<TableHead>Contact</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>ID Number</TableHead>
										<TableHead>Submitted Date</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredRegistrations.map((registration) => (
										<TableRow
											key={registration.id}
											className="hover:bg-gray-50"
										>
											<TableCell>
												<div className="flex items-center space-x-3">
													<Avatar className="h-10 w-10">
														<AvatarImage src={registration.avatar} />
														<AvatarFallback>
															{registration.fullName
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="font-medium text-gray-900">
															{registration.fullName}
														</p>
														<p className="text-sm text-gray-500">
															Father: {registration.fatherName}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="space-y-1">
													<div className="flex items-center space-x-2">
														<Phone className="h-4 w-4 text-gray-400" />
														<span className="text-sm">
															{registration.phone}
														</span>
													</div>
													{registration.email && (
														<div className="flex items-center space-x-2">
															<Mail className="h-4 w-4 text-gray-400" />
															<span className="text-sm">
																{registration.email}
															</span>
														</div>
													)}
												</div>
											</TableCell>
											<TableCell>
												<Badge className={getRoleColor(registration.role)}>
													{registration.role}
												</Badge>
											</TableCell>
											<TableCell>
												<span className="font-mono text-sm">
													{registration.idNumber}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-sm">
													{new Date(
														registration.submittedDate
													).toLocaleDateString()}
												</span>
											</TableCell>
											<TableCell>
												<Badge className={getStatusColor(registration.status)}>
													{registration.status}
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<div className="flex items-center justify-end space-x-2">
													<Dialog>
														<DialogTrigger asChild>
															<Button
																variant="ghost"
																size="sm"
																onClick={() =>
																	setSelectedRegistration(registration)
																}
															>
																<Eye className="h-4 w-4" />
															</Button>
														</DialogTrigger>
													</Dialog>
													{registration.status === "pending" && (
														<>
															<Button
																variant="ghost"
																size="sm"
																className="text-emerald-600 hover:text-emerald-700"
																onClick={() => handleApprove(registration.id)}
															>
																<Check className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="sm"
																className="text-red-600 hover:text-red-700"
																onClick={() => handleReject(registration.id)}
															>
																<X className="h-4 w-4" />
															</Button>
														</>
													)}
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>

				{/* Registration Details Modal */}
				{selectedRegistration && (
					<Dialog
						open={!!selectedRegistration}
						onOpenChange={() => setSelectedRegistration(null)}
					>
						<DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold text-gray-900">
									Registration Details
								</DialogTitle>
								<DialogDescription>
									Review application for {selectedRegistration.fullName}
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-6">
								{/* Personal Information */}
								<div>
									<h3 className="text-lg font-semibold mb-3">
										Personal Information
									</h3>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<Label className="text-sm font-medium text-gray-500">
												Full Name
											</Label>
											<p className="font-medium">
												{selectedRegistration.fullName}
											</p>
										</div>
										<div>
											<Label className="text-sm font-medium text-gray-500">
												Father's Name
											</Label>
											<p className="font-medium">
												{selectedRegistration.fatherName}
											</p>
										</div>
										<div>
											<Label className="text-sm font-medium text-gray-500">
												ID Number
											</Label>
											<p className="font-mono">
												{selectedRegistration.idNumber}
											</p>
										</div>
										<div>
											<Label className="text-sm font-medium text-gray-500">
												Role
											</Label>
											<Badge
												className={getRoleColor(selectedRegistration.role)}
											>
												{selectedRegistration.role}
											</Badge>
										</div>
									</div>
								</div>

								{/* Contact Information */}
								<div>
									<h3 className="text-lg font-semibold mb-3">
										Contact Information
									</h3>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<Label className="text-sm font-medium text-gray-500">
												Phone
											</Label>
											<p className="font-medium">
												{selectedRegistration.phone}
											</p>
										</div>
										<div>
											<Label className="text-sm font-medium text-gray-500">
												Email
											</Label>
											<p className="font-medium">
												{selectedRegistration.email || "Not provided"}
											</p>
										</div>
									</div>
								</div>

								{/* Role-specific Information */}
								{selectedRegistration.role === "owner" && (
									<div>
										<h3 className="text-lg font-semibold mb-3">
											Property Owner Information
										</h3>
										<div className="grid grid-cols-1 gap-4">
											<div>
												<Label className="text-sm font-medium text-gray-500">
													Location
												</Label>
												<p className="font-medium">
													{selectedRegistration.location}
												</p>
											</div>
											{selectedRegistration.googleMapLink && (
												<div>
													<Label className="text-sm font-medium text-gray-500">
														Google Maps Link
													</Label>
													<p className="font-medium text-blue-600 truncate">
														{selectedRegistration.googleMapLink}
													</p>
												</div>
											)}
											<div>
												<Label className="text-sm font-medium text-gray-500">
													Ownership Proof
												</Label>
												<p className="font-medium">
													{selectedRegistration.ownershipProof}
												</p>
											</div>
										</div>
									</div>
								)}

								{selectedRegistration.role === "tenant" &&
									selectedRegistration.occupation && (
										<div>
											<h3 className="text-lg font-semibold mb-3">
												Tenant Information
											</h3>
											<div>
												<Label className="text-sm font-medium text-gray-500">
													Occupation
												</Label>
												<p className="font-medium">
													{selectedRegistration.occupation}
												</p>
											</div>
										</div>
									)}

								{/* Actions */}
								{selectedRegistration.status === "pending" && (
									<div className="flex space-x-4">
										<Button
											className="flex-1 bg-emerald-600 hover:bg-emerald-700"
											onClick={() => {
												handleApprove(selectedRegistration.id);
												setSelectedRegistration(null);
											}}
										>
											<Check className="h-4 w-4 mr-2" />
											Approve Application
										</Button>
										<Button
											variant="destructive"
											className="flex-1"
											onClick={() => {
												handleReject(selectedRegistration.id);
												setSelectedRegistration(null);
											}}
										>
											<X className="h-4 w-4 mr-2" />
											Reject Application
										</Button>
									</div>
								)}
							</div>
						</DialogContent>
					</Dialog>
				)}
			</div>
		</DashboardLayout>
	);
}
