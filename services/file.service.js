import fileAdapter from '../adapters/file.adapter.js';

import utils from '../utils/utils.js';

const uploadFile = async (fileData) => {
    try {
        const { path, filename } = fileData;
        const fileName = utils.generateFileName(filename);

        const filePath = await utils.saveFile(path, fileName);

        const file = {
            name: filename,
            extension: utils.getExtension(filename),
            mimeType: fileData.mimetype,
            size: fileData.size,
            uploadDate: new Date(),
            filePath,
        };

        return await fileAdapter.createFile(file);
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    uploadFile,
};
