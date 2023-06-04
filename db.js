import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://serhii:Pravdass1488@wedding1.emnnyw8.mongodb.net/wedding?retryWrites=true&w=majority'

const client = new MongoClient(uri);

async function main() {
  try {
    // Подключитесь к MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Выберите базу данных
    const database = client.db("wedding");

    // Выберите коллекцию
    const collection = database.collection("users");

    // Выполните запросы к базе данных, например, вставка документа
    // const document = { name: "Жопа лилу", age: 30 };
    const result = await collection.insertOne(document);
    console.log("Document inserted with ID:", result.insertedId);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  } finally {
    // Закройте соединение с MongoDB
    await client.close();
    console.log("Connection to MongoDB closed");
  }
}

main().catch(console.error);


