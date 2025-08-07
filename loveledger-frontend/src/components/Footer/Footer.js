import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import './Footer.css';
import { getIntl } from '../../i18n';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaWeibo,
  FaWeixin,
  FaTelegramPlane,
  FaWhatsapp,
  FaPinterestP,
  FaTumblr
} from 'react-icons/fa';
import { SiTencentqq, SiDouban, SiZhihu, SiLine } from 'react-icons/si';

import WechatQRCodeModal from '../utils/WechatQRCodeModal';

const { Footer } = Layout;

const AppFooter = ({ darkMode }) => {
  const currentUrl = window.location.href;
  const title = encodeURIComponent("Check this out on LoveChain!");
  const encodedUrl = encodeURIComponent(currentUrl);

  const [wechatVisible, setWechatVisible] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${title}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${title}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${title}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${title}`,
    whatsapp: `https://api.whatsapp.com/send?text=${title}%20${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${title}`,
    tumblr: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}&title=${title}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    weibo: `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${title}`,
    qq: `https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${title}`,
    douban: `https://www.douban.com/share/service?href=${encodedUrl}&name=${title}`,
    zhihu: `https://www.zhihu.com/share?url=${encodedUrl}` // 非官方支持，模拟构造
  };


  return (
    <Footer className={`footer ${darkMode ? 'dark' : ''}`}>
      <div className="footer-content">
        <div className="social-icons">
          <a href={shareLinks.facebook} target="_blank" title="Facebook"><FaFacebookF /></a>
          <a href={shareLinks.twitter} target="_blank" title="Twitter"><FaTwitter /></a>
          <a href={shareLinks.linkedin} target="_blank" title="LinkedIn"><FaLinkedinIn /></a>
          <a href={shareLinks.reddit} target="_blank" title="Reddit"><FaRedditAlien /></a>
          <a href={shareLinks.telegram} target="_blank" title="Telegram"><FaTelegramPlane /></a>
          <a href={shareLinks.whatsapp} target="_blank" title="WhatsApp"><FaWhatsapp /></a>
          <a href={shareLinks.pinterest} target="_blank" title="Pinterest"><FaPinterestP /></a>
          <a href={shareLinks.tumblr} target="_blank" title="Tumblr"><FaTumblr /></a>
          <a href={shareLinks.line} target="_blank" title="LINE"><SiLine /></a>
          <a href={shareLinks.weibo} target="_blank" title="微博"><FaWeibo /></a>
          <a href={shareLinks.qq} target="_blank" title="QQ"><SiTencentqq /></a>
          <a href={shareLinks.douban} target="_blank" title="豆瓣"><SiDouban /></a>
          <a href={shareLinks.zhihu} target="_blank" title="知乎"><SiZhihu /></a>
          <a href="#" onClick={(e) => { e.preventDefault(); setWechatVisible(true); }} title="微信"><FaWeixin /></a>
        </div>
        <p>
          {getIntl().messages['版本号']} &nbsp;
          {getIntl().messages['© 2025 LoveChain. All Rights Reserved.']}
        </p>
      </div>

      <WechatQRCodeModal
        visible={wechatVisible}
        onClose={() => setWechatVisible(false)}
        url={currentUrl}
      />
    </Footer>
  );
};

export default AppFooter;
