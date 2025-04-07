'use strict';
exports.handler = async (event) => {
  const request = event.Records[0].cf.request;
  const response = event.Records[0].cf.response;
  const headers = request.headers;

  // Get the domain from the 'host' header
  const domain = headers.host[0].value;

  // Check if the content is HTML
  if (response.headers['content-type'][0].value.includes('text/html')) {
    let body = response.body;

    // Replace the placeholders with the actual domain
    body = body.replace(/__DOMAIN__/g, domain);

    // Update the response with the modified body
    response.body = body;
  }

  return response;
};