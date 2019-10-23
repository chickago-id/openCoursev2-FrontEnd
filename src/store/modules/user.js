import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken() || localStorage.getItem('token'),
  name: '',
  username: '',
  avatar: '',
  roles: []
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
    state.user = payload
  },
  auth_error(state){
    state.status = 'error'
  },

}

const actions = {
  // user login custom
  /* login({commit}, userInfo){
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
        login({username: username, password: password})
        .then(response => {
        commit('SET_TOKEN', response['access_token'])
        commit('SET_ROLES', response['roles'])
        commit('SET_USERNAME', response['username'])
        commit('SET_USER', response)
        localStorage.setItem('token', response['access_token'])
        localStorage.setItem('role', response['roles'])
        localStorage.setItem('username', response['username'])
        localStorage.setItem('user', response)
        setToken(response['access_token'])
        resolve(response)
        })
        .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
        })
    })
  }, */

  // user login default
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        commit('SET_USERNAME', response['username'])
        commit('SET_TOKEN', response['access_token'])
        localStorage.setItem('token', response['access_token'])
        setToken(response['access_token'])
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info custom
  /* getInfo({ commit, state }) {
    
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        response
        console.log(response)
        if (!response) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_USERNAME', response.data.user.username)
        commit('SET_ROLES', response.data.user.role)
        resolve(response)
        console.log(response.data.user.role)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }, */

  // get user info default
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response
         if (!data) {
          reject('Verification failed, please Login again.')
        } else {
          const roles = [response.data[0].user.role]
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          } else {
            commit('SET_USERNAME', response.data[0].user.username)
            commit('SET_NAME', response.data[0].nama_lengkap)
            commit('SET_ROLES', roles)
            resolve(data)
          }
        }
      }) .catch(error => {
        reject(error)
      })
    })
  },

  // user logout custom
  logout({commit}){
    console.log('logout')
    return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
    }).catch((error) => {
      reject(error)
    })
  }, 

  // user logout default
  /* logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }, */

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

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

