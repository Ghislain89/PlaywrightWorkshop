"use client";
import { getTodosFn } from "@/lib/utils/constants/queryFns";
import { Todo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import TodoItem from "../TodoItem/TodoItem";

export default function TodosContainer() {
  const { data, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodosFn,
  });

  if (isLoading)
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <Loading />
      </div>
    );

  if (data?.length == 0)
    return (
      <>
        <div className="flex h-[40vh] items-center justify-center">
          <p className="text-center text-h3">No Todos found.</p>
        </div>
      </>
    );

  return (
    <ul data-testid="TodoList" className="w-full md:w-2/3">
      {data?.map((todo: Todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
}
