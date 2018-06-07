import React, { Component } from 'react';
import moment from 'moment';
import Day from './Day';

class WeekView extends Component {
    state = { weekNumb: moment().week() };

    renderDays = () => {
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        return days.map(day => (
            <Day
                key={day}
                day={moment()
                    .week(this.state.weekNumb)
                    .day(day)}
            />
        ));
    };
    handleWeekChangeForward = () => {
        this.updateWeekNumb(1);
    };
    handleWeekChangeBack = () => {
        this.updateWeekNumb(-1);
    };

    updateWeekNumb = dir => {
        this.setState(prevState => ({
            weekNumb: prevState.weekNumb + dir,
        }));
    };

    render() {
        return (
            <div className="container">
                <header>
                    Week of{' '}
                    {moment()
                        .week(this.state.weekNumb)
                        .day(0)
                        .format('MMMM Do')}{' '}
                    to{' '}
                    {moment()
                        .week(this.state.weekNumb)
                        .day(6)
                        .format('Do')}
                </header>
                {this.renderDays()}

                <button onClick={this.handleWeekChangeBack} className="btn">
                    Last Week
                </button>
                <button
                    onClick={this.handleWeekChangeForward}
                    className="btn right"
                >
                    Next Week
                </button>
            </div>
        );
    }
}

export default WeekView;
