import { Card, Space, Skeleton } from "antd";

export default function TaskFiltersSkeleton() {
  return (
    <Card className="mb-4 shadow-sm">
      <Space direction="vertical" size="middle" className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton.Avatar active size="small" shape="circle" />
          <Skeleton.Input active size="small" style={{ width: 60 }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
          <Skeleton.Input active size="small" className="!w-full" />
        </div>
      </Space>
    </Card>
  );
}
