import React, { useState } from 'react';
import { useIntl } from 'umi';
import { Button, Card, Divider, Form, Input } from 'antd';
import { ObjectID } from 'bson';
import moment from 'moment';

const PageCrypt: React.FC = () => {
  const [info, setInfo] = useState({} as Tool.ViewObjectIdViewModel);
  const [form] = Form.useForm();
  const intl = useIntl();

  const view = async (model: Tool.ViewObjectIdBindingModel) => {
    const { objectId: objectIdStr } = model;
    const isValid = ObjectID.isValid(objectIdStr);
    if (isValid) {
      const mongoObjectId = new ObjectID(objectIdStr);
      const { id } = mongoObjectId;
      /*
      const mbuffer = Buffer.alloc(3)
      mbuffer[0] = id.readUIntBE(4,1)
      mbuffer[1] = id.readUIntBE(5,1)
      mbuffer[2] = id.readUIntBE(6,1)
      console.log('macheine code：',mbuffer.toString())
      */
      const counter1 = id.readUIntBE(9, 1) << 16;
      const counter2 = id.readUIntBE(10, 1) << 8;
      const counter3 = id.readUIntBE(11, 1);

      const result: Tool.ViewObjectIdViewModel = {
        time: moment(mongoObjectId.getTimestamp()).format(),
        pid: id.readUInt16BE(7),
        counter: counter1 | counter2 | counter3,
      };

      setInfo(result);
    }
  };
  const onFinish = (values: any) => {
    view(values as Tool.ViewObjectIdBindingModel).then();
  };
  return (
    <>
      <Form name="crypt" form={form} onFinish={onFinish}>
        <Form.Item name="objectId">
          <Input placeholder={intl.formatMessage({ id: 'pages.tools.objectId.objectId' })} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'menu.objectId' })}
          </Button>
        </Form.Item>
      </Form>
      <Card style={{ display: info.time ? 'block' : 'none' }}>
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
};

export default PageCrypt;
