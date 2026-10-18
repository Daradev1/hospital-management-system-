import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'

const COLORS = ['#12405E', '#1B5E82', '#1FA98A', '#C98A2C', '#8A94A6', '#C4534A']

export function DiagnosisChart({ data = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Diagnoses — This Month</CardTitle>
      </CardHeader>
      <CardBody className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E8EC" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono', fill: '#8A94A6' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: '#0B1E2D' }}
              axisLine={false}
              tickLine={false}
              width={130}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, fontFamily: 'Inter', border: '1px solid #E4E8EC', borderRadius: 8 }}
              cursor={{ fill: '#F7F9F8' }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={16}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}