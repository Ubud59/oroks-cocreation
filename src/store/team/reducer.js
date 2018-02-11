
const initialState = {
  test:{
    id: null,
    type: "",
    testReference: "",
    title: "",
    product: "",
    status: "",
    description: "",
    validationThreshold: "",
    timing: "",
    imageSrc: "",
    evaluationFormPath: "",
    evaluationResultsPath: "",
    createdBy:""
  },
  team:[]
};


export default function teamReducer(state = initialState, action) {
  switch (action.type) {

    case "FETCH_TEAM":
      return {...state,team:action.team};

    case "FETCH_TEST":
      return {...state,test:action.test};

    default:
      return state;
  }
}
