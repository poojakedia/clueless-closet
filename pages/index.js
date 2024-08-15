import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import { Box,Stack, Typography, Button, Modal, TextField, createTheme, ThemeProvider} from '@mui/material'
import { styled } from '@mui/material/styles';

export default function Landing(){
    const router = useRouter()
    const handleRoute= ()=>{
        console.log("redirect")
        router.push('/login')
    }
    return(
        <div>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      height: '100vh', gap: 2, height: '100vh', width: '100vw', backgroundColor: '#333', overflowY: 'hidden', position: 'relative'}}>
        <Button sx={{position: 'relative', top: 20, right: 20}} onClick={handleRoute}> Sign In </Button>
                <Typography variant="h1" component="h1" sx={{color: 'white'}}>
                    Welcome to Clueless Closet
                </Typography>
            </Box>
        </div>
    )
}