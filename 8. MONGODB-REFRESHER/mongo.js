const MongoClient = require("mongodb").MongoClient;

const password = require("./password");
const url = `mongodb+srv://chobing97:${password}@cluster0.8hpp0.mongodb.net/products_test?retryWrites=true&w=majority`;

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  //   const client = new MongoClient(url, { useUnifiedTopology: true });
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "could not store data." });
  }
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray(); // find() returns cursor
  } catch (error) {
    return res.json({ message: "could not retreive products." });
  }
  client.close();

  res.json({ products });
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
