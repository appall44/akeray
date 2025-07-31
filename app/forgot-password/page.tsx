"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast({
        title: "Reset Link Sent",
        description: "Check your email and SMS for the password reset link",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] to-[#F5F7FA] flex items-center justify-center p-4">
      <Card className="w-full max-w-md fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-[#4A90E2] rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-poppins font-bold text-[#333333]">Reset Your Password</CardTitle>
          <CardDescription className="text-gray-600">
            {isSubmitted
              ? "We've sent a reset link to your email and SMS"
              : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 h-12 rounded-lg border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#4A90E2] hover:bg-[#2F80ED] text-white font-medium rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Send Reset Link</span>
                  </div>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-gray-600">
                If an account with that email exists, you'll receive reset instructions shortly.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center space-x-2 text-[#4A90E2] hover:underline text-sm">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
