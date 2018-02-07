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
      validationTreshold: state.test.validationTreshold,
      timing: state.test.timing,
      imgSrc: state.test.imgSrc,
      evaluationFormPath: state.test.evaluationFormPath,
      evaluationResultsPath: state.test.evaluationResultsPath,
    }
  };
}
