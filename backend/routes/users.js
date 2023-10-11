import express from "express";

const router = express.Router();

const getUsers = (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(400)
      .json({ status: "failed", error: "Did not find userId in database" });
  }
  res.status(200).send({ status: "success" });
};

router.get("/getUsers/:id", getUsers);

export default router;
