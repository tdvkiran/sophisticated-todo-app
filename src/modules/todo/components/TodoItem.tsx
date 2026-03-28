"use client";

import { Card, Checkbox, Tag } from "antd";

export const TodoItem = ({ todo, onToggle }: any) => {
  return (
    <Card className="mb-3 rounded-lg border">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span className={todo.completed ? "line-through" : ""}>
            {todo.title}
          </span>
        </div>

        <Tag color="red">{todo.priority || "low"}</Tag>
      </div>
    </Card>
  );
};