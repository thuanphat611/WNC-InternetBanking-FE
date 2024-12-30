import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	AuthorizationActionCreators,
	UserInformationActionCreators,
} from "../../redux/actions/index";
import App from "./App";

const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
		reducerUserInformation: state.reducerUserInformation,
	};
};

const mapDispatchToProps = {
	setUserAccessToken: AuthorizationActionCreators.setUserAccessToken,
	setIsAuthenticated: AuthorizationActionCreators.setIsAuthenticated,
	getAllInformation: UserInformationActionCreators.getAllInformation,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
