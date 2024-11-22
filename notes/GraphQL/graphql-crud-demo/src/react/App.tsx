import { gql, useQuery } from '@apollo/client';

const getTodoList = gql`
  query Query {
    todolist {
      content
      id
    }
  }
`;

type TodoItem = {
  id: number;
  content: string;
}

type TodoList = {
  todolist: Array<TodoItem>;
}

export default function App() {
  const { loading, error, data } = useQuery<TodoList>(getTodoList);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      {
        data?.todolist?.map(item => {
          return <li key={item.id}>{item.content}</li>
        })
      }
    </ul>
  );
}
