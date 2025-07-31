"use client";

import { useState } from "react";
import {
	Users,
	Plus,
	Search,
	Filter,
	Eye,
	Edit,
	Trash2,
	Mail,
	Phone,
	Shield,
	UserCheck,
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
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const users = [
	{
		id: 1,
		name: "Aylele Bhir",
		email: "ayele.bhir@email.com",
		phone: "+251911234567",
		role: "tenant",
		status: "active",
		property: "Sunrise Apartments - Unit 4A",
		joinDate: "2024-01-15",
		avatar: "/placeholder-user.jpg",
	},
	{
		id: 2,
		name: "Sarah Wendeson",
		email: "sarah.j@email.com",
		phone: "+251922345678",
		role: "owner",
		status: "active",
		property: "3 Properties",
		joinDate: "2023-08-20",
		avatar: "/placeholder-user.jpg",
	},
	{
		id: 3,
		name: "Belete Moges",
		email: "Moges.bele@email.com",
		phone: "+251933456789",
		role: "tenant",
		status: "inactive",
		property: "Green Valley - Unit 2B",
		joinDate: "2024-03-10",
		avatar: "/placeholder-user.jpg",
	},
	{
		id: 4,
		name: "Meron Dawit",
		email: "meron.davis@email.com",
		phone: "+251944567890",
		role: "owner",
		status: "active",
		property: "2 Properties",
		joinDate: "2023-11-05",
		avatar: "/placeholder-user.jpg",
	},
	{
		id: 5,
		name: "Betel Maathos",
		email: "Betel.Mathos@email.com",
		phone: "+251955678901",
		role: "tenant",
		status: "active",
		property: "City Center - Unit 1C",
		joinDate: "2024-02-28",
		avatar: "/placeholder-user.jpg",
	},
];

export default function UsersPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterRole, setFilterRole] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.phone.includes(searchTerm);
		const matchesRole = filterRole === "all" || user.role === filterRole;
		const matchesStatus =
			filterStatus === "all" || user.status === filterStatus;
		return matchesSearch && matchesRole && matchesStatus;
	});

	const getRoleColor = (role: string) => {
		switch (role) {
			case "admin":
				return "bg-purple-100 text-purple-800";
			case "owner":
				return "bg-blue-100 text-blue-800";
			case "tenant":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800";
			case "inactive":
				return "bg-red-100 text-red-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getRoleIcon = (role: string) => {
		switch (role) {
			case "admin":
				return Shield;
			case "owner":
				return UserCheck;
			case "tenant":
				return Users;
			default:
				return Users;
		}
	};

	return (
		<DashboardLayout
			userRole="admin"
			userName="Admin User"
			userEmail="admin@apms.et"
		>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-poppins font-bold text-gray-900">
							Users
						</h1>
						<p className="text-gray-600 mt-1">
							Manage all system users - owners, tenants, and administrators
						</p>
					</div>
					<Button asChild className="bg-[#4A90E2] hover:bg-[#2F80ED]">
						<Link href="/dashboard/admin/users/new">
							<Plus className="h-4 w-4 mr-2" />
							Add User
						</Link>
					</Button>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<Users className="h-8 w-8 text-blue-600" />
								<div>
									<p className="text-2xl font-bold">{users.length}</p>
									<p className="text-sm text-gray-600">Total Users</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<UserCheck className="h-8 w-8 text-purple-600" />
								<div>
									<p className="text-2xl font-bold">
										{users.filter((u) => u.role === "owner").length}
									</p>
									<p className="text-sm text-gray-600">Owners</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<Users className="h-8 w-8 text-green-600" />
								<div>
									<p className="text-2xl font-bold">
										{users.filter((u) => u.role === "tenant").length}
									</p>
									<p className="text-sm text-gray-600">Tenants</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<UserCheck className="h-8 w-8 text-green-600" />
								<div>
									<p className="text-2xl font-bold">
										{users.filter((u) => u.status === "active").length}
									</p>
									<p className="text-sm text-gray-600">Active Users</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Search and Filter */}
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search users by name, email, or phone..."
							className="pl-10"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="flex space-x-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">
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
									Owners
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterRole("tenant")}>
									Tenants
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterRole("admin")}>
									Admins
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">
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
								<DropdownMenuItem onClick={() => setFilterStatus("active")}>
									Active
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("inactive")}>
									Inactive
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("pending")}>
									Pending
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Users Table */}
				<Card>
					<CardHeader>
						<CardTitle>All Users</CardTitle>
						<CardDescription>
							A list of all users in the system with their roles and status
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>User</TableHead>
									<TableHead>Contact</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Property/Units</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Join Date</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredUsers.map((user) => {
									const RoleIcon = getRoleIcon(user.role);
									return (
										<TableRow key={user.id} className="hover:bg-gray-50">
											<TableCell>
												<div className="flex items-center space-x-3">
													<Avatar>
														<AvatarImage
															src={user.avatar || "/placeholder.svg"}
														/>
														<AvatarFallback>
															{user.name
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="font-medium text-gray-900">
															{user.name}
														</p>
														<p className="text-sm text-gray-500">
															ID: {user.id}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="space-y-1">
													<div className="flex items-center space-x-2">
														<Mail className="h-4 w-4 text-gray-400" />
														<span className="text-sm">{user.email}</span>
													</div>
													<div className="flex items-center space-x-2">
														<Phone className="h-4 w-4 text-gray-400" />
														<span className="text-sm">{user.phone}</span>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center space-x-2">
													<RoleIcon className="h-4 w-4" />
													<Badge className={getRoleColor(user.role)}>
														{user.role}
													</Badge>
												</div>
											</TableCell>
											<TableCell>
												<span className="text-sm text-gray-600">
													{user.property}
												</span>
											</TableCell>
											<TableCell>
												<Badge className={getStatusColor(user.status)}>
													{user.status}
												</Badge>
											</TableCell>
											<TableCell>
												<span className="text-sm text-gray-600">
													{new Date(user.joinDate).toLocaleDateString()}
												</span>
											</TableCell>
											<TableCell className="text-right">
												<div className="flex items-center justify-end space-x-2">
													<Button variant="ghost" size="sm" asChild>
														<Link href={`/dashboard/admin/users/${user.id}`}>
															<Eye className="h-4 w-4" />
														</Link>
													</Button>
													<Button variant="ghost" size="sm" asChild>
														<Link
															href={`/dashboard/admin/users/${user.id}/edit`}
														>
															<Edit className="h-4 w-4" />
														</Link>
													</Button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button
																variant="ghost"
																size="sm"
																className="text-red-600 hover:text-red-700"
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>Delete User</AlertDialogTitle>
																<AlertDialogDescription>
																	Are you sure you want to delete {user.name}?
																	This action cannot be undone.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancel</AlertDialogCancel>
																<AlertDialogAction className="bg-red-600 hover:bg-red-700">
																	Delete
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Empty State */}
				{filteredUsers.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No users found
							</h3>
							<p className="text-gray-600 mb-4">
								{searchTerm || filterRole !== "all" || filterStatus !== "all"
									? "Try adjusting your search or filter criteria."
									: "Get started by adding your first user."}
							</p>
							{!searchTerm &&
								filterRole === "all" &&
								filterStatus === "all" && (
									<Button asChild>
										<Link href="/dashboard/admin/users/new">
											<Plus className="h-4 w-4 mr-2" />
											Add User
										</Link>
									</Button>
								)}
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
}
