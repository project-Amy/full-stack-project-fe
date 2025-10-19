import { Button, Typography, Flex, Segmented } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { BOARD_VIEW_OPTIONS } from "../../constant/boardViews";
import { useBoardViewStore } from "../../store/useBoardViewStore";
import type { BoardViewType } from "../../types/board";

const { Title } = Typography;

interface BoardHeaderProps {
  boardName?: string;
  boardId: string;
  currentView: BoardViewType;
  isLoading: boolean;
  isFetching: boolean;
  onBack: () => void;
  onCreateTask: () => void;
}

export default function BoardHeader({
  boardName,
  boardId,
  currentView,
  isLoading,
  isFetching,
  onBack,
  onCreateTask,
}: BoardHeaderProps) {
  const { setBoardView } = useBoardViewStore();
  return (
    <>
      <Flex className="mb-6">
        <Button variant="filled" icon={<ArrowLeftOutlined />} onClick={onBack} className="mb-4">
          Back
        </Button>
      </Flex>

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Title level={4} className="!mb-0">
          {boardName}
        </Title>
        <div className="flex flex-col xs:flex-row gap-3 items-stretch xs:items-center w-full sm:w-auto">
          <Segmented
            disabled={isLoading || isFetching}
            value={currentView}
            onChange={(value) => setBoardView(boardId, value as BoardViewType)}
            options={BOARD_VIEW_OPTIONS}
            className="w-full xs:w-auto"
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={onCreateTask} className="w-full xs:w-auto">
            New Task
          </Button>
        </div>
      </div>
    </>
  );
}
