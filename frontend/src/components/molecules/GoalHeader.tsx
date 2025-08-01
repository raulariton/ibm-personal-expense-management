// components/molecules/GoalHeader.tsx
import { CategoryIcon } from '../atoms/CategoryIcon';

interface GoalHeaderProps {
  title: string;
  deadline: string;
  category: 'savings' | 'investment' | 'debt' | 'purchase';
}

export const GoalHeader: React.FC<GoalHeaderProps> = ({ title, deadline, category }) => (
  <div className="mb-4 flex items-start justify-between">
    <div className="flex items-start space-x-3">
      <CategoryIcon category={category} />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">until {deadline}</p>
      </div>
    </div>
  </div>
);
