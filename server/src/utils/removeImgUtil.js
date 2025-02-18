import path from 'path';
import fs from 'fs/promises';
import generateErrorUtil from './generateErrorUtil.js';

const removeImgUtil = async (imgName) => {
    try {
        const imgPath = path.join(
            process.cwd(),
            process.env.UPLOADS_DIR,
            imgName,
        );
        try {
            await fs.access(imgPath);
            await fs.unlink(imgPath);
        } catch {
            throw generateErrorUtil('File not found', 404);
        }
    } catch (err) {
        console.error(err);
        throw generateErrorUtil('Cannot delete file', 500);
    }
};

export default removeImgUtil;
