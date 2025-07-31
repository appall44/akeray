"use client"

import { useState } from "react"
import { Bell, Search, Filter, Eye, CheckCircle, Clock, AlertCircle, Mail, MessageSquare } from "lucide-react"
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

const notifications = [
  {
    id: "NOT-001",
    title: "Payment Received",
    message: "Rent payment of 25,000 ETB received from Tigist Haile for Bole Apartments Unit 3B",
    type: "payment",
    status: "read",
    date: "2024-01-10T10:30:00",
    priority: "normal",
  },
  {
    id: "NOT-002",
    title: "Maintenance Completed",
    message: "Plumbing maintenance in Kazanchis Complex Unit 2A has been completed successfully",
    type: "maintenance",
    status: "unread",
    date: "2024-01-09T14:15:00",
    priority: "normal",
  },
  {
    id: "NOT-003",
    title: "Lease Renewal Required",
    message: "Lease for Hanan Ahmed in Piassa Plaza Unit 4A expires in 15 days. Renewal action required",
    type: "lease",
    status: "unread",
    date: "2024-01-08T09:00:00",
    priority: "high",
  },
  {
    id: "NOT-004",
    title: "New Tenant Application",
    message: "New tenant application received for CMC Towers Unit 1B. Review required",
    type: "application",
    status: "read",
    date: "2024-01-07T16:45:00",
    priority: "normal",
  },
  {
    id: "NOT-005",
    title: "Overdue Payment Alert",
    message: "Payment overdue for Dawit Mekonnen in Kazanchis Complex Unit 2A. Amount: 28,000 ETB",
    type: "payment",
    status: "unread",
    date: "2024-01-06T11:20:00",
    priority: "high",
  },
]

export default function OwnerNotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "read":
        return "bg-gray-100 text-gray-800"
      case "unread":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-emerald-100 text-emerald-800"
      case "maintenance":
        return "bg-orange-100 text-orange-800"
      case "lease":
        return "bg-purple-100 text-purple-800"
      case "application":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-gray-100 text-gray-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return CheckCircle
      case "maintenance":
        return AlertCircle
      case "lease":
        return Clock
      case "application":
        return Mail
      default:
        return Bell
    }
  }

  const unreadCount = filteredNotifications.filter((n) => n.status === "unread").length
  const highPriorityCount = filteredNotifications.filter((n) => n.priority === "high").length

  return (
    <DashboardLayout userRole="owner" userName="Mulugeta Assefa" userEmail="mulugeta@akeray.et">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Notifications
              </h1>
              <p className="text-lg text-gray-600">Stay updated with important alerts and messages about your properties</p>
              <p className="text-sm text-gray-500">Monitor payments, maintenance, lease renewals, and tenant communications</p>
            </div>
            <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300">
              <MessageSquare className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-blue-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">Total Notifications</p>
                    <p className="text-3xl font-bold text-gray-900">{filteredNotifications.length}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-blue-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <Bell className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-emerald-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">Unread</p>
                    <p className="text-3xl font-bold text-gray-900">{unreadCount}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-emerald-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <Mail className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-red-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">High Priority</p>
                    <p className="text-3xl font-bold text-gray-900">{highPriorityCount}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-red-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-750" style={{ animationFillMode: "forwards" }}>
            <Card className="hover:shadow-xl transition-all duration-500 border-l-4 border-purple-200 group cursor-pointer transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600">This Week</p>
                    <p className="text-3xl font-bold text-gray-900">{filteredNotifications.length}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-purple-50 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications by title, message, or ID..."
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
                    Type: {filterType === "all" ? "All" : filterType}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterType("all")}>All Types</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("payment")}>Payment</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("maintenance")}>Maintenance</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("lease")}>Lease</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("application")}>Application</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-blue-300 hover:bg-blue-50 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {filterStatus === "all" ? "All" : filterStatus}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("unread")}>Unread</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("read")}>Read</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1100" style={{ animationFillMode: "forwards" }}>
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Notification History</CardTitle>
              <CardDescription>
                All notifications and alerts related to your properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification, index) => {
                  const TypeIcon = getTypeIcon(notification.type)
                  return (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-300 border group hover:shadow-lg ${
                        notification.status === "unread" 
                          ? "bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200" 
                          : "bg-white border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className={`p-3 rounded-2xl ${notification.status === "unread" ? "bg-blue-100" : "bg-gray-100"} group-hover:scale-110 transition-transform duration-300`}>
                          <TypeIcon className={`h-6 w-6 ${notification.status === "unread" ? "text-blue-600" : "text-gray-600"}`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${notification.status === "unread" ? "text-gray-900" : "text-gray-700"}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge className={getTypeColor(notification.type)}>
                              {notification.type}
                            </Badge>
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            <Badge className={getStatusColor(notification.status)}>
                              {notification.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            {new Date(notification.date).toLocaleString()}
                          </p>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterType !== "all" || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "You're all caught up! No new notifications."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}