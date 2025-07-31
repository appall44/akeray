"use client"

import { useState } from "react"
import { FileText, Plus, Search, Filter, Eye, Edit, Download, Calendar, Building, Clock } from "lucide-react"
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
    tenant: "አበበ ከበደ / Abebe Kebede",
    property: "የፀሐይ መውጫ አፓርትመንቶች / Sunrise Apartments",
    unit: "4A",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    monthlyRent: 15000,
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "LSE-002",
    tenant: "ሳራ ለማ / Sara Lemma",
    property: "አረንጓዴ ሸለቆ ኮምፕሌክስ / Green Valley Complex",
    unit: "2B",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    monthlyRent: 18000,
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "LSE-003",
    tenant: "ሙሉጌታ አሰፋ / Mulugeta Assefa",
    property: "የከተማ ማዕከል ፕላዛ / City Center Plaza",
    unit: "1C",
    startDate: "2023-12-01",
    endDate: "2024-11-30",
    monthlyRent: 22000,
    status: "expiring",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "LSE-004",
    tenant: "ፋጢማ አሊ / Fatima Ali",
    property: "የወንዝ ዳርቻ ታወሮች / Riverside Towers",
    unit: "3A",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    monthlyRent: 20000,
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
]

export default function LeasesPage() {
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
        return "ንቁ / Active"
      case "expiring":
        return "ማብቂያ / Expiring"
      case "expired":
        return "ያበቃ / Expired"
      case "terminated":
        return "ተቋርጧል / Terminated"
      default:
        return status
    }
  }

  const activeLeases = filteredLeases.filter((l) => l.status === "active").length
  const expiringLeases = filteredLeases.filter((l) => l.status === "expiring").length
  const totalRevenue = filteredLeases.reduce((sum, lease) => sum + lease.monthlyRent, 0)

  return (
    <DashboardLayout userRole="admin" userName="አስተዳዳሪ አበበ / Admin Abebe" userEmail="admin@akeray.et">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              ውሎች / Leases
            </h1>
            <p className="text-gray-600 mt-1">ሁሉንም የክራይ ውሎች ያስተዳድሩ / Manage all rental lease agreements</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            <Link href="/dashboard/admin/leases/new">
              <Plus className="h-4 w-4 mr-2" />
              አዲስ ውል / New Lease
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold">{activeLeases}</p>
                  <p className="text-sm text-gray-600">ንቁ ውሎች / Active Leases</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{expiringLeases}</p>
                  <p className="text-sm text-gray-600">ማብቂያ ውሎች / Expiring Soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{(totalRevenue / 1000).toFixed(0)}K ብር</p>
                  <p className="text-sm text-gray-600">ወርሃዊ ገቢ / Monthly Revenue</p>
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
              placeholder="በተከራይ፣ ንብረት ወይም ውል መለያ ይፈልጉ / Search by tenant, property, or lease ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                ሁኔታ / Status: {filterStatus === "all" ? "ሁሉም / All" : getStatusLabel(filterStatus)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>በሁኔታ ማጣሪያ / Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>ሁሉም ውሎች / All Leases</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("active")}>ንቁ / Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("expiring")}>ማብቂያ / Expiring</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("expired")}>ያበቃ / Expired</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Leases Table */}
        <Card>
          <CardHeader>
            <CardTitle>የውል ዝርዝር / Lease Records</CardTitle>
            <CardDescription>
              ሁሉም የክራይ ውሎች እና ሁኔታቸው / Complete list of all rental leases and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>የውል መለያ / Lease ID</TableHead>
                  <TableHead>ተከራይ / Tenant</TableHead>
                  <TableHead>ንብረት እና ክፍል / Property & Unit</TableHead>
                  <TableHead>የጀመረበት ቀን / Start Date</TableHead>
                  <TableHead>የሚያበቃበት ቀን / End Date</TableHead>
                  <TableHead>ወርሃዊ ክራይ / Monthly Rent</TableHead>
                  <TableHead>ሁኔታ / Status</TableHead>
                  <TableHead className="text-right">እርምጃዎች / Actions</TableHead>
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
                          <AvatarImage src={lease.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {lease.tenant
                              .split(" ")
                              .slice(-2)
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
                        <p className="text-xs text-gray-500">ክፍል / Unit {lease.unit}</p>
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
                      <span className="font-semibold">{lease.monthlyRent.toLocaleString()} ብር</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lease.status)}>{getStatusLabel(lease.status)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/admin/leases/${lease.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/admin/leases/${lease.id}/edit`}>
                            <Edit className="h-4 w-4" />
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

        {/* Empty State */}
        {filteredLeases.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ምንም ውሎች አልተገኙም / No leases found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "የፍለጋ ወይም የማጣሪያ መስፈርቶችዎን ማስተካከል ይሞክሩ / Try adjusting your search or filter criteria."
                  : "የመጀመሪያ ውልዎን በመጨመር ይጀምሩ / Get started by adding your first lease."}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Button asChild>
                  <Link href="/dashboard/admin/leases/new">
                    <Plus className="h-4 w-4 mr-2" />
                    አዲስ ውል / New Lease
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
