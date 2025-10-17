import { useState } from "react";
import { Button, Card, Spin, Empty, Row, Col, Layout, Badge } from "antd";
import { PlusOutlined, MailOutlined } from "@ant-design/icons";
import CreateBoardModal from "../components/board/modal/CreateBoardModal";
import PendingInvitesModal from "../components/invitation/PendingInvitesModal";
import { useGetAllBoard } from "../hooks/board/use-get-all-board";
import { useGetUserInvitations } from "../hooks/invitation/use-get-pending-invitations";
import AuthBackground from "../components/Background/AuthBackground";
import { Content } from "antd/es/layout/layout";
import Navbar from "../components/navigation/Navbar";
import type { Board } from "../types/board";
import BoardCard from "../components/board/BoardCard";

export default function Home() {
  const { data: data, isLoading } = useGetAllBoard();
  const { data: invitations } = useGetUserInvitations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPendingInvitesModalOpen, setIsPendingInvitesModalOpen] = useState(false);

  const pendingInvitationsCount = invitations?.filter((inv) => inv.status === "PENDING").length || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen relative">
        <AuthBackground />
        <Spin size="large" className="relative z-10" />
      </div>
    );
  }

  return (
    <Layout className="!min-h-screen relative" style={{ background: "transparent" }}>
      <AuthBackground />
      <Navbar />
      <CreateBoardModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PendingInvitesModal open={isPendingInvitesModalOpen} onClose={() => setIsPendingInvitesModalOpen(false)} />
      <Content className="relative z-10 flex flex-col">
        <div className="max-w-7xl mx-auto p-6 w-full">
          <div className="flex gap-4 mb-4">
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setIsModalOpen(true)}>
              Create new board
            </Button>
            <Badge count={pendingInvitationsCount} offset={[-5, 5]}>
              <Button icon={<MailOutlined />} size="large" onClick={() => setIsPendingInvitesModalOpen(true)}>
                Pending Invites
              </Button>
            </Badge>
          </div>
        </div>
        {data && data?.length > 0 ? (
          <div className="max-w-7xl mx-auto p-6 w-full">
            <Row gutter={[16, 16]}>
              {data.map((board: Board) => (
                <Col xs={24} sm={12} md={8} lg={6} key={board.id}>
                  <BoardCard data={board} />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center p-6 max-w-3xl mx-auto">
            <Card>
              <Empty description="Nessuna board trovata. Creane una per iniziare!" />
            </Card>
          </div>
        )}
      </Content>
    </Layout>
  );
}
