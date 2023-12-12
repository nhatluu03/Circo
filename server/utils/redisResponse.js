// View: Responsible for sending the HTTP response
function sendResponse(res, isCached, data) {
    res.send({
      fromCache: isCached,
      data: data,
    });
  }
  
  function sendErrorResponse(res, message) {
    res.status(404).send(message);
  }
  
  export default { sendResponse, sendErrorResponse };
  
