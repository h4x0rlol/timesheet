const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const defaultState = {
  currentUser: {},
  isAuth: false,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.user,
        isAuth: true,
        registred: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},
        isAuth: false,
        registred: false,
      };

    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, user: user });
export const logout = () => ({ type: LOGOUT });
