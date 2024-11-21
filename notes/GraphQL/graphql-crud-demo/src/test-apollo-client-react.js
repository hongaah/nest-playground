import { useQuery, gql } from '@apollo/client';

// react 的客户端
// gql 的 api 来写查询语言
const GET_STUDENTS = gql`
  query getStudents {
    teachers {
      name
      age
      students {
        name
        id
      }
    }
  }
`;

export default function getStudents() {
  // useQuery 的 api 来执行查询
  const { loading, error, data } = useQuery(GET_STUDENTS);
  console.log(loading, error, data);
}
