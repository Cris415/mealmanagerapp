import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createRecipe } from '../../actions';

class NewRecipe extends Component {
    renderField(field) {
        const {
            meta: { touched, error },
        } = field;

        const className = `form-group ${touched && error ? 'red-text ' : ''}`;
        if (field.input.name === 'steps') {
            return (
                <div className={className}>
                    <label>{field.label}</label>
                    <textarea
                        className="form-control materialize-textarea"
                        {...field.input}
                    />
                    <div className="text-help">{touched ? error : ''}</div>
                </div>
            );
        }
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">{touched ? error : ''}</div>
            </div>
        );
    }
    onSubmit(values) {
        this.props.createRecipe(values, () => {
            this.props.history.push('/recipes');
        });
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <form
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                className="container"
            >
                <h3>Create a New Recipe!</h3>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Ingredients, separated by commas"
                    name="ingredients"
                    component={this.renderField}
                />
                <Field
                    label="Recipe instructions, new step with return key"
                    name="steps"
                    component={this.renderField}
                />
                <Field
                    label="Image URL"
                    name="image"
                    component={this.renderField}
                />
                <Field
                    label="Recipe total time in minutes"
                    name="time"
                    component={this.renderField}
                />
                <button
                    type="Submit"
                    className="btn btn-primary waves-effect waves-light right"
                >
                    Submit
                </button>
                <Link className="btn red left" to="/dashboard">
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title that is atleast three characters';
    }
    if (!values.ingredients) {
        errors.ingredients = 'Enter atleast one ingredient';
    }
    if (!values.steps) {
        errors.steps = 'Enter instructions for this recipe';
    }
    //TODO: Validate time to be number
    return errors;
}

export default reduxForm({ validate, form: 'PostsNewForm' })(
    connect(null, { createRecipe })(NewRecipe)
);
