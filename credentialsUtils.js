const fs = require('fs');
const crypto = require('crypto');

const encryptionKey = process.env.Encryption_Key;
const iv = Buffer.from([0x90, 0xb5, 0x1c, 0xc5, 0x68, 0x61, 0xc9, 0x83, 0xbb, 0x6e, 0x44, 0xc3, 0x27, 0xd7, 0xdd, 0x64]); // Must be 16 bytes for AES-256-CBC
//dot env poten

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


module.exports = {
  encrypt,
  decrypt,
};