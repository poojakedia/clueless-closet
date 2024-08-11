import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import {Button, Typography, Box} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'


export default function Closet({closet, removeItem}){
    const theme = createTheme({
        palette: {
            primary: {
                mode: 'light',
                main: '#dfc28a',
                },
                secondary: {
                    main: 	'#fbf7f5',
                    },
                    },
    })
    return(
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3px'}}>
            {closet.map(({clothing,quantity}) =>(
                <div key={clothing}>
                <Card variant="outlined" sx={{backgroundColor: '#333'}}>
            <Card color = '#fbf7f5' sx={{ maxWidth: 345, margin: '0 auto', borderRadius: 5}}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: .25 }}>
                <Typography variant="h5" component="div" color='#333' textAlign = {'center'}> {clothing.charAt(0).toUpperCase()+ clothing.slice(1)} </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign = {'center'}> Quantity: {quantity} </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                <Button variant = 'contained' onClick = {() => {removeItem(clothing)}}>Remove
                  </Button>
                  </CardActions>
                
            </Card>
            </Card>
            </div>
            ))}

        </Box>
        </ThemeProvider>
    )
}