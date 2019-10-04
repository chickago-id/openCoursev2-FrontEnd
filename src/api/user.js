import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:8081/login',
    method: 'post',
    data
  })
}

/* export function login(username, password) {
  return request({
    url: 'http://localhost:8081/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
} */

export function getInfo(token) {
  return request({
    url: 'http://localhost:8081/profil',
    method: 'get',
    params: { token }
  })
}

/* export function logout() {
  return request({
    url: 'http://localhost:8081/logout',
    method: 'post'
  })
}
 */