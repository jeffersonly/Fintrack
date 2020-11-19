import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Link } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Row, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import EditProfile from '../Modals/Account/EditProfile';
import PasswordChange from '../Modals/Account/PasswordChange';
import ConfirmProfile from '../Modals/Account/ConfirmProfile';
import SnackbarNotification from '../Modals/SnackbarNotification';
import ProfileSVG from '../../Images/profile.svg';
import './Profile.css';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
  }
})

function Profile() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showEditProfile, setEditProfile] = useState(false);
  const [showPassword, setPassword] = useState(false);
  const [showConfirmProfile, setConfirmProfile] = useState(false);
  const [confirmed, setConfirmed] = useState(true);
  const [showProfileAlert, setProfileAlert] = useState(false);
  const [showPasswordAlert, setPasswordAlert] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    Auth.currentUserInfo()
      .then(data => {
        setUsername(data.username);
        setEmail(data.attributes.email);
        setConfirmed(data.attributes.email_verified);
      })
      .catch(err => setError(err));
  };

  async function update (em) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { 'email': em });
      setEmail(em);
    } catch (err) {
      setError(err);
    }
  }

  function handleShowEditProfile() {
    setEditProfile(true);
    setConfirmProfile(false);
    setPassword(false);
    setProfileAlert(false);
    setPasswordAlert(false);
  }

  function handleShowConfirmProfile() {
    setEditProfile(false);
    setConfirmProfile(true);
    setPassword(false);
    setProfileAlert(false);
    setPasswordAlert(false);
  }

  function handleShowPassword() {
    setEditProfile(false);
    setConfirmProfile(false);
    setPassword(true);
    setProfileAlert(false);
    setPasswordAlert(false);
  }

  function handleShowProfileAlert() {
    setEditProfile(false);
    setConfirmProfile(false);
    setPassword(false);
    setProfileAlert(true);
    setPasswordAlert(false);
  }

  function handleShowPasswordAlert() {
    setEditProfile(false);
    setConfirmProfile(false);
    setPassword(false);
    setProfileAlert(false);
    setPasswordAlert(true);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setProfileAlert(false);
    setPasswordAlert(false);
  };

  return (
    <div className="profile">
      <h4 className="profile-title">Profile</h4>
      <Row>
        <Col xs={12} md={7}>
          <Card variant="outlined" className="profile-card">
            <CardContent>
              <ThemeProvider theme={theme}>      
                {error && (<p className="profile-error">{error}</p>)}
                <div>
                  <b className="profile-subtitle">USERNAME</b>
                  <p>{username}</p>
                </div>
                <div>
                  <b className="profile-subtitle">EMAIL</b>
                  <p>{email}</p>
                  {!confirmed && 
                    <Link 
                      className="editprofile-passwordLink"
                      component="button" 
                      onClick={() => handleShowConfirmProfile()}
                    >
                      **Click to verify email
                    </Link>}
                </div>
                <div align="right">
                  <Button 
                    className="profile-button"
                    disableElevation
                    onClick={handleShowEditProfile}
                    variant="contained"
                  >
                    Edit
                  </Button>
                  <EditProfile 
                    email={email}
                    confirm={() => handleShowConfirmProfile()}
                    closeEdit={() => setEditProfile(!showEditProfile)}
                    openEdit={showEditProfile}
                    selectPassword={() => handleShowPassword()}
                    updateEmail={(email) => update(email)}
                  />
                  <ConfirmProfile
                    alert={() => handleShowProfileAlert()}
                    closeConfirm={() => setConfirmProfile(!showConfirmProfile)}
                    openConfirm={showConfirmProfile}
                    username={username}
                    verified={(data) => setConfirmed(data)}
                  />
                  <PasswordChange
                    alert={() => handleShowPasswordAlert()} 
                    closePassword={() => setPassword(!showPassword)}
                    openPassword={showPassword}
                  />
                  <SnackbarNotification
                    className="profile-snackbar"
                    message="Email has been verified!"
                    onClose={handleCloseAlert}
                    open={showProfileAlert}
                    vertical="bottom"
                  />
                  <SnackbarNotification
                    className="profile-snackbar"
                    message="Password successfully changed!"
                    onClose={handleCloseAlert}
                    open={showPasswordAlert}
                    vertical="bottom"
                  />
                </div>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <img src={ProfileSVG} align="center" alt="profile img" className="profile-picture"/>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;