const axios = require('axios');



function VideoService(dbAddress, headers) {

  this.dbAddress = dbAddress;
  this.headers = headers;

  const getVideo = (topic) => {
    let url = dbAddress + 'video/_design/topic/_view/by_topic?key=' + '"' + topic  + '"';
    console.log(url);
    return axios.get(url, { headers });
  }

  return {
    getVideo
  };
}

module.exports = VideoService;