import "./index.css";
import { Section, TaskItem } from "../../../components/ui/TaskCard";

// Data structure for tasks
const YOUTUBE_TASKS = [
    { title: "Dominate Crpto Monitoring", tokenCount: 1 },
    { title: "C2 earn $24m a day?", tokenCount: 1 },
  ];
  
  const RewardsYoutube = () => {
    return (
        <Section title="Hamster Youtube">
          {YOUTUBE_TASKS.map((task, index) => (
            <TaskItem key={index} icon="#" tokenCount={task.tokenCount}>
              <h4 className="task-title">{task.title}</h4>
            </TaskItem>
          ))}
        </Section>

    );
};

export default RewardsYoutube;
