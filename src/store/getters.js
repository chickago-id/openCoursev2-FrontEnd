const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  isAuthenticated: state => !!state.user.token,
  authStatus: state => state.user.status
}
export default getters
