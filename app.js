import express from "express";
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.get("/webhook", (req, res) => {
  console.log("GET /webhook", req.query);
  if (req.query["hub.mode"] === "subscribe" &&
      req.query["hub.verify_token"] === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    return res.status(200).send(req.query["hub.challenge"]);
  }
  return res.sendStatus(403);
});

app.post("/webhook", (req, res) => {
  console.log("=== EVENT ===");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.get("/", (req, res) => res.send("ok"));

app.listen(process.env.PORT, () => {
  console.log(`NEW BUILD listening on port ${process.env.PORT}`);
});
