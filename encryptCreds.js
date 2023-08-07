const { encrypt } = require('./credentialsUtils');
const fs = require('fs');

const username = process.env.username;
const password = process.env.password;

const encryptedUsername = encrypt(username);
const encryptedPassword = encrypt(password);

fs.writeFileSync('.env', `ENCRYPTED_USERNAME=${encryptedUsername}\nENCRYPTED_PASSWORD=${encryptedPassword}`);
