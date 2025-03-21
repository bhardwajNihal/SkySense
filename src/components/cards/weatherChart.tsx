import { forecastDataType } from '@/API/types'
import { format } from 'date-fns';
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
    const chartData: chartDatatype[] = forecastData.list.slice(0, 8).map((data) => ({
        time: format(new Date(data.dt * 1000), "ha"),       // provide the raw date and format into time AM/PM
        temp: Math.floor(data.main.temp),
        feelsLike: Math.floor(data.main.feels_like)
    }))

    // console.log(chartData);


    return (
        <div
            className={`h-80 w-full lg:w-3/5 bg-background rounded-lg overflow-hidden p-4`}
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
                            dataKey="feels_like"
                            stroke="#64748b"
                            strokeWidth={1}
                            dot={true}
                            strokeDasharray="5 5"
                        />
                        <Tooltip/>
                    </LineChart>
                </ResponsiveContainer>
            </div>


        </div>
    )
}

export default WeatherChartCard