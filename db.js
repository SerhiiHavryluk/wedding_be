import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://serhii:Pravdass1488@wedding1.emnnyw8.mongodb.net/wedding?retryWrites=true&w=majority'

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("wedding");

    const collection = database.collection("users");

    const result = await collection.insertOne(document);
    console.log("Document inserted with ID:", result.insertedId);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  } finally {

    await client.close();
    console.log("Connection to MongoDB closed");
  }
}

main().catch(console.error);


