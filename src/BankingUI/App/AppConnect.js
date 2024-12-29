import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AuthorizationActionCreators } from "../../redux/actions/index";
import App from "./App";
const mapStateToProps = (state) => {
  return {
    reducerAuthorization: state.reducerAuthorization,
  };
};
const mapDispatchToProps = {
  setUserAccessToken: AuthorizationActionCreators.setUserAccessToken,
  setIsAuthenticated: AuthorizationActionCreators.setIsAuthenticated,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
