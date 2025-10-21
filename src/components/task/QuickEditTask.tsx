import { Select, message } from "antd";
import { useUpdateTask } from "../../hooks/task/use-update-task";
import type { Task, TaskStatus } from "../../types/task";

interface QuickEditTaskProps {
  task: Task;
  onSuccess?: () => void;
}

export default function QuickEditTask({ task, onSuccess }: QuickEditTaskProps) {
  const { mutateAsync: updateTask, isPending } = useUpdateTask();

  async function handleStatusChange(newStatus: TaskStatus) {
    try {
      await updateTask({
        taskId: task.id,
        data: {
          title: task.title,
          description: task.description,
          status: newStatus,
          priority: task.priority,
          dueDate: task.dueDate || undefined,
          assigneeId: task.assignee?.id,
        },
      });
      message.success("Status updated successfully!");
      onSuccess?.();
    } catch (error) {
      message.error("Error updating status");
      console.error(error);
    }
  }

  return (
    <Select
      value={task.status}
      onChange={handleStatusChange}
      loading={isPending}
      disabled={isPending}
      size="small"
      className="w-28"
      onClick={(e) => e.stopPropagation()}
      options={[
        { label: "To Do", value: "TODO" },
        { label: "In Progress", value: "IN_PROGRESS" },
        { label: "Done", value: "DONE" },
      ]}
    />
  );
}
