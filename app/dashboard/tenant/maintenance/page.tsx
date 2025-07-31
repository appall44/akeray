"use client"

import { useState } from "react"
import { Wrench, Plus, Search, Filter, Eye, Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react"
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

const maintenanceRequests = [
  {
    id: "MNT-001",
    title: "Kitchen faucet leak",
    description: "Water dripping from kitchen sink faucet continuously",
    category: "plumbing",
    priority: "medium",
    status: "completed",
    submittedDate: "2024-12-15",
    completedDate: "2024-12-18",
    assignedTo: "Mike Wilson",
    estimatedCost: 500,
    actualCost: 450,
  },
  {
    id: "MNT-002",
    title: "Bedroom light fixture",
    description: "Light bulb needs replacement in master bedroom ceiling fixture",
    category: "electrical",
    priority: "low",
    status: "in_progress",
    submittedDate: "2024-12-20",
    completedDate: null,
    assignedTo: "Tom Anderson",
    estimatedCost: 200,
    actualCost: null,
  },
  {
    id: "MNT-003",
    title: "Bathroom door lock",
    description: "Bathroom door lock is stuck and difficult to open/close",
    category: "general",
    priority: "medium",
    status: "open",
    submittedDate: "2024-12-22",
    completedDate: null,
    assignedTo: null,
    estimatedCost: 300,
    actualCost: null,
  },
  {
    id: "MNT-004",
    title: "Air conditioning not cooling",
    description: "AC unit in living room not producing cold air, only warm air",
    category: "hvac",
    priority: "high",
    status: "open",
    submittedDate: "2024-12-23",
    completedDate: null,
    assignedTo: null,
    estimatedCost: 1500,
    actualCost: null,
  },
]

export default function TenantMaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const filteredRequests = maintenanceRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || request.status === filterStatus
    const matchesPriority = filterPriority === "all" || request.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-emerald-100 text-emerald-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return AlertTriangle
      case "in_progress":
        return Clock
      case "completed":
        return CheckCircle
      default:
        return Clock
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "plumbing":
        return "Plumbing"
      case "electrical":
        return "Electrical"
      case "hvac":
        return "HVAC"
      case "general":
        return "General"
      default:
        return category
    }
  }

  const openRequests = filteredRequests.filter((r) => r.status === "open").length
  const inProgressRequests = filteredRequests.filter((r) => r.status === "in_progress").length
  const completedRequests = filteredRequests.filter((r) => r.status === "completed").length

  return (
    <DashboardLayout userRole="tenant" userName="Meron Tadesse" userEmail="meron@email.com">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Maintenance Requests
              </h1>
              <p className="text-lg text-gray-600">Submit and track maintenance requests for your apartment</p>
              <p className="text-sm text-gray-500">Report issues and monitor repair progress</p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/dashboard/tenant/maintenance/new">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-red-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">Open Requests</p>
                    <p className="text-3xl font-bold text-gray-900">{openRequests}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-red-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
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
                    <p className="text-sm font-semibold text-gray-600">In Progress</p>
                    <p className="text-3xl font-bold text-gray-900">{inProgressRequests}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-yellow-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">Completed</p>
                    <p className="text-3xl font-bold text-gray-900">{completedRequests}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
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
                placeholder="Search by title, description, or request ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
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
                  <DropdownMenuItem onClick={() => setFilterStatus("open")}>Open</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("in_progress")}>In Progress</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("completed")}>Completed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-blue-300 hover:bg-blue-50 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Priority: {filterPriority === "all" ? "All" : filterPriority}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterPriority("all")}>All Priority</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority("high")}>High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority("medium")}>Medium</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority("low")}>Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Maintenance Requests Table */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">My Maintenance Requests</CardTitle>
              <CardDescription>
                Track all your maintenance requests and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Title & Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => {
                    const StatusIcon = getStatusIcon(request.status)
                    return (
                      <TableRow key={request.id} className="hover:bg-gray-50">
                        <TableCell>
                          <span className="font-mono text-sm font-medium">{request.id}</span>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div>
                            <p className="font-medium text-sm">{request.title}</p>
                            <p className="text-xs text-gray-500 truncate">{request.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {getCategoryLabel(request.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="h-4 w-4" />
                            <Badge className={getStatusColor(request.status)}>
                              {request.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{new Date(request.submittedDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {request.assignedTo ? (
                            <span className="text-sm">{request.assignedTo}</span>
                          ) : (
                            <span className="text-sm text-gray-400">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/tenant/maintenance/${request.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
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
        {filteredRequests.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all" || filterPriority !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "You haven't submitted any maintenance requests yet."}
              </p>
              {!searchTerm && filterStatus === "all" && filterPriority === "all" && (
                <Button asChild>
                  <Link href="/dashboard/tenant/maintenance/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Request
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