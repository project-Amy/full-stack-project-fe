import { useState } from "react";
import { Button, Card, Spin, Empty, Row, Col, Layout, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateBoardModal from "../components/modal/CreateBoardModal";
import { useGetAllBoard } from "../hooks/use-get-all-board";
import AuthBackground from "../components/Background/AuthBackground";
import { Content } from "antd/es/layout/layout";
import Navbar from "../components/navigation/Navbar";

export default function Home() {
  const { data: data, isLoading } = useGetAllBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Content className="relative z-10 flex flex-col">
        <div className="max-w-100 p-4">
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setIsModalOpen(true)}>
            Crea nuova board
          </Button>
        </div>
        {data && data?.length > 0 ? (
          <div className="max-w-7xl mx-auto p-6 w-full">
            <Row gutter={[16, 16]}>
              {data.map((data) => (
                <Col xs={24} sm={12} md={8} lg={6} key={data.id}>
                  <Card
                    hoverable
                    className="h-full"
                    onClick={() => console.log("Redirect to", data.id)}
                    title={data.name}
                  >
                    <Space direction="vertical" size="small" className="w-full">
                      <p className="text-gray-600 m-0">{data.description || "Nessuna descrizione"}</p>
                    </Space>
                  </Card>
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
