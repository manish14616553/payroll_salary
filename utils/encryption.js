// utils/encryption.js
const crypto = require('crypto');

const encryptValue = (value, key, iv) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedValue = cipher.update(value.toString(), 'utf8', 'hex');
    encryptedValue += cipher.final('hex');
    return encryptedValue;
};

const decryptValue = (encryptedValue, keyHex, ivHex) => {
    try {
        if (!encryptedValue) {
            return 'N/A';
        }

        const key = Buffer.from(keyHex, 'hex');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

        let decryptedValue = decipher.update(encryptedValue, 'hex', 'utf8');
        decryptedValue += decipher.final('utf8');

        return decryptedValue;
    } catch (error) {
        console.error('Error decrypting value:', error);
        return 'N/A';
    }
};

module.exports = {
    encryptValue,
    decryptValue
};
