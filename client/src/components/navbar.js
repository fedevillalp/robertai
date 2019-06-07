import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { NavLink } from 'react-router-dom';
import LoginPage from "../pages/LoginPage";

const navBarTextStyle = {
  color: 'white',
  marginLeft: '10px',
  marginRight: '10px',
};

const logoutLinkStyle = {
  float: 'right',
  marginLeft: '10px'
}

const userLinkStyle = {
  background: 'black',
  float: 'right',
  marginLeft: '1050px',
  borderRadius: '5px'
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;

  function logoutCheck() {
    if (window.confirm("Logout of this account?")) {
        props.loginController.logout(() => {
        props.history.push("/");
      })
    }
  }

  const user = props.loginController.user;
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
           <NavLink to="/"><div style={navBarTextStyle}> ROBERT.ai </div></NavLink>
          </IconButton>
            {/* {!user &&  <NavLink to="/Home"><div style={navBarTextStyle}> Home </div></NavLink>} */}
            {!user && <NavLink to="/LoginPage"><div style={navBarTextStyle}> Login </div></NavLink>}
            <div style={userLinkStyle}>
            {user &&  <NavLink to="/UserHomePage"><div style={navBarTextStyle}> {user.username}  </div></NavLink> }
            </div>
            <div style={logoutLinkStyle}>
            {user && <NavLink to="/RegistrationPage" onClick={logoutCheck} ><div style={navBarTextStyle}> Logout </div></NavLink>}
            </div>
        </Toolbar>  
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonAppBar));



//{!user && <Button component={NavLink} to="/">Home</Button>} 
// {/* {!user && <Button component={NavLink} to="/LoginPage">Login</Button>} */}
// {/* {user && <Button component={NavLink} to="/UserHomePage">{user.username} </Button>} */}
//{/* {user && <Button component={NavLink} to="/RegistrationPage" onClick={logoutCheck}>Logout</Button>} */}
// { user ? <div>User: {user.username} UserID: {user.id}</div> : null }
//{!user && <Button component={NavLink} to="/RegistrationPage">Register</Button>}