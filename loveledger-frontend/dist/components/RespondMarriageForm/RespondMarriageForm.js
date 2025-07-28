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

// 引入 API

require('./RespondMarriageForm.css');

// 引入样式文件

var Title = _antd.Typography.Title;

var RespondMarriageForm = function RespondMarriageForm() {
  var _useState = (0, _react.useState)('');

  var _useState2 = _slicedToArray(_useState, 2);

  var from = _useState2[0];
  var setFrom = _useState2[1];

  var _useState3 = (0, _react.useState)('');

  var _useState32 = _slicedToArray(_useState3, 2);

  var privateKey = _useState32[0];
  var setPrivateKey = _useState32[1];

  var _useState4 = (0, _react.useState)('');

  var _useState42 = _slicedToArray(_useState4, 2);

  var marriageId = _useState42[0];
  var setMarriageId = _useState42[1];

  var _useState5 = (0, _react.useState)(null);

  var _useState52 = _slicedToArray(_useState5, 2);

  var accept = _useState52[0];
  var setAccept = _useState52[1];

  var _useState6 = (0, _react.useState)(null);

  var _useState62 = _slicedToArray(_useState6, 2);

  var response = _useState62[0];
  var setResponse = _useState62[1];

  var _useState7 = (0, _react.useState)(false);

  var _useState72 = _slicedToArray(_useState7, 2);

  var loading = _useState72[0];
  var setLoading = _useState72[1];

  var handleSubmit = function handleSubmit(values) {
    var from, privateKey, marriageId, accept, result;
    return regeneratorRuntime.async(function handleSubmit$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          from = values.from;
          privateKey = values.privateKey;
          marriageId = values.marriageId;
          accept = values.accept;

          setLoading(true);
          context$2$0.prev = 5;
          context$2$0.next = 8;
          return regeneratorRuntime.awrap((0, _api.respondMarriage)(from, privateKey, marriageId, accept));

        case 8:
          result = context$2$0.sent;

          setResponse(result);
          context$2$0.next = 15;
          break;

        case 12:
          context$2$0.prev = 12;
          context$2$0.t0 = context$2$0['catch'](5);

          setResponse(context$2$0.t0);

        case 15:
          context$2$0.prev = 15;

          setLoading(false);
          return context$2$0.finish(15);

        case 18:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[5, 12, 15, 18]]);
  };

  return _react2['default'].createElement(
    'div',
    { className: 'respond-marriage-form-container' },
    _react2['default'].createElement(
      Title,
      { level: 2 },
      '回应求婚'
    ),
    loading && _react2['default'].createElement(
      'div',
      { className: 'loading-overlay' },
      _react2['default'].createElement(_antd.Spin, { size: 'large' })
    ),
    _react2['default'].createElement(
      _antd.Form,
      { onFinish: handleSubmit, className: 'respond-marriage-form' },
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'from',
          rules: [{ required: true, message: '请输入回应者地址!' }]
        },
        _react2['default'].createElement(_antd.Input, {
          placeholder: '回应者地址',
          className: 'input-field',
          value: from,
          onChange: function (e) {
            return setFrom(e.target.value);
          }
        })
      ),
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'privateKey',
          rules: [{ required: true, message: '请输入私钥!' }]
        },
        _react2['default'].createElement(_antd.Input.Password, {
          placeholder: '私钥',
          className: 'input-field',
          value: privateKey,
          onChange: function (e) {
            return setPrivateKey(e.target.value);
          }
        })
      ),
      _react2['default'].createElement(
        _antd.Form.Item,
        {
          name: 'marriageId',
          rules: [{ required: true, message: '请输入求婚ID!' }]
        },
        _react2['default'].createElement(_antd.Input, {
          type: 'number',
          placeholder: '求婚ID',
          className: 'input-field',
          value: marriageId,
          onChange: function (e) {
            return setMarriageId(e.target.value);
          }
        })
      ),
      _react2['default'].createElement(
        _antd.Form.Item,
        { name: 'accept', rules: [{ required: true, message: '请选择是否接受!' }] },
        _react2['default'].createElement(
          _antd.Space,
          { direction: 'vertical', style: { width: '100%' } },
          _react2['default'].createElement(
            _antd.Radio.Group,
            {
              value: accept,
              onChange: function (e) {
                return setAccept(e.target.value);
              },
              className: 'radio-group'
            },
            _react2['default'].createElement(
              _antd.Radio,
              { value: true },
              '接受'
            ),
            _react2['default'].createElement(
              _antd.Radio,
              { value: false },
              '拒绝'
            )
          )
        )
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
          '提交回应'
        )
      )
    ),
    response && _react2['default'].createElement(
      'div',
      { className: 'response-container' },
      _react2['default'].createElement(
        Title,
        { level: 4 },
        '回应成功'
      ),
      _react2['default'].createElement(
        _antd.Card,
        {
          title: '求婚回应结果',
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
              '求婚ID:'
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
              '是否接受:'
            ),
            ' ',
            response.accept ? '接受' : '拒绝'
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
              '操作状态:'
            ),
            ' ',
            response.status === 'success' ? '成功' : '失败'
          )
        )
      )
    )
  );
};

exports['default'] = RespondMarriageForm;
module.exports = exports['default'];
/* 显示加载动画 */ /* 表单部分 */ /* 展示响应 */