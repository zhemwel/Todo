import { readTodos } from "./actions";
import Todos from "./Todos";

export default async function Todo() {
  const { data: todos } = await readTodos();
  const safeTodos = todos ?? [];

  return (
    <Todos todos={safeTodos} />
  );
}
