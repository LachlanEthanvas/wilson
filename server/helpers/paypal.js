const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ARELtLF2_Ieev5wM9mv14hPeSGhyt3r7Qfsle_oK0IRbVApPy38bcN93fXh5nSxMupbCn7mmapCrt2op",
  client_secret: "EBUbTTpXdDV7uRSSc0ohxA_TlMSZC-jAN2pkQ_etzKJ0o4-CXxzKDzHy_ByrzR085utfXLJaTiNJYqVP",
});

module.exports = paypal;
