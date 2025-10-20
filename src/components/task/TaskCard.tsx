import { Card, Tag, Typography, Space, Flex, Avatar, Tooltip } from "antd";
import { CalendarOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import type { Task } from "../../types";
import { getPriorityColor, getStatusColor } from "../../utils/function";

const { Text, Title } = Typography;

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
  isLoading: boolean;
}

export default function TaskCard({ task, onClick, isLoading }: TaskCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <Card
      loading={isLoading}
      hoverable
      className="cursor-pointer transition-all duration-300"
      style={{ borderLeftColor: getPriorityColor(task.priority) }}
      onClick={() => onClick(task)}
    >
      <Space direction="vertical" size={12} className="w-full">
        <Flex justify="space-between" align="start" gap={8} wrap="wrap">
          <Title level={5} className="!mb-0 flex-1 min-w-0" ellipsis={{ rows: 2 }}>
            {task.title}
          </Title>
          <Tag color={getStatusColor(task.status)} className="!m-0 font-medium px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm shrink-0">
            {task.status}
          </Tag>
        </Flex>
        {task.description && (
          <Text type="secondary" className="text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {task.description}
          </Text>
        )}
        <Flex justify="space-between" align="center" gap={8} wrap="wrap" className="!pt-2 border-t border-gray-100">
          <Flex gap={8} align="center" wrap="wrap" className="flex-1 sm:gap-3">
            <Tooltip title={`Priority: ${task.priority}`}>
              <Tag color={getPriorityColor(task.priority)} className="!m-0 text-xs font-semibold shrink-0">
                {task.priority}
              </Tag>
            </Tooltip>
            {task.assignee && (
              <Tooltip title={task.assignee.name}>
                <Flex align="center" gap={4} className="min-w-0">
                  <Avatar size="small" icon={<UserOutlined />} className="bg-blue-500 shrink-0" />
                  <Text type="secondary" className="text-xs font-medium truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
                    {task.assignee.name}
                  </Text>
                </Flex>
              </Tooltip>
            )}
          </Flex>

          {task.dueDate && (
            <Tooltip title={isOverdue ? "Overdue!" : "Due date"}>
              <Flex align="center" gap={4} className={`shrink-0 ${isOverdue ? "text-red-500" : "text-gray-500"}`}>
                {isOverdue ? <ClockCircleOutlined className="text-xs sm:text-sm" /> : <CalendarOutlined className="text-xs sm:text-sm" />}
                <Text type={isOverdue ? "danger" : "secondary"} className="text-xs font-medium whitespace-nowrap">
                  {new Date(task.dueDate).toLocaleDateString()}
                </Text>
              </Flex>
            </Tooltip>
          )}
        </Flex>
      </Space>
    </Card>
  );
}
