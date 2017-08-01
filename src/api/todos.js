import axios from 'axios'

export function getTodos () {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.API_URL}/todos`)
    .then(resolve)
    .catch(reject)
  })
}

export function createTodo (text) {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.API_URL}/todos`, { text })
    .then(resolve)
    .catch(reject)
  })
}

export function updateTodo (id, body) {
  return new Promise((resolve, reject) => {
    axios.put(`${process.env.API_URL}/todos/${id}`, body)
    .then(resolve)
    .catch(reject)
  })
}

export function deleteTodo (id) {
  return new Promise((resolve, reject) => {
    axios.delete(`${process.env.API_URL}/todos/${id}`)
    .then(resolve)
    .catch(reject)
  })
}
