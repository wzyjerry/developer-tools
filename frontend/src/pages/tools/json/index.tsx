import React, {useState} from "react";
import type {InteractionProps} from 'react-json-view';
import ReactJson from 'react-json-view';
import {useIntl} from "umi";
import {Alert, Button, Form, Input} from "antd";

type StatusMessageBindingModel = {
  content: string;
  type: "success"|"info"|"error"|"warning"|undefined;
}

const PageJson: React.FC = () => {
  const [src, setSrc] = useState({} as any)
  const [form] = Form.useForm();
  const intl = useIntl();

  const [status, setStatus] = useState<StatusMessageBindingModel>({
    content: '',
    type: undefined,
  })

  const onFinish = (values: any) => {
    try {
      let newSrc = JSON.parse(values.src)
      form.setFieldsValue({
        src: JSON.stringify(newSrc)
      })
      if (typeof newSrc !== "object") {
        newSrc = {
          "value": newSrc
        }
      }
      setSrc(newSrc)
      setStatus({
        content: intl.formatMessage({id: 'pages.tools.json.success'}),
        type: 'success',
      })
    }
    catch (e) {
      setSrc({})
      setStatus({
        content: e.toString(),
        type: 'error',
      })
    }
  };

  const modify = ({updated_src}: InteractionProps) => {
    setSrc(updated_src)
  }

  return (
    <>
      {( status.type && <Alert
        style={{
          marginBottom: 24,
        }}
        message={status.content}
        type={status.type}
        showIcon
      /> )}
      <Form
        name="crypt"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item name="src">
          <Input.TextArea placeholder={intl.formatMessage({id: 'pages.tools.json.src'})} allowClear autoSize={{minRows: 4, maxRows: 12}}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({id: 'menu.json'})}
          </Button>
        </Form.Item>
      </Form>
      <ReactJson
        name={false}
        style={{
          padding: "12px",
          borderRadius: "4px",
          margin: "12px 0"
        }}
        theme={"monokai"}
        displayDataTypes={false}
        src={src}
        onEdit={modify}
        onDelete={modify}
        onAdd={modify}
        iconStyle={"square"}
      />
    </>
  );
}

export default PageJson;
