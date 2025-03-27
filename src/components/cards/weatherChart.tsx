import { forecastDataType } from '@/API/types'
import { format } from 'date-fns';
import { useTheme } from '../Theme-provider';
import { ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts'


interface weatherChartProps {
    forecastData: forecastDataType
}

interface chartDatatype {
    time: string;
    temp: number;
    feelsLike: number
}

const WeatherChartCard = ({ forecastData }: weatherChartProps) => {

    // preparing Chart data
    const chartData: chartDatatype[] = forecastData.list.slice(0, 8).map((data) => ({       // forcast data consist of list object, 1st convert it to array, then map it extract the chart data
        time: format(new Date(data.dt * 1000), "ha"),       // provide the raw date and format into time AM/PM
        temp: Math.floor(data.main.temp),
        feelsLike: Math.floor(data.main.feels_like)
    }))

    // console.log(chartData);

    const {theme} = useTheme()

    return (
        <div
            className={`h-80 w-full lg:w-[55%] bg-background ${theme==='dark' ? "" : "border border-gray-300" } rounded-lg p-4`}
        >
            <h2 className='h-[10%]'>Today's Temperature</h2>
            <div className="chartArea  w-full h-[90%]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis
                            dataKey="time"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={true}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={true}
                            tickFormatter={(value) => `${value}°`}
                        />
                        <Line
                            type="monotone"
                            dataKey="temp"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={true}
                        />
                        <Line
                            type="monotone"
                            dataKey="feelsLike"
                            stroke="#64748b"
                            strokeWidth={1}
                            dot={true}
                            strokeDasharray="5 5"
                        />
                        <Tooltip contentStyle={{ color: "gray", borderRadius: "8px" }}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>


        </div>
    )
}

export default WeatherChartCard