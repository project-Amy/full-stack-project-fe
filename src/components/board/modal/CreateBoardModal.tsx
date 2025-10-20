import { Modal, Form, Input, message, Select } from "antd";
import { useCreateBoard } from "../../../hooks/invitation/use-create-board";
import type { CreateBoardForm } from "../../../types/board";

interface CreateBoardModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateBoardModal({ open, onClose }: CreateBoardModalProps) {
  const [form] = Form.useForm<CreateBoardForm>();
  const { mutateAsync: createBoard, isPending } = useCreateBoard();

  async function handleFinish(values: CreateBoardForm) {
    try {
      await createBoard(values);
      message.success("Board created successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Error creating board");
      console.error(error);
    }
  }

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Create new board"
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={isPending}
      okText="Create"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Name is required" },
            { min: 3, message: "Name must be at least 3 characters" },
          ]}
        >
          <Input placeholder="Enter board name" />
        </Form.Item>

        <Form.Item
          label="Default View"
          name="defaultView"
          rules={[{ required: true, message: "Please select a default view" }]}
          initialValue="KANBAN"
        >
          <Select
            placeholder="Select default view"
            options={[
              { label: "List", value: "LIST" },
              { label: "Kanban", value: "KANBAN" },
              { label: "Table", value: "TABLE" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Enter a description (optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
