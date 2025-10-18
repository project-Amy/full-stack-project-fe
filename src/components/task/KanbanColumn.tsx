import { Card, Empty, Space, Tag, Typography } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import type { Task, TaskStatus } from "../../types";
import { getPriorityColor } from "../../utils/function";

const { Text } = Typography;

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  tagColor: "default" | "processing" | "success";
  onTaskClick: (task: Task) => void;
}

export default function KanbanColumn({ title, tasks, tagColor, onTaskClick }: KanbanColumnProps) {
  return (
    <Card
      title={
        <Space>
          <span>{title}</span>
          <Tag color={tagColor}>{tasks.length}</Tag>
        </Space>
      }
      className="h-full"
    >
      <Space direction="vertical" size="small" className="w-full">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
            onClick={() => onTaskClick(task)}
          >
            <div className="space-y-2">
              <Text strong className="text-sm block">
                {task.title}
              </Text>
              {task.description && (
                <Text type="secondary" className="text-xs line-clamp-2 block">
                  {task.description}
                </Text>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <Tag color={getPriorityColor(task.priority)} className="text-xs m-0">
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
                  <span className="flex items-center gap-1 text-gray-500">
                    <UserOutlined className="text-xs" />
                    <Text type="secondary" className="text-xs">
                      {task.assignee.name}
                    </Text>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <Empty description="No tasks" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </Space>
    </Card>
  );
}
