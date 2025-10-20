import { Modal, Form, Input, message, Select, DatePicker, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
  onDelete?: () => void;
}

interface EditTaskForm {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: dayjs.Dayjs;
  assigneeId?: string;
}

export default function EditTaskModal({ open, onClose, task, boardId, members, onDelete }: EditTaskModalProps) {
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
        description: task.description ?? undefined,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? dayjs(task.dueDate) : undefined,
        assigneeId: task.assignee?.id ?? undefined,
      });
    }
  }, [task, open, form]);

  return (
    open && (
      <Modal
        title="Edit Task"
        open={open}
        onCancel={handleCancel}
        confirmLoading={isPending}
        width={600}
        destroyOnHidden
        footer={[
          onDelete && (
            <Button key="delete" danger icon={<DeleteOutlined />} onClick={onDelete} className="mr-auto">
              Delete
            </Button>
          ),
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" loading={isPending} onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Title is required" },
              { min: 3, message: "Title must be at least 3 characters" },
              {
                max: 20,
                message: "Title must be maximum 20 characters",
              },
            ]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} placeholder="Enter a description (optional)" />
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
