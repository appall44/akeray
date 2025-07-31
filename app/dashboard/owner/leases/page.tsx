"use client"

import { useState } from "react"
import { FileText, Search, Filter, Eye, Download, Calendar, Building, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const leases = [
  {
    id: "LSE-001",
    tenant: "Tigist Haile",
    property: "Bole Apartments",
    unit: "3B",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    monthlyRent: 25000,
    status: "active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: "LSE-002",
    tenant: "Dawit Mekonnen",
    property: "Kazanchis Complex",
    unit: "2A",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    monthlyRent: 28000,
    status: "active",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: "LSE-003",
    tenant: "Hanan Ahmed",
    property: "Piassa Plaza",
    unit: "4A",
    startDate: "2023-12-01",
    endDate: "2024-11-30",
    monthlyRent: 22000,
    status: "expiring",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: "LSE-004",
    tenant: "Yohannes Bekele",
    property: "CMC Towers",
    unit: "5C",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    monthlyRent: 35000,
    status: "active",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
]

export default function OwnerLeasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredLeases = leases.filter((lease) => {
    const matchesSearch =
      lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || lease.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800"
      case "expiring":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "terminated":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "expiring":
        return "Expiring Soon"
      case "expired":
        return "Expired"
      case "terminated":
        return "Terminated"
      default:
        return status
    }
  }

  const activeLeases = filteredLeases.filter((l) => l.status === "active").length
  const expiringLeases = filteredLeases.filter((l) => l.status === "expiring").length
  const totalRevenue = filteredLeases.reduce((sum, lease) => sum + lease.monthlyRent, 0)

  return (
    <DashboardLayout userRole="owner" userName="Mulugeta Assefa" userEmail="mulugeta@akeray.et">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Lease Agreements
              </h1>
              <p className="text-lg text-gray-600">Monitor all your rental lease agreements and tenant relationships</p>
              <p className="text-sm text-gray-500">Track lease terms, renewal dates, and rental income</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">Active Leases</p>
                    <p className="text-3xl font-bold text-gray-900">{activeLeases}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <FileText className="h-8 w-8 text-emerald-600" />
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
                    <p className="text-sm font-semibold text-gray-600">Expiring Soon</p>
                    <p className="text-3xl font-bold text-gray-900">{expiringLeases}</p>
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
                    <p className="text-sm font-semibold text-gray-600">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">{(totalRevenue / 1000).toFixed(0)}K ETB</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <Building className="h-8 w-8 text-blue-600" />
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
                placeholder="Search by tenant, property, or lease ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-emerald-300 hover:bg-emerald-50 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {filterStatus === "all" ? "All" : getStatusLabel(filterStatus)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Leases</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("expiring")}>Expiring Soon</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("expired")}>Expired</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Leases Table */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Lease Records</CardTitle>
              <CardDescription>
                Complete list of all your rental leases and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lease ID</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Property & Unit</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Monthly Rent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeases.map((lease) => (
                    <TableRow key={lease.id} className="hover:bg-gray-50">
                      <TableCell>
                        <span className="font-mono text-sm font-medium">{lease.id}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={lease.avatar} />
                            <AvatarFallback>
                              {lease.tenant
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{lease.tenant}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{lease.property}</p>
                          <p className="text-xs text-gray-500">Unit {lease.unit}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{new Date(lease.startDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{new Date(lease.endDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">{lease.monthlyRent.toLocaleString()} ETB</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(lease.status)}>{getStatusLabel(lease.status)}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/owner/leases/${lease.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        {filteredLeases.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leases found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No lease agreements available."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}