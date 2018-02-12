import { postUpdatedParticipant } from '../../utils/participant.services.js';

const initialState = {
  test:{
    id: null,
    type: "",
    test_reference: "",
    title: "",
    product: "",
    status: "",
    description: "",
    validation_threshold: "",
    timing: "",
    image_src: "",
    evaluation_form_path: "",
    evaluation_results_path: "",
    created_by:""
  },
  participants:[]
};


export default function participantsReducer(state = initialState, action) {

  switch (action.type) {

    case "UPDATE_PARTICIPANT_FIELD":
      const updatedParticipants=[...state.participants];
      const index1 = state.participants.findIndex(function(element) {
        return (element.id===action.id);
      });
      updatedParticipants[index1][action.field] = action.value;
      return {...state, participants:updatedParticipants};

    case "UPDATE_PARTICIPANT":
      const index2 = state.participants.findIndex(function(element) {
        return (element.id===action.participant.id);
      });
      postUpdatedParticipant(state.participants[index2]);
      return state;

    case "FETCH_PARTICIPANTS":
      return {...state, participants:action.participants};

    case "FETCH_TEST":
      return {...state, test:action.test};

    default:
      return state;
  }
}
