import { Modal, Form, Input, message, Select, DatePicker } from "antd";
import { useCreateTask } from "../../hooks/task/use-create-task";
import type { CreateTaskDTO, TaskPriority } from "../../types/task";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
  members?: Array<{ id: string; email: string }>;
}

interface CreateTaskForm {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  assigneeId?: string;
}

export default function CreateTaskModal({ open, onClose, boardId, members }: CreateTaskModalProps) {
  const [form] = Form.useForm<CreateTaskForm>();
  const { mutateAsync: createTask, isPending } = useCreateTask();

  async function handleFinish(values: CreateTaskForm) {
    try {
      const taskData: CreateTaskDTO = {
        ...values,
        boardId,
        status: "TODO",
        dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
      };

      await createTask(taskData);
      message.success("Task created successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Error creating task");
      console.error(error);
    }
  }

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    open && (
      <Modal
        title="Create New Task"
        open={open}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        confirmLoading={isPending}
        okText="Create"
        cancelText="Cancel"
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Title is required" },
              { min: 3, message: "Title must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} placeholder="Enter a description (optional)" />
          </Form.Item>

          <Form.Item label="Priority" name="priority" initialValue="MEDIUM">
            <Select
              placeholder="Select priority"
              options={[
                { label: "Low", value: "LOW" },
                { label: "Medium", value: "MEDIUM" },
                { label: "High", value: "HIGH" },
              ]}
            />
          </Form.Item>

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
