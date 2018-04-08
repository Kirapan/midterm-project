function generateRandorDigit(){
  var chars = 'acdefhiklmnoqrstuvwxyz0123456789'.split('');
  var result = '';
  for(var i=0; i< 6; i++){
    var x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }
  return result;
}

console.log(generateRandorDigit());