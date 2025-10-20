import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDeleteTask } from "../../hooks/task/use-delete-task";
import { useDeleteBoard } from "../../hooks/board/use-delete-board";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  isTask: boolean;
  itemId: string;
  itemTitle: string;
  boardId?: string;
}

export default function DeleteModal({
  open,
  onClose,
  isTask,
  itemId,
  itemTitle,
  boardId
}: DeleteModalProps) {
  const { mutateAsync: deleteTask, isPending: isTaskPending } = useDeleteTask();
  const { mutateAsync: deleteBoard, isPending: isBoardPending } = useDeleteBoard();

  const isPending = isTask ? isTaskPending : isBoardPending;

  async function handleDelete() {
    try {
      if (isTask) {
        if (!boardId) {
          throw new Error("Board ID is required for task deletion");
        }
        await deleteTask({
          taskId: itemId,
          boardId,
        });
        message.success("Task deleted successfully!");
      } else {
        await deleteBoard({
          boardId: itemId,
        });
        message.success("Board deleted successfully!");
      }
      onClose();
    } catch (error) {
      message.error(`Error deleting ${isTask ? "task" : "board"}`);
      console.error(error);
    }
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <ExclamationCircleOutlined className="text-red-500" />
          <span>Delete {isTask ? "Task" : "Board"}</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      onOk={handleDelete}
      confirmLoading={isPending}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      destroyOnHidden
    >
      <div className="py-4">
        <p className="text-base mb-2">
          Are you sure you want to delete <span className="font-semibold">"{itemTitle}"</span>?
        </p>
        <p className="text-gray-500">This action cannot be undone.</p>
      </div>
    </Modal>
  );
}
