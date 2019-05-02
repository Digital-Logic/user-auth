import React, { PureComponent } from 'react';
import compose from 'recompose/compose';
import { ROUTES } from '../Routes';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Ability } from '@casl/ability';
import PropTypes from 'prop-types';


function withAuth(permissions) {

    function _withAuth(WrappedComponent) {

        class WithAuth extends PureComponent {

            render() {
                const ability = new Ability(this.props.rules);
                const { isAuthenticated, isAuthenticating, location, ...props } = this.props;

                if (permissions) {
                    if (ability.can(permissions.action, permissions.subject, permissions.field)){
                        return <WrappedComponent {...props} /> ;
                    } else if (isAuthenticated && !isAuthenticating ) {
                        return <Redirect to={ROUTES.HOME}/> ;
                    }
                }

                return (
                    isAuthenticated || isAuthenticating ?
                        <WrappedComponent {...props} /> :
                            <Redirect to={{
                                pathname: ROUTES.SIGN_IN,
                                state: { from: location }
                            }} />
                );
            }

            static mapState(state) {
                return {
                    isAuthenticated: state.auth.isAuthenticated,
                    isAuthenticating: state.auth.isAuthenticating,
                    rules: state.auth.rules
                };
            }
        }
        return compose(
            connect(WithAuth.mapState)
        )(WithAuth);
    }
    return _withAuth;
}

withAuth.propTypes = {
    permissions: PropTypes.shape({
        action: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        field: PropTypes.string
    })
};


export default withAuth;