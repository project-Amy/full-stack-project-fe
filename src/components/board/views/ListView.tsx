import { Empty } from "antd";
import type { Task } from "../../../types";
import TaskCard from "../../task/TaskCard";
interface ListViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  isLoading: boolean;
}

export default function ListView({ tasks, onTaskClick, isLoading }: ListViewProps) {
  if (!isLoading && (!tasks || tasks.length === 0)) {
    return (
      <div className="mt-4 flex items-center justify-center min-h-[400px]">
        <Empty description="No tasks available" />
      </div>
    );
  }

  return (
    <div className="mt-4 !space-y-3">
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} onClick={onTaskClick} isLoading={isLoading} />
      ))}
    </div>
  );
}
