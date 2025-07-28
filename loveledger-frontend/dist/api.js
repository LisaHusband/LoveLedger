'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var BASE_URL = 'http://localhost:5000'; // 后端API的地址

// 请求表白
var sendConfession = function sendConfession(from, privateKey, to, title, message) {
  var response;
  return regeneratorRuntime.async(function sendConfession$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap(_axios2['default'].post(BASE_URL + '/confess', {
          from: from, private_key: privateKey, to: to, title: title, message: message
        }));

      case 3:
        response = context$1$0.sent;
        return context$1$0.abrupt('return', response.data);

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);
        throw context$1$0.t0.response.data;

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[0, 7]]);
};

exports.sendConfession = sendConfession;
// 回应表白
var respondConfession = function respondConfession(from, privateKey, confessionId, accept) {
  var response;
  return regeneratorRuntime.async(function respondConfession$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap(_axios2['default'].post(BASE_URL + '/respond_confession', {
          from: from, private_key: privateKey, confession_id: confessionId, accept: accept
        }));

      case 3:
        response = context$1$0.sent;
        return context$1$0.abrupt('return', response.data);

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);
        throw context$1$0.t0.response.data;

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[0, 7]]);
};

exports.respondConfession = respondConfession;
// 求婚
var registerMarriage = function registerMarriage(from, privateKey, partner) {
  var response;
  return regeneratorRuntime.async(function registerMarriage$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap(_axios2['default'].post(BASE_URL + '/register_marriage', {
          from: from, private_key: privateKey, partner: partner
        }));

      case 3:
        response = context$1$0.sent;
        return context$1$0.abrupt('return', response.data);

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);
        throw context$1$0.t0.response.data;

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[0, 7]]);
};

exports.registerMarriage = registerMarriage;
// 回应求婚
var respondMarriage = function respondMarriage(from, privateKey, marriageId, accept) {
  var response;
  return regeneratorRuntime.async(function respondMarriage$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap(_axios2['default'].post(BASE_URL + '/respond_marriage', {
          from: from, private_key: privateKey, marriage_id: marriageId, accept: accept
        }));

      case 3:
        response = context$1$0.sent;
        return context$1$0.abrupt('return', response.data);

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);
        throw context$1$0.t0.response.data;

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[0, 7]]);
};

exports.respondMarriage = respondMarriage;
// 查询表白历史
var getConfessionsHistory = function getConfessionsHistory(address) {
  var response;
  return regeneratorRuntime.async(function getConfessionsHistory$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(_axios2['default'].get(BASE_URL + '/confessions_to/' + address));

      case 2:
        response = context$1$0.sent;
        return context$1$0.abrupt('return', response.data);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

exports.getConfessionsHistory = getConfessionsHistory;
// 查询求婚历史
var getMarriagesHistory = function getMarriagesHistory(address) {
  var response;
  return regeneratorRuntime.async(function getMarriagesHistory$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(_axios2['default'].get(BASE_URL + '/marriages_of/' + address));

      case 2:
        response = context$1$0.sent;
        return context$1$0.abrupt('return', response.data);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

exports.getMarriagesHistory = getMarriagesHistory;
// 查询爱情信用
var getLoveCredit = function getLoveCredit(address) {
  var response;
  return regeneratorRuntime.async(function getLoveCredit$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(_axios2['default'].get(BASE_URL + '/love_credit/' + address));

      case 2:
        response = context$1$0.sent;
        return context$1$0.abrupt('return', response.data);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

exports.getLoveCredit = getLoveCredit;
// 身份验证
var verifyIdentity = function verifyIdentity() {
  var response;
  return regeneratorRuntime.async(function verifyIdentity$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(_axios2['default'].get(BASE_URL + '/verify_identity'));

      case 2:
        response = context$1$0.sent;
        return context$1$0.abrupt('return', response.data);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

exports.verifyIdentity = verifyIdentity;
// 获取通讯信息
var getContactInfo = function getContactInfo(address) {
  var response;
  return regeneratorRuntime.async(function getContactInfo$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(_axios2['default'].get(BASE_URL + '/contact_info'));

      case 2:
        response = context$1$0.sent;
        return context$1$0.abrupt('return', response.data);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};
exports.getContactInfo = getContactInfo;