"use client"

import { useState } from "react"
import { Bell, Plus, Search, Filter, Eye, Trash2, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"
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

const notifications = [
  {
    id: "NOT-001",
    title: "የክፍያ ማስታወሻ / Payment Reminder",
    message: "ለአበበ ከበደ የክራይ ክፍያ ማስታወሻ ተልኳል / Rent payment reminder sent to Abebe Kebede",
    type: "payment",
    status: "sent",
    recipient: "አበበ ከበደ / Abebe Kebede",
    sentDate: "2024-01-10T10:30:00",
    method: "SMS",
  },
  {
    id: "NOT-002",
    title: "የጥገና ዝማኔ / Maintenance Update",
    message: "የቧንቧ ጥገና ተጠናቋል / Plumbing maintenance completed",
    type: "maintenance",
    status: "sent",
    recipient: "ሳራ ለማ / Sara Lemma",
    sentDate: "2024-01-09T14:15:00",
    method: "SMS & Email",
  },
  {
    id: "NOT-003",
    title: "አዲስ ውል / New Lease",
    message: "አዲስ የክራይ ውል ተፈርሟል / New lease agreement signed",
    type: "lease",
    status: "pending",
    recipient: "ሙሉጌታ አሰፋ / Mulugeta Assefa",
    sentDate: "2024-01-08T09:00:00",
    method: "Email",
  },
  {
    id: "NOT-004",
    title: "የውል ማብቂያ ማስታወሻ / Lease Expiry Notice",
    message: "ውልዎ በ30 ቀናት ውስጥ ያበቃል / Your lease expires in 30 days",
    type: "lease",
    status: "failed",
    recipient: "ፋጢማ አሊ / Fatima Ali",
    sentDate: "2024-01-07T16:45:00",
    method: "SMS",
  },
]

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-emerald-100 text-emerald-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return CheckCircle
      case "pending":
        return Clock
      case "failed":
        return AlertCircle
      default:
        return Clock
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "sent":
        return "ተልኳል / Sent"
      case "pending":
        return "በመጠባበቅ / Pending"
      case "failed":
        return "አልተሳካም / Failed"
      default:
        return status
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "payment":
        return "ክፍያ / Payment"
      case "maintenance":
        return "ጥገና / Maintenance"
      case "lease":
        return "ውል / Lease"
      case "general":
        return "አጠቃላይ / General"
      default:
        return type
    }
  }

  const sentNotifications = filteredNotifications.filter((n) => n.status === "sent").length
  const pendingNotifications = filteredNotifications.filter((n) => n.status === "pending").length
  const failedNotifications = filteredNotifications.filter((n) => n.status === "failed").length

  return (
    <DashboardLayout userRole="admin" userName="አስተዳዳሪ አበበ / Admin Abebe" userEmail="admin@akeray.et">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              ማሳወቂያዎች / Notifications
            </h1>
            <p className="text-gray-600 mt-1">ሁሉንም የሲስተም ማሳወቂያዎች ያስተዳድሩ / Manage all system notifications</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            <Link href="/dashboard/admin/notifications/new">
              <Plus className="h-4 w-4 mr-2" />
              አዲስ ማሳወቂያ / New Notification
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{filteredNotifications.length}</p>
                  <p className="text-sm text-gray-600">ጠቅላላ ማሳወቂያዎች / Total Notifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold">{sentNotifications}</p>
                  <p className="text-sm text-gray-600">የተላኩ / Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{pendingNotifications}</p>
                  <p className="text-sm text-gray-600">በመጠባበቅ / Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{failedNotifications}</p>
                  <p className="text-sm text-gray-600">ያልተሳኩ / Failed</p>
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
              placeholder="በርዕስ፣ ተቀባይ ወይም መለያ ይፈልጉ / Search by title, recipient, or ID..."
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
                  አይነት / Type: {filterType === "all" ? "ሁሉም / All" : getTypeLabel(filterType)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>በአይነት ማጣሪያ / Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterType("all")}>ሁሉም አይነቶች / All Types</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("payment")}>ክፍያ / Payment</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("maintenance")}>ጥገና / Maintenance</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("lease")}>ውል / Lease</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <DropdownMenuItem onClick={() => setFilterStatus("sent")}>ተልኳል / Sent</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("pending")}>በመጠባበቅ / Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("failed")}>አልተሳካም / Failed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Notifications Table */}
        <Card>
          <CardHeader>
            <CardTitle>የማሳወቂያ ታሪክ / Notification History</CardTitle>
            <CardDescription>ሁሉም የተላኩ እና በመጠባበቅ ላይ ያሉ ማሳወቂያዎች / All sent and pending notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>መለያ / ID</TableHead>
                  <TableHead>ርዕስ / Title</TableHead>
                  <TableHead>ተቀባይ / Recipient</TableHead>
                  <TableHead>አይነት / Type</TableHead>
                  <TableHead>ዘዴ / Method</TableHead>
                  <TableHead>የተላከበት ቀን / Sent Date</TableHead>
                  <TableHead>ሁኔታ / Status</TableHead>
                  <TableHead className="text-right">እርምጃዎች / Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification) => {
                  const StatusIcon = getStatusIcon(notification.status)
                  return (
                    <TableRow key={notification.id} className="hover:bg-gray-50">
                      <TableCell>
                        <span className="font-mono text-sm font-medium">{notification.id}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{notification.message}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{notification.recipient}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getTypeLabel(notification.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{notification.method}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{new Date(notification.sentDate).toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={getStatusColor(notification.status)}>
                            {getStatusLabel(notification.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {notification.status === "failed" && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ምንም ማሳወቂያዎች አልተገኙም / No notifications found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterType !== "all" || filterStatus !== "all"
                  ? "የፍለጋ ወይም የማጣሪያ መስፈርቶችዎን ማስተካከል ይሞክሩ / Try adjusting your search or filter criteria."
                  : "ምንም የማሳወቂያ ታሪክ የለም / No notification history available."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
