"use client"

import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

function CardComponent({ children, className = "", onClick, hover = false }: CardProps) {
  const baseClasses = "bg-card border border-border rounded-lg p-6 transition-all duration-200"
  const hoverClasses = hover ? "hover:shadow-md hover:border-primary/20 cursor-pointer" : ""
  const clickableClasses = onClick ? "cursor-pointer" : ""

  return (
    <div className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return <h3 className={`text-lg font-semibold text-foreground ${className}`}>{children}</h3>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`text-muted-foreground ${className}`}>{children}</div>
}

export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
})

export default CardComponent
