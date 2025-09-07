"use client"
import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import {
  SidebarInset,
} from "@/components/ui/sidebar"

import { DevicesTable } from "@/components/table/devices-table"
import DeviceHandler from "@/services/handler/device.handler"
import SidebarHeader from "@/components/system/side-bar"

export default function Page() {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const result = await DeviceHandler.paginationDevices({
          page: 1,
          limit: 10,
        })
        console.log(result)
        setDevices(result?.data || [])
      } catch (err) {
        console.error("Error fetching devices:", err)
        setDevices([])
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()
  }, [])

  const handleCreateDevice = () => {
    console.log("Create device clicked")
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Devices", href: "/devices" },
  ];
  return (
    <>
      <SidebarHeader breadcrumbs={breadcrumbs} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <PageHeader
              title="Devices"
              action={{
                label: "Create Device",
                onClick: handleCreateDevice
              }}
            />
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading devices...</div>
              </div>
            ) : (
              <DevicesTable data={devices} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}