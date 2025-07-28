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

// 假设你已经有这个 API

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

// 引入 moment 来格式化时间

require('./MarriagesHistory.css');

// 引入样式文件

var Title = _antd.Typography.Title;

var MarriagesHistory = function MarriagesHistory() {
  var _useState = (0, _react.useState)('');

  var _useState2 = _slicedToArray(_useState, 2);

  var address = _useState2[0];
  var setAddress = _useState2[1];

  var _useState3 = (0, _react.useState)([]);

  var _useState32 = _slicedToArray(_useState3, 2);

  var marriages = _useState32[0];
  var setMarriages = _useState32[1];

  var _useState4 = (0, _react.useState)(false);

  var _useState42 = _slicedToArray(_useState4, 2);

  var loading = _useState42[0];
  var setLoading = _useState42[1];
  // 控制加载状态

  var _useState5 = (0, _react.useState)(null);

  var _useState52 = _slicedToArray(_useState5, 2);

  var response = _useState52[0];
  var setResponse = _useState52[1];

  var handleSubmit = function handleSubmit(values) {
    var address, result;
    return regeneratorRuntime.async(function handleSubmit$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          address = values.address;

          setLoading(true); // 开始加载
          context$2$0.prev = 2;
          context$2$0.next = 5;
          return regeneratorRuntime.awrap((0, _api.getMarriagesHistory)(address));

        case 5:
          result = context$2$0.sent;

          setMarriages(result);
          setResponse(null);
          context$2$0.next = 13;
          break;

        case 10:
          context$2$0.prev = 10;
          context$2$0.t0 = context$2$0['catch'](2);

          setResponse(context$2$0.t0);

        case 13:
          context$2$0.prev = 13;

          setLoading(false); // 加载完成
          return context$2$0.finish(13);

        case 16:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[2, 10, 13, 16]]);
  };

  return _react2['default'].createElement(
    'div',
    { className: 'marriages-history-container' },
    _react2['default'].createElement(
      Title,
      { level: 2 },
      '查询求婚历史'
    ),
    loading && _react2['default'].createElement(
      'div',
      { className: 'loading-overlay' },
      _react2['default'].createElement(_antd.Spin, { size: 'large' })
    ),
    _react2['default'].createElement(
      _antd.Form,
      { onFinish: handleSubmit, className: 'marriages-form' },
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'address',
          rules: [{ required: true, message: '请输入地址!' }]
        },
        _react2['default'].createElement(_antd.Input, {
          placeholder: '输入地址查询求婚历史',
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
          '查询求婚历史'
        )
      )
    ),
    response && _react2['default'].createElement(
      'div',
      { className: 'response-container' },
      _react2['default'].createElement(
        Title,
        { level: 4 },
        '查询响应'
      ),
      _react2['default'].createElement(
        _antd.Card,
        {
          title: '查询失败',
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
              '错误信息:'
            ),
            ' ',
            response.message
          )
        )
      )
    ),
    marriages.length > 0 && !loading && _react2['default'].createElement(
      'div',
      { className: 'marriages-history-list' },
      _react2['default'].createElement(
        Title,
        { level: 3 },
        '求婚历史'
      ),
      marriages.map(function (marriage, index) {
        return _react2['default'].createElement(
          _antd.Card,
          {
            key: index,
            title: '求婚 ID: 默认隐藏',
            bordered: false,
            style: { marginBottom: 16 }
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
                '配偶A:'
              ),
              ' ',
              marriage.partnerA
            ),
            _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(
                'strong',
                null,
                '配偶B:'
              ),
              ' ',
              marriage.partnerB
            ),
            _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(
                'strong',
                null,
                '求婚状态:'
              ),
              ' ',
              marriage.status === 0 ? '未接受' : '已接受'
            ),
            _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(
                'strong',
                null,
                '时间:'
              ),
              ' ',
              _moment2['default'].unix(marriage.timestamp).format('YYYY-MM-DD HH:mm:ss')
            )
          )
        );
      })
    )
  );
};

exports['default'] = MarriagesHistory;
module.exports = exports['default'];
/* 显示加载动画 */ /* 展示响应 */ /* 展示求婚历史 */