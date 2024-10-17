const app = require("./app");

const connectDatabase = require("./database");

process.on("uncaughtException", (error) => {
  console.log(`Error:${error.message}`);
  console.log("Shutting down server due to uncaught promise rejection");

  process.exit(1);
});

//Connecting to database
connectDatabase();

const server = app.listen(3000, () => {
  console.log(`server is working on http://localhost:3000`);
});

//handling unhandled Promise Rejection

process.on("unhandledRejection", (error) => {
  console.log(`Error:${error.message}`);
  console.log("Shutting down server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});