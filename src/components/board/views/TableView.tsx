import { Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Task, TaskPriority } from "../../../types";
import { getPriorityColor, getStatusColor } from "../../../utils/function";
import type { Assignee } from "../../../types/task";
import Action from "../Action";

const { Text } = Typography;

interface TableViewProps {
  tasks: Task[];
  isLoading: boolean;
  boardId: string;
  members: Array<{ id: string; email: string }>;
}

export default function TableView({ tasks, isLoading, boardId, members }: TableViewProps) {
  const uniqueAssignees = Array.from(new Set(tasks.filter((task) => task.assignee).map((task) => task.assignee!.name)));

  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
      ellipsis: true,
      render: (text: string) => (text ? text : "//"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "12%",
      filters: [
        { text: "TODO", value: "TODO" },
        { text: "IN_PROGRESS", value: "IN_PROGRESS" },
        { text: "DONE", value: "DONE" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: "10%",
      filters: [
        { text: "LOW", value: "LOW" },
        { text: "MEDIUM", value: "MEDIUM" },
        { text: "HIGH", value: "HIGH" },
      ],
      onFilter: (value, record) => record.priority === value,
      render: (priority: TaskPriority) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>,
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      width: "20%",
      filters: [
        { text: "Unassigned", value: "unassigned" },
        ...uniqueAssignees.map((name) => ({ text: name, value: name })),
      ],
      onFilter: (value, record) => {
        if (value === "unassigned") return !record.assignee;
        return record.assignee?.name === value;
      },
      render: (assignee: Assignee) => (assignee ? assignee.name : "//"),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: "15%",
      render: (date: string | null) => (
        <Text className="text-sm">{date ? new Date(date).toLocaleDateString() : "//"}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (record: Task) => <Action task={record} boardId={boardId} members={members} />,
    },
  ];

  return (
    <div className="mt-4 overflow-x-auto">
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} tasks`,
        }}
      />
    </div>
  );
}
