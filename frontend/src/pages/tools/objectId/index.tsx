import React, {useState} from "react";
import {useIntl} from "umi";
import {Button, Card, Divider, Form, Input} from "antd";
import {ViewObjectId} from "@/services/tools";

const PageCrypt: React.FC = () => {
  const [info, setInfo] = useState({} as Tool.ViewObjectIdViewModel)
  const [form] = Form.useForm();
  const intl = useIntl();

  const view = async (model: Tool.ViewObjectIdBindingModel) => {
    const result = await ViewObjectId(model)
    setInfo(result)
  }
  const onFinish = (values: any) => {
    view(values as Tool.ViewObjectIdBindingModel).then()
  };
  return (
    <>
      <Form
        name="crypt"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="objectId"
        >
          <Input placeholder={intl.formatMessage({id: 'pages.tools.objectId.objectId'})}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({id: 'menu.objectId'})}
          </Button>
        </Form.Item>
      </Form>
      <Card style={{display: info.time ? 'block' : 'none'}}>
        <Divider plain>Time</Divider>
        {info.time}
        <Divider plain>Machine</Divider>
        {info.machine}
        <Divider plain>PID</Divider>
        {info.pid}
        <Divider plain>Counter</Divider>
        {info.counter}
      </Card>
    </>
  );
}

export default PageCrypt;
