import http from "http";

class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.status = statusCode;
    this.statusText = http.STATUS_CODES[statusCode];
    this.message = message;
    this.succuss = statusCode < 400;

    if (data !== undefined && data !== null) {
      this.data = data;
    }
  }
}

export default ApiResponse;
