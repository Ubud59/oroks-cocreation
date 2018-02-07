import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import fetchUser from '../../utils/user.services'
import { persistSession } from '../../utils/auth.services'

import { userAuthentication } from '../../store/user/actions'

const Auth = (props) => {
  persistSession(props.location.hash)
    .then(hashParams => getUserInfo(hashParams, props))
    .catch(e => console.warn(e))

  return(
    <div>Redirecting ...</div>
  )
}

const getUserInfo = (hashParams, props) => {
  console.log(hashParams);
  fetchUser(hashParams.access_token)
      .then(user => props.handleUserInfo(user))
      .then(res => props.history.push('/'))
      .catch(e => console.log(e))
}


const AuthComponent = withRouter(connect(null, userAuthentication)(Auth));
export default AuthComponent