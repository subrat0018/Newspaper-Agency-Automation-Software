const axios = require("axios");

//Used Email Js api to send the customers notification regarding dues payment
function sendEmail(arr) {
  for (let i = 0; i < arr.length; i++) {
    const templateParams = {
      send_to: arr[i].email,
      reply_to: "subratchandra2003@gmail.com",
      to_name: arr[i].name,
      from_name: "NewsFlow",
      message:
        "This is a reminder message to pay your dues\n" +
        "Amount Due: " +
        arr[i].amountDue +
        "\n" +
        "last Paid: " +
        arr[i].lastPaid +
        "\n" +
        " Please Pay the dues within the next two days otherwise your subscription will be discontinued",
    };
    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", {
        service_id: "service_bm15agb",
        template_id: "template_88nedvd",
        template_params: templateParams,
        user_id: "gq5EC7phOdJUF4sko",
      })
      .then((res) => console.log("Email Sent"))
      .catch((err) => console.log(err));
  }
}

module.exports = { sendEmail };
