import axios from 'axios';

const getAllNotes = () => { //вывод всех заметок
    return axios.get('http://localhost:8000/notes/red')
    .then(({data}) => {
        return data
    })
}

const greateNote = ({text, title, date, rate}) => { //добавление заметки
    return axios.post('http://localhost:8000/notes/add', { title, text, date, rate })
        .then(({data}) => {
            return data
        }
    )
}

const removeNote = (id) => { //удаление заметки
    return axios.post('http://localhost:8000/notes/delete', { id })
        .then(({data}) => {
            return data
        }
    )
}

export { getAllNotes, greateNote, removeNote};