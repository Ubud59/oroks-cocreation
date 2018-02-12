import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import fetchUser from '../../utils/user.services'
import { persistSession } from '../../utils/auth.services'

import { updateProfile } from '../../store/userProfile/actions'

const Auth = (props) => {
  persistSession(props.location.hash)
    .then(hashParams => getUserInfo(hashParams, props))
    .catch(e => console.warn(e))

  return(
    <div>Redirecting ...</div>
  )
}

const getUserInfo = (hashParams, props) => {
  fetchUser(hashParams.access_token)
      .then(user => props.handleUserInfo(user))
      .then(res => props.history.push(hashParams.uri))
      .catch(e => console.log(e))
}

const AuthComponent = withRouter(connect(null, updateProfile)(Auth));
export default AuthComponent
