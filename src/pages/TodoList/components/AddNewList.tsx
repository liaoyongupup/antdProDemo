import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, Form, Input, Radio } from 'antd';
function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
const CreateForm = ({ visible, onCreate, onCancel}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="新增代办"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {


            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="Title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Description">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const AddNewList = (props:any) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values:any)=> {
    if(values.Description==undefined){
      values.Description=''
    }
    let NewList =  {
      key: 'a'+Math.random(),
      Title: values.Title,
      Description: values.Description,
    }
    console.log('Received values of form: ', NewList);
    props.dispatch({
      type:'todoList/add',
      value:NewList
    })
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
        style={{margin:'10px 0px'}}
      >
        新增代办
      </Button>
      <CreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};


export default connect(
  mapStateToProps,mapDispatchToProps
)(AddNewList);