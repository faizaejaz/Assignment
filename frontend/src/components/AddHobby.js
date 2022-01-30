import React, { Component } from "react";
import HobbiesDataService from "../services/HobbiesService";

import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../css-common"

class AddHobby extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassion = this.onChangePassion.bind(this);
        this.onChangeHobby = this.onChangeHobby.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.getuser = this.getuser.bind(this);
        this.saveHobby = this.saveHobby.bind(this);
        this.newHobby = this.newHobby.bind(this);

        this.state = {
            id: null,
            userid: this.props.match.params.id,
            username: this.props.match.params.username,
            passion: "",
            hobby: "",
            year: "",

            submitted: false
        };
    }

    componentDidMount() {
        this.getuser(this.props.match.params.id);
    }

    onChangeUsername(e) {
        const username = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    username: username
                }
            };
        });
    }
    getuser(id) {
        HobbiesDataService.getuser(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    // onChangeUsername(e) {
    //     this.setState({
    //         username: e.target.value
    //     });
    // }

    onChangePassion(e) {
        this.setState({
            passion: e.target.value
        });
    }

    onChangeHobby(e) {
        this.setState({
            hobby: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }

    saveHobby() {
        var data = {
            userid: this.props.match.params.id,
            username: this.state.username,
            passion: this.state.passion,
            hobby: this.state.hobby,
            year: this.state.year
        };

        HobbiesDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    userid: response.data.userid,
                    username: response.data.username,
                    passion: response.data.passion,
                    hobby: response.data.hobby,
                    year: response.data.year,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newHobby() {
        this.setState({
            id: null,
            userid: this.props.match.params.id,
            username: this.props.match.params.username,
            passion: null,
            hobby: null,
            year: null,

            submitted: false
        });
    }

    render() {
        const { currentUser} = this.state;
        const { classes } = this.props

        return (
            <React.Fragment>
                {this.state.submitted ?(
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newHobby}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    required
                                    disabled
                                />
                            </div>

                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Passion"
                                    name="passion"
                                    value={this.state.passion}
                                    onChange={this.onChangePassion}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Hobby"
                                    name="hobby"
                                    value={this.state.hobby}
                                    onChange={this.onChangeHobby}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Year"
                                    name="year"
                                    value={this.state.year}
                                    onChange={this.onChangeYear}
                                    required
                                />
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveHobby}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddHobby)