import express from "express";
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

const app = express();
const PORT = 6000;

const performEvenMoreWork = async () => {
  console.log("performing even more work on", asyncLocalStorage.getStore());
};

const performSomeWork = async () => {
  await performEvenMoreWork();
};

let reqId = 0;
app.get("/", async (req, res) => {
  reqId++;
  asyncLocalStorage.run(reqId, async () => {
    await performSomeWork();
    res.status(200).json({ message: "all good" });
  });
});

app.listen(() => {
  console.log(`Listening to ${PORT}`);
});
