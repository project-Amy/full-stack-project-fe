import { Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Task, TaskPriority } from "../../../types";
import { getPriorityColor, getStatusColor } from "../../../utils/function";
import type { Assignee } from "../../../types/task";

const { Text } = Typography;

interface TableViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  isLoading: boolean;
}

export default function TableView({ tasks, onTaskClick, isLoading }: TableViewProps) {
  console.log("is loading", isLoading);
  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
      ellipsis: true,
      render: (text: string) => (text ? text : "//"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: "10%",
      render: (priority: TaskPriority) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>,
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      width: "15%",
      render: (assignee: Assignee) => (assignee ? assignee.name : "//"),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: "15%",
      render: (date: string | null) => (
        <Text className="text-sm">{date ? new Date(date).toLocaleDateString() : "-"}</Text>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="id"
      scroll={{ x: 800 }}
      onRow={(record) => ({
        onClick: () => onTaskClick(record),
        className: "cursor-pointer hover:bg-gray-50",
      })}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} tasks`,
      }}
    />
  );
}
