'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('../api');

/**
 * 身份验证组件
 *
 * 该组件用于验证当前部署者的身份
 *
 * @returns 一个 React 组件
 */
var IdentityVerification = function IdentityVerification() {
  var _useState = (0, _react.useState)(null);

  var _useState2 = _slicedToArray(_useState, 2);

  var address = _useState2[0];
  var setAddress = _useState2[1];

  (0, _react.useEffect)(function () {
    var fetchIdentity = function fetchIdentity() {
      var result;
      return regeneratorRuntime.async(function fetchIdentity$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.prev = 0;
            context$3$0.next = 3;
            return regeneratorRuntime.awrap((0, _api.verifyIdentity)());

          case 3:
            result = context$3$0.sent;

            setAddress(result.address);
            context$3$0.next = 10;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](0);

            console.error(context$3$0.t0);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[0, 7]]);
    };

    fetchIdentity();
  }, []);

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      'h2',
      null,
      '身份验证'
    ),
    address ? _react2['default'].createElement(
      'p',
      null,
      '当前部署者公钥地址：',
      address
    ) : _react2['default'].createElement(
      'p',
      null,
      '验证中...'
    )
  );
};

exports['default'] = IdentityVerification;
module.exports = exports['default'];