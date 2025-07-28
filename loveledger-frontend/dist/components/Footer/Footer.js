// src/components/Footer.js

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

// 使用 Ant Design 的 Layout 组件

require('./Footer.css');

// 引入CSS样式

var Footer = _antd.Layout.Footer;

var AppFooter = function AppFooter(_ref) {
  var darkMode = _ref.darkMode;

  return _react2['default'].createElement(
    Footer,
    { className: 'footer ' + (darkMode ? 'dark' : '') },
    _react2['default'].createElement(
      'p',
      null,
      '© 2025 LoveChain. All Rights Reserved.'
    )
  );
};

exports['default'] = AppFooter;
module.exports = exports['default'];