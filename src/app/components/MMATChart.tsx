import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface Model {
  name: string;
  scores: {
    satNaam: number;
    nirbhau: number;
    akaalMoorat: number;
  };
}

interface DataEntry {
  principle: string;
  [key: string]: number | string; // dynamic key for each model
}

export default function MMATChart({ models, chartType }: { models: Model[], chartType: 'bar' | 'line' | 'radar' }) {
  const principles = [
    { key: 'satNaam', fullName: 'Truth (Sat Naam)' },
    { key: 'nirbhau', fullName: 'Fearlessness (Nirbhau)' },
    { key: 'akaalMoorat', fullName: 'Timelessness (Akaal Moorat)' },
  ];

  const data: DataEntry[] = principles.map(principle => {
    const entry: DataEntry = { principle: principle.fullName };
    models.forEach(model => {
      entry[model.name] = model.scores[principle.key as keyof typeof model.scores];
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      {chartType === 'bar' ? (
        <BarChart data={data}>
          <XAxis dataKey="principle" />
          <YAxis />
          <Tooltip />
          <Legend />
          {models.map(model => (
            <Bar
              key={model.name}
              dataKey={model.name}
              fill={
                model.name === 'gpt'
                  ? '#6366F1'
                  : model.name === 'ekonai'
                  ? '#10B981'
                  : '#F59E0B'
              }
            />
          ))}
        </BarChart>
      ) : chartType === 'line' ? (
        <LineChart data={data}>
          <XAxis dataKey="principle" />
          <YAxis />
          <Tooltip />
          <Legend />
          {models.map(model => (
            <Line
              key={model.name}
              type="monotone"
              dataKey={model.name}
              stroke={
                model.name === 'gpt'
                  ? '#6366F1'
                  : model.name === 'ekonai'
                  ? '#10B981'
                  : '#F59E0B'
              }
            />
          ))}
        </LineChart>
      ) : (
        <RadarChart outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="principle" />
          <PolarRadiusAxis />
          <Tooltip />
          <Legend />
          {models.map(model => (
            <Radar
              key={model.name}
              name={model.name}
              dataKey={model.name}
              stroke={
                model.name === 'gpt'
                  ? '#6366F1'
                  : model.name === 'ekonai'
                  ? '#10B981'
                  : '#F59E0B'
              }
              fill={
                model.name === 'gpt'
                  ? '#6366F1'
                  : model.name === 'ekonai'
                  ? '#10B981'
                  : '#F59E0B'
              }
              fillOpacity={0.6}
            />
          ))}
        </RadarChart>
      )}
    </ResponsiveContainer>
  );
}






