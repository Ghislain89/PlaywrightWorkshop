"use client";
import { todoItemVariant } from "@/lib/framer-motion/variants";
import { AppRoutes } from "@/lib/utils/constants/AppRoutes";
import { deleteTodoFn, updateTodoFn } from "@/lib/utils/constants/queryFns";
import { Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";

interface TodoItemProps {
  id: number;
  title: string;
  complete: boolean;
  importance: string;
}

export default function TodoItem(props: TodoItemProps) {
  const { id, title, importance, complete } = props;
  const [checked, setChecked] = useState(complete);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Handle Delete Mutation to Update Optimistic Updates
  const deleteMutation = useMutation({
    mutationFn: deleteTodoFn,
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // Optimistically remove the todo from the array
      let updatedTodos: Todo[] = [];

      if (previousTodos) {
        updatedTodos = [...previousTodos].filter((todo) => todo.id !== id);
      }

      queryClient.setQueryData<Todo[]>(["todos"], updatedTodos);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },

    // If the mutation fails, use the context we returned above
    onError: (context: { previousTodos?: Todo[] | undefined }) => {
      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutateAsync: updateTodo, isLoading: updateLoading } = useMutation({
    mutationFn: (complete: boolean) =>
      updateTodoFn({ id, title, importance, complete }),
  });

  return (
    <li
      data-testid="TodoItem"
      id={id.toString()}
      className={`flex relative gap-1 items-center border-2  border-black
       p-2 mb-2 last:mb-0 rounded `}
    >
      <div className="flex items-center gap-4 w-3/4 p-1">
        {importance === "important" && (
          <motion.div
            variants={todoItemVariant}
            initial="hidden"
            animate="visible"
            //animations

            className="absolute left-0 top-0 bg-orange-600 w-full h-2"
          />
        )}
        <input
          onChange={(e) => {
            setChecked(e.target.checked);
            updateTodo(e.target.checked);
          }}
          type="checkbox"
          checked={checked}
          className="cursor-pointer peer"
          aria-label="Complete"
        />
        <label
          aria-label="Todo Description"
          htmlFor={id.toString()}
          className="peer-checked:line-through cursor-pointer peer-checked:text-secondary w-[95%] whitespace-normal break-words"
        >
          {title}
        </label>
      </div>

      <div className="flex absolute right-2 gap-2 h-full items-center">
        <button
          disabled={updateLoading}
          className="flex"
          onClick={() => router.push(`${AppRoutes.Update}/${id}`)}
          aria-label="Edit"
        >
          <AiFillEdit fontSize={25} className="text-black-300" />
        </button>
        <button
          className="flex"
          onClick={() => deleteMutation.mutate(id)}
          aria-label="Delete"
        >
          <AiOutlineDelete fontSize={25} className="text-black-600" />
        </button>
      </div>
    </li>
  );
}
