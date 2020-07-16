import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU'; /*импорт русского языка для элементов библиотеки antd*/
import Red from './Red'; //импорт 

ReactDOM.render(
  <ConfigProvider locale={ru_RU}>
    <Red />
  </ConfigProvider>,
  document.getElementById('red')
);