"use client"

import { useState } from "react"
import { CreditCard, Plus, Search, Filter, Eye, CheckCircle, Clock, AlertCircle, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"

const payments = [
  {
    id: "PAY-001",
    month: "January 2025",
    amount: 18000,
    dueDate: "2025-01-01",
    paidDate: null,
    status: "due",
    method: null,
    property: "Sunrise Apartments",
    unit: "3B",
  },
  {
    id: "PAY-002",
    month: "December 2024",
    amount: 18000,
    dueDate: "2024-12-01",
    paidDate: "2024-12-01",
    status: "paid",
    method: "bank_transfer",
    property: "Sunrise Apartments",
    unit: "3B",
  },
  {
    id: "PAY-003",
    month: "November 2024",
    amount: 18000,
    dueDate: "2024-11-01",
    paidDate: "2024-11-01",
    status: "paid",
    method: "bank_transfer",
    property: "Sunrise Apartments",
    unit: "3B",
  },
  {
    id: "PAY-004",
    month: "October 2024",
    amount: 18000,
    dueDate: "2024-10-01",
    paidDate: "2024-10-01",
    status: "paid",
    method: "cash",
    property: "Sunrise Apartments",
    unit: "3B",
  },
  {
    id: "PAY-005",
    month: "September 2024",
    amount: 18000,
    dueDate: "2024-09-01",
    paidDate: "2024-09-03",
    status: "paid",
    method: "bank_transfer",
    property: "Sunrise Apartments",
    unit: "3B",
  },
]

export default function TenantPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-100 text-emerald-800"
      case "due":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "partial":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return CheckCircle
      case "due":
        return Clock
      case "overdue":
        return AlertCircle
      default:
        return Clock
    }
  }

  const getMethodLabel = (method: string | null) => {
    if (!method) return "N/A"
    switch (method) {
      case "bank_transfer":
        return "Bank Transfer"
      case "cash":
        return "Cash"
      case "mobile_money":
        return "Mobile Money"
      default:
        return method
    }
  }

  const totalPaid = filteredPayments.filter((p) => p.status === "paid").reduce((sum, payment) => sum + payment.amount, 0)
  const dueAmount = filteredPayments.filter((p) => p.status === "due").reduce((sum, payment) => sum + payment.amount, 0)
  const paidCount = filteredPayments.filter((p) => p.status === "paid").length

  return (
    <DashboardLayout userRole="tenant" userName="Meron Tadesse" userEmail="meron@email.com">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                My Payments
              </h1>
              <p className="text-lg text-gray-600">Track your rental payments and payment history</p>
              <p className="text-sm text-gray-500">View due dates, payment records, and make new payments</p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/dashboard/tenant/payments/new">
                <Plus className="h-4 w-4 mr-2" />
                Make Payment
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">Total Paid</p>
                    <p className="text-3xl font-bold text-gray-900">{(totalPaid / 1000).toFixed(0)}K ETB</p>
                    <p className="text-sm text-emerald-600 font-medium">{paidCount} payments made</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-yellow-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">Amount Due</p>
                    <p className="text-3xl font-bold text-gray-900">{(dueAmount / 1000).toFixed(0)}K ETB</p>
                    <p className="text-sm text-yellow-600 font-medium">Due January 1, 2025</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-yellow-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-blue-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">Monthly Rent</p>
                    <p className="text-3xl font-bold text-gray-900">18K ETB</p>
                    <p className="text-sm text-blue-600 font-medium">Apartment 3B</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750" style={{ animationFillMode: "forwards" }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by month or payment ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-emerald-300 hover:bg-emerald-50 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {filterStatus === "all" ? "All" : filterStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("paid")}>Paid</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("due")}>Due</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("overdue")}>Overdue</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Payments Table */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Payment History</CardTitle>
              <CardDescription>
                Complete record of your rental payments and due dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => {
                    const StatusIcon = getStatusIcon(payment.status)
                    return (
                      <TableRow key={payment.id} className="hover:bg-gray-50">
                        <TableCell>
                          <span className="font-mono text-sm font-medium">{payment.id}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{payment.month}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{payment.amount.toLocaleString()} ETB</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{new Date(payment.dueDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {payment.paidDate ? (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span className="text-sm">{new Date(payment.paidDate).toLocaleDateString()}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Not paid</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{getMethodLabel(payment.method)}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="h-4 w-4" />
                            <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/tenant/payments/${payment.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            {payment.status === "due" && (
                              <Button variant="ghost" size="sm" className="text-emerald-600" asChild>
                                <Link href="/dashboard/tenant/payments/new">
                                  <CreditCard className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No payment records available yet."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}