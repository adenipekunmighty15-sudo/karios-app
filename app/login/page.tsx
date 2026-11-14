"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Link } from "@/components/ui/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Mail, Lock, Globe } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const isAdminEmail = (e: string) => e === "admin@karios.com"

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      })
      return
    }

    // Simple role-based login
    if (isAdminEmail(email)) {
      // Admin login - redirect to admin panel
      localStorage.setItem("kariosUser", JSON.stringify({
        name: "Admin User",
        email: "admin@karios.com",
        role: "ADMIN",
      }))
      router.push("/admin")
    } else {
      // Regular user login
      localStorage.setItem("kariosUser", JSON.stringify({
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email,
        role: "USER",
      }))
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your Karios dashboard account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                leftIcon={<Mail className="w-4 h-4 text-muted-foreground" />}
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4 text-muted-foreground" />}
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex items-center justify-end">
                <Link href="#" className="text-sm text-primary">
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button type="submit" className="w-full py-3">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="relative flex w-full items-center justify-center gap-4 px-4">
            <div className="w-full border-t border-border" />
            <span className="text-xs font-medium text-muted-foreground px-2">
              Or continue with
            </span>
            <div className="w-full border-t border-border" />
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full" onClick={() => {}}>
              <Globe className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full" onClick={() => {}}>
              <Globe className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}