import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("text-center space-y-4", className)}>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in">{title}</h1>
      {description && <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">{description}</p>}
    </div>
  )
}
