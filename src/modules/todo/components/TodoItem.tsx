"use client";

import { Button, Card, Checkbox, Tag } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import type { Todo } from "@/modules/todo/store/useTodoStore";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const priorityColor: Record<Todo["priority"], string> = {
  low: "green",
  medium: "gold",
  high: "red",
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <Card className="todo-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-3">
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mt-1"
          />
          <div className="min-w-0">
            <p
              className={`text-base font-medium text-slate-900 transition ${
                todo.completed ? "text-slate-400 line-through" : ""
              }`}
            >
              {todo.title}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Tag color={priorityColor[todo.priority]} className="m-0">
                {todo.priority}
              </Tag>
              <span className="text-xs text-slate-500">
                Created {dayjs(todo.createdAt).format("MMM D, YYYY h:mm A")}
              </span>
            </div>
          </div>
        </div>

        <Button
          danger
          type="text"
          aria-label={`Delete ${todo.title}`}
          icon={<DeleteOutlined />}
          onClick={() => onDelete(todo.id)}
        />
      </div>
    </Card>
  );
};
