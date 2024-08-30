import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  percentageChange: string;
  isPositive?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  percentageChange,
  isPositive = true,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center sm:text-left">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-4xl font-bold">{value}</p>
      <p className={isPositive ? 'text-green-500' : 'text-red-500'}>
        {percentageChange}
      </p>
    </div>
  );
};

export default SummaryCard;
