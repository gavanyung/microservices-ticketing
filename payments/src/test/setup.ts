import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock("../nats-wrapper.ts");

process.env.STRIPE_KEY =
  "sk_test_51HJEwUCVChDjPBs4My2HydYOo2UX4dwLNZsyvkIdlVlhv7dJt10P4aze5aodqm0XKTvpahXIWbiUzxoLkZI1PUm70099mlS3sJ";

let mongo: any;
beforeAll(async () => {
  //set env variables
  process.env.JWT_KEY = "asdf";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  //Build a JWT payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. {jwt: my_jwt}
  const session = { jwt: token };

  //turn session into JSON
  const sessionJSON = JSON.stringify(session);

  //take JSON and encode as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  //return string that is the cookie with the encoded data
  return [`express:sess=${base64}`];
};
