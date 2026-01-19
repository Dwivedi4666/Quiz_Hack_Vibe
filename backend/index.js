const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

///////////////////////////////////

const idConvert = (el) => {
  bufferData = el._id.buffer.data;
  const hexString = Buffer.from(bufferData).toString("hex");
  return hexString;
};

const quesConvert = (ques) => {
  const questionTemp = ques.map((el) => {
    const lotItems = el.lotItems.map((item) => {
      return { ...item, _id: idConvert(item) };
    });
    return { ...el, _id: idConvert(el), lotItems };
  });

  const questions = questionTemp.map((q) => {
    const tempObj = Object.assign({
      question: q.text,
      options: q.lotItems.map((opt) =>
        Object.assign({
          id: opt._id,
          text: opt.text,
          explaination: opt.explaination,
        }),
      ),
    });
    return tempObj;
  });

  return questions;
};
////////////////////////////////

app.use(cors());

app.use(express.json());

app.post("/capture", (req, res) => {
  console.log("---Received Body from /attempt ---");

  const questions = req.body.data.questionRenderViews;

  questions.forEach((q, qi) => {
    console.log(`\nQuestion ${qi + 1}: ${q.text}`);

    q.lotItems.forEach((item, oi) => {
      console.log(`  Option ${oi + 1}: ${item.text}`);
      console.log(`  Explanation: ${item.explaination}`);
      console.log("   ");
    });
  });

  const ques = quesConvert(questions);
  console.log(ques);
  fs.writeFileSync(
    `${__dirname}/data/data.json`,
    JSON.stringify(ques, null, 2),
  );
  console.log("--------------------------------");
  res.status(200).send("Data Captured");
});

app.get("/", (req, res) => {
  const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
  const dataObj = JSON.parse(data);
  res.status(200).json(dataObj);
});

app.listen(3000, () => console.log("Listening on Port:3000"));
