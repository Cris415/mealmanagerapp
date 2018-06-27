import React, { Component } from 'react';
import moment from 'moment';
import Day from './Day';
import { Link } from 'react-router-dom';

class WeekView extends Component {
    renderDays = () => {
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];

        return days.map(day => (
            <Day
                key={day}
                day={moment(this.props.day, 'MM-DD-YYYY').day(day)}
            />
        ));
    };

    render() {
        return (
            <div className="container">
                {this.renderDays()}

                <Link
                    to={
                        '/dashboard/' +
                        moment(this.props.day, 'MM-DD-YYYY')
                            .subtract(1, 'week')
                            .format('MM-D-YYYY')
                    }
                    className="btn">
                    <i className="material-icons small">arrow_back</i>
                    Previous Week
                </Link>

                <Link
                    to={
                        '/dashboard/' +
                        moment(this.props.day, 'MM-DD-YYYY')
                            .add(1, 'week')
                            .format('MM-D-YYYY')
                    }
                    className="btn right">
                    Next Week
                    <i className="material-icons small">arrow_forward</i>
                </Link>
            </div>
        );
    }
}

export default WeekView;
