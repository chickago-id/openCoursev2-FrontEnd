import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  user : {},
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
  logout(state){
    state.status = ''
        state.token = ''
        state.role = ''
  },

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log(username)
    // console.log(token)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log(response.access_token)
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        resolve()
      }).catch(error => {
        reject(error)
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
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        response

        if (!response) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_NAME', response.username)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
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

