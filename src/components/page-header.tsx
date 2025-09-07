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
    breadcrumbs: BreadcrumbItem[]
    action?: {
        label: string
        onClick: () => void
        icon?: React.ReactNode
    }
}

export function PageHeader({ title, breadcrumbs, action }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 px-4 lg:px-6">
            {/* Breadcrumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbs.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <BreadcrumbItem>
                                {index === breadcrumbs.length - 1 ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={item.href || "#"}>
                                        {item.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                        </div>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>

            {/* Title and Action */}
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
