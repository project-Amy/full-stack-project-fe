import { SettingOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import type { Board } from "../../types/board";
import { useState } from "react";
import ModalInviteUsers from "../invitation/ModalInviteUsers";

interface BoardCardProps {
  data: Board;
}

export default function BoardCard({ data }: BoardCardProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && <ModalInviteUsers openModal={openModal} setOpenModal={setOpenModal} id={data.id} />}
      <Card
        hoverable
        className="h-full"
        onClick={() => console.log("Redirect to", data.id)}
        title={data.name}
        extra={
          <SettingOutlined
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
            }}
            style={{ fontSize: "20px" }}
          />
        }
      >
        <Space direction="vertical" size="small" className="w-full">
          <p className="text-gray-600 m-0">{data.description || "Nessuna descrizione"}</p>
        </Space>
      </Card>
    </>
  );
}
