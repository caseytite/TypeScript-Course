import express from "express";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
const PORT = 3000;

import todoRoutes from "./routes/todos";

const app = express();

app.use(json());

app.use("/todos", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
