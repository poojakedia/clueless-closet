import { useState } from 'react';
import { Box, Typography, Stack, createTheme, ThemeProvider} from '@mui/material';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import getLPTheme from '../design/theme';

export function LoginInput({auth, handleNavigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const theme = createTheme(getLPTheme())

    const handleSignIn =()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            handleNavigation();
        }).catch((error)=>{
            console.log(error);
        })
        
    }
    return(
    <ThemeProvider theme={theme}>
    <Box sx={{backgroundColor: '#333'}}>
        <Stack spacing={2}>
        <Typography variant="h2" color='#dfc28a'> Sign In </Typography>
        <Typography variant="h6" color='#bfa268'> Enter your credentials to access your account </Typography>
        <FormControl>
            <InputLabel> Email </InputLabel>
            <Input id="email-input" type="email" fullWidth value = {email} onChange={(e)=> setEmail(e.target.value)}/>
        </FormControl>
        <FormControl>
            <InputLabel> Password </InputLabel>
            <Input id ="password-input" type="password"  fullWidth value = {password} onChange={(e)=> setPassword(e.target.value)}/>
            <Button variant="contained" color="primary" onClick={()=>{handleSignIn()}}> Sign In </Button>
        </FormControl>
        </Stack>
    </Box>
    </ThemeProvider>
    )
}