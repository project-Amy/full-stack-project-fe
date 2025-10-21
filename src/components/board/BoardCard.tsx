import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
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
        className="h-full  hover:shadow-lg transition-shadow"
        title={data?.name}
        extra={
          <Space size="middle">
            <SettingOutlined
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(true);
              }}
              className="text-lg !hover:text-blue-500 transition-colors rounded-md border border-black/20 p-2"
            />
            {isOwner && (
              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteModal(true);
                }}
                className="text-lg !hover:text-red-500 transition-colors rounded-md border border-black/20 p-2"
              />
            )}
          </Space>
        }
      >
        <div className="flex flex-col h-full">
          <p className="text-gray-600 m-0 line-clamp-3 flex-1">{data?.description || "No description"}</p>
          <div className="flex justify-end mt-4">
            <Button onClick={handleCardClick}>Open</Button>
          </div>
        </div>
      </Card>
    </>
  );
}
