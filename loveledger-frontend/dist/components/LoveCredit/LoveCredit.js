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

// 引入 Ant Design 组件

var _api = require('../../api');

// 假设你的 API 请求已配置好

require('./LoveCreditForm.css');

// 引入样式文件

var Title = _antd.Typography.Title;

var LoveCreditForm = function LoveCreditForm() {
  var _useState = (0, _react.useState)(null);

  var _useState2 = _slicedToArray(_useState, 2);

  var response = _useState2[0];
  var setResponse = _useState2[1];

  var _useState3 = (0, _react.useState)(false);

  var _useState32 = _slicedToArray(_useState3, 2);

  var loading = _useState32[0];
  var setLoading = _useState32[1];
  // 控制加载状态

  var _useState4 = (0, _react.useState)('');

  var _useState42 = _slicedToArray(_useState4, 2);

  var address = _useState42[0];
  var setAddress = _useState42[1];

  var handleFinish = function handleFinish(values) {
    var address, result;
    return regeneratorRuntime.async(function handleFinish$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          address = values.address;

          setLoading(true); // 开始加载
          context$2$0.prev = 2;
          context$2$0.next = 5;
          return regeneratorRuntime.awrap((0, _api.getLoveCredit)(address));

        case 5:
          result = context$2$0.sent;
          // 发起请求
          setResponse(result);
          context$2$0.next = 12;
          break;

        case 9:
          context$2$0.prev = 9;
          context$2$0.t0 = context$2$0['catch'](2);

          setResponse(context$2$0.t0);

        case 12:
          context$2$0.prev = 12;

          setLoading(false); // 加载完成
          return context$2$0.finish(12);

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[2, 9, 12, 15]]);
  };

  return _react2['default'].createElement(
    'div',
    { className: 'love-credit-form-container' },
    _react2['default'].createElement(
      Title,
      { level: 2 },
      '爱情信用查询'
    ),
    loading && _react2['default'].createElement(
      'div',
      { className: 'loading-overlay' },
      _react2['default'].createElement(_antd.Spin, { size: 'large' })
    ),
    _react2['default'].createElement(
      _antd.Form,
      { onFinish: handleFinish, className: 'love-credit-form' },
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'address',
          rules: [{ required: true, message: '请输入地址!' }]
        },
        _react2['default'].createElement(_antd.Input, {
          placeholder: '请输入地址',
          className: 'input-field',
          value: address,
          onChange: function (e) {
            return setAddress(e.target.value);
          }
        })
      ),
      _react2['default'].createElement(
        _antd.Form.Item,
        null,
        _react2['default'].createElement(
          _antd.Button,
          {
            type: 'default',
            htmlType: 'submit',
            className: 'submit-button',
            loading: loading // 按钮的加载状态
          },
          '查询爱情信用'
        )
      )
    ),
    response && _react2['default'].createElement(
      'div',
      { className: 'response-container' },
      _react2['default'].createElement(
        Title,
        { level: 4 },
        '查询结果'
      ),
      _react2['default'].createElement(
        _antd.Card,
        {
          title: '爱情信用信息',
          bordered: false,
          style: { width: '100%', marginTop: 20 },
          className: 'response-card'
        },
        _react2['default'].createElement(
          _antd.Space,
          { direction: 'vertical', style: { width: '100%' } },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'strong',
              null,
              '信用值： '
            ),
            ' ',
            response.love_credit
          ),
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'strong',
              null,
              '状态：'
            ),
            response.love_credit === 0 ? '极佳' : response.love_credit <= 3 ? '良好' : response.love_credit <= 5 ? '一般' : '较差'
          ),
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'strong',
              null,
              '查询地址：'
            ),
            ' ',
            address
          )
        )
      )
    )
  );
};

exports['default'] = LoveCreditForm;
module.exports = exports['default'];
/* 显示加载动画 */ /* 展示响应内容 */