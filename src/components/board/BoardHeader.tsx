import { Button, Typography, Flex, Segmented } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { BOARD_VIEW_OPTIONS } from "../../constant/boardViews";
import type { BoardViewType } from "../../types/board";

const { Title } = Typography;

interface BoardHeaderProps {
  boardName?: string;
  currentView: BoardViewType;
  isLoading: boolean;
  isFetching: boolean;
  onBack: () => void;
  onViewChange: (view: BoardViewType) => void;
  onCreateTask: () => void;
}

export default function BoardHeader({
  boardName,
  currentView,
  isLoading,
  isFetching,
  onBack,
  onViewChange,
  onCreateTask,
}: BoardHeaderProps) {
  return (
    <>
      <Flex className="mb-6">
        <Button variant="filled" icon={<ArrowLeftOutlined />} onClick={onBack} className="mb-4">
          Back
        </Button>
      </Flex>

      <div className="mb-4 flex justify-between items-center">
        <Title level={4} className="!mb-0">
          {boardName}
        </Title>
        <div className="flex gap-3 items-center">
          <Segmented
            disabled={isLoading || isFetching}
            value={currentView}
            onChange={(value) => onViewChange(value as BoardViewType)}
            options={BOARD_VIEW_OPTIONS}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={onCreateTask}>
            New Task
          </Button>
        </div>
      </div>
    </>
  );
}
