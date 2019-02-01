// Assuming you have already done "npm install fernet"
let Fernet = require('fernet')
let secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcU-hV8x05jqHjKUFE1181gjsV46vvaI06Y-VeVN2a6ix0mpWghR_-wvvjvTyMYGPzPdGbp1dC33pnsTavU9llBIhLESETARWltMKidlB3xcVYKAJxBypEGgByS7O9yDmGUTgadsBtrazwx61aRrROkYzDLY_u7NU0Zr917NCd97DzmjRMCfdgl047T5z5NO7L84VE'
let token = new Fernet.Token({secret, token: message, ttl:0})
token.decode()
console.log(token.decode());
