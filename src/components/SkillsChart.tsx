'use client';

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';

const skillsData = [
    { name: 'Figma', value: 96, fill: 'hsl(var(--primary))' },
    { name: 'Sketch', value: 84, fill: '#8884d8' },
    { name: 'Webflow', value: 97, fill: '#83a6ed' },
    { name: 'Illustrator', value: 90, fill: '#8dd1e1' },
    { name: 'Framer', value: 92, fill: '#82ca9d' },
];

export function SkillsChart() {
  return (
    <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                barSize={10}
                data={skillsData}
                startAngle={180}
                endAngle={-180}
            >
                <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                />
                <RadialBar
                    background
                    clockWise
                    dataKey="value"
                    angleAxisId={0}
                />
                 <Legend 
                    iconSize={10} 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{
                        fontFamily: 'var(--font-teller)',
                        fontSize: '1rem',
                    }}
                />
            </RadialBarChart>
        </ResponsiveContainer>
    </div>
  );
}
