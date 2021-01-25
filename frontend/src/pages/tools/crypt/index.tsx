import React, {useState} from "react";
import {useIntl} from "umi";
import {Button, Card, Form, Input, message} from "antd";
import {Crypt} from "@/services/tools";
import copy from 'copy-to-clipboard'

const PageCrypt: React.FC = () => {
  const [hash, setHash] = useState('')
  const [form] = Form.useForm();
  const intl = useIntl();

  const copyHash = () => {
    copy(hash)
    message.success(`${intl.formatMessage({id:'pages.tools.crypt.action.copy.message'})}: ${hash}`).then();
  }

  const crypt = async (model: Tool.CryptBindingModel) => {
    const result = await Crypt(model)
    setHash(result)
  }
  const onFinish = (values: any) => {
    crypt(values as Tool.CryptBindingModel).then()
  };
  return (
    <>
      <Form
        name="crypt"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="str"
        >
          <Input.Password  placeholder={intl.formatMessage({id:'pages.tools.crypt.str'})} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({id:'menu.crypt'})}
          </Button>
        </Form.Item>
      </Form>
      <Card style={{display: hash? 'block': 'none'}}>
        {hash}
        <a style={{float: 'right'}}
          onClick={() => copyHash()}>{
          intl.formatMessage({
            id: 'pages.tools.action.copy'
          })
        }</a>
      </Card>
    </>
  )
}

export default PageCrypt;
