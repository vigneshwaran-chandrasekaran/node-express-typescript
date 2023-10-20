import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { FruitModel, Fruit } from "../models/fruit";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<Response> => {
  const fruits: Fruit[] = await FruitModel.find();
  return res.status(200).json(fruits);
});

router.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const fruit: Fruit | null = await FruitModel.findById(id);
  return res.status(200).json(fruit);
});

router.post("/", async (req: Request, res: Response): Promise<Response> => {
  const fruit: Fruit = await FruitModel.create({ ...req.body });
  return res.status(201).json(fruit);
});

router.put("/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  await FruitModel.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    req.body
  );
  const updatedFruit: Fruit | null = await FruitModel.findById(id);
  return res.status(200).json(updatedFruit);
});

router.delete(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedFruit: Fruit | null = await FruitModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
    return res.status(200).json(deletedFruit);
  }
);

export default router;
