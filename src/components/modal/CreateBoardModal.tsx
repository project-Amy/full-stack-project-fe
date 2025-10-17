import { Modal, Form, Input, message } from "antd";
import { useCreateBoard } from "../../hooks/use-create-board";
import type { CreateBoardForm } from "../../types/board";

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
      message.success("Board creata con successo!");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Errore nella creazione della board");
      console.error(error);
    }
  }

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Crea una nuova board"
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={isPending}
      okText="Crea"
      cancelText="Annulla"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Nome"
          name="name"
          rules={[
            { required: true, message: "Il nome è obbligatorio" },
            { min: 3, message: "Il nome deve essere di almeno 3 caratteri" },
          ]}
        >
          <Input placeholder="Inserisci il nome della board" />
        </Form.Item>

        <Form.Item label="Descrizione" name="description">
          <Input.TextArea rows={4} placeholder="Inserisci una descrizione (opzionale)" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
