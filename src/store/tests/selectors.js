export function getTestsState(state) {
  return {
    tests: {
      id: state.user.id,
      type: state.user.type,
      testReference: state.user.testReference,
      title: state.user.title,
      product: state.user.product,
      status: state.user.status,
      description: state.user.description,
      validationTreshold: state.user.validationTreshold,
      timing: state.user.timing,
      imgSrc: state.user.imgSrc,
      evaluationFormPath: state.user.evaluationFormPath,
      evaluationResultsPath: state.user.evaluationResultsPath,
    }
  };
}
