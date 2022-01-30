import React, { Component } from "react";
import {Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { styles } from "./css-common"

import HobbiesList from "./components/HobbiesList";
import ViewHobbies from "./components/ViewHobbies";
import AddHobby from "./components/AddHobby";
import Hobby from "./components/Hobby";

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

class App extends Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography className={classes.name} variant="h6">
              Assignment
            </Typography>
            <Link to={"/users"} className={classes.link}>
              <Typography variant="body2">
                Users Hobbies
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>

          <Switch>
            
            
            <Route exact path="/hobbies/:id/:username" component={AddHobby} />
            <Route exact path="/hobbies/:username" component={ViewHobbies} />
            <Route path="/hobbies/:id" exact component={Hobby} />
            <Route exact path={["/","/users"]} component={HobbiesList} />
            <Route exact path={["/", "/hobbies"]} component={HobbiesList} />
            
          </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);