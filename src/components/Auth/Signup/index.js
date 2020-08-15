import React, {useState} from 'react';
import { Card, Typography, Input, Grid, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { signup } from '../../../utils/apiRequests';
import { Loader, Message } from '../../elements';
import './style.css';

export default () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({type: '', message: '', open: false});

  const handleSignup = async () => {
    setLoading(true);
    const resp = await signup({firstName, lastName, email, password});
    setLoading(false);
    if(resp.error) {
      setMessage({open: true, type: 'error', message: resp.errors});
      return;
    }
    setMessage({open: true, type: 'success', message: 'Login successful!!!'});
  }

  return (
    <Card>
      <div style={{width: window.innerHeight-250}} className='CardContentContainer'>
        <Typography variant='h5' align='center' className='CreateAccount'>
          Create Your Account
        </Typography>
        <Grid container direction='column' className='TextFeildContainer'>
          <Input className='TextFeild' placeholder='First Name' 
            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input className='TextFeild' placeholder='Last Name'
            value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <Input className='TextFeild' placeholder='Email'
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input className='TextFeild' placeholder='Password'
            type={showPassword ? 'text' : 'password'}
            value={password} onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            } />
        </Grid>
        <Grid container justify='center'>
          <Button className='SignupButton' onClick={handleSignup}>
            {loading ? <Loader size={25} /> : 'Create my account'}
          </Button>
        </Grid>
      </div>
      <Message 
        open={message.open} type={message.type}
        handleClose={() => setMessage({...message, open: false})}
        message={message.message} />
    </Card>
  );
}