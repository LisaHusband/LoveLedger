'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _antd = require('antd');

// 引入 Ant Design 组件

var _assetsLogoGif = require('../../assets/logo.gif');

var _assetsLogoGif2 = _interopRequireDefault(_assetsLogoGif);

require('./TopBar.css');

// 引入CSS样式

var Header = _antd.Layout.Header;
var Title = _antd.Typography.Title;
var Option = _antd.Select.Option;

var TopBar = function TopBar(_ref) {
  var darkMode = _ref.darkMode;
  var toggleDarkMode = _ref.toggleDarkMode;

  // const [darkMode, setDarkMode] = useState(false);

  var _useState = (0, _react.useState)('en');

  var _useState2 = _slicedToArray(_useState, 2);

  var language = _useState2[0];
  var setLanguage = _useState2[1];
  // 默认语言为英文

  // 切换暗亮模式
  // const toggleDarkMode = (checked) => {
  //   setDarkMode(checked);
  //   document.body.classList.toggle('dark-mode', checked);  // 切换全局的暗黑模式样式
  // };

  // 切换语言
  var handleLanguageChange = function handleLanguageChange(lang) {
    setLanguage(lang);
    // 可以在此处加载不同的语言文件，例如通过国际化库（如react-i18next）处理语言切换
  };

  return _react2['default'].createElement(
    Header,
    { className: 'topbar ' + (darkMode ? 'dark' : '') },
    _react2['default'].createElement(
      'div',
      { className: 'logo' },
      _react2['default'].createElement('img', { src: _assetsLogoGif2['default'], alt: 'Logo', className: 'logo-image' }),
      _react2['default'].createElement(
        Title,
        { level: 3, className: 'title' },
        'LoveLedger'
      )
    ),
    _react2['default'].createElement(
      _antd.Menu,
      { theme: darkMode ? 'dark' : 'light', mode: 'horizontal', className: 'navigation' },
      _react2['default'].createElement(
        _antd.Menu.Item,
        { key: 'home' },
        _react2['default'].createElement(
          _reactRouterDom.Link,
          { to: '/' },
          '主页'
        )
      ),
      _react2['default'].createElement(
        _antd.Menu.Item,
        { key: 'confess' },
        _react2['default'].createElement(
          _reactRouterDom.Link,
          { to: '/confess' },
          '表白'
        )
      ),
      _react2['default'].createElement(
        _antd.Menu.Item,
        { key: 'respond_confession' },
        _react2['default'].createElement(
          _reactRouterDom.Link,
          { to: '/respond_confession' },
          '回应表白'
        )
      ),
      _react2['default'].createElement(
        _antd.Menu.Item,
        { key: 'proposal_marriage' },
        _react2['default'].createElement(
          _reactRouterDom.Link,
          { to: '/proposal_marriage' },
          '求婚'
        )
      ),
      _react2['default'].createElement(
        _antd.Menu.Item,
        { key: 'respond_marriage' },
        _react2['default'].createElement(
          _reactRouterDom.Link,
          { to: '/respond_marriage' },
          '回应求婚'
        )
      ),
      _react2['default'].createElement(
        _antd.Menu.Item,
        { key: 'love_credit' },
        _react2['default'].createElement(
          _reactRouterDom.Link,
          { to: '/love_credit' },
          '爱情信用'
        )
      ),
      _react2['default'].createElement(
        _antd.Menu.Item,
        { key: 'confessions_history' },
        _react2['default'].createElement(
          _reactRouterDom.Link,
          { to: '/confessions_history' },
          '表白历史'
        )
      ),
      _react2['default'].createElement(
        _antd.Menu.Item,
        { key: 'marriages_history' },
        _react2['default'].createElement(
          _reactRouterDom.Link,
          { to: '/marriages_history' },
          '求婚历史'
        )
      ),
      _react2['default'].createElement(
        _antd.Menu.Item,
        { key: 'about' },
        _react2['default'].createElement(
          _reactRouterDom.Link,
          { to: '/about' },
          '关于我们'
        )
      )
    ),
    _react2['default'].createElement(
      'div',
      { className: 'controls' },
      _react2['default'].createElement(
        'div',
        { className: 'language-selector' },
        _react2['default'].createElement(
          _antd.Select,
          {
            value: language,
            onChange: handleLanguageChange,
            className: 'language-dropdown',
            style: { width: 120 }
          },
          _react2['default'].createElement(
            Option,
            { value: 'en' },
            'English'
          ),
          _react2['default'].createElement(
            Option,
            { value: 'zh' },
            '中文'
          )
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: 'dark-mode-toggle' },
        _react2['default'].createElement(
          'span',
          null,
          darkMode ? '暗色模式' : '亮色模式'
        ),
        _react2['default'].createElement(_antd.Switch, { checked: darkMode, onChange: toggleDarkMode })
      )
    )
  );
};

exports['default'] = TopBar;
module.exports = exports['default'];