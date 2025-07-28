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

// 导入 Ant Design 组件

var _api = require('../../api');

require('./ConfessForm.css');

var _reactI18next = require('react-i18next');

var Title = _antd.Typography.Title;

var ConfessForm = function ConfessForm() {
  var _useTranslation = (0, _reactI18next.useTranslation)();

  var t = _useTranslation.t;

  var _useState = (0, _react.useState)(null);

  var _useState2 = _slicedToArray(_useState, 2);

  var response = _useState2[0];
  var setResponse = _useState2[1];

  var _useState3 = (0, _react.useState)(false);

  var _useState32 = _slicedToArray(_useState3, 2);

  var loading = _useState32[0];
  var setLoading = _useState32[1];
  // 控制加载状态

  var handleFinish = function handleFinish(values) {
    var
    // values 会自动包含所有输入框的值
    from, privateKey, to, title, message, result;
    return regeneratorRuntime.async(function handleFinish$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          from = values.from;
          privateKey = values.privateKey;
          to = values.to;
          title = values.title;
          message = values.message;

          setLoading(true); // 开始加载
          context$2$0.prev = 6;
          context$2$0.next = 9;
          return regeneratorRuntime.awrap((0, _api.sendConfession)(from, privateKey, to, title, message));

        case 9:
          result = context$2$0.sent;

          setResponse(result);
          context$2$0.next = 16;
          break;

        case 13:
          context$2$0.prev = 13;
          context$2$0.t0 = context$2$0['catch'](6);

          setResponse(context$2$0.t0);

        case 16:
          context$2$0.prev = 16;

          setLoading(false); // 加载完成
          return context$2$0.finish(16);

        case 19:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[6, 13, 16, 19]]);
  };

  return _react2['default'].createElement(
    'div',
    { className: 'confess-form-container' },
    _react2['default'].createElement(
      Title,
      { level: 2 },
      '表白'
    ),
    loading && _react2['default'].createElement(
      'div',
      { className: 'loading-overlay' },
      _react2['default'].createElement(_antd.Spin, { size: 'large' })
    ),
    _react2['default'].createElement(
      _antd.Form,
      { onFinish: handleFinish, className: 'confess-form' },
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'from',
          rules: [{ required: true, message: '请输入发送方地址!' }]
        },
        _react2['default'].createElement(_antd.Input, { placeholder: '发送方', className: 'input-field' })
      ),
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'privateKey',
          rules: [{ required: true, message: '请输入私钥!' }]
        },
        _react2['default'].createElement(_antd.Input.Password, { placeholder: '私钥', className: 'input-field' })
      ),
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'to',
          rules: [{ required: true, message: '请输入接收方地址!' }]
        },
        _react2['default'].createElement(_antd.Input, { placeholder: '接收方', className: 'input-field' })
      ),
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'title',
          rules: [{ required: true, message: '请输入表白标题!' }]
        },
        _react2['default'].createElement(_antd.Input, { placeholder: '表白标题', className: 'input-field' })
      ),
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'message',
          rules: [{ required: true, message: '请输入表白信息!' }]
        },
        _react2['default'].createElement(_antd.Input.TextArea, { placeholder: '表白信息', className: 'input-field' })
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
          '提交表白'
        )
      )
    ),
    response && _react2['default'].createElement(
      'div',
      { className: 'response-container' },
      _react2['default'].createElement(
        Title,
        { level: 4 },
        '表白响应'
      ),
      _react2['default'].createElement(
        _antd.Card,
        {
          title: '表白成功！',
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
              '表白信息 ID:'
            ),
            ' ',
            response.confession_id
          ),
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'strong',
              null,
              '交易哈希:'
            ),
            ' ',
            _react2['default'].createElement(
              'a',
              { href: 'https://etherscan.io/tx/' + response.tx_hash, target: '_blank', rel: 'noopener noreferrer' },
              response.tx_hash
            )
          ),
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'strong',
              null,
              '现在你可以将ID作为你们的定情信物交给对方，对方会选择接受还是拒绝或者忽略'
            )
          )
        )
      )
    )
  );
};

exports['default'] = ConfessForm;
module.exports = exports['default'];
/* 显示加载动画 */ /* 使用 Card 来展示响应数据 */