"use client";

import { useState } from "react";
import {
	FileText,
	Plus,
	Search,
	Filter,
	Eye,
	Edit,
	Download,
	Send,
	Calendar,
	Building,
	DollarSign,
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
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";

const invoices = [
	{
		id: "INV-R-001",
		invoiceNumber: "INV-R-001",
		type: "rental",
		customer: "አበበ ከበደ / Abebe Kebede",
		property: "የፀሐይ መውጫ አፓርትመንቶች / Sunrise Apartments",
		unit: "4A",
		amount: 18000,
		vatAmount: 2700,
		total: 20700,
		date: "2024-01-01",
		dueDate: "2024-01-31",
		status: "sent",
		paymentMethod: "Bank Transfer",
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "INV-S-002",
		invoiceNumber: "INV-S-002",
		type: "sale",
		customer: "ሳራ ለማ / Sara Lemma",
		property: "አረንጓዴ ሸለቆ ኮምፕሌክስ / Green Valley Complex",
		unit: "2B",
		amount: 3500000,
		vatAmount: 525000,
		total: 4025000,
		date: "2024-01-05",
		dueDate: "2024-01-12",
		status: "paid",
		paymentMethod: "Bank Transfer",
		avatar: "/placeholder-user.jpg",
	},
	{
		id: "INV-R-003",
		invoiceNumber: "INV-R-003",
		type: "rental",
		customer: "ሙሉጌታ አሰፋ / Mulugeta Assefa",
		property: "የከተማ ማዕከል ፕላዛ / City Center Plaza",
		unit: "1C",
		amount: 22000,
		vatAmount: 3300,
		total: 25300,
		date: "2024-01-10",
		dueDate: "2024-02-09",
		status: "overdue",
		paymentMethod: "Cash",
		avatar: "/placeholder-user.jpg",
	},
];

export default function AdminInvoicesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredInvoices = invoices.filter((invoice) => {
		const matchesSearch =
			invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
			invoice.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
			invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = filterType === "all" || invoice.type === filterType;
		const matchesStatus =
			filterStatus === "all" || invoice.status === filterStatus;
		return matchesSearch && matchesType && matchesStatus;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "generated":
				return "bg-blue-100 text-blue-800";
			case "sent":
				return "bg-yellow-100 text-yellow-800";
			case "paid":
				return "bg-emerald-100 text-emerald-800";
			case "overdue":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case "rental":
				return "bg-blue-100 text-blue-800";
			case "sale":
				return "bg-emerald-100 text-emerald-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case "generated":
				return "ተፈጠረ / Generated";
			case "sent":
				return "ተልኳል / Sent";
			case "paid":
				return "ተከፍሏል / Paid";
			case "overdue":
				return "ዘግይቷል / Overdue";
			default:
				return status;
		}
	};

	const getTypeLabel = (type: string) => {
		switch (type) {
			case "rental":
				return "ክራይ / Rental";
			case "sale":
				return "ሽያጭ / Sale";
			default:
				return type;
		}
	};

	const totalInvoices = filteredInvoices.length;
	const paidInvoices = filteredInvoices.filter(
		(i) => i.status === "paid"
	).length;
	const overdueInvoices = filteredInvoices.filter(
		(i) => i.status === "overdue"
	).length;
	const totalAmount = filteredInvoices.reduce(
		(sum, invoice) => sum + invoice.total,
		0
	);

	return (
		<DashboardLayout
			userRole="admin"
			userName="አስተዳዳሪ አበበ / Admin Abebe"
			userEmail="admin@akeray.et"
		>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
							ደረሰኞች / Invoices
						</h1>
						<p className="text-gray-600 mt-1">
							ሁሉንም የክራይ እና የሽያጭ ደረሰኞች ያስተዳድሩ / Manage all rental and sale
							invoices
						</p>
					</div>
					<Button
						asChild
						className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
					>
						<Link href="/dashboard/admin/invoices/new">
							<Plus className="h-4 w-4 mr-2" />
							አዲስ ደረሰኝ / New Invoice
						</Link>
					</Button>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<FileText className="h-8 w-8 text-blue-600" />
								<div>
									<p className="text-2xl font-bold">{totalInvoices}</p>
									<p className="text-sm text-gray-600">
										ጠቅላላ ደረሰኞች / Total Invoices
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<DollarSign className="h-8 w-8 text-emerald-600" />
								<div>
									<p className="text-2xl font-bold">{paidInvoices}</p>
									<p className="text-sm text-gray-600">የተከፈሉ / Paid</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<Calendar className="h-8 w-8 text-red-600" />
								<div>
									<p className="text-2xl font-bold">{overdueInvoices}</p>
									<p className="text-sm text-gray-600">ዘግይተዋል / Overdue</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-2">
								<Building className="h-8 w-8 text-purple-600" />
								<div>
									<p className="text-2xl font-bold">
										{(totalAmount / 1000000).toFixed(1)}M
									</p>
									<p className="text-sm text-gray-600">ጠቅላላ ዋጋ / Total Value</p>
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
							placeholder="በደንበኛ፣ ንብረት ወይም ደረሰኝ ቁጥር ይፈልጉ / Search by customer, property, or invoice number..."
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
									አይነት / Type:{" "}
									{filterType === "all"
										? "ሁሉም / All"
										: getTypeLabel(filterType)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>
									በአይነት ማጣሪያ / Filter by Type
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => setFilterType("all")}>
									ሁሉም አይነቶች / All Types
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterType("rental")}>
									ክራይ / Rental
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterType("sale")}>
									ሽያጭ / Sale
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">
									<Filter className="h-4 w-4 mr-2" />
									ሁኔታ / Status:{" "}
									{filterStatus === "all"
										? "ሁሉም / All"
										: getStatusLabel(filterStatus)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>
									በሁኔታ ማጣሪያ / Filter by Status
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => setFilterStatus("all")}>
									ሁሉም ሁኔታዎች / All Status
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("generated")}>
									ተፈጠረ / Generated
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("sent")}>
									ተልኳል / Sent
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("paid")}>
									ተከፍሏል / Paid
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setFilterStatus("overdue")}>
									ዘግይቷል / Overdue
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Invoices Table */}
				<Card>
					<CardHeader>
						<CardTitle>የደረሰኝ ዝርዝር / Invoice Records</CardTitle>
						<CardDescription>
							ሁሉም የክራይ እና የሽያጭ ደረሰኞች እና ሁኔታቸው / All rental and sale invoices and
							their status
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>የደረሰኝ ቁጥር / Invoice #</TableHead>
									<TableHead>ደንበኛ / Customer</TableHead>
									<TableHead>ንብረት እና ክፍል / Property & Unit</TableHead>
									<TableHead>አይነት / Type</TableHead>
									<TableHead>መጠን / Amount</TableHead>
									<TableHead>ቀን / Date</TableHead>
									<TableHead>የመክፈያ ቀን / Due Date</TableHead>
									<TableHead>ሁኔታ / Status</TableHead>
									<TableHead className="text-right">እርምጃዎች / Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredInvoices.map((invoice) => (
									<TableRow key={invoice.id} className="hover:bg-gray-50">
										<TableCell>
											<span className="font-mono text-sm font-medium">
												{invoice.invoiceNumber}
											</span>
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-3">
												<Avatar className="h-8 w-8">
													<AvatarImage
														src={invoice.avatar || "/placeholder.svg"}
													/>
													<AvatarFallback>
														{invoice.customer
															.split(" ")
															.slice(-2)
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<span className="font-medium">{invoice.customer}</span>
											</div>
										</TableCell>
										<TableCell>
											<div>
												<p className="font-medium text-sm">
													{invoice.property}
												</p>
												<p className="text-xs text-gray-500">
													ክፍል / Unit {invoice.unit}
												</p>
											</div>
										</TableCell>
										<TableCell>
											<Badge className={getTypeColor(invoice.type)}>
												{getTypeLabel(invoice.type)}
											</Badge>
										</TableCell>
										<TableCell>
											<div>
												<p className="font-semibold">
													{invoice.total.toLocaleString()} ብር
												</p>
												<p className="text-xs text-gray-500">
													VAT: {invoice.vatAmount.toLocaleString()} ብር
												</p>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-2">
												<Calendar className="h-4 w-4 text-gray-400" />
												<span className="text-sm">
													{new Date(invoice.date).toLocaleDateString()}
												</span>
											</div>
										</TableCell>
										<TableCell>
											<span className="text-sm">
												{new Date(invoice.dueDate).toLocaleDateString()}
											</span>
										</TableCell>
										<TableCell>
											<Badge className={getStatusColor(invoice.status)}>
												{getStatusLabel(invoice.status)}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex items-center justify-end space-x-2">
												<Button variant="ghost" size="sm" asChild>
													<Link
														href={`/dashboard/admin/invoices/${invoice.id}`}
													>
														<Eye className="h-4 w-4" />
													</Link>
												</Button>
												<Button variant="ghost" size="sm">
													<Download className="h-4 w-4" />
												</Button>
												{invoice.status === "generated" && (
													<Button
														variant="ghost"
														size="sm"
														className="text-blue-600"
													>
														<Send className="h-4 w-4" />
													</Button>
												)}
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Empty State */}
				{filteredInvoices.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								ምንም ደረሰኞች አልተገኙም / No invoices found
							</h3>
							<p className="text-gray-600 mb-4">
								{searchTerm || filterType !== "all" || filterStatus !== "all"
									? "የፍለጋ ወይም የማጣሪያ መስፈርቶችዎን ማስተካከል ይሞክሩ / Try adjusting your search or filter criteria."
									: "ምንም የደረሰኝ መዝገቦች የሉም / No invoice records available."}
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</DashboardLayout>
	);
}
