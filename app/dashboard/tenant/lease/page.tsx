"use client"

import { FileText, Download, Calendar, Home, User, DollarSign, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"

const leaseInfo = {
  id: "LSE-001",
  property: "Sunrise Apartments",
  unit: "Apartment 3B",
  address: "123 Bole Road, Addis Ababa",
  tenant: "Meron Tadesse",
  landlord: "Mulugeta Assefa",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  monthlyRent: 18000,
  deposit: 36000,
  status: "active",
  renewalOption: true,
  noticePeriod: 30,
  lateFeePenalty: 500,
}

const leaseTerms = [
  "Monthly rent payment due on the 1st of each month",
  "Security deposit of 36,000 ETB (equivalent to 2 months rent)",
  "30-day notice required for lease termination",
  "Late payment fee of 500 ETB after 5 days grace period",
  "Tenant responsible for utilities (electricity, water, internet)",
  "No pets allowed without written permission",
  "Property maintenance requests to be submitted through the system",
  "Lease automatically renewable for another year with mutual agreement",
]

const paymentSchedule = [
  { month: "January 2024", amount: 18000, status: "paid", date: "2024-01-01" },
  { month: "February 2024", amount: 18000, status: "paid", date: "2024-02-01" },
  { month: "March 2024", amount: 18000, status: "paid", date: "2024-03-01" },
  { month: "April 2024", amount: 18000, status: "paid", date: "2024-04-01" },
  { month: "May 2024", amount: 18000, status: "paid", date: "2024-05-01" },
  { month: "June 2024", amount: 18000, status: "paid", date: "2024-06-01" },
]

export default function TenantLeasePage() {
  const daysUntilExpiry = Math.ceil((new Date(leaseInfo.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <DashboardLayout userRole="tenant" userName="Meron Tadesse" userEmail="meron@email.com">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                My Lease Agreement
              </h1>
              <p className="text-lg text-gray-600">View your current lease details and terms</p>
              <p className="text-sm text-gray-500">Download lease documents and track important dates</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-emerald-300 hover:bg-emerald-50 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300">
                <FileText className="h-4 w-4 mr-2" />
                Request Renewal
              </Button>
            </div>
          </div>
        </div>

        {/* Lease Overview */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
          <Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Home className="h-6 w-6 text-emerald-600" />
                <span>Lease Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Property</p>
                  <p className="text-lg font-semibold text-gray-900">{leaseInfo.property}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {leaseInfo.unit}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Lease Period</p>
                  <p className="text-sm font-semibold text-gray-900">{new Date(leaseInfo.startDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">to {new Date(leaseInfo.endDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Monthly Rent</p>
                  <p className="text-lg font-bold text-emerald-600">{leaseInfo.monthlyRent.toLocaleString()} ETB</p>
                  <p className="text-sm text-gray-600">Deposit: {leaseInfo.deposit.toLocaleString()} ETB</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge className="bg-emerald-100 text-emerald-800 font-semibold">{leaseInfo.status}</Badge>
                  <p className="text-sm text-gray-600">{daysUntilExpiry} days remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Lease Terms */}
          <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <span>Lease Terms & Conditions</span>
                </CardTitle>
                <CardDescription>Important terms and conditions of your lease agreement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaseTerms.map((term, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{term}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Landlord Information */}
          <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-800" style={{ animationFillMode: "forwards" }}>
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <User className="h-6 w-6 text-purple-600" />
                  <span>Landlord Information</span>
                </CardTitle>
                <CardDescription>Contact details for your property owner</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                    <Avatar className="h-16 w-16 ring-4 ring-purple-200">
                      <AvatarImage src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-lg">
                        MA
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-gray-900">{leaseInfo.landlord}</p>
                      <p className="text-sm text-gray-600">Property Owner</p>
                      <p className="text-sm text-purple-600 font-medium">Akeray Properties</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-600 font-bold">📞</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">+251-911-123456</p>
                        <p className="text-xs text-gray-500">Phone</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">✉️</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">mulugeta@akeray.et</p>
                        <p className="text-xs text-gray-500">Email</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Emergency Contact</h4>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-red-50 border border-red-100">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-bold">🚨</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">+251-911-654321</p>
                        <p className="text-xs text-gray-500">24/7 Emergency Line</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Important Dates */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000" style={{ animationFillMode: "forwards" }}>
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Calendar className="h-6 w-6 text-orange-600" />
                <span>Important Dates</span>
              </CardTitle>
              <CardDescription>Key dates and deadlines for your lease</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Lease Start</h3>
                  <p className="text-lg font-bold text-emerald-600">{new Date(leaseInfo.startDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Agreement began</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Lease End</h3>
                  <p className="text-lg font-bold text-yellow-600">{new Date(leaseInfo.endDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">{daysUntilExpiry} days remaining</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Notice Period</h3>
                  <p className="text-lg font-bold text-purple-600">{leaseInfo.noticePeriod} days</p>
                  <p className="text-sm text-gray-500">Required for termination</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}