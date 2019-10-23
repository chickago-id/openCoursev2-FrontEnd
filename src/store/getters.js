const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  username: state => state.user.username,
  roles: state => state.user.roles,
  isAuthenticated: state => !!state.user.token,
  authStatus: state => state.user.status,
  permission_routes: state => state.permission.routes
}
export default getters
