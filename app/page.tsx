"use client";

import { useMemo, useState } from "react";
import { Button, Empty, Input, Segmented, message } from "antd";
import {
  Filter,
  useTodoStore,
} from "@/modules/todo/store/useTodoStore";
import { TodoItem } from "@/modules/todo/components/TodoItem";

export default function Page() {
  const [value, setValue] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { todos, filter, addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } =
    useTodoStore();

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  const counts = useMemo(
    () => ({
      total: todos.length,
      active: todos.filter((todo) => !todo.completed).length,
      completed: todos.filter((todo) => todo.completed).length,
    }),
    [todos]
  );

  const handleAddTodo = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      messageApi.warning("Add a task title before saving.");
      return;
    }

    addTodo(trimmedValue);
    setValue("");
  };

  const filterOptions: { label: string; value: Filter }[] = [
    { label: `All (${counts.total})`, value: "all" },
    { label: `Active (${counts.active})`, value: "active" },
    { label: `Done (${counts.completed})`, value: "completed" },
  ];

  const hasCompletedTodos = counts.completed > 0;

  const handleClearCompleted = () => {
    clearCompleted();
    messageApi.success("Completed tasks removed.");
  };

  return (
    <>
      {contextHolder}
      <main className="page-shell">
        <section className="todo-panel">
          <div className="hero-row">
            <div>
              <p className="eyebrow">Focused execution</p>
              <h1 className="hero-title">Sophisticated Todo</h1>
              <p className="hero-copy">
                A cleaner daily board with persistent tasks, fast deletion, and
                a clearer sense of progress.
              </p>
            </div>
            <div className="stats-grid">
              <article className="stat-card">
                <span>Total</span>
                <strong>{counts.total}</strong>
              </article>
              <article className="stat-card">
                <span>Active</span>
                <strong>{counts.active}</strong>
              </article>
              <article className="stat-card">
                <span>Done</span>
                <strong>{counts.completed}</strong>
              </article>
            </div>
          </div>

          <div className="composer">
            <Input
              size="large"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Add a task that moves the day forward..."
              onPressEnter={handleAddTodo}
            />
            <Button type="primary" size="large" onClick={handleAddTodo}>
              Add Task
            </Button>
          </div>

          <div className="toolbar">
            <Segmented<Filter>
              options={filterOptions}
              value={filter}
              onChange={(nextValue) => setFilter(nextValue)}
            />
            <Button
              type="default"
              size="large"
              disabled={!hasCompletedTodos}
              onClick={handleClearCompleted}
            >
              Clear Completed
            </Button>
          </div>

          <div className="todo-list">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            ) : (
              <div className="empty-state">
                <Empty
                  description={
                    filter === "all"
                      ? "No tasks yet. Start with one meaningful next step."
                      : `No ${filter} tasks right now.`
                  }
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
