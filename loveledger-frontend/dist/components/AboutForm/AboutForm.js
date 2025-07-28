'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('./AboutForm.css');

var _api = require('../../api');

var Title = _antd.Typography.Title;
var Paragraph = _antd.Typography.Paragraph;

var AboutForm = function AboutForm() {
  var _useState = (0, _react.useState)(null);

  var _useState2 = _slicedToArray(_useState, 2);

  var contactInfo = _useState2[0];
  var setContactInfo = _useState2[1];

  var _useState3 = (0, _react.useState)(true);

  var _useState32 = _slicedToArray(_useState3, 2);

  var loading = _useState32[0];
  var setLoading = _useState32[1];

  var _useState4 = (0, _react.useState)(null);

  var _useState42 = _slicedToArray(_useState4, 2);

  var error = _useState42[0];
  var setError = _useState42[1];

  // 获取联系方式
  (0, _react.useEffect)(function () {
    var fetchContactInfo = function fetchContactInfo() {
      var data;
      return regeneratorRuntime.async(function fetchContactInfo$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.prev = 0;
            context$3$0.next = 3;
            return regeneratorRuntime.awrap((0, _api.getContactInfo)());

          case 3:
            data = context$3$0.sent;

            setContactInfo(data);
            context$3$0.next = 10;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](0);

            setError('加载联系方式失败');

          case 10:
            context$3$0.prev = 10;

            setLoading(false);
            return context$3$0.finish(10);

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[0, 7, 10, 13]]);
    };

    fetchContactInfo();
  }, []);

  return _react2['default'].createElement(
    'div',
    { className: 'about-page-container' },
    _react2['default'].createElement(
      Title,
      { level: 2 },
      '关于本项目'
    ),
    _react2['default'].createElement(
      _antd.Card,
      { className: 'project-intro-card' },
      _react2['default'].createElement(
        Title,
        { level: 3 },
        '项目介绍'
      ),
      _react2['default'].createElement(
        Paragraph,
        null,
        '本项目旨在创建一个去中心化的表白系统，通过区块链技术提供一个安全可靠的表白过程。 用户可以通过输入自己的公钥和私钥来发送和接收表白信息，同时能够查看历史记录以及参与婚姻提案的回应。'
      ),
      _react2['default'].createElement(
        Paragraph,
        null,
        '我们希望通过这个项目为情侣提供一个有趣且安全的方式，来表达彼此的感情，所有的表白和婚姻提案信息将永久保存在区块链中，不可篡改。'
      )
    ),
    loading && _react2['default'].createElement(
      'div',
      { className: 'loading-overlay' },
      _react2['default'].createElement(_antd.Spin, { size: 'large' })
    ),
    error && _react2['default'].createElement(
      'div',
      { className: 'error-message' },
      error
    ),
    !loading && contactInfo && _react2['default'].createElement(
      _antd.Card,
      { className: 'contact-info-card' },
      _react2['default'].createElement(
        Title,
        { level: 3 },
        '联系方式'
      ),
      _react2['default'].createElement(
        _antd.Space,
        { direction: 'vertical', size: 'large' },
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'strong',
            null,
            'Email:'
          ),
          ' ',
          _react2['default'].createElement(
            'a',
            { href: 'mailto:' + contactInfo.email },
            contactInfo.email
          )
        ),
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'strong',
            null,
            'Discord:'
          ),
          ' ',
          _react2['default'].createElement(
            'a',
            { href: contactInfo.discord, target: '_blank', rel: 'noopener noreferrer' },
            '点击加入 Discord'
          )
        ),
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'strong',
            null,
            'GitHub 仓库:'
          ),
          ' ',
          _react2['default'].createElement(
            'a',
            { href: contactInfo.github_repo, target: '_blank', rel: 'noopener noreferrer' },
            '查看 GitHub 仓库'
          )
        )
      )
    )
  );
};

exports['default'] = AboutForm;
module.exports = exports['default'];
/* 项目介绍 */ /* 加载动画 */ /* 错误信息 */ /* 联系方式部分 */