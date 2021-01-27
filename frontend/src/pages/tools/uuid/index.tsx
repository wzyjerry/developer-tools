import React, {useCallback, useEffect, useState} from "react";
import {useIntl} from "umi";
import { Button, message, Table } from "antd";
import {v4 as uuidv4} from 'uuid'
import copy from 'copy-to-clipboard'
import styles from './index.less';

type UUID = {
  uuid: string;
  copied: boolean;
}

const PageUUID: React.FC = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({} as any), []);
  const [data, setData] = useState([] as UUID[])
  const intl = useIntl();

  const copyUUID = (index: number) => {
    data[index].copied = true
    copy(data[index].uuid)
    message.success(`${intl.formatMessage({id:'pages.tools.uuid.action.copy.message'})}: ${data[index].uuid}`).then();
    forceUpdate()
  }

  const columns = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
    },
    {
      title: intl.formatMessage({
        id: 'pages.tools.uuid.action'
      }),
      width: 100,
      render: (value: UUID, row: UUID, index: number) => (
          <a onClick={() => copyUUID(index)}>{
            intl.formatMessage({
              id: 'pages.tools.action.copy'
            })
          }</a>
      ),
    },
  ];

  const generateUUID = (size: number): string[] => {
    return Array(size)
      .fill(0)
      .map(() => uuidv4())
  }

  const getUUIDList = () => {
    const newData = generateUUID(10).map((uuid) => ({
      uuid,
      copied: false,
    }));
    setData(newData)
  }

  useEffect(() => {
    getUUIDList()
  }, [])

  return (
    <>
      <Table
        rowKey="uuid"
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={ (record: UUID) => record.copied? styles.uuidCopied:'' }
      />
      <Button type="primary" onClick={getUUIDList} style={{ marginTop: 16 }}>
        {intl.formatMessage({id: 'menu.uuid'})}
      </Button>
    </>
  )
}

export default PageUUID;
