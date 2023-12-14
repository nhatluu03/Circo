// View: Responsible for sending the HTTP response
function sendResponse(res, isCached, data) {
  res.status(200).send({
    fromCache: isCached,
    data: data,
  });
}

function sendErrorResponse(res, message) {
  res.status(401).send(message);
}

export default { sendResponse, sendErrorResponse };
