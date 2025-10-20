import { Input, Select, Button, Space, Card, Tag } from "antd";
import { SearchOutlined, ClearOutlined, FilterOutlined } from "@ant-design/icons";
import type { TaskFilters as TaskFiltersType } from "../../hooks/use-task-filters";

const { Option } = Select;

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFilterChange: (filters: Partial<TaskFiltersType>) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  members?: { id: string; email: string }[];
}

export default function TaskFilters({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  members = [],
}: TaskFiltersProps) {
  return (
    <Card className="mb-4 shadow-sm">
      <Space direction="vertical" size="middle" className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <FilterOutlined className="text-gray-500" />
          <span className="font-medium text-gray-700">Filters</span>
          {hasActiveFilters && (
            <Tag color="blue" className="ml-2">
              Active
            </Tag>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Search tasks..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            allowClear
            className="w-full"
          />
          <Select
            mode="multiple"
            placeholder="Filter by status"
            value={filters.status}
            onChange={(value) => onFilterChange({ status: value })}
            className="w-full"
            maxTagCount="responsive"
            allowClear
          >
            <Option value="TODO">
              <Tag color="default">TODO</Tag>
            </Option>
            <Option value="IN_PROGRESS">
              <Tag color="processing">IN PROGRESS</Tag>
            </Option>
            <Option value="DONE">
              <Tag color="success">DONE</Tag>
            </Option>
          </Select>

          <Select
            mode="multiple"
            placeholder="Filter by priority"
            value={filters.priority}
            onChange={(value) => onFilterChange({ priority: value })}
            className="w-full"
            maxTagCount="responsive"
            allowClear
          >
            <Option value="LOW">
              <Tag color="green">LOW</Tag>
            </Option>
            <Option value="MEDIUM">
              <Tag color="orange">MEDIUM</Tag>
            </Option>
            <Option value="HIGH">
              <Tag color="red">HIGH</Tag>
            </Option>
          </Select>

          <Select
            mode="multiple"
            placeholder="Filter by assignee"
            value={filters.assignee}
            onChange={(value) => onFilterChange({ assignee: value })}
            className="w-full"
            maxTagCount="responsive"
            allowClear
            showSearch
            filterOption={(input, option) =>
              String(option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            <Option value="unassigned" label="Unassigned">
              <span className="text-gray-500 italic">Unassigned</span>
            </Option>
            {members.map((member) => (
              <Option key={member.id} value={member.id} label={member.email}>
                {member.email}
              </Option>
            ))}
          </Select>
        </div>

        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button icon={<ClearOutlined />} onClick={onClearFilters} size="small" type="default">
              Clear all filters
            </Button>
          </div>
        )}
      </Space>
    </Card>
  );
}
