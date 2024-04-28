const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

//Define port
const PORT = process.env.PORT || 8080;

//Schema
const shemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

//Model
const userModel = mongoose.model("user", shemaData);

//Connected with DB
mongoose
  .connect("mongodb://localhost:27017/crudoperation")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//Read API
//-->>http://localhost:8080/
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ sucess: true, data: data });
});

//create data ||save data in mongoose
//-->>http://localhost:8080/create

/*
name,
email,
mobile
*/
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ sucess: true, message: "Data Save Sucessfully!", data: data });
});

//Update Data
//-->>http://localhost:8080/update

/*
id:"",
name:"",
email;"",
mobile:""
*/
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);
  const data = await userModel.updateOne({ _id: _id }, rest);
  res.send({ sucess: true, message: "Data updated successfully!", data: data });
});

//Delete API
//-->>http://localhost:8080/delete/:id
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({ sucess: true, message: "Data deleted successfully!", data: data });
});
//Starting the PORT
app.listen(PORT, () => {
  console.log("Server is running...!");
});
