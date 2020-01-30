const axios = require('axios');

const headers = {
    Authorization: 'Token c61c8933eaf4256e6a950a93701e724d0a15950a'
}
const url = 'https://www.reply.ai/api/v1/contents.json';

exports.replyFetch = () => {
    return axios.get(url, {headers})
};
