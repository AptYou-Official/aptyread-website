'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PaymentChartProps {
  data: Array<{ date: string; revenue: number }>;
}

export default function PaymentChart({ data }: PaymentChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
      <h3 className="text-xl font-bold text-apty-dark mb-6">Revenue Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="date" stroke="#64748B" />
          <YAxis stroke="#64748B" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#FF6B35"
            strokeWidth={2}
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

