const VideoService = require("../Service/VideoService");

function VideoController (req, res, dbAddress, headers) {
  var videoService = new VideoService(dbAddress, headers);

  const handleRequest = (promise, successMessage, errorMessage) => {
    promise
      .then(response => {
        console.log(response.data);
        const results = response.data.rows;
        res.json(results);

      })
      .catch(error => {
        console.error(errorMessage, error);
        res.status(500).json({ message: errorMessage });
      });
  };

  const getVideo = (topic) => {
    handleRequest(videoService.getVideo(topic),'success:','fail:');
  }


  return {
    getVideo
  };
}

module.exports = VideoController;