import React from 'react';
import { Table, Popconfirm, Button } from 'antd';

const MyList = ({ onDelete, list }) => {
  const columns = [{
    title: '标题',
    dataIndex: 'Title',
    key: 'Title',
  },
  {
    title: '描述',
    dataIndex: 'Description',
    key: 'Description',
  }, {
    title: 'Actions',
    render: (_text: any, record: { key: any; }) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.key)}>
          <Button danger>Delete</Button>
        </Popconfirm>
      );
    },
  }];
  return (
    <Table
      dataSource={list}
      columns={columns}
    />
  );
};

export default MyList;