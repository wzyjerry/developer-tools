import React, { useState } from 'react';
import { useIntl } from 'umi';
import { Button, Form, Input } from 'antd';
import QRCode from 'qrcode.react';

const PageCrypt: React.FC = () => {
  const [url, setURL] = useState('');
  const [form] = Form.useForm();
  const intl = useIntl();

  const onFinish = (values: any) => {
    setURL(values.url);
  };
  return (
    <>
      <Form name="crypt" form={form} onFinish={onFinish} layout="inline">
        <Form.Item name="url">
          <Input placeholder={intl.formatMessage({ id: 'pages.tools.qrcode.url' })} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'menu.qrcode' })}
          </Button>
        </Form.Item>
        <Form.Item>
          <QRCode style={{ display: url ? 'block' : 'none' }} value={url || ''} />
        </Form.Item>
      </Form>
      <iframe
        style={{ border: 0, width: '100%', height: 1200, display: url ? 'block' : 'none' }}
        src={url}
      />
    </>
  );
};

export default PageCrypt;
