import { Card, Tag, Typography, Space } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import type { Task } from "../../types";
import { getPriorityColor, getStatusColor } from "../../utils/function";

const { Text } = Typography;

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
  isLoading: boolean;
}

export default function TaskCard({ task, onClick, isLoading }: TaskCardProps) {
  return (
    <Card
    loading={isLoading}
      hoverable
      className="cursor-pointer"
      onClick={() => onClick(task)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Space direction="vertical" size="small" className="w-full">
            <div className="flex items-center gap-2">
              <Text strong className="text-base">{task.title}</Text>
              <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
              <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
            </div>

            {task.description && (
              <Text type="secondary" className="text-sm line-clamp-1">
                {task.description}
              </Text>
            )}

            <div className="flex items-center gap-4">
              {task.assignee && (
                <div className="flex items-center gap-1 text-gray-500">
                  <UserOutlined className="text-xs" />
                  <Text type="secondary" className="text-xs">
                    {task.assignee.name}
                  </Text>
                </div>
              )}

              {task.dueDate && (
                <div className="flex items-center gap-1 text-gray-500">
                  <CalendarOutlined className="text-xs" />
                  <Text type="secondary" className="text-xs">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </Text>
                </div>
              )}
            </div>
          </Space>
        </div>
      </div>
    </Card>
  );
}
