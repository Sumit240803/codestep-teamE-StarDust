// TypeScript interfaces
interface CardDataType {
    id: number;
    title: string;
    subtitle: string;
    profitPerHour: number;
    clickPerHour: number;
    level: number;
    cost: number;
    
  }

  interface Cards{
    id : bigint;
    name:string;
    subtitle : string;
    points:bigint;
    time : bigint;
    level : bigint;
    image : string;
    cost : bigint;
  }
  
  interface CardProps extends Omit<Cards, 'id'>, React.HTMLAttributes<HTMLDivElement> {
    image?: string;
    icon?: string;
  }