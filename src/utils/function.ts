import type { TaskPriority } from "../types";

export const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case "LOW":
      return "green";
    case "MEDIUM":
      return "orange";
    case "HIGH":
      return "red";
    default:
      return "default";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "TODO":
      return "default";
    case "IN_PROGRESS":
      return "processing";
    case "DONE":
      return "success";
    default:
      return "default";
  }
};
