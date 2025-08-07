import React from 'react';
import { Modal } from 'antd';
import { QRCodeSVG } from 'qrcode.react';  // 修正导入方式

const WechatQRCodeModal = ({ visible, onClose, url }) => {
  return (
    <Modal
      title="微信扫码分享"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div style={{ textAlign: 'center' }}>
        <p>使用微信扫描下方二维码分享当前页面：</p>
        <QRCodeSVG value={url} size={180} />  {/* 使用 QRCodeSVG */}
      </div>
    </Modal>
  );
};

export default WechatQRCodeModal;
