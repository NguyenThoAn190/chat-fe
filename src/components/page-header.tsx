import { Button } from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Plus } from "lucide-react"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface PageHeaderProps {
    title: string
    action?: {
        label: string
        onClick: () => void
        icon?: React.ReactNode
    }
}

export function PageHeader({ title, action }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 px-4 lg:px-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {action && (
                    <Button onClick={action.onClick} className="flex items-center gap-2">
                        {action.icon || <Plus className="h-4 w-4" />}
                        {action.label}
                    </Button>
                )}
            </div>
        </div>
    )
}
