"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      
      <Sun className="h-5 w-5 transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      
      <Moon className="absolute h-5 w-5 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}