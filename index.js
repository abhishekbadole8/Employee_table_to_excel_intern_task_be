const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/api/users/dashboard", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 10; // Number of users per page

    const response = await axios.get(`https://gorest.co.in/public-api/users`, {
      params: {
        page,
        limit,
      },
    });
    if (response.status === 200) {
      const data = response.data.data;
      res.send(data);
    }
  } catch (error) {
    console.log("fetch Error user data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch(`/api/users/edit/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender } = req.body;
    const token = req.headers.authorization;

    const response = await axios.patch(
      `https://gorest.co.in/public/v2/users/${id}`,
      {
        name,
        email,
        gender,
      },
      {
        headers: {
          authorization: token,
        },
      },
      {
        new: true,
      }
    );   
    res.send(response.data);
  } catch (error) {
    console.log("fetch Error user data", error);
  }
});


app.listen(port, () => {
  console.log("Connected to port", port);
});
