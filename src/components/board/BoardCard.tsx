import { SettingOutlined } from "@ant-design/icons";
import { Card, Skeleton, Space } from "antd";
import type { Board } from "../../types/board";
import { useState } from "react";
import ModalInviteUsers from "../invitation/ModalInviteUsers";
import { useNavigate } from "react-router-dom";

interface BoardCardProps {
  data?: Board;
  isLoading: boolean;
}

export default function BoardCard({ data, isLoading }: BoardCardProps) {
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
      {isLoading ? (
        <Card
          className="h-full"
          title={<Skeleton.Input active size="small" style={{ width: 120 }} />}
          extra={<Skeleton.Avatar active size="small" shape="circle" style={{ width: 16, height: 16 }} />}
        >
          <Space direction="vertical" size="small" className="w-full">
            <Skeleton active paragraph={{ rows: 2, width: ["100%", "80%"] }} title={false} />
          </Space>
        </Card>
      ) : (
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
            <p className="text-gray-600 m-0 line-clamp-2">{data?.description || "No description"}</p>
          </Space>
        </Card>
      )}
    </>
  );
}
