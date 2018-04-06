
const api_key = 'key-f7f6501d5e7940f941c0ac33d20e40a7';
const domain = 'sandboxc840785fd6244d16981cb9f613d95dca.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 


 $("#newPoll").on('submit', (event)=>{
alert("from mailgun")
let useremail = $("#useremail").val();
  
const data = {
  from: `Chill Poll <${useremail}>`,
  to: 'strangesm@gmail.com',
  cc:'mateuscbraga@gmail.com',
  subject: 'What to do on this friday ? (Title of the poll)',
  text: 'You just got asked about Netflix for this friday! (here will be the link to vote)'
};
 
mailgun.messages().send(data, function (error, body) {
  if (error) {
    // console.log(error)
  }
  console.log(body);
});

});