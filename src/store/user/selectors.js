export function getUserState(state) {
  return {
    user: {
      id: state.user.id,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      email: state.user.email,
      phoneNumber: state.user.phoneNumber,
      userType: state.user.userType
    }
  };
}
