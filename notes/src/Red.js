import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css'; //импорт стилей библиотеки Ant Design
import { List, Divider, Button, Rate, Popconfirm, message } from 'antd'; //импорт элементов из библиотеки Ant Design
import { getAllNotes, removeNote } from './api.js';
import moment from 'moment';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import './index.css';
import './Notes.css';
import Add from './Add.js';


const Red = () => {
  const [notes, setNotes] = useState([]); //хуки состояния
  const [editableRecord, setEditableRecord] = useState();

  const getData = () => { //работа с api
    getAllNotes().then(data => {
      setNotes(data);
    });
  }

  useEffect(() => { //отображение всех заметок после каждого рендера
    getData();
  }, []);

  const deleteNote = (id) => { //удаление заметки
    removeNote(id).then((res) => {
      getData();
      message.success('Ваша заметка удалена');
    })
  }

  const [visible, setVisible] = useState(false);

  const showModal = (item=null) => { //открытие модального окна
    setVisible(true);
    item && setEditableRecord(item);
  };

  return (
    <div className="Red">
      <Add updateData={getData} setVisible={setVisible} visible={visible} editableRecord={editableRecord} setEditableRecord={setEditableRecord}></Add>
      <Button type="primary" onClick={() => showModal()}>
          Добавить заметку
      </Button>
      <Divider orientation="center">Список ваших заметок</Divider>
      <List
        itemLayout="horizontal"
        dataSource={notes}
        renderItem={item => {
          return (
            <List.Item>
              <div className="list"><Button htmlType="submit" type="primary" shape="circle">✓</Button>
                <div className="list_note">
                  <div className="list_title">{item.title}</div>
                  <div className="list_text">{item.text}</div>
                </div>
                <div className="list_right">
                  <Rate value={item.rate} />
                  <div className="date">{moment(item.date).format("Do MMMM YYYY")}</div>
                  <Button htmlType="submit" type="primary" onClick={() => showModal(item)} shape="circle" icon={<EditFilled />}></Button>
                  <Popconfirm
                    title="Вы уверены, что хотите удалить заметку?"
                    onConfirm={() => deleteNote(item._id)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <Button htmlType="submit" shape="circle" type="primary" danger icon={<DeleteOutlined />}></Button>
                  </Popconfirm>
                </div>
              </div>
            </List.Item>)
        }}
      />
    </div>
  )
}
export default Red;