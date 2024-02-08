import express, { Request, Response } from "express";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use([express.json(), express.text()]);
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync("appData.json");
  res.json(data.toString());
  // res.render("index.html");
});

app.post("/", (req: Request, res: Response) => {
  const data = req.body;
  fs.writeFileSync("appData.json", JSON.stringify(data));
  res.send(`posted successfully`);
});

app.put("/", (req: Request, res: Response) => {
  const data = req.body;
  const existingData = JSON.parse(fs.readFileSync("appData.json").toString());
  const newData = [...existingData, data];
  fs.writeFileSync("appData.json", JSON.stringify(newData));
  res.send(`put successfully`);
});

app.delete("/", (req: Request, res: Response) => {
  const { name } = req.query;
  const fileName = name as string;
  fs.unlink(fileName, (err) => {
    console.log(err);
    res.send(`deleted successfully`);
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
