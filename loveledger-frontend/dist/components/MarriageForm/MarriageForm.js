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

// 导入 API 请求函数

require('./MarriageForm.css');

// 引入样式文件

var Title = _antd.Typography.Title;

var MarriageForm = function MarriageForm() {
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
    var from, privateKey, partner, result;
    return regeneratorRuntime.async(function handleFinish$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          from = values.from;
          privateKey = values.privateKey;
          partner = values.partner;

          setLoading(true); // 开始加载
          context$2$0.prev = 4;
          context$2$0.next = 7;
          return regeneratorRuntime.awrap((0, _api.registerMarriage)(from, privateKey, partner));

        case 7:
          result = context$2$0.sent;

          setResponse(result);
          context$2$0.next = 14;
          break;

        case 11:
          context$2$0.prev = 11;
          context$2$0.t0 = context$2$0['catch'](4);

          setResponse(context$2$0.t0);

        case 14:
          context$2$0.prev = 14;

          setLoading(false); // 加载完成
          return context$2$0.finish(14);

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[4, 11, 14, 17]]);
  };

  return _react2['default'].createElement(
    'div',
    { className: 'marriage-form-container' },
    _react2['default'].createElement(
      Title,
      { level: 2 },
      '求婚'
    ),
    loading && _react2['default'].createElement(
      'div',
      { className: 'loading-overlay' },
      _react2['default'].createElement(_antd.Spin, { size: 'large' })
    ),
    _react2['default'].createElement(
      _antd.Form,
      { onFinish: handleFinish, className: 'marriage-form' },
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
          name: 'partner',
          rules: [{ required: true, message: '请输入配偶地址!' }]
        },
        _react2['default'].createElement(_antd.Input, { placeholder: '配偶', className: 'input-field' })
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
          '提交求婚'
        )
      )
    ),
    response && _react2['default'].createElement(
      'div',
      { className: 'response-container' },
      _react2['default'].createElement(
        Title,
        { level: 4 },
        '求婚响应'
      ),
      _react2['default'].createElement(
        _antd.Card,
        {
          title: '求婚成功！',
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
              '求婚信息 ID:'
            ),
            ' ',
            response.marriage_id
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
              '现在你可以将ID作为你们的订婚信物交给对方，对方会选择接受还是拒绝或者忽略'
            )
          )
        )
      )
    )
  );
};

exports['default'] = MarriageForm;
module.exports = exports['default'];
/* 显示加载动画 */ /* 使用 Card 来展示响应数据 */