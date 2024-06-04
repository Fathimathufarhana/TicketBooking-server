import qr from 'qrcode';
import fs from 'fs';
import path from 'path';
import base64Img from 'base64-img';

export const generateQrCode = async (url, filename) => {
    const uploadsFolder = path.resolve('uploads/booking');
    if (! fs.existsSync(uploadsFolder)) {
        fs.mkdirSync(uploadsFolder);
        console.log('dir created');
    } else {
        console.log('dir already exists');
    }

    const image = await qr.toDataURL(url);
    const filepathVar = base64Img.imgSync(image, 'uploads/booking', filename);

    return filepathVar;
};
