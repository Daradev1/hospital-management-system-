import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'

export function AdmissionsTrendChart({ data = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admissions vs Discharges — This Week</CardTitle>
      </CardHeader>
      <CardBody className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E8EC" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono', fill: '#8A94A6' }} axisLine={{ stroke: '#E4E8EC' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono', fill: '#8A94A6' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ fontSize: 12, fontFamily: 'Inter', border: '1px solid #E4E8EC', borderRadius: 8 }}
              labelStyle={{ fontFamily: 'IBM Plex Mono', fontSize: 11 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="admissions" stroke="#12405E" strokeWidth={2} dot={{ r: 3 }} name="Admissions" />
            <Line type="monotone" dataKey="discharges" stroke="#1FA98A" strokeWidth={2} dot={{ r: 3 }} name="Discharges" />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}