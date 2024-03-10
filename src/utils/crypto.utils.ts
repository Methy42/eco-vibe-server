import * as crypto from 'crypto';

const keyParameterCryptKey = Buffer.from("54 cf 85 84 18 26 2b ab 0a c0 76 9c 3a 98 ec 0e e1 81 a4 51 c8 1e 80 42 14 04 7d 2d eb 09 1c f5".replace(/\s/g, ""), 'hex');
const keyParameterCryptIv = Buffer.from("76 a7 2c 73 b7 44 ca 41 57 b2 d3 64 7c 82 05 e6".replace(/\s/g, ""), 'hex');

export const keyParameterEncrypt = (text: string) => new Promise((resolve, reject) => {
    try {
        const algorithm = 'aes-256-cbc';
        const key = keyParameterCryptKey;
        const iv = keyParameterCryptIv;

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        resolve({
            key: key.toString('hex'),
            iv: iv.toString('hex'),
            encryptedText: encrypted,
        });
    } catch (error) {
        reject(error);
    }
});

export const keyParameterDecrypt = (text: string) => {
    return new Promise((resolve, reject) => {
        try {
            const algorithm = 'aes-256-cbc';
            const key = keyParameterCryptKey;
            const iv = keyParameterCryptIv;

            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decrypted = decipher.update(text, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            resolve(decrypted);
        } catch (error) {
            reject(error);
        }
    });
};

export const stringToMd5 = (text: string) => {
    const hash = crypto.createHash('md5');
    hash.update(text);
    return hash.digest('hex');
};