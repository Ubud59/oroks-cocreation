export function updateProfile(dispatch) {
  return {
    updatemyProfile: (profile) => dispatch({type:"UPDATE_MY_PROFILE", profile: profile}),
    updateProfileField:(field, value) => dispatch({type:"UPDATE_PROFILE_FIELD", field:field, value:value}),
    handleUserInfo: (user) => dispatch({type: "LOGGED_IN", user: user})
  }
}
