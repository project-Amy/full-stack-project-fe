import { Row, Col, Card, Skeleton, Space } from "antd";
import KanbanColumn from "../../task/KanbanColumn";
import type { Task } from "../../../types";

interface KanbanViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  isLoading: boolean;
}

export default function KanbanView({ tasks, onTaskClick, isLoading }: KanbanViewProps) {
  const tasksByStatus = {
    TODO: tasks?.filter((task) => task.status === "TODO") || [],
    IN_PROGRESS: tasks?.filter((task) => task.status === "IN_PROGRESS") || [],
    DONE: tasks?.filter((task) => task.status === "DONE") || [],
  };

  return (
    <div className="max-w-7xl mx-auto">
      {isLoading ? (
        <Row gutter={[16, 16]} className="mt-4">
          {["TODO", "IN PROGRESS", "DONE"].map((col) => (
            <Col xs={24} md={8} key={col}>
              <Card title={<Skeleton.Input active size="small" />} className="h-full">
                <Space direction="vertical" size="middle" className="w-full">
                  {[1, 2, 3].map((item) => (
                    <Card key={item} size="small" className="shadow-sm">
                      <Skeleton active title={{ width: "60%" }} paragraph={{ rows: 2 }} />
                    </Card>
                  ))}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24} md={8}>
            <KanbanColumn
              title="TODO"
              status="TODO"
              tasks={tasksByStatus.TODO}
              tagColor="default"
              onTaskClick={onTaskClick}
            />
          </Col>

          <Col xs={24} md={8}>
            <KanbanColumn
              title="IN PROGRESS"
              status="IN_PROGRESS"
              tasks={tasksByStatus.IN_PROGRESS}
              tagColor="processing"
              onTaskClick={onTaskClick}
            />
          </Col>

          <Col xs={24} md={8}>
            <KanbanColumn
              title="DONE"
              status="DONE"
              tasks={tasksByStatus.DONE}
              tagColor="success"
              onTaskClick={onTaskClick}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}
