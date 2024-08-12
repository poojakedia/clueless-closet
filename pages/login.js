import { useState, useEffect } from 'react';
import { auth } from "../firebase";
import { LoginInput } from '../app/components/loginInput';
import { SignupInput } from '../app/components/signupInput';
import {Button} from '@mui/material';
import { useRouter } from 'next/router';
export default function Login(){
    const [newUser, setNewUser] = useState(false);
    const router = useRouter();

    const handleNavigation = async() =>{
        router.push('/')
    }
    return(
        <div>
            {newUser? (
                <SignupInput auth={auth} handleNavigation={handleNavigation}/>
            ):(
                <div>
                <LoginInput auth={auth} handleNavigation={{handleNavigation}}/>
                <Button 
                sx={{backgroundColor: '#dfc28a !important',
                    '&:hover': {
                      backgroundColor: '#bfa268 !important', 
                    },
                    '&:active': {
                      backgroundColor: '#9f8a48 !important'}}}
                onClick={()=> setNewUser(true)}
                > 
                    New User?
                </Button>
                </div>
            )}
            
        </div>
    )
}