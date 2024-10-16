import { readTodos } from "./actions";
import Todos from "./Todos";

export default async function Todo() {
  const { data: todos } = await readTodos();
  const safeTodos = todos ?? [];

  // Sort todos so that Not Completed comes first and Done comes last
  const sortedTodos = safeTodos.sort((a, b) => {
    if (!a.completed && b.completed) return -1;
    if (a.completed && !b.completed) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return <Todos todos={sortedTodos} />;
}
