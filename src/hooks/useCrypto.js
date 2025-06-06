// src/hooks/useCrypto.js
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_CRYPTOJS_SECRET_KEY;
console.log(secretKey);

const useCrypto = () => {
    const encrypt = (text) => {
        try {
            if (!text) throw new Error('No text provided for encryption.');
            const plainText = typeof text === 'string' ? text : String(text);
            const encryptedDATA = CryptoJS.AES.encrypt(plainText, secretKey).toString();
            return encodeURIComponent(encryptedDATA);
        } catch (error) {
            console.error('Encryption failed:', error);
            return null;
        }
    };

    const decrypt = (cipherText) => {
        try {
            const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    };

    return { encrypt, decrypt };
};

export default useCrypto;
