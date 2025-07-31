"use client"

import { useState } from "react"
import { TrendingUp, User, Building, Phone, Mail, ArrowLeft, Save, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const leadSources = [
  { value: "website", label: "Website", description: "Direct website inquiry" },
  { value: "referral", label: "Referral", description: "Referred by existing customer" },
  { value: "social-media", label: "Social Media", description: "Facebook, Instagram, etc." },
  { value: "walk-in", label: "Walk-in", description: "Direct office visit" },
  { value: "phone", label: "Phone Call", description: "Inbound phone inquiry" },
  { value: "advertisement", label: "Advertisement", description: "Print or online ads" },
]

const leadStatuses = [
  { value: "interested", label: "Interested", color: "bg-blue-100 text-blue-800", description: "Initial interest shown" },
  { value: "qualified", label: "Qualified", color: "bg-yellow-100 text-yellow-800", description: "Meets criteria, ready to proceed" },
  { value: "viewing-scheduled", label: "Viewing Scheduled", color: "bg-purple-100 text-purple-800", description: "Property viewing arranged" },
  { value: "negotiating", label: "Negotiating", color: "bg-orange-100 text-orange-800", description: "In price/terms negotiation" },
  { value: "closed-won", label: "Closed Won", color: "bg-emerald-100 text-emerald-800", description: "Successfully rented" },
  { value: "closed-lost", label: "Closed Lost", color: "bg-red-100 text-red-800", description: "Lost to competitor or declined" },
]

const properties = [
  { id: "1", name: "Sunrise Apartments", units: ["1A", "1B", "2A", "2B"], priceRange: "15000-18000" },
  { id: "2", name: "Green Valley Complex", units: ["1A", "1B", "2A"], priceRange: "18000-22000" },
  { id: "3", name: "City Center Plaza", units: ["1C", "2C"], priceRange: "22000-25000" },
  { id: "4", name: "Riverside Towers", units: ["1A", "2A", "3A"], priceRange: "20000-28000" },
]

export default function NewSalesLeadPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    phone: "",
    email: "",
    occupation: "",
    propertyId: "",
    interestedUnit: "",
    budget: "",
    source: "",
    status: "interested",
    contactDate: new Date(),
    followUpDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    notes: "",
    requirements: "",
    familySize: "",
    moveInDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    currentAddress: "",
    referredBy: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const selectedProperty = properties.find(p => p.id === formData.propertyId)
  const selectedSource = leadSources.find(s => s.value === formData.source)
  const selectedStatus = leadStatuses.find(s => s.value === formData.status)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.fullName || !formData.phone || !formData.source || !formData.budget) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (!formData.phone.startsWith("+251")) {
      setError("Phone number must start with +251")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Sales Lead Created!",
        description: `Lead for ${formData.fullName} has been added to the system successfully.`,
      })
      router.push("/dashboard/admin/sales")
    }, 2000)
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin Aseffa Bekele" userEmail="aseffa@akeray.et">
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in fade-in duration-1000">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" asChild className="border-emerald-300 hover:bg-emerald-50">
              <Link href="/dashboard/admin/sales">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sales
              </Link>
            </Button>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Add New Sales Lead
            </h1>
            <p className="text-lg text-gray-600">Create a new sales lead and track potential tenant</p>
            <p className="text-sm text-gray-500">Manage prospects and convert them to tenants</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="xl:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Contact Information</CardTitle>
                    <CardDescription>Basic information about the potential tenant</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                          Full Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="fullName"
                            placeholder="Enter full name"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fatherName" className="text-sm font-semibold text-gray-700">
                          Father's Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="fatherName"
                            placeholder="Enter father's name"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.fatherName}
                            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                          Phone Number *
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            placeholder="+251911234567"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="occupation" className="text-sm font-semibold text-gray-700">
                          Occupation
                        </Label>
                        <Input
                          id="occupation"
                          placeholder="e.g., Software Engineer, Teacher"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.occupation}
                          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="familySize" className="text-sm font-semibold text-gray-700">
                          Family Size
                        </Label>
                        <Input
                          id="familySize"
                          type="number"
                          placeholder="2"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.familySize}
                          onChange={(e) => setFormData({ ...formData, familySize: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentAddress" className="text-sm font-semibold text-gray-700">
                        Current Address
                      </Label>
                      <Input
                        id="currentAddress"
                        placeholder="Current residential address"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.currentAddress}
                        onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Property Interest */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Property Interest</CardTitle>
                    <CardDescription>Property preferences and requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="property" className="text-sm font-semibold text-gray-700">
                          Interested Property
                        </Label>
                        <Select value={formData.propertyId} onValueChange={(value) => setFormData({ ...formData, propertyId: value, interestedUnit: "" })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            {properties.map((property) => (
                              <SelectItem key={property.id} value={property.id}>
                                <div className="flex items-center space-x-3">
                                  <Building className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p className="font-medium">{property.name}</p>
                                    <p className="text-xs text-gray-500">{property.priceRange} ETB/month</p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interestedUnit" className="text-sm font-semibold text-gray-700">
                          Preferred Unit
                        </Label>
                        <Select 
                          value={formData.interestedUnit} 
                          onValueChange={(value) => setFormData({ ...formData, interestedUnit: value })}
                          disabled={!formData.propertyId}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedProperty?.units.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                Unit {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-sm font-semibold text-gray-700">
                          Budget Range (ETB/month) *
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="budget"
                            type="number"
                            placeholder="25000"
                            className="pl-10 h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Preferred Move-in Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.moveInDate ? format(formData.moveInDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={formData.moveInDate}
                              onSelect={(date) => date && setFormData({ ...formData, moveInDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements" className="text-sm font-semibold text-gray-700">
                        Specific Requirements
                      </Label>
                      <Textarea
                        id="requirements"
                        placeholder="Any specific requirements, preferences, or needs (e.g., parking, pet-friendly, furnished, etc.)..."
                        className="min-h-20 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lead Management */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-900" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Lead Management</CardTitle>
                    <CardDescription>Track lead source, status, and follow-up schedule</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="source" className="text-sm font-semibold text-gray-700">
                          Lead Source *
                        </Label>
                        <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue placeholder="How did they find us?" />
                          </SelectTrigger>
                          <SelectContent>
                            {leadSources.map((source) => (
                              <SelectItem key={source.value} value={source.value}>
                                <div>
                                  <p className="font-medium">{source.label}</p>
                                  <p className="text-xs text-gray-500">{source.description}</p>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status" className="text-sm font-semibold text-gray-700">
                          Lead Status
                        </Label>
                        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {leadStatuses.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${
                                    status.value === 'interested' ? 'bg-blue-500' :
                                    status.value === 'qualified' ? 'bg-yellow-500' :
                                    status.value === 'viewing-scheduled' ? 'bg-purple-500' :
                                    status.value === 'negotiating' ? 'bg-orange-500' :
                                    status.value === 'closed-won' ? 'bg-emerald-500' : 'bg-red-500'
                                  }`} />
                                  <div>
                                    <p className="font-medium">{status.label}</p>
                                    <p className="text-xs text-gray-500">{status.description}</p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Contact Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.contactDate ? format(formData.contactDate, "PPP") : "Pick contact date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={formData.contactDate}
                              onSelect={(date) => date && setFormData({ ...formData, contactDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Follow-up Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.followUpDate ? format(formData.followUpDate, "PPP") : "Pick follow-up date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={formData.followUpDate}
                              onSelect={(date) => date && setFormData({ ...formData, followUpDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {formData.source === "referral" && (
                      <div className="space-y-2">
                        <Label htmlFor="referredBy" className="text-sm font-semibold text-gray-700">
                          Referred By
                        </Label>
                        <Input
                          id="referredBy"
                          placeholder="Name of person who referred this lead"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                          value={formData.referredBy}
                          onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">
                        Notes & Comments
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Additional notes about the lead, conversation details, preferences, etc..."
                        className="min-h-24 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-8">
              {/* Lead Summary */}
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600" style={{ animationFillMode: "forwards" }}>
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Lead Summary</CardTitle>
                    <CardDescription>Review lead information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.fullName && (
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <User className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-800">Contact</h4>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium text-blue-900">{formData.fullName}</p>
                          {formData.occupation && <p className="text-blue-700">{formData.occupation}</p>}
                          {formData.phone && <p className="text-blue-600">{formData.phone}</p>}
                          {formData.email && <p className="text-blue-600">{formData.email}</p>}
                        </div>
                      </div>
                    )}

                    {selectedProperty && (
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <Building className="h-5 w-5 text-emerald-600" />
                          <h4 className="font-semibold text-emerald-800">Property Interest</h4>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium text-emerald-900">{selectedProperty.name}</p>
                          {formData.interestedUnit && <p className="text-emerald-700">Unit {formData.interestedUnit}</p>}
                          <p className="text-emerald-600">{selectedProperty.priceRange} ETB/month</p>
                        </div>
                      </div>
                    )}

                    {formData.budget && (
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <div className="flex items-center space-x-3 mb-2">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-800">Budget</h4>
                        </div>
                        <p className="text-2xl font-bold text-purple-900">{parseFloat(formData.budget).toLocaleString()} ETB</p>
                        <p className="text-xs text-purple-600">per month</p>
                      </div>
                    )}

                    {selectedSource && (
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                        <div className="flex items-center space-x-3 mb-2">
                          <TrendingUp className="h-5 w-5 text-orange-600" />
                          <h4 className="font-semibold text-orange-800">Lead Source</h4>
                        </div>
                        <p className="font-medium text-orange-900">{selectedSource.label}</p>
                        <p className="text-xs text-orange-600">{selectedSource.description}</p>
                      </div>
                    )}

                    {selectedStatus && (
                      <div className={`p-4 rounded-xl border ${
                        selectedStatus.value === 'interested' ? 'bg-blue-50 border-blue-200' :
                        selectedStatus.value === 'qualified' ? 'bg-yellow-50 border-yellow-200' :
                        selectedStatus.value === 'closed-won' ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <Badge className={selectedStatus.color}>
                          {selectedStatus.label}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-2">{selectedStatus.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1200" style={{ animationFillMode: "forwards" }}>
            <div className="flex justify-end space-x-4 mt-8">
              <Button type="button" variant="outline" asChild className="border-gray-300 hover:bg-gray-50">
                <Link href="/dashboard/admin/sales">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Lead...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Save className="h-5 w-5" />
                    <span>Create Lead</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}