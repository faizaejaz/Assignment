import React, { Component } from "react";
import HobbiesDataService from "../services/HobbiesService";
import { Link } from "react-router-dom";

import { styles } from "../css-common";
import { TextField, Button, Grid, ListItem, withStyles} from "@material-ui/core";
// import List from '@mui/material/List';
// import ListItemText from '@mui/material/ListItemText';
// import CommentIcon from '@material-ui/icons/Comment';
// import IconButton from '@mui/material/IconButton';

class HobbiesList extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshuserList = this.refreshuserList.bind(this);
    // this.saveHobby = this.saveHobby.bind(this);
    // this.newHobby = this.newHobby.bind(this);
    this.retrieveHobbies = this.retrieveHobbies.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveHobby = this.setActiveHobby.bind(this);
    // this.removeAllHobbies = this.removeAllHobbies.bind(this);
    // this.searchTitle = this.searchTitle.bind(this);
    
    this.state = {
        id: null,
        userid: "",
        username: "",
        passion: null,
        hobby: null,
        year: null,
        submitted: false,
        hobbies: [],
        users: [],
        currentHobby: null,
        currentUser: null,
        currentIndex: -1,
        currentuserIndex: -1,
    //   searchTitle: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
        username: e.target.value
    });
}

// saveHobby() {
//     var data = {
//         username: this.state.username
//     };

//     HobbiesDataService.create(data)
//         .then(response => {
//             this.setState({
//                 id: response.data.id,
//                 userid: response.data.userid,
//                 username: response.data.username,
//                 passion: response.data.passion,
//                 hobby: response.data.hobby,
//                 year: response.data.year,

//                 submitted: true
//             });
//             console.log(response.data);
//             this.refreshList();
//         })
//         .catch(e => {
//             console.log(e);
//         });
// }

saveUser() {
    var data = {
        username: this.state.username
    };

    HobbiesDataService.createuser(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                username: response.data.username,

                submitted: true
            });
            console.log(response.data);
            this.refreshuserList();
        })
        .catch(e => {
            console.log(e);
        });
}

refreshuserList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentuserIndex: -1
    });
  }

setActiveUser(User, index) {
    this.setState({
      currentUser: User,
      currentuserIndex: index
    });
  }

retrieveHobbies() {
    HobbiesDataService.getAll()
      .then(response => {
        this.setState({
            hobbies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

retrieveUsers() {
    HobbiesDataService.getAllusers()
      .then(response => {
        this.setState({
            users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
        id: null,
        username: "",

        submitted: false
    });
}


// newHobby() {
//     this.setState({
//         id: null,
//         username: "",
//         passion: null,
//         hobby: null,
//         year: null,

//         submitted: false
//     });
// }


  componentDidMount() {
    this.retrieveUsers();
    this.retrieveHobbies();
  }


//   retrieveHobbies() {
//     HobbiesDataService.getAllbyuser()
//       .then(response => {
//         this.setState({
//             hobbies: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   refreshList() {
//     this.retrieveHobbies();
//     this.setState({
//       currentHobby: null,
//       currentIndex: -1
//     });
//   }

//   setActiveHobby(Hobby, index) {
//     this.setState({
//       currentHobby: Hobby,
//       currentIndex: index
//     });
//   }

//   removeAllHobbies() {
//     HobbiesDataService.deleteAll()
//       .then(response => {
//         console.log(response.data);
//         this.refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }



  render() {
    const { classes } = this.props
    const { hobbies, users, currentUser, currentuserIndex } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
            <Grid item md={4}>
                <h2>Users Hobbies</h2>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newUser}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Enter User Name"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    required
                                />
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    onClick={this.saveUser}>
                                    Add
                                </Button>
                            </div>

                            
                        </div>
                    )}
                    <div className="list-group">
                        {users &&
                            users.map((user, index) => (
                            <ListItem
                                selected={index === currentuserIndex}
                                onClick={() => this.setActiveUser(user, index)}
                                divider
                                button	
                                key={index}>
                                {user.username}
                            </ListItem>
                            ))}
                        </div>

                        <Button
                        className={`${classes.button} ${classes.removeAll}`}
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={this.removeAllUsers}
                        >
                        Remove All
                    </Button>
            </Grid>
           <Grid item md={8}>
            <h2>User</h2>
            {currentUser ? (
              <div className={classes.tutorial}>
                {/* <h4>User</h4> */}
                <div className={classes.detail}>
                  <label>
                    <strong>User Name:</strong>
                  </label>{" "}
                  {currentUser.username}
                 
                </div>
                <Link
                  to={"/hobbies/" + currentUser.id + "/" + currentUser.username}
                  className={classes.edit}
                >
                  Add Hobby
                </Link> {" "}
                <Link
                  to={"/hobbies/" + currentUser.username}
                  className={classes.edit} 
                >
                  View Hobbies
                </Link>
              {/* <h4>Hobbies List</h4>
              
              <div className="list-group">
              <List sx={{ width: '100%'}}>
              <ListItem divider>
                  <ListItemText sx={{ width: 15}}
                    primary="Passion"
                  />
                   <ListItemText sx={{ width: 15}}
                    primary="Hobby"
                  />
                  <ListItemText sx={{ width: 15}}
                    primary="Year"
                  />
                  <ListItemText sx={{ width: 20}}
                    primary="Actions"
                  />
                </ListItem>
              {hobbies &&
                hobbies.map((hobby, index, currentUser) => (
                // if(hobby.userid === currentUser.id){
                  <ListItem divider	
                    key={index}>
                    <ListItemText sx={{ width: 15, height: 5 }}
                    primary={hobby.passion}
                  />
                  <ListItemText sx={{ width: 15, height: 5 }}
                    primary={hobby.hobby}
                  />
                  <ListItemText sx={{ width: 15, height: 5 }}
                    primary={hobby.year}
                  />
                    
                    <IconButton>
                        <CommentIcon />
                    </IconButton>
                    <IconButton>
                        <CommentIcon />
                    </IconButton>
                 
                  </ListItem>
                // }        
                )                
)} </List>
            </div> */}
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.tutorial}>Please click on a User...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HobbiesList)