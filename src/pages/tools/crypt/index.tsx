import React from 'react';
import { useIntl } from 'umi';
import { Button, Form, Input, message } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import bcrypt from 'bcryptjs';

const { TextArea } = Input;
const DEFAULT_COST = 10;
const ButtonStyle = {
  margin: '0 8px 12px 0',
};

const PageCrypt: React.FC = () => {
  const [form] = Form.useForm();
  const intl = useIntl();

  const crypt = async () => {
    const { src } = form.getFieldsValue();
    const dest = await bcrypt.hash(src, DEFAULT_COST);
    form.setFieldsValue({
      dest,
    });
  };

  const copyDest = () => {
    const { dest } = form.getFieldsValue();
    copy(dest);
    message.success(intl.formatMessage({ id: 'pages.tools.crypt.action.copy.message' })).then();
  };

  const base64Encode = () => {
    const { src } = form.getFieldsValue();
    let dest = '';
    try {
      dest = window.btoa(src);
    } catch {
      dest = '';
    }
    form.setFieldsValue({
      dest,
    });
  };

  const base64Decode = () => {
    const { src } = form.getFieldsValue();
    let dest = '';
    try {
      dest = window.atob(src);
    } catch {
      dest = '';
    }
    form.setFieldsValue({
      dest,
    });
  };

  const urlEncode = () => {
    const { src } = form.getFieldsValue();
    let dest = '';
    try {
      dest = window.encodeURIComponent(src);
    } catch {
      dest = '';
    }
    form.setFieldsValue({
      dest,
    });
  };

  const urlDecode = () => {
    const { src } = form.getFieldsValue();
    let dest = '';
    try {
      dest = window.decodeURIComponent(src);
    } catch {
      dest = '';
    }
    form.setFieldsValue({
      dest,
    });
  };

  const swap = async () => {
    const { src, dest } = await form.validateFields();
    form.setFieldsValue({
      src: dest,
      dest: src,
    });
  };

  return (
    <>
      <Form name="crypt" form={form}>
        <Form.Item name="src">
          <TextArea rows={4} placeholder={intl.formatMessage({ id: 'pages.tools.crypt.src' })} />
        </Form.Item>
        <Form.Item>
          <Button size={'large'} style={ButtonStyle} onClick={crypt}>
            {intl.formatMessage({ id: 'pages.tools.crypt.bcrypt' })}
          </Button>
          <Button size={'large'} style={ButtonStyle} onClick={base64Encode}>
            {intl.formatMessage({ id: 'pages.tools.crypt.base64Encode' })}
          </Button>
          <Button size={'large'} style={ButtonStyle} onClick={base64Decode}>
            {intl.formatMessage({ id: 'pages.tools.crypt.base64Decode' })}
          </Button>
          <Button size={'large'} style={ButtonStyle} onClick={urlEncode}>
            {intl.formatMessage({ id: 'pages.tools.crypt.urlEncode' })}
          </Button>
          <Button size={'large'} style={ButtonStyle} onClick={urlDecode}>
            {intl.formatMessage({ id: 'pages.tools.crypt.urlDecode' })}
          </Button>
          <Button size={'large'} icon={<SwapOutlined />} style={ButtonStyle} onClick={swap}>
            {intl.formatMessage({ id: 'pages.tools.crypt.swap' })}
          </Button>
          <Button type="primary" size={'large'} style={ButtonStyle} onClick={copyDest}>
            {intl.formatMessage({ id: 'pages.tools.action.copy' })}
          </Button>
        </Form.Item>
        <Form.Item name="dest">
          <TextArea rows={4} placeholder={intl.formatMessage({ id: 'pages.tools.crypt.dest' })} />
        </Form.Item>
      </Form>
    </>
  );
};

export default PageCrypt;
