import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FundAllocationChartProps {
  donations: any[];
}

export const FundAllocationChart = ({ donations }: FundAllocationChartProps) => {
  // Calculate totals by purpose
  const purposeTotals = donations.reduce((acc: any, donation) => {
    const purpose = donation.purpose.replace(/_/g, ' ');
    acc[purpose] = (acc[purpose] || 0) + parseFloat(donation.amount);
    return acc;
  }, {});

  const chartData = Object.entries(purposeTotals).map(([purpose, amount]) => ({
    purpose,
    amount: amount as number
  }));

  const COLORS = ['#0B2B4C', '#00A3A3', '#E5B800', '#6B7280', '#4B5563'];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Donations by Purpose (Bar Chart)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="purpose" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `£${value.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="amount" fill="#0B2B4C" name="Amount (£)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Donations by Purpose (Pie Chart)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.purpose}: £${entry.amount.toLocaleString()}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `£${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
