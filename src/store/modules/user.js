import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: localStorage.getItem('token') || '',
  name: '',
  username: '',
  avatar: '',
  user : {},
  roles: localStorage.getItem('role') || ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  auth_success(state, payload){
    state.status = 'success'
    state.role = payload.role
    state.token = payload.token
    state.user = payload.user
  },
  auth_error(state){
    state.status = 'error'
  },

}

const actions = {
  // user login
  /* login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log(response.roles[0])
        commit('SET_TOKEN', response.access_token)
        commit('SET_USERNAME', response.username)
        commit('SET_ROLES', response.roles[0])
        localStorage.setItem('token', response.access_token)
        localStorage.setItem('role', response.roles[0])
        setToken(response.access_token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }, */

  login({commit}, userInfo){
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
        //commit('auth_request')
        login({username: username, password: password})
        .then(response => {
        console.log(response)
        const token = response['access_token']
        commit('SET_TOKEN', response['access_token'])
        commit('SET_ROLES', response['roles'][0])
        commit('SET_USERNAME', response['username'])
        localStorage.setItem('token', response['access_token'])
        localStorage.setItem('role', response['roles'][0])
        setToken(response['access_token'])
        // Add the following line:
        commit('auth_success', {
          token: token,
          username: response['username'],
          role: response['roles'][0] 
        })
            resolve(response)
        })
        .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
        })
    })
  },


  // user login
  /* login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login({ data: user }).then(response => {
        console.log(reject)
        const token = response.data.access_token
        let user = response.data.roles[0]
        let atur = response.data.roles[0]
        setToken(response.data.token)
        localStorage.setItem('token', token)
        localStorage.setItem('role', response.data.roles[0])
        // Add the following line:
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success', {
          token: token,
          user: user,
          role: atur
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }, */

  // get user info
  /* getInfo({ commit, state}) {
    getInfo(state.token).then(response =>{
      if (!response) {
      console.log('Verification failed, please Login again.')
      reject('Verification failed, please Login again.')
      }

      commit('SET_USERNAME', response.username)
      commit('SET_ROLES', response.roles[0])
      resolve(data)
      console.log(data)
    }).catch(error => {
        console.log(error)
        reject(error)
      })
      return response.data;
  }, */

  getInfo({ commit, state }) {
    
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        response
        console.log(response)
        if (!response) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_USERNAME', response.username)
        commit('SET_ROLES', response.roles[0])
        resolve(data)
        console.log(data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // user logout
  /* logout({ commit }) {
    //console.log(state.token)
    return new Promise((resolve, reject) => {
      console.log(state)
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        console.log(state.token)
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }, */

  logout({commit}){
    console.log('logout')
    return new Promise((resolve, reject) => {
        commit('logout')
        commit('SET_TOKEN', '')
        removeToken()
        //delete config.headers['Authorization']
        resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

