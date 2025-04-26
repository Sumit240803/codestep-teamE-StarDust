// Types
interface BaseProps {
    children: ReactNode;
  }
  
  interface TaskItemProps extends BaseProps {
    icon: ReactNode;
    tokenCount: number;
  }
  
  interface SectionProps extends BaseProps {
    title: string;
  }
  