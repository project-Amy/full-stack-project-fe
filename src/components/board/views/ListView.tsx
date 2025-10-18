import { List, Card, Tag, Typography, Space } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import type { Task } from "../../../types";
import { getPriorityColor, getStatusColor } from "../../../utils/function";

const { Text } = Typography;

interface ListViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  isLoading: boolean;
}

export default function ListView({ tasks, onTaskClick, isLoading }: ListViewProps) {
  console.log("is loading", isLoading);
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item>
          <Card hoverable className="cursor-pointer" onClick={() => onTaskClick(task)}>
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex justify-between items-start">
                <Text strong>{task.title}</Text>
                <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
              </div>

              {task.description && (
                <Text type="secondary" className="text-sm line-clamp-2">
                  {task.description}
                </Text>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                <Tag color={getPriorityColor(task.priority)} className="text-xs">
                  {task.priority}
                </Tag>

                {task.dueDate && (
                  <span className="flex items-center gap-1 text-gray-500">
                    <CalendarOutlined className="text-xs" />
                    <Text type="secondary" className="text-xs">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </Text>
                  </span>
                )}

                {task.assignee && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <UserOutlined className="text-xs" />
                    <Text type="secondary" className="text-xs">
                      {task.assignee.name}
                    </Text>
                  </div>
                )}
              </div>
            </Space>
          </Card>
        </List.Item>
      )}
    />
  );
}
