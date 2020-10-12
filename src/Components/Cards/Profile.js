import React, { useState } from 'react';
import { Button, Card, CardContent, makeStyles } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import EditProfile from '../Modals/EditProfile';
import PasswordChange from '../Modals/PasswordChange';
import ProfileSVG from '../../Images/profile.svg';
import './Profile.css';

const useStyles = makeStyles({
  button: {
    backgroundColor: "#ace1af",
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
    '&:focus': {
      outline: "none"
    },
  }
})

function Profile() {

  const classes = useStyles();
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showEditProfile, setEditProfile] = useState(false);
  const [showPassword, setPassword] = useState(false);

  const getUser = () => {
    Auth.currentSession()
    .then(data => {
      setUsername(data.accessToken.payload.username);
      setEmail(data.idToken.payload.email);
    })
    .catch(err => console.log(err));
  };

  /*async function update (em) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { 'email': em });
    } catch (error) {
      console.log(error.message);
    }
  }*/

  function handleShowEditProfile() {
    setEditProfile(true);
    setPassword(false);
  }

  function handleShowPassword() {
    setEditProfile(false);
    setPassword(true);
  }

  return (
    <div className="profile">
      {getUser()}
      <h4 className="profile-title">Profile</h4>
      <Row>
        <Col xs={7} md={7}>
          <Card variant="outlined" className="profile-card">
            <CardContent>
              <div>
                <b className="profile-subtitle">USERNAME</b>
                <p>{username}</p>
              </div>
              <div>
                <b className="profile-subtitle">EMAIL</b>
                <p>{email}</p>
              </div>
              <div align="right">
                <Button 
                  className={classes.button}
                  disableElevation
                  onClick={handleShowEditProfile}
                  variant="contained"
                >
                  Edit
                </Button>
                <EditProfile email={email} openEdit={showEditProfile} selectPassword={() => handleShowPassword()}/>
                <PasswordChange openPassword={showPassword}/>
              </div>
            </CardContent>
          </Card>
        </Col>
        <Col xs={4} md={4}>
          <img src={ProfileSVG} align="center" alt="profile img" className="profile-picture"/>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;