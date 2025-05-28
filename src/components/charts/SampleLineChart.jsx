
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const SampleLineChart = () => {
  return (
    <Card className="chart-card">
      <CardHeader>
        <CardTitle className="text-xl">Website Traffic</CardTitle>
        <CardDescription>Monthly unique visitors and page views</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}/>
            <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}/>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                borderColor: 'var(--border)',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'var(--foreground)'}}
            />
            <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--muted-foreground)' }} />
            <Line type="monotone" dataKey="pv" stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 6 }} name="Page Views" />
            <Line type="monotone" dataKey="uv" stroke="var(--secondary)" strokeWidth={2} activeDot={{ r: 6 }} name="Unique Visitors" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SampleLineChart;
