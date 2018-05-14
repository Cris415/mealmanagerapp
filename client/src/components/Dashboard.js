import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        if (!this.props.auth) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
                <Link to="/recipes" className="white-text">
                    <button className="btn right">My Recipes</button>
                </Link>

                <p>Welcome to your dashboard!</p>
            </div>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Dashboard);
