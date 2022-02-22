const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const packageDef = protoLoader.loadSync('./todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

mongoose.connect('mongodb://localhost:27017/itemsdb', { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connection Successful!'));
mongoose.connection.on('error', err => {
  console.log(err);
  process.exit();
});

const itemsSchema = mongoose.Schema({ text: String }, { versionKey: false });
const Items = mongoose.model('Item', itemsSchema, 'items');

const server = new grpc.Server();
server.bind('0.0.0.0:8080', grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service, {
  createTodo,
  readTodos,
  readTodosStream
});

server.start();

async function createTodo({ request }, callback) {
  const body = { text: request.text.trim().toLowerCase() };
  const existUser = await Items.findOne(body);

  if (!existUser) await Items.create(body);

  callback(null, body);
}

async function readTodosStream(call) {
  const items = await Items.find({});
  items.forEach(t => call.write(t));
  call.end();
}

async function readTodos(_, callback) {
  const items = await Items.find({});

  callback(null, {
    items: items.map(item => ({ text: item.text }))
  });
}
