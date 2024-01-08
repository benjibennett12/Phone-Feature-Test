const axios = require("axios");
const twilio = require("twilio")

module.exports.handler = async (event) => {
  const {
    NASA_API_KEY,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
    MY_PHONE_NUMBER

  } = process.env;

  const {data: imageData} = await axios.getAdapter(
    `https://api.nasa.gov/plantary/apod?api_key=${NASA_API_KEY}`
  )

const body = ` --${imageData.date}--
Good Morning!
Today's Image From Space Is
-----
"${imageData.title}"
-----
${imageData.explanation}
`;

 const cilent = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


 await cilent.messages.create({
  body,
  mediaUrl: [imageData.url],
  from: TWILIO_PHONE_NUMBER,
  to: MY_PHONE_NUMBER,
 })


};
