"use client"

import { useState } from "react"
import { BarChart3, Download, Calendar, TrendingUp, DollarSign, Building, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import DashboardLayout from "@/components/dashboard-layout"

const revenueData = [
  { month: "ጃንዩወሪ / Jan", revenue: 2450000, target: 2500000 },
  { month: "ፌብሩወሪ / Feb", revenue: 2680000, target: 2500000 },
  { month: "ማርች / Mar", revenue: 2320000, target: 2500000 },
  { month: "ኤፕሪል / Apr", revenue: 2890000, target: 2500000 },
  { month: "ሜይ / May", revenue: 3100000, target: 2500000 },
  { month: "ጁን / Jun", revenue: 2950000, target: 2500000 },
]

const propertyPerformance = [
  {
    name: "የፀሐይ መውጫ አፓርትመንቶች / Sunrise Apartments",
    occupancy: 90,
    revenue: 450000,
    units: 20,
    trend: "up",
  },
  {
    name: "አረንጓዴ ሸለቆ ኮምፕሌክስ / Green Valley Complex",
    occupancy: 80,
    revenue: 720000,
    units: 30,
    trend: "stable",
  },
  {
    name: "የከተማ ማዕከል ፕላዛ / City Center Plaza",
    occupancy: 100,
    revenue: 600000,
    units: 15,
    trend: "up",
  },
  {
    name: "የወንዝ ዳርቻ ታወሮች / Riverside Towers",
    occupancy: 88,
    revenue: 880000,
    units: 25,
    trend: "down",
  },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<any>(null)
  const [reportType, setReportType] = useState("revenue")
  const [propertyFilter, setPropertyFilter] = useState("all")

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const averageOccupancy = Math.round(
    propertyPerformance.reduce((sum, prop) => sum + prop.occupancy, 0) / propertyPerformance.length,
  )
  const totalUnits = propertyPerformance.reduce((sum, prop) => sum + prop.units, 0)

  return (
    <DashboardLayout userRole="admin" userName="አስተዳዳሪ አበበ / Admin Abebe" userEmail="admin@akeray.et">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              ሪፖርቶች እና ትንታኔዎች / Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              የንብረት አፈጻጸም እና የገንዘብ ሪፖርቶች / Property performance and financial reports
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              ወደ PDF ላክ / Export PDF
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              ወደ Excel ላክ / Export Excel
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="የሪፖርት አይነት / Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">የገቢ ሪፖርት / Revenue Report</SelectItem>
              <SelectItem value="occupancy">የመኖሪያ ሪፖርት / Occupancy Report</SelectItem>
              <SelectItem value="maintenance">የጥገና ሪፖርት / Maintenance Report</SelectItem>
              <SelectItem value="payments">የክፍያ ሪፖርት / Payment Report</SelectItem>
            </SelectContent>
          </Select>

          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="ንብረት ይምረጡ / Select Property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ሁሉም ንብረቶች / All Properties</SelectItem>
              <SelectItem value="sunrise">የፀሐይ መውጫ አፓርትመንቶች</SelectItem>
              <SelectItem value="green-valley">አረንጓዴ ሸለቆ ኮምፕሌክስ</SelectItem>
              <SelectItem value="city-center">የከተማ ማዕከል ፕላዛ</SelectItem>
              <SelectItem value="riverside">የወንዝ ዳርቻ ታወሮች</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange date={dateRange} setDate={setDateRange} placeholder="ቀን ክልል ይምረጡ / Select date range" />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold">{(totalRevenue / 1000000).toFixed(1)}M ብር</p>
                  <p className="text-sm text-gray-600">ጠቅላላ ገቢ / Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{averageOccupancy}%</p>
                  <p className="text-sm text-gray-600">አማካይ መኖሪያ / Avg Occupancy</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{totalUnits}</p>
                  <p className="text-sm text-gray-600">ጠቅላላ ክፍሎች / Total Units</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">+12.5%</p>
                  <p className="text-sm text-gray-600">የዕድገት መጠን / Growth Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                <span>ወርሃዊ የገቢ ትንታኔ / Monthly Revenue Analysis</span>
              </CardTitle>
              <CardDescription>የባለፉት 6 ወራት የገቢ አፈጻጸም / Revenue performance for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.month}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{(item.revenue / 1000000).toFixed(1)}M ብር</span>
                        <Badge
                          className={
                            item.revenue >= item.target ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {item.revenue >= item.target ? "ላይ / Above" : "ታች / Below"} Target
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(item.revenue / item.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Property Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-blue-600" />
                <span>የንብረት አፈጻጸም / Property Performance</span>
              </CardTitle>
              <CardDescription>የእያንዳንዱ ንብረት መኖሪያ እና ገቢ / Occupancy and revenue by property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {propertyPerformance.map((property, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{property.name}</p>
                        <p className="text-xs text-gray-500">{property.units} ክፍሎች / units</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{(property.revenue / 1000).toFixed(0)}K ብር</p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              property.occupancy >= 90
                                ? "bg-emerald-100 text-emerald-800"
                                : property.occupancy >= 80
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {property.occupancy}%
                          </Badge>
                          {property.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                          {property.trend === "down" && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                        </div>
                      </div>
                    </div>
                    <Progress value={property.occupancy} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Reports */}
        <Card>
          <CardHeader>
            <CardTitle>ተጨማሪ ሪፖርቶች / Additional Reports</CardTitle>
            <CardDescription>ሌሎች የሚገኙ ሪፖርቶች እና ትንታኔዎች / Other available reports and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <FileText className="h-6 w-6 text-blue-600" />
                <span className="text-sm">የክፍያ ሪፖርት / Payment Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Users className="h-6 w-6 text-emerald-600" />
                <span className="text-sm">የተከራይ ሪፖርት / Tenant Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Calendar className="h-6 w-6 text-purple-600" />
                <span className="text-sm">የጥገና ሪፖርት / Maintenance Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
