import type { Task } from "../../../types";
import TaskCard from "../../task/TaskCard";

interface ListViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  isLoading: boolean;
}

export default function ListView({ tasks, onTaskClick, isLoading }: ListViewProps) {
  return (
    <div className="mt-4 !space-y-3">
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} onClick={onTaskClick} isLoading={isLoading} />
      ))}
    </div>
  );
}
