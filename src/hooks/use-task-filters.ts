import { useState, useMemo } from "react";
import type { Task } from "../types";

export interface TaskFilters {
  search: string;
  status: string[];
  priority: string[];
  assignee: string[];
}

export function useTaskFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    status: [],
    priority: [],
    assignee: [],
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(searchLower);
        const matchesDescription = task.description?.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesDescription) return false;
      }
      if (filters.status.length > 0) {
        if (!filters.status.includes(task.status)) return false;
      }
      if (filters.priority.length > 0) {
        if (!filters.priority.includes(task.priority)) return false;
      }
      if (filters.assignee.length > 0) {
        const taskAssigneeId = task.assignee?.id || "unassigned";
        if (!filters.assignee.includes(taskAssigneeId)) return false;
      }
      return true;
    });
  }, [tasks, filters]);

  const updateFilters = (newFilters: Partial<TaskFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: [],
      priority: [],
      assignee: [],
    });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== "" ||
      filters.status.length > 0 ||
      filters.priority.length > 0 ||
      filters.assignee.length > 0
    );
  }, [filters]);

  return {
    filters,
    filteredTasks,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  };
}
