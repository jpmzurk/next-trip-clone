const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiConfig = '../constants/apiConfig.js'


router.get("/:route/:direction", async (req, res) => {
  try {
    const { route, direction } = req.params;
    console.log(route, direction);

    const response = await axios.get(
      `http://svc.metrotransit.org/NexTrip/Stops/${route}/${direction}`,
      apiConfig
    );
    // console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(`error in get stops routes request: ${error}`);
  }
});

module.exports = router;
