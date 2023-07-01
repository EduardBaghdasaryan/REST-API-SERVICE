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
        throw new Error(error);
    }
};

const fetchFileList = async (listSize, page) => {
    try {
        console.log(2222222);

        const offset = (page - 1) * listSize;
        return await fileAdapter.getFileListFromDB(listSize, offset);
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    uploadFile,
    fetchFileList
};
