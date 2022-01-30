import React, { Component } from "react";
import HobbiesDataService from "../services/HobbiesService";

import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class Hobby extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassion = this.onChangePassion.bind(this);
        this.onChangeHobby = this.onChangeHobby.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.getHobby = this.getHobby.bind(this);
        // this.updatePublished = this.updatePublished.bind(this);
        this.updateHobby = this.updateHobby.bind(this);
        this.deleteHobby = this.deleteHobby.bind(this);

        this.state = {
            currentHobby: {
                id: null,
                username: "",
                passion: null,
                hobby: null,
                year: null
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getHobby(this.props.match.params.id);
    }

    onChangeUsername(e) {
        const username = e.target.value;

        this.setState(function (prevState) {
            return {
                currentHobby: {
                    ...prevState.currentHobby,
                    username: username
                }
            };
        });
    }

    onChangePassion(e) {
        const passion = e.target.value;

        this.setState(function (prevState) {
            return {
                currentHobby: {
                    ...prevState.currentHobby,
                    passion: passion
                }
            };
        });
    }

    onChangeHobby(e) {
        const hobby = e.target.value;

        this.setState(function (prevState) {
            return {
                currentHobby: {
                    ...prevState.currentHobby,
                    hobby: hobby
                }
            };
        });
    }

    onChangeYear(e) {
        const year = e.target.value;

        this.setState(function (prevState) {
            return {
                currentHobby: {
                    ...prevState.currentHobby,
                    year: year
                }
            };
        });
    }

    getHobby(id) {
        HobbiesDataService.get(id)
            .then(response => {
                this.setState({
                    currentHobby: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateHobby() {
        HobbiesDataService.update(
            this.state.currentHobby.id,
            this.state.currentHobby
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The hobby was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteHobby() {
        HobbiesDataService.delete(this.state.currentHobby.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/hobbies')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentHobby} = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentHobby ? (
                    <div className={classes.form}>
                        <h2>Hobby</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="User Name"
                                    name="username"
                                    value={currentHobby.username}
                                    onChange={this.onChangeUserName}
                                    required
                                    disabled
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Passion"
                                    name="passion"
                                    value={currentHobby.passion}
                                    onChange={this.onChangePassion}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Hobby"
                                    name="hobby"
                                    value={currentHobby.hobby}
                                    onChange={this.onChangeHobby}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Year"
                                    name="year"
                                    value={currentHobby.year}
                                    onChange={this.onChangeYear}
                                    required
                                />
                            </div>

                           
                        </form>
                        <div className={classes.buttonWrapper}>
                           
                            <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteHobby}
                            >
                                Delete
            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateHobby}
                            >
                                Add
            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please select a user...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Hobby)
