const HttpErrorHandler = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw Error("UnauthorizedError");
  }
}

export default HttpErrorHandler
