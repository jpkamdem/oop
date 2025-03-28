import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World" });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
