import { Layout, Card, Typography, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Background from "../components/background/Background";
import { HomeOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout className="!min-h-screen relative !bg-transparent">
      <Background />
      <Content className="flex justify-center items-center p-6 !bg-transparent">
        <Card className="w-full max-w-md">
          <Space direction="vertical" size="large" className="w-full text-center">
            <div>
              <Title level={1} style={{ fontSize: "72px", margin: 0 }}>
                404
              </Title>
              <Title level={2}>Page Not Found</Title>
              <Paragraph type="secondary">
                The page you are looking for doesn't exist or has been moved.
              </Paragraph>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              block
            >
              Back to Home
            </Button>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}
