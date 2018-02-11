export function getProfileState(state) {
  return {
    profile: {
      id: state.userProfile.id,
      userId: state.userProfile.userId,
      expertPanel: state.userProfile.expertPanel,
      sex: state.userProfile.sex,
      birthYear: state.userProfile.birthYear,
      height: state.userProfile.height,
      weight: state.userProfile.weight,
      practiceType: state.userProfile.practiceType,
      clubCity: state.userProfile.timing,
      clubName: state.userProfile.clubName,
      startOfPracticeYear: state.userProfile.startOfPracticeYear,
      shoeSize: state.userProfile.shoeSize,
      skateWidth: state.userProfile.skateWidth,
      shinGardSize: state.userProfile.shinGardSize,
      pantSize: state.userProfile.pantSize,
      elbowPadSize: state.userProfile.elbowPadSize,
      shoulderPadSize: state.userProfile.shoulderPadSize,
      gloveSize: state.userProfile.gloveSize,
      helmetSize: state.userProfile.helmetSize,
      headSize: state.userProfile.headSize
    }
  };
}
