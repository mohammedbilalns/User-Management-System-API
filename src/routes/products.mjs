import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
    console.log("ivide ok")
  res.send([{ id: 123, name: "chicken", price: 32.12 }]);
});

export default router;
