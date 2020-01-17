import {
  CHANGE_VIEW,
  RESET_DATA,
  TOGGLE_NODE_CLICKED,
  TOGGLE_NODE_DISABLED,
  TOGGLE_NODES_DISABLED,
  TOGGLE_NODE_HOVERED,
  TOGGLE_PARAMETERS,
  TOGGLE_TAG_ACTIVE,
  TOGGLE_TAG_FILTER,
  TOGGLE_TEXT_LABELS,
  TOGGLE_THEME,
  UPDATE_CHART_SIZE,
  UPDATE_FONT_LOADED
} from '../actions';

function reducer(state = {}, action) {
  const updateState = newState => Object.assign({}, state, newState);

  switch (action.type) {
    case CHANGE_VIEW:
      return updateState({
        view: action.view
      });

    case RESET_DATA:
      return updateState(action.data);

    case TOGGLE_NODE_CLICKED: {
      return updateState({
        nodeClicked: action.nodeClicked
      });
    }

    case TOGGLE_NODE_DISABLED: {
      return updateState({
        nodeDisabled: Object.assign({}, state.nodeDisabled, {
          [action.nodeID]: action.isDisabled
        })
      });
    }

    case TOGGLE_NODES_DISABLED: {
      return updateState({
        nodeDisabled: action.nodeIDs.reduce(
          (disabled, id) =>
            Object.assign({}, disabled, {
              [id]: action.isDisabled
            }),
          state.nodeDisabled
        )
      });
    }

    case TOGGLE_NODE_HOVERED: {
      return updateState({
        nodeHovered: action.nodeHovered
      });
    }

    case TOGGLE_PARAMETERS: {
      const paramIDs = state.nodes.filter(id => state.nodeIsParam[id]);
      return updateState({
        nodeDisabled: paramIDs.reduce(
          (disabled, id) =>
            Object.assign({}, disabled, {
              [id]: !action.parameters
            }),
          state.nodeDisabled
        ),
        parameters: action.parameters
      });
    }

    case TOGGLE_TEXT_LABELS:
      return updateState({
        textLabels: action.textLabels
      });

    case TOGGLE_TAG_ACTIVE: {
      return updateState({
        tagActive: Object.assign({}, state.tagActive, {
          [action.tagID]: action.active
        })
      });
    }

    case TOGGLE_TAG_FILTER: {
      return updateState({
        tagEnabled: Object.assign({}, state.tagEnabled, {
          [action.tagID]: action.enabled
        })
      });
    }

    case TOGGLE_THEME: {
      return updateState({
        theme: action.theme
      });
    }

    case UPDATE_CHART_SIZE: {
      return updateState({
        chartSize: action.chartSize
      });
    }

    case UPDATE_FONT_LOADED: {
      return updateState({
        fontLoaded: action.fontLoaded
      });
    }

    default:
      return state;
  }
}

export default reducer;
