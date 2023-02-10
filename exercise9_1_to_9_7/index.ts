import express from "express"
const app = express()

app.get("/", (_req, res) => {
  res.send("Hello FullStack!")
})

const PORT = 3003

app.listen(PORT, () => {
  console.log("app running on port 3003")
})
