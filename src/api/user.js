import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:8081/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:8081/profile',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://localhost:8081/logout',
    method: 'post'
  })
}
