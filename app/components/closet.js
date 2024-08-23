import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import {Button, Typography, Box} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'

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
            {closet.map(({clothing,quantity,image}) =>(
                <div key={clothing}>
                <Box sx={{ position: 'relative', textAlign: 'center', mb: 2 }}>
                <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: '#dfc28a',
                  position: 'absolute',
                  top: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                  '&:after': {
                    content: '""',
                    display: 'block',
                    width: 4,
                    height: 16,
                    backgroundColor: '#dfc28a',
                    position: 'absolute',
                    top: 24,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  },
                }}
              />
                    <Card variant="outlined" sx={{backgroundColor: '#333', overflow:'visible', paddingBottom:2}}>
                    <Card color = '#fbf7f5' sx={{ maxWidth: 345, margin: '0 auto', borderRadius: 5, overflow:'visible'}}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: .25 }}>
                    {image && <CardMedia component="img" image = {image}></CardMedia>}
                    <Typography variant="h5" component="div" color='#333' textAlign = {'center'}> {clothing.charAt(0).toUpperCase()+ clothing.slice(1)} </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign = {'center'}> Quantity: {quantity} </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Button variant = 'contained' onClick = {() => {removeItem(clothing)}}>Remove
                    </Button>

                    </CardActions>
                
                
                </Card>
                </Card>
            </Box>
            </div>
            ))}

        </Box>
        </ThemeProvider>
    )
}