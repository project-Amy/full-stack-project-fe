import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { useGetBoardById } from "../hooks/board/use-get-board-by-id";
import { useGetBoardTasks } from "../hooks/board/use-get-board-tasks";
import { useBoardViewStore } from "../store/useBoardViewStore";
import { useTaskFilters } from "../hooks/use-task-filters";
import AuthBackground from "../components/Background/Background";
import Navbar from "../components/navigation/Navbar";
import BoardHeader from "../components/board/BoardHeader";
import TaskFilters from "../components/board/TaskFilters";
import CreateTaskModal from "../components/task/CreateTaskModal";
import EditTaskModal from "../components/task/EditTaskModal";
import DeleteModal from "../components/task/DeleteModal";
import KanbanView from "../components/board/views/KanbanView";
import ListView from "../components/board/views/ListView";
import TableView from "../components/board/views/TableView";
import type { Task } from "../types";
import type { BoardViewType } from "../types/board";
import TaskFiltersSkeleton from "../components/board/TaskFiltersSkeleton";

const { Content } = Layout;

export default function BoardDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: board, isLoading: isBoardLoading } = useGetBoardById(id ?? "");
  const { data: boardTasks, isLoading: isTasksLoading } = useGetBoardTasks(id ?? "");
  const { boardViews, setBoardView } = useBoardViewStore();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const isLoading = isBoardLoading || isTasksLoading;
  const tasks = boardTasks?.tasks || [];

  const { filters, filteredTasks, updateFilters, clearFilters, hasActiveFilters } = useTaskFilters(tasks);

  const currentView = (() => {
    if (id && boardViews[id]) {
      return boardViews[id];
    }
    if (id && board?.defaultView && !boardViews[id]) {
      setBoardView(id, board.defaultView as BoardViewType);
      return board.defaultView as BoardViewType;
    }
    return "KANBAN" as BoardViewType;
  })();

  const membersList = board
    ? board.members.map((member) => ({
        id: member.id,
        email: member.name,
      }))
    : [];

  function handleTaskClick(task: Task) {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  }

  function handleEditModalClose() {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  }

  function handleDeleteClick() {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(true);
  }

  function handleDeleteModalClose() {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  }

  function renderViewComponent(currentView: BoardViewType) {
    const tasksToUse = currentView === "TABLE" ? tasks : filteredTasks;

    switch (currentView) {
      case "KANBAN":
        return <KanbanView tasks={tasksToUse} onTaskClick={handleTaskClick} isLoading={isLoading} />;
      case "LIST":
        return <ListView tasks={tasksToUse} onTaskClick={handleTaskClick} isLoading={isLoading} />;
      case "TABLE":
        return <TableView tasks={tasksToUse} isLoading={isLoading} boardId={id || ""} members={membersList} />;
      default:
        return;
    }
  }

  return (
    <Layout className="!min-h-screen relative !bg-trasparent" style={{ background: "transparent" }}>
      <AuthBackground />
      <Navbar />
      <CreateTaskModal
        open={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        boardId={id || ""}
        members={membersList}
      />
      <EditTaskModal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        task={selectedTask}
        boardId={id || ""}
        members={membersList}
        onDelete={handleDeleteClick}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        isTask={true}
        itemId={selectedTask?.id || ""}
        itemTitle={selectedTask?.title || ""}
        boardId={id || ""}
      />
      <Content className="p-4 w-full max-w-7xl mx-auto">
        <BoardHeader
          boardName={board?.name}
          boardId={id || ""}
          currentView={currentView}
          isLoading={isBoardLoading}
          // isFetching={isFetching}
          onBack={() => navigate("/")}
          onCreateTask={() => setIsTaskModalOpen(true)}
        />
        {currentView !== "TABLE" &&
          (isLoading ? (
            <TaskFiltersSkeleton />
          ) : (
            <TaskFilters
              filters={filters}
              onFilterChange={updateFilters}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              members={membersList}
            />
          ))}

        {renderViewComponent(currentView)}
      </Content>
    </Layout>
  );
}
