import { useState } from 'react';
import { Box, Typography, Stack, createTheme, ThemeProvider} from '@mui/material';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";

import getLPTheme from '../design/theme'

export function SignupInput({auth, handleNavigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const theme = createTheme(getLPTheme())

    const handleSignUp =()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //Signed up
            const user = userCredential.user;
            console.log(user);
            handleNavigation();
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    return(
        <ThemeProvider theme={theme}>
    <Box>
        <Stack spacing={2}>
        <Typography variant="h2" color='#dfc28a'> Sign Up </Typography>
        <Typography variant="h6" color='#bfa268'> Enter your account information </Typography>
        <FormControl>
            <InputLabel> Email </InputLabel>
            <Input id="email-input" type="email" fullWidth value = {email} onChange={(e)=> setEmail(e.target.value)}/>
        </FormControl>
        <FormControl>
            <InputLabel> Set Password </InputLabel>
            <Input id ="password-input" type="password"  fullWidth value = {password} onChange={(e)=> setPassword(e.target.value)}/>
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="confirm-password-input"> Verify Password </InputLabel>
            <Input id="confirm-password-input" type="password" value ={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>

            {password === confirmPassword? 
            (<Button variant="contained" color="primary" onClick={()=>{handleSignUp()}}> Sign Up </Button>
            ):(
            <Typography variant="h6" color="error"> Passwords do not match </Typography>
            )}
        
            
        </FormControl>
        </Stack>
    </Box>
    </ThemeProvider>
    )
}