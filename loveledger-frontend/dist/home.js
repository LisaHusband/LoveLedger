'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactI18next = require('react-i18next');

var _antd = require('antd');

// 引入 Ant Design 组件

var _api = require('./api');

// 引入 API

require('./Home.css');

// 引入样式文件

var Title = _antd.Typography.Title;
var Text = _antd.Typography.Text;

var Home = function Home() {
  var _useState = (0, _react.useState)('');

  var _useState2 = _slicedToArray(_useState, 2);

  var operatorAddress = _useState2[0];
  var setOperatorAddress = _useState2[1];

  var _useState3 = (0, _react.useState)(true);

  var _useState32 = _slicedToArray(_useState3, 2);

  var loading = _useState32[0];
  var setLoading = _useState32[1];

  var _useTranslation = (0, _reactI18next.useTranslation)();

  var t = _useTranslation.t;

  // 获取当前运营者地址
  (0, _react.useEffect)(function () {
    var fetchOperatorAddress = function fetchOperatorAddress() {
      var result;
      return regeneratorRuntime.async(function fetchOperatorAddress$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.prev = 0;
            context$3$0.next = 3;
            return regeneratorRuntime.awrap((0, _api.verifyIdentity)());

          case 3:
            result = context$3$0.sent;

            setOperatorAddress(result.address); // 从后端获取当前运营者地址
            context$3$0.next = 10;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](0);

            console.error('Failed to fetch operator address:', context$3$0.t0);

          case 10:
            context$3$0.prev = 10;

            setLoading(false); // 结束加载
            return context$3$0.finish(10);

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[0, 7, 10, 13]]);
    };
    fetchOperatorAddress();
  }, []);

  return _react2['default'].createElement(
    'div',
    { className: 'home-container' },
    _react2['default'].createElement(
      'main',
      { className: 'content' },
      _react2['default'].createElement(
        Title,
        { level: 2 },
        't(`欢迎来到 LoveLedger`)'
      ),
      _react2['default'].createElement(
        'div',
        { className: 'content-text' },
        _react2['default'].createElement(
          'p',
          { className: 'detail' },
          't(`LoveLedger 是一个基于区块链的爱情信任平台，允许用户发起表白、回应表白、进行求婚和回应求婚。`)'
        ),
        _react2['default'].createElement(
          'p',
          { className: 'promise' },
          't(`LoveLedger 通过区块链技术确保每一份爱的承诺都有可信的记录。`)'
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: 'address-info' },
        _react2['default'].createElement(
          _antd.Card,
          { title: t("官方地址"), bordered: false, className: 'address-card' },
          _react2['default'].createElement(
            Text,
            null,
            '0xF93AAc54614A568A24Afbb9BD043d15358D2476A'
          )
        ),
        _react2['default'].createElement(
          _antd.Card,
          { title: t("当前运营者地址"), bordered: false, className: 'address-card' },
          loading ? _react2['default'].createElement(_antd.Spin, { size: 'small' }) : _react2['default'].createElement(
            Text,
            null,
            operatorAddress || t('未能获取地址')
          )
        )
      )
    )
  );
};

exports['default'] = Home;
module.exports = exports['default'];
/* 中央内容区域 */ /* 详细介绍文本 */ /* 显示官方地址和运营者地址 */