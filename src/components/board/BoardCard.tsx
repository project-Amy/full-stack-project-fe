import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import type { Board } from "../../types/board";
import { useState } from "react";
import BoardSettingsModal from "../invitation/BoardSettingsModal";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../task/DeleteModal";
import { useAuthStore } from "../../store/useAuthStore";

interface BoardCardProps {
  data?: Board;
}

export default function BoardCard({ data }: BoardCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuthStore();
  const isOwner = data?.ownerId === userId;

  function handleCardClick() {
    if (data?.id) {
      navigate(`/details/${data.id}`);
    }
  }

  return (
    <>
      {openModal && <BoardSettingsModal openModal={openModal} setOpenModal={setOpenModal} id={data?.id || ""} />}
      {openDeleteModal && (
        <DeleteModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          isTask={false}
          itemId={data?.id || ""}
          itemTitle={data?.name || ""}
        />
      )}
      <Card
        className="h-full cursor-pointer hover:shadow-lg transition-shadow"
        title={data?.name}
        onClick={handleCardClick}
        extra={
          <Space size="middle">
            <SettingOutlined
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(true);
              }}
              className="text-lg hover:text-blue-500 transition-colors"
            />
            {isOwner && (
              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteModal(true);
                }}
                className="text-lg hover:text-red-500 transition-colors"
              />
            )}
          </Space>
        }
      >
        <Space direction="vertical" size="small" className="w-full">
          <p className="text-gray-600 m-0 line-clamp-3">{data?.description || "No description"}</p>
        </Space>
      </Card>
    </>
  );
}
