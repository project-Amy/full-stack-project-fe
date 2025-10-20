import { Card, Skeleton, Space } from "antd";


export default function BoardSkeleton() {
  return (
    <Card
      className="h-full"
      title={<Skeleton.Input active size="small" style={{ width: 120 }} />}
      extra={<Skeleton.Avatar active size="small" shape="circle" style={{ width: 16, height: 16 }} />}
    >
      <Space direction="vertical" size="small" className="w-full">
        <Skeleton active paragraph={{ rows: 2, width: ["100%", "80%"] }} title={false} />
      </Space>
    </Card>
  );
}
