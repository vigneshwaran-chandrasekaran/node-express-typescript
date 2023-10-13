import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send({ data: '"Hello World"' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
