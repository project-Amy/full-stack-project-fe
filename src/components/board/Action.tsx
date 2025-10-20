import { Button } from "antd";
import { useState } from "react";
import EditTaskModal from "../task/EditTaskModal";
import type { Task } from "../../types";

interface ActionsProps {
  task: Task;
  boardId: string;
  members: Array<{ id: string; email: string }>;
}

export default function Action({ task, boardId, members }: ActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Modify</Button>
      {open && (
        <EditTaskModal
          open={open}
          onClose={() => setOpen(false)}
          boardId={boardId}
          task={task}
          members={members}
        />
      )}
    </>
  );
}
