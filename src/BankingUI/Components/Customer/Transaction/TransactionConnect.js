import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	AuthorizationActionCreators,
	UserInformationActionCreators,
} from "../../../../redux/actions/index";
import Transaction from "./Transaction";
const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
		reducerUserInformation: state.reducerUserInformation,
	};
};
const mapDispatchToProps = {
	setUserAccessToken: AuthorizationActionCreators.setUserAccessToken,
	setIsAuthenticated: AuthorizationActionCreators.setIsAuthenticated,
	setRole: AuthorizationActionCreators.setRole,
	getAllInformation: UserInformationActionCreators.getAllInformation,
	updateUserInfo: UserInformationActionCreators.updateUserInfo,
};
export default withRouter(
	