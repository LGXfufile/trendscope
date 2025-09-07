'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TrendChartProps {
  data: { date: string; value: number }[];
  title?: string;
  description?: string;
  color?: string;
  height?: number;
}

export function TrendChart({ 
  data, 
  title = 'Trend Analysis', 
  description = 'Search volume over time',
  color = '#3B82F6',
  height = 300
}: TrendChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={2}
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface CompetitionMeterProps {
  value: number;
  label?: string;
}

export function CompetitionMeter({ value, label = 'Competition Level' }: CompetitionMeterProps) {
  const percentage = Math.round(value * 100);
  const getColor = (val: number) => {
    if (val < 30) return 'text-green-600';
    if (val < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center space-y-3"
    >
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - value)}`}
            className={`${getColor(percentage)} transition-colors duration-300`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: `${2 * Math.PI * 40}` }}
            animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - value)}` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${getColor(percentage)}`}>
            {percentage}%
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        {label}
      </p>
    </motion.div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  gradient?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon,
  gradient = 'from-blue-500 to-purple-600'
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${gradient}`} />
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            {icon && (
              <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient}`}>
                <div className="text-white">
                  {icon}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </h3>
            {change !== undefined && (
              <span className={`text-sm font-medium ${
                change >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}