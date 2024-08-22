"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const chartData = [
  { date: "2024-04-01", late: 222, ontime: 150 },
  { date: "2024-04-02", late: 97, ontime: 180 },
  { date: "2024-04-03", late: 167, ontime: 120 },
  { date: "2024-04-04", late: 242, ontime: 260 },
  { date: "2024-04-05", late: 373, ontime: 290 },
  { date: "2024-04-06", late: 301, ontime: 340 },
  { date: "2024-04-07", late: 245, ontime: 180 },
  { date: "2024-04-08", late: 409, ontime: 320 },
  { date: "2024-04-09", late: 59, ontime: 110 },
  { date: "2024-04-10", late: 261, ontime: 190 },
  { date: "2024-04-11", late: 327, ontime: 350 },
  { date: "2024-04-12", late: 292, ontime: 210 },
  { date: "2024-04-13", late: 342, ontime: 380 },
  { date: "2024-04-14", late: 137, ontime: 220 },
  { date: "2024-04-15", late: 120, ontime: 170 },
  { date: "2024-04-16", late: 138, ontime: 190 },
  { date: "2024-04-17", late: 446, ontime: 360 },
  { date: "2024-04-18", late: 364, ontime: 410 },
  { date: "2024-04-19", late: 243, ontime: 180 },
  { date: "2024-04-20", late: 89, ontime: 150 },
  { date: "2024-04-21", late: 137, ontime: 200 },
  { date: "2024-04-22", late: 224, ontime: 170 },
  { date: "2024-04-23", late: 138, ontime: 230 },
  { date: "2024-04-24", late: 387, ontime: 290 },
  { date: "2024-04-25", late: 215, ontime: 250 },
  { date: "2024-04-26", late: 75, ontime: 130 },
  { date: "2024-04-27", late: 383, ontime: 420 },
  { date: "2024-04-28", late: 122, ontime: 180 },
  { date: "2024-04-29", late: 315, ontime: 240 },
  { date: "2024-04-30", late: 454, ontime: 380 },
  { date: "2024-05-01", late: 165, ontime: 220 },
  { date: "2024-05-02", late: 293, ontime: 310 },
  { date: "2024-05-03", late: 247, ontime: 190 },
  { date: "2024-05-04", late: 385, ontime: 420 },
  { date: "2024-05-05", late: 481, ontime: 390 },
  { date: "2024-05-06", late: 498, ontime: 520 },
  { date: "2024-05-07", late: 388, ontime: 300 },
  { date: "2024-05-08", late: 149, ontime: 210 },
  { date: "2024-05-09", late: 227, ontime: 180 },
  { date: "2024-05-10", late: 293, ontime: 330 },
  { date: "2024-05-11", late: 335, ontime: 270 },
  { date: "2024-05-12", late: 197, ontime: 240 },
  { date: "2024-05-13", late: 197, ontime: 160 },
  { date: "2024-05-14", late: 448, ontime: 490 },
  { date: "2024-05-15", late: 473, ontime: 380 },
  { date: "2024-05-16", late: 338, ontime: 400 },
  { date: "2024-05-17", late: 499, ontime: 420 },
  { date: "2024-05-18", late: 315, ontime: 350 },
  { date: "2024-05-19", late: 235, ontime: 180 },
  { date: "2024-05-20", late: 177, ontime: 230 },
  { date: "2024-05-21", late: 82, ontime: 140 },
  { date: "2024-05-22", late: 81, ontime: 120 },
  { date: "2024-05-23", late: 252, ontime: 290 },
  { date: "2024-05-24", late: 294, ontime: 220 },
  { date: "2024-05-25", late: 201, ontime: 250 },
  { date: "2024-05-26", late: 213, ontime: 170 },
  { date: "2024-05-27", late: 420, ontime: 460 },
  { date: "2024-05-28", late: 233, ontime: 190 },
  { date: "2024-05-29", late: 78, ontime: 130 },
  { date: "2024-05-30", late: 340, ontime: 280 },
  { date: "2024-05-31", late: 178, ontime: 230 },
  { date: "2024-06-01", late: 178, ontime: 200 },
  { date: "2024-06-02", late: 470, ontime: 410 },
  { date: "2024-06-03", late: 103, ontime: 160 },
  { date: "2024-06-04", late: 439, ontime: 380 },
  { date: "2024-06-05", late: 88, ontime: 140 },
  { date: "2024-06-06", late: 294, ontime: 250 },
  { date: "2024-06-07", late: 323, ontime: 370 },
  { date: "2024-06-08", late: 385, ontime: 320 },
  { date: "2024-06-09", late: 438, ontime: 480 },
  { date: "2024-06-10", late: 155, ontime: 200 },
  { date: "2024-06-11", late: 92, ontime: 150 },
  { date: "2024-06-12", late: 492, ontime: 420 },
  { date: "2024-06-13", late: 81, ontime: 130 },
  { date: "2024-06-14", late: 426, ontime: 380 },
  { date: "2024-06-15", late: 307, ontime: 350 },
  { date: "2024-06-16", late: 371, ontime: 310 },
  { date: "2024-06-17", late: 475, ontime: 520 },
  { date: "2024-06-18", late: 107, ontime: 170 },
  { date: "2024-06-19", late: 341, ontime: 290 },
  { date: "2024-06-20", late: 408, ontime: 450 },
  { date: "2024-06-21", late: 169, ontime: 210 },
  { date: "2024-06-22", late: 317, ontime: 270 },
  { date: "2024-06-23", late: 480, ontime: 530 },
  { date: "2024-06-24", late: 132, ontime: 180 },
  { date: "2024-06-25", late: 141, ontime: 190 },
  { date: "2024-06-26", late: 434, ontime: 380 },
  { date: "2024-06-27", late: 448, ontime: 490 },
  { date: "2024-06-28", late: 149, ontime: 200 },
  { date: "2024-06-29", late: 103, ontime: 160 },
  { date: "2024-06-30", late: 446, ontime: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  late: {
    label: "Late",
    color: "hsl(var(--chart-1))",
  },
  ontime: {
    label: "OnTime",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Attendance Chart</CardTitle>
          <CardDescription>
            Showing total anttendance for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Today
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="ontime"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="late"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
