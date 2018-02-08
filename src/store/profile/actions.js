export function createProfile(dispatch) {
  return {
    createmyProfile: (profile) => fetch({type:"CREATE_MY_PROFILE", profile: profile}),
    updateProfileField:(field,value) => dispatch({type:"UPDATE_PROFILE_FIELD", field:field, value:value})
  }
}
