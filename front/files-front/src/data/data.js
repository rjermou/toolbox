import axios from 'axios';

export const getFilesData = async (fileName) => {
    // prepare url
    let url = process.env.REACT_APP_MS_FILES_URL + '/files/data';
    if (fileName) {
      url = url + '?fileName=' + fileName + ".csv";
    }
    // call the api
    const response = await axios({
                method: 'get',
                url: url,
                headers: {
                    Accept: 'application/json',
                    ContentType: 'application/json'
                }
            });
    // parse the response
    let filesArr = [];
    for (let item of response.data) {
        for (let itemContent of item.lines) {
            const fileItem = {
                fileName: item.file,
                text: itemContent.text,
                number: itemContent.number,
                hex: itemContent.hex
            }
            filesArr.push(fileItem);
        }
    }

    return filesArr;
}