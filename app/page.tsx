"use client";

import { useState } from "react";
import { Input, Button } from "antd";
import { TodoItem } from "@/modules/todo/components/TodoItem";

export default function Page() {
  const [todos, setTodos] = useState<any[]>([]);
  const [value, setValue] = useState("");

  const addTodo = () => {
    if (!value) return;

    setTodos([
      {
        id: Date.now(),
        title: value,
        completed: false,
      },
      ...todos,
    ]);

    setValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-red-500">
        Sophisticated TODO
      </h1>

      <div className="flex gap-2 mb-4">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a task..."
          onPressEnter={addTodo}
        />
        <Button type="primary" onClick={addTodo}>
          Add
        </Button>
      </div>

      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
      ))}
    </div>
  );
}