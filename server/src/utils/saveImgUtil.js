import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import generateErrorUtil from './generateErrorUtil.js';
import crypto from 'crypto';

const saveImgUtil = async (img, width = 800, isAvatar = false) => {
    try {
        const uploadsPath = path.join(process.cwd(), process.env.UPLOADS_DIR);

        try {
            await fs.access(uploadsPath);
        } catch {
            await fs.mkdir(uploadsPath);
        }

        const imgName = `${crypto.randomUUID()}.png`;
        const imgPath = path.join(uploadsPath, imgName);

        const sharpImg = sharp(img.data);

        if (isAvatar) {
            await sharpImg
                .resize(200, 200)
                .jpeg({ quality: 80 })
                .toFile(imgPath);
        } else {
            await sharpImg
                .resize(width, null)
                .jpeg({ quality: 80 })
                .toFile(imgPath);
        }
        return imgName;
    } catch (err) {
        console.error(err);
        throw generateErrorUtil('No se puede guardar archivo', 500);
    }
};

export default saveImgUtil;
