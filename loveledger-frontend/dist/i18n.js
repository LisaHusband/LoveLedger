// src/i18n.js

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _reactI18next = require('react-i18next');

// 引入语言文件

var _localesEnJson = require('./locales/en.json');

var _localesEnJson2 = _interopRequireDefault(_localesEnJson);

var _localesZhJson = require('./locales/zh.json');

var _localesZhJson2 = _interopRequireDefault(_localesZhJson);

// 初始化 i18next
_i18next2['default'].use(_reactI18next.initReactI18next) // 绑定 react-i18next
.init({
  resources: {
    en: _localesEnJson2['default'], // 英文翻译
    zh: _localesZhJson2['default'] },
  // 中文翻译
  lng: 'en', // 默认语言
  fallbackLng: 'en', // 后备语言
  interpolation: {
    escapeValue: false }
});

// React 已经自动进行转义
exports['default'] = _i18next2['default'];
module.exports = exports['default'];