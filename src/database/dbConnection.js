
const mongoUrl = process.env.MONGODB_URL

const dbConnection = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("connected to db");
    })

    .catch((err) => console.log("Failed to connect to db"));
};

export default dbConnection;
