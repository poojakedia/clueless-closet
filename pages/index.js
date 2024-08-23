import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import { Box,Stack, Typography, Button, Modal, TextField, createTheme, ThemeProvider} from '@mui/material'
import { styled } from '@mui/material/styles';
import Typewriter from 'typewriter-effect';

export default function Landing(){
    const router = useRouter()
    const handleRoute= ()=>{
        console.log("redirect")
        router.push('/login')
    }
    return(
        <div>
            <Box 
  sx={{
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100vh', 
    width: '100vw', 
    background: 'linear-gradient(135deg, #1c1c1c, #444)',
    overflowY: 'hidden', 
    position: 'relative'
  }}>
  
  <Button 
    sx={{
      position: 'absolute', 
      top: 20, 
      right: 20, 
      color: '#fff', 
      borderColor: '#dfc28a', 
      borderRadius: '20px',
      '&:hover': {
        backgroundColor: '#dfc28a',
        color: '#333'
      }
    }} 
    variant="outlined" 
    onClick={handleRoute}>
    Sign In
  </Button>
  
  <img 
    src="/assets/3dgifmaker70265.gif" 
    width="400" 
    height="400" 
    style={{ borderRadius: '50%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }} 
  />
  
  <Typography 
    variant="h3" 
    sx={{ 
      color: 'white', 
      fontSize: '2.5rem', 
      marginTop: '20px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
    }}>
    Welcome to
  </Typography>
  
  <Typography 
    variant="h1" 
    sx={{ 
      color: '#dfc28a', 
      fontSize: '4rem', 
      textAlign: 'center',
      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
    }}>
    <Typewriter
      options={{
        strings: ['iCloset'],
        autoStart: true,
        loop: true,
      }}
    />
  </Typography>
</Box>
        </div>
    )
}