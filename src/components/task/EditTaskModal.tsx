import { Modal, Form, Input, message, Select, DatePicker } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useUpdateTask } from "../../hooks/task/use-update-task";
import type { Task, UpdateTaskDTO, TaskStatus, TaskPriority } from "../../types/task";

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  boardId: string;
  members?: Array<{ id: string; email: string }>;
}

interface EditTaskForm {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: dayjs.Dayjs;
  assigneeId?: string;
}

export default function EditTaskModal({ open, onClose, task, boardId, members }: EditTaskModalProps) {
  const [form] = Form.useForm<EditTaskForm>();
  const { mutateAsync: updateTask, isPending } = useUpdateTask();

  async function handleFinish(values: EditTaskForm) {
    if (!task) return;
    try {
      const taskData: UpdateTaskDTO = {
        title: values.title,
        description: values.description,
        status: values.status,
        priority: values.priority,
        dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
        assigneeId: values.assigneeId,
      };
      await updateTask({
        taskId: task.id,
        boardId,
        data: taskData,
      });
      message.success("Task updated successfully!");
      onClose();
    } catch (error) {
      message.error("Error updating task");
      console.error(error);
    }
  }

  function handleCancel() {
    form.resetFields();
    onClose();
  }

  useEffect(() => {
    if (task && open) {
      form.setFieldsValue({
        title: task.title,
        description: task.description || undefined,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? dayjs(task.dueDate) : undefined,
        assigneeId: task.assigneeId || undefined,
      });
    }
  }, [task, open, form, members]);

  return (
    open && (
      <Modal
        title="Edit Task"
        open={open}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        confirmLoading={isPending}
        okText="Save"
        cancelText="Cancel"
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Title is required" },
              { min: 3, max: 20, message: "Title must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Enter a description (optional)" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Status" name="status" rules={[{ required: true, message: "Status is required" }]}>
              <Select
                placeholder="Select status"
                options={[
                  { label: "To Do", value: "TODO" },
                  { label: "In Progress", value: "IN_PROGRESS" },
                  { label: "Done", value: "DONE" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Priority" name="priority" rules={[{ required: true, message: "Priority is required" }]}>
              <Select
                placeholder="Select priority"
                options={[
                  { label: "Low", value: "LOW" },
                  { label: "Medium", value: "MEDIUM" },
                  { label: "High", value: "HIGH" },
                ]}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Due Date" name="dueDate">
              <DatePicker className="w-full" placeholder="Select date (optional)" format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item label="Assign To" name="assigneeId">
              <Select
                placeholder="None (optional)"
                allowClear
                options={members?.map((member) => ({
                  label: member.email,
                  value: member.id,
                }))}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    )
  );
}
