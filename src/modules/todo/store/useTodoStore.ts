import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Filter = "all" | "active" | "completed";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
};

type Store = {
  todos: Todo[];
  filter: Filter;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
};

const seedTodos: Todo[] = [
  {
    id: 1,
    title: "Review quarterly roadmap",
    completed: false,
    priority: "high",
    createdAt: "2026-03-28T08:30:00.000Z",
  },
  {
    id: 2,
    title: "Refine onboarding checklist copy",
    completed: true,
    priority: "medium",
    createdAt: "2026-03-27T15:00:00.000Z",
  },
];

const getPriority = (title: string): Todo["priority"] => {
  if (title.length >= 36) {
    return "high";
  }

  if (title.length >= 20) {
    return "medium";
  }

  return "low";
};

export const useTodoStore = create<Store>()(
  persist(
    (set) => ({
      todos: seedTodos,
      filter: "all",
      addTodo: (title) =>
        set((state) => ({
          todos: [
            {
              id: Date.now(),
              title: title.trim(),
              completed: false,
              priority: getPriority(title.trim()),
              createdAt: new Date().toISOString(),
            },
            ...state.todos,
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      setFilter: (filter) => set({ filter }),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: "sophisticated-todo-store",
      partialize: (state) => ({
        todos: state.todos,
        filter: state.filter,
      }),
    }
  )
);
