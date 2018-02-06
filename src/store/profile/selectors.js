export function getProfileState(state) {
  return {
    tests: {
      id: state.user.id,
      userId: state.user.userId,
      expertPanel: state.user.expertPanel,
      sex: state.user.sex,
      birthYear: state.user.birthYear,
      height: state.user.height,
      weight: state.user.weight,
      practiceType: state.user.practiceType,
      clubCity: state.user.timing,
      clubName: state.user.clubName,
      startOfPracticeYear: state.user.startOfPracticeYear,
      shoeSize: state.user.shoeSize,
      skateWidth: state.user.skateWidth,
      shinGardSize: state.user.shinGardSize,
      pantSize: state.user.pantSize,
      elbowPadSize: state.user.elbowPadSize,
      shoulderPadSize: state.user.shoulderPadSize,
      gloveSize: state.user.gloveSize,
      helmetSize: state.user.helmetSize,
      headSize: state.user.headSize,
    }
  };
}
