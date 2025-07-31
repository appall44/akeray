"use client"

import { useState } from "react"
import { Settings, Save, Bell, Mail, Smartphone, Shield, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: "አከራይ PMS / Akeray PMS",
    systemEmail: "admin@akeray.et",
    systemPhone: "+251911234567",
    currency: "ETB",
    language: "am-en",
    timezone: "Africa/Addis_Ababa",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    paymentReminders: true,
    maintenanceAlerts: true,
    leaseExpiryNotices: true,

    // SMS Settings
    smsProvider: "geez",
    smsApiKey: "your-geez-api-key",
    smsTemplate: "ውድ {tenant_name}, የክራይ ክፍያዎ {amount} ብር በ{due_date} ይጠበቃል።",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "admin@akeray.et",
    smtpPassword: "your-app-password",

    // Security Settings
    sessionTimeout: "30",
    passwordMinLength: "8",
    requireTwoFactor: false,
    allowMultipleSessions: true,

    // Backup Settings
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: "30",
  })

  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "ቅንብሮች ተቀምጠዋል / Settings Saved",
      description: "የሲስተም ቅንብሮች በተሳካ ሁኔታ ተዘምነዋል / System settings have been updated successfully",
    })
  }

  return (
    <DashboardLayout userRole="admin" userName="አስተዳዳሪ አበበ / Admin Abebe" userEmail="admin@akeray.et">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              የሲስተም ቅንብሮች / System Settings
            </h1>
            <p className="text-gray-600 mt-1">
              የሲስተም ውቅሮች እና ምርጫዎች ያስተዳድሩ / Manage system configurations and preferences
            </p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            ቅንብሮች ቀምጥ / Save Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-emerald-600" />
                <span>አጠቃላይ ቅንብሮች / General Settings</span>
              </CardTitle>
              <CardDescription>መሰረታዊ የሲስተም መረጃዎች / Basic system information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systemName">የሲስተም ስም / System Name</Label>
                <Input
                  id="systemName"
                  value={settings.systemName}
                  onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="systemEmail">የሲስተም ኢሜይል / System Email</Label>
                <Input
                  id="systemEmail"
                  type="email"
                  value={settings.systemEmail}
                  onChange={(e) => setSettings({ ...settings, systemEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="systemPhone">የሲስተም ስልክ / System Phone</Label>
                <Input
                  id="systemPhone"
                  value={settings.systemPhone}
                  onChange={(e) => setSettings({ ...settings, systemPhone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">ምንዛሬ / Currency</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) => setSettings({ ...settings, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETB">ኢትዮጵያ ብር (ETB)</SelectItem>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">ቋንቋ / Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => setSettings({ ...settings, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="am-en">አማርኛ-English</SelectItem>
                    <SelectItem value="am">አማርኛ</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <span>የማሳወቂያ ቅንብሮች / Notification Settings</span>
              </CardTitle>
              <CardDescription>የማሳወቂያ ምርጫዎች ያስተዳድሩ / Manage notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>የኢሜይል ማሳወቂያዎች / Email Notifications</Label>
                  <p className="text-sm text-gray-500">በኢሜይል ማሳወቂያዎችን ይላኩ / Send notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>የSMS ማሳወቂያዎች / SMS Notifications</Label>
                  <p className="text-sm text-gray-500">በSMS ማሳወቂያዎችን ይላኩ / Send notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>የክፍያ ማስታወሻዎች / Payment Reminders</Label>
                  <p className="text-sm text-gray-500">የክፍያ ማስታወሻዎችን በራስ-ሰር ይላኩ / Send automatic payment reminders</p>
                </div>
                <Switch
                  checked={settings.paymentReminders}
                  onCheckedChange={(checked) => setSettings({ ...settings, paymentReminders: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>የጥገና ማንቂያዎች / Maintenance Alerts</Label>
                  <p className="text-sm text-gray-500">የጥገና ጥያቄዎች ማንቂያዎችን ይላኩ / Send maintenance request alerts</p>
                </div>
                <Switch
                  checked={settings.maintenanceAlerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceAlerts: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>የውል ማብቂያ ማሳወቂያዎች / Lease Expiry Notices</Label>
                  <p className="text-sm text-gray-500">የውል ማብቂያ ማሳወቂያዎችን ይላኩ / Send lease expiry notifications</p>
                </div>
                <Switch
                  checked={settings.leaseExpiryNotices}
                  onCheckedChange={(checked) => setSettings({ ...settings, leaseExpiryNotices: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* SMS Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-purple-600" />
                <span>የSMS ቅንብሮች / SMS Settings</span>
              </CardTitle>
              <CardDescription>የSMS አገልግሎት ቅንብሮች / SMS service configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smsProvider">የSMS አቅራቢ / SMS Provider</Label>
                <Select
                  value={settings.smsProvider}
                  onValueChange={(value) => setSettings({ ...settings, smsProvider: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geez">Geez SMS</SelectItem>
                    <SelectItem value="ethio-telecom">Ethio Telecom</SelectItem>
                    <SelectItem value="safaricom">Safaricom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smsApiKey">የAPI ቁልፍ / API Key</Label>
                <Input
                  id="smsApiKey"
                  type="password"
                  value={settings.smsApiKey}
                  onChange={(e) => setSettings({ ...settings, smsApiKey: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smsTemplate">የSMS አብነት / SMS Template</Label>
                <Textarea
                  id="smsTemplate"
                  value={settings.smsTemplate}
                  onChange={(e) => setSettings({ ...settings, smsTemplate: e.target.value })}
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  ተለዋዋጮች: {"{tenant_name}, {amount}, {due_date}, {property_name}"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-orange-600" />
                <span>የኢሜይል ቅንብሮች / Email Settings</span>
              </CardTitle>
              <CardDescription>የSMTP ኢሜይል ቅንብሮች / SMTP email configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP አስተናጋጅ / SMTP Host</Label>
                <Input
                  id="smtpHost"
                  value={settings.smtpHost}
                  onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP ወደብ / SMTP Port</Label>
                <Input
                  id="smtpPort"
                  value={settings.smtpPort}
                  onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpUsername">የተጠቃሚ ስም / Username</Label>
                <Input
                  id="smtpUsername"
                  value={settings.smtpUsername}
                  onChange={(e) => setSettings({ ...settings, smtpUsername: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPassword">የይለፍ ቃል / Password</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>የደህንነት ቅንብሮች / Security Settings</span>
              </CardTitle>
              <CardDescription>የሲስተም ደህንነት ውቅሮች / System security configurations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">የክፍለ-ጊዜ ማብቂያ (ደቂቃዎች) / Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordMinLength">ዝቅተኛ የይለፍ ቃል ርዝመት / Minimum Password Length</Label>
                <Input
                  id="passwordMinLength"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => setSettings({ ...settings, passwordMinLength: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ሁለት-ደረጃ ማረጋገጫ / Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">ተጨማሪ ደህንነት ያስፈልጋል / Require additional security</p>
                </div>
                <Switch
                  checked={settings.requireTwoFactor}
                  onCheckedChange={(checked) => setSettings({ ...settings, requireTwoFactor: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ብዙ ክፍለ-ጊዜዎች / Multiple Sessions</Label>
                  <p className="text-sm text-gray-500">ብዙ መሳሪያዎች ላይ መግባትን ይፍቀዱ / Allow login on multiple devices</p>
                </div>
                <Switch
                  checked={settings.allowMultipleSessions}
                  onCheckedChange={(checked) => setSettings({ ...settings, allowMultipleSessions: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Backup Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-green-600" />
                <span>የመጠባበቂያ ቅንብሮች / Backup Settings</span>
              </CardTitle>
              <CardDescription>የውሂብ መጠባበቂያ ውቅሮች / Data backup configurations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ራስ-ሰር መጠባበቂያ / Automatic Backup</Label>
                  <p className="text-sm text-gray-500">ራስ-ሰር የውሂብ መጠባበቂያ ያንቁ / Enable automatic data backup</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">የመጠባበቂያ ድግግሞሽ / Backup Frequency</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">በየሰዓቱ / Hourly</SelectItem>
                    <SelectItem value="daily">በየቀኑ / Daily</SelectItem>
                    <SelectItem value="weekly">በየሳምንቱ / Weekly</SelectItem>
                    <SelectItem value="monthly">በየወሩ / Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupRetention">የመጠባበቂያ ማቆያ (ቀናት) / Backup Retention (days)</Label>
                <Input
                  id="backupRetention"
                  type="number"
                  value={settings.backupRetention}
                  onChange={(e) => setSettings({ ...settings, backupRetention: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline">ተመለስ / Reset</Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            ቅንብሮች ቀምጥ / Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
