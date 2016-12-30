'use strict';

//mock for superagent - __mocks__/superagent.js
//source: https://gist.github.com/pherris/aa74aa9b8b1a55ea053b

var mockDelay;
var mockError;
var mockResponse = {
  status() {
    return 200;
  },
  ok() {
    return true;
  },
  get: jest.genMockFunction(),
  toError: jest.genMockFunction()
};

var Request = {
  post() {
    return this;
  },
  get() {
    return this;
  },
  send() {
    return this;
  },
  query() {
    return this;
  },
  field() {
    return this;
  },
  attach() {
    return this;
  },
  set() {
    return this;
  },
  accept() {
    return this;
  },
  timeout() {
    return this;
  },
  end: jest.genMockFunction().mockImplementation(function(callback) {
    if (mockDelay) {
      this.delayTimer = setTimeout(callback, 0, mockError, mockResponse);

      return;
    }

    callback(mockError, mockResponse);
  }),
  //expose helper methods for tests to set
  __setMockDelay(boolValue) {
    mockDelay = boolValue;
  },
  __setMockResponse(mockRes) {
    mockResponse = mockRes;
  },
  __setMockError(mockErr) {
    mockError = mockErr;
  }
};

module.exports = Request;
