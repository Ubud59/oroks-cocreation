export function userAuthentication(dispatch) {
  return {
    signOut: () => {
      console.log("signout");
    },
    handleUserInfo: (user) => dispatch({type: "LOGGED_IN", user: user})
  };
}
