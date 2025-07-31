"use client"

import { useState } from "react"
import { TrendingUp, Plus, Search, Filter, Eye, Edit, Phone, Mail, Calendar, User } from "lucide-react"
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

const leads = [
  {
    id: "LED-001",
    name: "ዳንኤል ተስፋዬ / Daniel Tesfaye",
    email: "daniel.tesfaye@email.com",
    phone: "+251911234567",
    property: "የፀሐይ መውጫ አፓርትመንቶች / Sunrise Apartments",
    unit: "5B",
    status: "interested",
    source: "website",
    budget: 18000,
    contactDate: "2024-01-15",
    followUpDate: "2024-01-20",
    notes: "ለቤተሰብ ቤት ይፈልጋል / Looking for family home",
  },
  {
    id: "LED-002",
    name: "ሄለን አበበ / Helen Abebe",
    email: "helen.abebe@email.com",
    phone: "+251922345678",
    property: "አረንጓዴ ሸለቆ ኮምፕሌክስ / Green Valley Complex",
    unit: "3A",
    status: "qualified",
    source: "referral",
    budget: 22000,
    contactDate: "2024-01-12",
    followUpDate: "2024-01-18",
    notes: "ቅርብ ጊዜ ውስጥ ይፈልጋል / Needs soon",
  },
  {
    id: "LED-003",
    name: "ሚካኤል ገብሬ / Michael Gebre",
    email: "michael.gebre@email.com",
    phone: "+251933456789",
    property: "የከተማ ማዕከል ፕላዛ / City Center Plaza",
    unit: "2C",
    status: "closed-won",
    source: "social-media",
    budget: 25000,
    contactDate: "2024-01-08",
    followUpDate: null,
    notes: "ውል ተፈርሟል / Contract signed",
  },
  {
    id: "LED-004",
    name: "ሩት ሃይሉ / Ruth Hailu",
    email: "ruth.hailu@email.com",
    phone: "+251944567890",
    property: "የወንዝ ዳርቻ ታወሮች / Riverside Towers",
    unit: "4A",
    status: "closed-lost",
    source: "walk-in",
    budget: 20000,
    contactDate: "2024-01-05",
    followUpDate: null,
    notes: "ሌላ ቦታ መረጠች / Chose another location",
  },
]

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSource, setFilterSource] = useState("all")

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus
    const matchesSource = filterSource === "all" || lead.source === filterSource
    return matchesSearch && matchesStatus && matchesSource
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interested":
        return "bg-blue-100 text-blue-800"
      case "qualified":
        return "bg-yellow-100 text-yellow-800"
      case "closed-won":
        return "bg-emerald-100 text-emerald-800"
      case "closed-lost":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "interested":
        return "ፍላጎት አለው / Interested"
      case "qualified":
        return "ብቁ / Qualified"
      case "closed-won":
        return "ተሳክቷል / Closed Won"
      case "closed-lost":
        return "አልተሳካም / Closed Lost"
      default:
        return status
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case "website":
        return "ድረ-ገጽ / Website"
      case "referral":
        return "ምክር / Referral"
      case "social-media":
        return "ማህበራዊ ሚዲያ / Social Media"
      case "walk-in":
        return "በቀጥታ / Walk-in"
      default:
        return source
    }
  }

  const interestedLeads = filteredLeads.filter((l) => l.status === "interested").length
  const qualifiedLeads = filteredLeads.filter((l) => l.status === "qualified").length
  const closedWonLeads = filteredLeads.filter((l) => l.status === "closed-won").length
  const conversionRate = filteredLeads.length > 0 ? Math.round((closedWonLeads / filteredLeads.length) * 100) : 0

  return (
    <DashboardLayout userRole="admin" userName="አስተዳዳሪ አበበ / Admin Abebe" userEmail="admin@akeray.et">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              የሽያጭ ክትትል / Sales Tracking
            </h1>
            <p className="text-gray-600 mt-1">የሽያጭ እድሎች እና ደንበኞች ያስተዳድሩ / Manage sales leads and prospects</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            <Link href="/dashboard/admin/sales/new">
              <Plus className="h-4 w-4 mr-2" />
              አዲስ እድል / New Lead
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{interestedLeads}</p>
                  <p className="text-sm text-gray-600">ፍላጎት ያላቸው / Interested</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{qualifiedLeads}</p>
                  <p className="text-sm text-gray-600">ብቁ / Qualified</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold">{closedWonLeads}</p>
                  <p className="text-sm text-gray-600">የተሳኩ / Closed Won</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{conversionRate}%</p>
                  <p className="text-sm text-gray-600">የመቀየሪያ መጠን / Conversion Rate</p>
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
              placeholder="በስም፣ ኢሜይል፣ ንብረት ወይም መለያ ይፈልጉ / Search by name, email, property, or ID..."
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
                  ሁኔታ / Status: {filterStatus === "all" ? "ሁሉም / All" : getStatusLabel(filterStatus)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>በሁኔታ ማጣሪያ / Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>ሁሉም ሁኔታዎች / All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("interested")}>ፍላጎት አለው / Interested</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("qualified")}>ብቁ / Qualified</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("closed-won")}>ተሳክቷል / Closed Won</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("closed-lost")}>አልተሳካም / Closed Lost</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  ምንጭ / Source: {filterSource === "all" ? "ሁሉም / All" : getSourceLabel(filterSource)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>በምንጭ ማጣሪያ / Filter by Source</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterSource("all")}>ሁሉም ምንጮች / All Sources</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterSource("website")}>ድረ-ገጽ / Website</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterSource("referral")}>ምክር / Referral</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterSource("social-media")}>
                  ማህበራዊ ሚዲያ / Social Media
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterSource("walk-in")}>በቀጥታ / Walk-in</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>የሽያጭ እድሎች / Sales Leads</CardTitle>
            <CardDescription>ሁሉም የሽያጭ እድሎች እና ሁኔታቸው / All sales leads and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>መለያ / Lead ID</TableHead>
                  <TableHead>ደንበኛ / Customer</TableHead>
                  <TableHead>ንብረት እና ክፍል / Property & Unit</TableHead>
                  <TableHead>በጀት / Budget</TableHead>
                  <TableHead>ምንጭ / Source</TableHead>
                  <TableHead>ሁኔታ / Status</TableHead>
                  <TableHead>የመከታተያ ቀን / Follow-up Date</TableHead>
                  <TableHead className="text-right">እርምጃዎች / Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-gray-50">
                    <TableCell>
                      <span className="font-mono text-sm font-medium">{lead.id}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>
                            {lead.name
                              .split(" ")
                              .slice(-2)
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{lead.name}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Mail className="h-3 w-3" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Phone className="h-3 w-3" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{lead.property}</p>
                        <p className="text-xs text-gray-500">ክፍል / Unit {lead.unit}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{lead.budget.toLocaleString()} ብር</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getSourceLabel(lead.source)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.status)}>{getStatusLabel(lead.status)}</Badge>
                    </TableCell>
                    <TableCell>
                      {lead.followUpDate ? (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{new Date(lead.followUpDate).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/admin/sales/${lead.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/admin/sales/${lead.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          <Phone className="h-4 w-4" />
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
        {filteredLeads.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ምንም የሽያጭ እድሎች አልተገኙም / No sales leads found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all" || filterSource !== "all"
                  ? "የፍለጋ ወይም የማጣሪያ መስፈርቶችዎን ማስተካከል ይሞክሩ / Try adjusting your search or filter criteria."
                  : "የመጀመሪያ የሽያጭ እድልዎን በመጨመር ይጀምሩ / Get started by adding your first sales lead."}
              </p>
              {!searchTerm && filterStatus === "all" && filterSource === "all" && (
                <Button asChild>
                  <Link href="/dashboard/admin/sales/new">
                    <Plus className="h-4 w-4 mr-2" />
                    አዲስ እድል / New Lead
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
