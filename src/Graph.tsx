import * as React from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { time: "Now", temp: 46, precipitation: 0 },
  { time: "1PM", temp: 48, precipitation: 0 },
  { time: "2PM", temp: 51, precipitation: 10 },
  { time: "3PM", temp: 51, precipitation: 30 },
  { time: "4PM", temp: 46, precipitation: 35 },
]

const chartConfig = {
  temp: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
  precipitation: {
    label: "Precipitation",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Graph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("temp")

  return (
    <Card className="w-3/4">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex">
          {["temp", "precipitation"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative hover:bg-gray-100 z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-gray-200 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-s text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 16 // Added top margin for labels
            }}
          >
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              dataKey={activeChart}
              tickLine={false}
              axisLine={false}
              domain={activeChart === "temp" ? [40, 53] : [0, 100]}
              tickFormatter={(value) => activeChart === "temp" ? `${value}°F` : `${value}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar 
              dataKey={activeChart} 
              fill={`var(--color-${activeChart})`}
              label={{
                position: 'top',
                formatter: (value: number) => activeChart === "temp" ? `${value}°` : `${value}%`
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
