const axios = require("axios");
const weather = require("./weather.js");

module.exports.getApiAndEmit = async socket => {
  try {
    console.log("getApiAndEmit");
    const res = await axios.get(
      "https://api.darksky.net/forecast/API_KEY/50.0619,19.9369"
     
    ); 
    socket.emit("FromAPI", res.data.currently, new Date().toLocaleTimeString()); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

module.exports.fakeMethod = socket => {
  let randomKey = Object.keys(weather.weather)[
    Math.floor(Math.random() * Object.keys(weather.weather).length)
  ];

  console.log(weather.icons[randomKey]);

  const data = {
    temperature: Math.floor(Math.random() * 40 + 1),
    summary: weather.weather[randomKey],
    currentTime: new Date().toLocaleTimeString(),
    icon: weather.icons[randomKey]
  };
  socket.emit("FromAPI", data);
};
