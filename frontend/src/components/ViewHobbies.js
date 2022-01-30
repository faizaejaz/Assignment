import React, { Component } from "react";
import HobbiesDataService from "../services/HobbiesService";
import { Link } from "react-router-dom";

import { styles } from "../css-common";
import { TextField, Button, Grid, ListItem, withStyles} from "@material-ui/core";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

class ViewHobbies extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.retrieveHobbies = this.retrieveHobbies.bind(this);
    // this.deleteHobby = this.deleteHobby.bind(this);
   
    
    this.state = {
        id: null,
        userid: "",
        username: "",
        passion: null,
        hobby: null,
        year: null,
        submitted: false,
        hobbies: [],
        currentHobby: null,
        currentIndex: -1,
    };
  }

  onChangeUsername(e) {
    this.setState({
        username: e.target.value
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

//   deleteHobby(id) {
//     HobbiesDataService.delete(id)
//         .then(response => {
//             console.log(response.data);
//             this.props.history.push('/hobbies')
//         })
//         .catch(e => {
//             console.log(e);
//         });
// }



  componentDidMount() {
    // this.retrieveUsers();
    this.retrieveHobbies();
  }


  render() {
    const { classes } = this.props
    const { hobbies } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
        <Grid item md={8}>
        <h4>Hobbies List</h4>
              
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
                hobbies.map((hobby, index) => (
                // if(hobby.userid === currentUser.id){
                  <ListItem divider	
                    key={index}>
                  <ListItemText sx={{ width: 15, height: 5 }}
                    primary={hobby.username}
                  />
                    <ListItemText sx={{ width: 15, height: 5 }}
                    primary={hobby.passion}
                  />
                  <ListItemText sx={{ width: 15, height: 5 }}
                    primary={hobby.hobby}
                  />
                  <ListItemText sx={{ width: 15, height: 5 }}
                    primary={hobby.year}
                  />
                    
                    <Link
                      to={"/hobbies/" + hobby.id}
                      className={classes.edit} 
                    >
                      Edit
               
                      {/* <IconButton>
                          <EditIcon/>
                      </IconButton> */}
                    </Link>
                    {/* <div onClick={this.deleteHobby(hobby.id)}>  */}
                      <IconButton>
                          <DeleteIcon />
                      </IconButton>
                    {/* </div> */}
                  </ListItem>
                // }        
                )                
        )} </List>
        </div>
        </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ViewHobbies)