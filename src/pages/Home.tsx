import { useState } from "react";
import { Button, Card, Empty, Row, Col, Layout, Badge } from "antd";
import { PlusOutlined, MailOutlined } from "@ant-design/icons";
import CreateBoardModal from "../components/board/modal/CreateBoardModal";
import PendingInvitesModal from "../components/invitation/PendingInvitesModal";
import { useGetAllBoard } from "../hooks/board/use-get-all-board";

import { Content } from "antd/es/layout/layout";
import Navbar from "../components/navigation/Navbar";
import type { Board } from "../types/board";
import BoardCard from "../components/board/BoardCard";
import BoardSkeleton from "../components/board/BoardSkeleton";
import Background from "../components/Background/Background";
import { useGetPendingInvitations } from "../hooks/invitation/use-get-pending-invitations";

export default function Home() {
  const { data: data, isLoading } = useGetAllBoard();
  const { data: invitations } = useGetPendingInvitations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPendingInvitesModalOpen, setIsPendingInvitesModalOpen] = useState(false);

  const pendingInvitationsCount = invitations?.filter((inv) => inv.status === "PENDING").length || 0;

  return (
    <Layout className="!min-h-screen relative" style={{ background: "transparent" }}>
      <Background />
      <Navbar />
      <CreateBoardModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PendingInvitesModal open={isPendingInvitesModalOpen} onClose={() => setIsPendingInvitesModalOpen(false)} />
      <Content className="relative z-10 flex flex-col">
        <div className="max-w-7xl mx-auto p-6 w-full">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Button
              disabled={isLoading}
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto"
            >
              Create new board
            </Button>
            <Badge count={pendingInvitationsCount} offset={[-5, 5]} className="w-full sm:w-auto">
              <Button
                disabled={isLoading}
                icon={<MailOutlined />}
                size="large"
                onClick={() => setIsPendingInvitesModalOpen(true)}
                className="w-full"
              >
                Pending Invites
              </Button>
            </Badge>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 w-full">
          <Row gutter={[16, 16]}>
            {isLoading &&
              [1, 2, 3, 4].map((_, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                  <BoardSkeleton />
                </Col>
              ))}
            {!isLoading &&
              data?.map((board: Board) => (
                <Col xs={24} sm={12} md={8} lg={6} key={board.id}>
                  <BoardCard data={board} />
                </Col>
              ))}
          </Row>
        </div>

        {!isLoading && data && data.length === 0 && (
          <div className="flex-1 flex flex-col justify-center p-6 max-w-3xl mx-auto">
            <Card>
              <Empty description="No boards yet. Create one to get started!" />
            </Card>
          </div>
        )}
      </Content>
    </Layout>
  );
}
