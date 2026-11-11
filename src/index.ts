import express from "express";

const app = express();
const port = 4000;

app.get("/", (request, response) => {
  response.send("Hello, Dunia!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
