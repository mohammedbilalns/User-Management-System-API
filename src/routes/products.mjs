import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.signedCookies);
  console.log(req.signedCookies);

  if (req.signedCookies.hello && req.signedCookies.hello === "world") {
    return res.send([{ id: 123, name: "chicken", price: 32.12 }]);
  }

  return res.status( 403).send({ msg: "sorry. You need the correct cookie" });
});

export default router;
