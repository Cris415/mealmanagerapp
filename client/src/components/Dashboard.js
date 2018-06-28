import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import WeekView from './calendar/WeekView';
import moment from 'moment';

class Dashboard extends Component {
    render() {
        if (!this.props.auth) {
            return <Redirect to="/" />;
        }
        if (!this.props.match.params.date) {
            const route = `dashboard/${moment().format('MM-D-YYYY')}`;
            return <Redirect to={route} />;
        }
        return (
            <div className="container">
                <Link to="/recipes" className="white-text">
                    <button className="btn right">My Recipes</button>
                </Link>
                <WeekView day={this.props.match.params.date} />
            </div>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Dashboard);
