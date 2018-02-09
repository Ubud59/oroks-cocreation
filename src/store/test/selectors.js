export function getTestState(state) {
  return {
    test: {
      id: state.test.id,
      type: state.test.type,
      testReference: state.test.testReference,
      title: state.test.title,
      product: state.test.product,
      status: state.test.status,
      description: state.test.description,
      validationThreshold: state.test.validationThreshold,
      timing: state.test.timing,
      imageSrc: state.test.imageSrc,
      evaluationFormPath: state.test.evaluationFormPath,
      evaluationResultsPath: state.test.evaluationResultsPath,
      createdBy:state.test.createdBy
    },
    user: state.user
  };
}
