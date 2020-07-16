import React, { useState } from 'react';
import 'antd/dist/antd.css'; //импорт стилей библиотеки Ant Design
import { Button, Input, Rate, Modal, DatePicker, Typography, message } from 'antd'; //импорт элементов из библиотеки Ant Design
import { greateNote } from './api.js';
import moment from 'moment';
import './index.css';
import './Notes.css';

const Add = ({ updateData, setVisible, visible, editableRecord}) => {

  const [title, setTitle] = useState(editableRecord && editableRecord.title ? editableRecord.title : ""); //хуки состояния
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [rate, setRate] = useState(5);

  const createNote = () => { //создание заметки
    greateNote({ text, title, date, rate }).then((res) => {
      updateData();
      handleCancel(); //закрытие модального окна      
      message.success('Ваша заметка создана!');
      onReset();
    })
  }

  console.log(editableRecord);
  console.log(title);

  const onReset = () => { //очистка  
    setTitle(""); //очистка названия
    setText(""); //очистка текста
    setRate(""); //очистка рейтинга
    setDate(""); //очистка даты
  };

  const handleCancel = () => { //нажатие на кнопку отмены
    setVisible(false);
  };

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']; //дата

  const desc = ['несрочное/неважное', 'несрочное/важное', 'срочное/неважное', 'срочное/важное', 'очень срочное/очень важное']; //рейтинг

  const handleChange = (value) => { //задание рейтинга
    setRate(value);
  };

  const getDate = (date) => { //задание даты
    setDate(date);
  };

  const { TextArea } = Input;
  const { Text } = Typography;

  return (
    <div className="Add">
      <div className="up">
        <Text mark>Приложение "Заметки"</Text>
      </div>
      <Modal
        //модальное окно 
        title="Создание заметки"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
      >
        {/* отображение формы */}
        <p>Название:</p>
        <Input placeholder="Введите здесь название вашей заметки" value={title} onChange={e => setTitle(e.target.value)}></Input>
        <p className="text">Текст:</p>
        <TextArea rows={7} placeholder="Введите здесь текст вашей заметки" value={editableRecord ? editableRecord.text : text} onChange={e => setText(e.target.value)} />
        <div className="data_status">
          <DatePicker defaultValue={moment('14/07/2020', dateFormatList[0])} format={dateFormatList} value={editableRecord ? null : date} onChange={getDate} />
          <span className="rate">
            <Rate tooltips={desc} value={editableRecord ? editableRecord.rate : rate} onChange={handleChange} />
            {rate ? <span className="ant-rate-text">{desc[rate - 1]}</span> : ''}
          </span>
        </div>
        <div class="button_modal">
          <Button htmlType="submit" type="primary" onClick={createNote} disabled={!text || !title || !date || !rate}>
            Добавить
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Очистить
          </Button>
        </div>
      </Modal>
    </div>
  )
}
export default Add;