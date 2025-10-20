import { SettingOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import type { Board } from "../../types/board";
import { useState } from "react";
import ModalInviteUsers from "../invitation/ModalInviteUsers";
import { useNavigate } from "react-router-dom";

interface BoardCardProps {
  data?: Board;
}

export default function BoardCard({ data }: BoardCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  function handleCardClick() {
    if (data?.id) {
      navigate(`/details/${data.id}`);
    }
  }

  return (
    <>
      {openModal && <ModalInviteUsers openModal={openModal} setOpenModal={setOpenModal} id={data?.id || ""} />}
      <Card
        className="h-full cursor-pointer hover:shadow-lg transition-shadow"
        title={data?.name}
        onClick={handleCardClick}
        extra={
          <SettingOutlined
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
            }}
            className="text-lg hover:text-blue-500 transition-colors"
          />
        }
      >
        <Space direction="vertical" size="small" className="w-full">
          <p className="text-gray-600 m-0 line-clamp-3">{data?.description || "No description"}</p>
        </Space>
      </Card>
    </>
  );
}
