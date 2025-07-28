'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactI18next = require('react-i18next');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _reactRouterDom = require('react-router-dom');

var _componentsConfessFormConfessForm = require('./components/ConfessForm/ConfessForm');

var _componentsConfessFormConfessForm2 = _interopRequireDefault(_componentsConfessFormConfessForm);

var _componentsRespondConfessionFormRespondConfessionForm = require('./components/RespondConfessionForm/RespondConfessionForm');

var _componentsRespondConfessionFormRespondConfessionForm2 = _interopRequireDefault(_componentsRespondConfessionFormRespondConfessionForm);

var _componentsMarriageFormMarriageForm = require('./components/MarriageForm/MarriageForm');

var _componentsMarriageFormMarriageForm2 = _interopRequireDefault(_componentsMarriageFormMarriageForm);

var _componentsRespondMarriageFormRespondMarriageForm = require('./components/RespondMarriageForm/RespondMarriageForm');

var _componentsRespondMarriageFormRespondMarriageForm2 = _interopRequireDefault(_componentsRespondMarriageFormRespondMarriageForm);

var _componentsLoveCreditLoveCredit = require('./components/LoveCredit/LoveCredit');

var _componentsLoveCreditLoveCredit2 = _interopRequireDefault(_componentsLoveCreditLoveCredit);

var _componentsConfessionsHistoryConfessionsHistory = require('./components/ConfessionsHistory/ConfessionsHistory');

var _componentsConfessionsHistoryConfessionsHistory2 = _interopRequireDefault(_componentsConfessionsHistoryConfessionsHistory);

var _componentsMarriagesHistoryMarriagesHistory = require('./components/MarriagesHistory/MarriagesHistory');

var _componentsMarriagesHistoryMarriagesHistory2 = _interopRequireDefault(_componentsMarriagesHistoryMarriagesHistory);

var _componentsAboutFormAboutForm = require('./components/AboutForm/AboutForm');

var _componentsAboutFormAboutForm2 = _interopRequireDefault(_componentsAboutFormAboutForm);

var _componentsIdentityVerification = require('./components/IdentityVerification');

var _componentsIdentityVerification2 = _interopRequireDefault(_componentsIdentityVerification);

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _componentsTopBarTopBar = require('./components/TopBar/TopBar');

var _componentsTopBarTopBar2 = _interopRequireDefault(_componentsTopBarTopBar);

var _componentsFooterFooter = require('./components/Footer/Footer');

var _componentsFooterFooter2 = _interopRequireDefault(_componentsFooterFooter);

var App = function App() {
  var _useState = (0, _react.useState)(false);

  var _useState2 = _slicedToArray(_useState, 2);

  var darkMode = _useState2[0];
  var setDarkMode = _useState2[1];
  // 暗亮模式状态

  var _useTranslation = (0, _reactI18next.useTranslation)();

  var t = _useTranslation.t;

  // 检测浏览器的亮暗模式预设
  (0, _react.useEffect)(function () {
    var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkScheme); // 根据浏览器偏好设置初始化状态
    document.body.classList.toggle('dark-mode', prefersDarkScheme); // 初始化全局暗黑模式
  }, []);

  // 切换暗亮模式
  var toggleDarkMode = function toggleDarkMode(checked) {
    setDarkMode(checked);
    document.body.classList.toggle('dark-mode', checked); // 切换全局暗黑模式样式
  };

  // 主题配置
  var themeConfig = {
    token: {
      colorPrimary: darkMode ? '#000000' : '#ffffffff', // 根据模式修改主题色
      colorBgBase: darkMode ? '#1d1d1d' : '#ffffff', // 背景颜色
      colorTextBase: darkMode ? '#ffffff' : '#000000' }
  };

  // 字体颜色
  return _react2['default'].createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2['default'].createElement(
      _antd.ConfigProvider,
      { theme: themeConfig },
      _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_componentsTopBarTopBar2['default'], { darkMode: darkMode, toggleDarkMode: toggleDarkMode }),
        ' ',
        _react2['default'].createElement(
          _reactRouterDom.Routes,
          null,
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/', element: _react2['default'].createElement(_home2['default'], null) }),
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/confess', element: _react2['default'].createElement(_componentsConfessFormConfessForm2['default'], null) }),
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/respond_confession', element: _react2['default'].createElement(_componentsRespondConfessionFormRespondConfessionForm2['default'], null) }),
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/proposal_marriage', element: _react2['default'].createElement(_componentsMarriageFormMarriageForm2['default'], null) }),
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/respond_marriage', element: _react2['default'].createElement(_componentsRespondMarriageFormRespondMarriageForm2['default'], null) }),
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/love_credit', element: _react2['default'].createElement(_componentsLoveCreditLoveCredit2['default'], null) }),
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/confessions_history', element: _react2['default'].createElement(_componentsConfessionsHistoryConfessionsHistory2['default'], null) }),
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/marriages_history', element: _react2['default'].createElement(_componentsMarriagesHistoryMarriagesHistory2['default'], null) }),
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/about', element: _react2['default'].createElement(_componentsAboutFormAboutForm2['default'], null) }),
          _react2['default'].createElement(_reactRouterDom.Route, { path: '/verify_identity', element: _react2['default'].createElement(_componentsIdentityVerification2['default'], null) })
        ),
        _react2['default'].createElement(_componentsFooterFooter2['default'], { darkMode: darkMode })
      )
    )
  );
};

exports['default'] = App;
module.exports = exports['default'];
/* 将模式和切换函数传递给 TopBar */