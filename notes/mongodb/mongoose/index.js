const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/aaa');

  // 创建 Schema 描述对象的形状，然后根据 Schema 创建 Model，每一个 model 对象存储一个文档的信息，可以单独 CRUD。
  const PersonSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobbies: [String],
  });

  const Person = mongoose.model('Person', PersonSchema);

  const person1 = new Person();
  person1.name = 'person1';
  person1.age = 20;

  await person1.save();

  const person2 = new Person();
  person2.name = 'person2';
  person2.age = 21;
  person2.hobbies = ['reading', 'football'];

  await person2.save();

  // const persons = await Person.find();
  const personsWithCondition = await Person.find({
    // $and: [{ age: { $gte: 20 } }, { name: /person*/ }],
    age: { $in: [20, 21] },
  });

  console.log(personsWithCondition);
}
