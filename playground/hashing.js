const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "123abc!";

try {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          console.log(hash);
      });
  });
} catch(e){
  debugger;
  console.log(e);
};

var hasedValue = "$2a$10$zxmRZgEERy/JVOTMCU6aiuYMBL0chc25uloHrnlmT4jLqh5Xbdo1W";

bcrypt.compare(password, hasedValue, function(err, res) {
      console.log(res);
});


// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);



// var message = "I am a user number 3";
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)).toString();
// }

//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();

//var resultHash = SHA256(JSON.stringify(token.data) + 'somescret').toString();

//if (resultHash == toke.hash){
  //console.log('Data was not changed');
//} else {
// console.log('Data was changed. Do not trust');
//}
