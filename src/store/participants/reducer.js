import { postUpdatedParticipant } from '../../utils/participant.services.js';

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
  participants:[]
};


export default function participantsReducer(state = initialState, action) {

  switch (action.type) {

    case "UPDATE_PARTICIPANT_FIELD":
      const updatedParticipants=[...state.participants];
      updatedParticipants[action.index][action.field] = action.value;
      return {...state, participants:updatedParticipants};

    case "UPDATE_PARTICIPANT":
      const index = state.participants.findIndex(function(element) {
        return (element.id===action.participant.id);
      });
      postUpdatedParticipant(state.participants[index]);
      return state;

    case "FETCH_PARTICIPANTS":
      return {...state, participants:action.participants};

    case "FETCH_TEST":
      return {...state, test:action.test};

    default:
      return state;
  }
}
