import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 声明对象类型的关系
const typeDefs = `
  type Student {
    id: String,
    name: String,
    sex: Boolean
    age: Int
  }

  type Teacher {
    id: String,
    name: String,
    age: Int,
    subject: [String],
    students: [Student]
  }

  type Query {
    students: [Student],
    teachers: [Teacher],
    studentsbyTeacherName(name: String!): [Student]
  }

  type Res {
    success: Boolean
    id: String
  }

  type Mutation {
    addStudent(name:String! age:Int! sex:Boolean!): Res
    updateStudent(id: String! name:String! age:Int! sex:Boolean!): Res
    deleteStudent(id: String!): Res
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

// 模拟数据库
const students = [
  {
    id: '1',
    name: async () => {
      await '取数据';
      return 'Amy';
    },
    sex: true,
    age: 12,
  },
  {
    id: '2',
    name: 'John',
    sex: true,
    age: 13,
  },
  {
    id: '3',
    name: 'Qunna',
    sex: false,
    age: 11,
  },
];

const teachers = [
  {
    id: '1',
    name: 'Hazel',
    sex: true,
    subject: ['体育', '数学'],
    age: 28,
    students: students,
  },
];

async function addStudent(_, { name, age, sex }) {
  students.push({
    id: '一个随机 id',
    name,
    age,
    sex,
  });
  return {
    success: true,
    id: 'xxx',
  };
}

async function updateStudent(_, { id, name, age, sex }) {
  return {
    success: true,
    id: 'xxx',
  };
}

async function deleteStudent(_, { id }) {
  return {
    success: true,
    id: 'xxx',
  };
}

// resolver 是取对象类型对应的数据的，每个字段都可以写一个 async 函数，里面执行 sql、访问接口等都可以，最终返回取到的数据。
const resolvers = {
  Query: {
    // 无参查询
    students: () => students,
    teachers: () => teachers,
    // 有参查询
    studentsbyTeacherName: async (...args) => {
      // 此时 console 会打印出参数，第二个参数是客户端传过来的查询参数 { name: 'Hazel' }
      console.log(args);

      await '执行了一个异步查询';
      return students;
    },
  },
  Mutation: {
    addStudent: addStudent,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent,
  },
};

// 传入 schema 类型定义和取数据的 resolver，就可以用 node 把服务跑起来。
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
