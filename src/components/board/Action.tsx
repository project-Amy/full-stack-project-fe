import { Button, Flex } from "antd";
import { useState } from "react";
import EditTaskModal from "../task/EditTaskModal";
import type { Task } from "../../types";
import DeleteModal from "../task/DeleteModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface ActionsProps {
  task: Task;
  boardId: string;
  members: Array<{ id: string; email: string }>;
}

export default function Action({ task, boardId, members }: ActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  return (
    <>
      <Flex justify="center" gap={4}>
        <Button onClick={() => setOpen(true)}>
          <EditOutlined />
        </Button>
        <Button danger onClick={() => setOpenDelete(true)}>
          <DeleteOutlined />
        </Button>
      </Flex>

      {open && (
        <EditTaskModal open={open} onClose={() => setOpen(false)} boardId={boardId} task={task} members={members} />
      )}

      {openDelete && (
        <DeleteModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          isTask={true}
          itemId={task.id}
          itemTitle={task.title}
          boardId={boardId}
        />
      )}
    </>
  );
}
