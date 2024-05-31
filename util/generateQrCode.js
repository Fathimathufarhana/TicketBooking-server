import qr from 'qrcode'
import fs from 'fs'
import path from 'path'
import HttpError from '../middlewares/httpError.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import base64Img from 'base64-img'


export  const  generateQrCode = async (url, filename) => {

    const uploadsFolder = path.resolve('uploads/booking');
    if (!fs.existsSync(uploadsFolder)) {
        fs.mkdirSync(uploadsFolder);
        console.log('dir created')
    }  else {
        console.log('dir already exist')
    }

    let qrCodeImage = null
    const image = await qr.toDataURL(url)
    console.log(image)
    let filepathVar = base64Img.imgSync(image, 'uploads/booking', filename);

    console.log(filepathVar, 'file path ')

    return filepathVar
     
     
}
