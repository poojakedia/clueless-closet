import * as React from 'react'
import { Box, Button, Typography } from '@mui/material';


export function ImageUpload({addItem}){
    const handleImageChange = async(event) =>{
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = async()=>{
            console.log("File read");
            const base64 = reader.result;
            try{
                const response = await fetch('/api/vision', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({image: base64})
            });
            const data = await response.json();
            const labels = data.labels

            if(labels && labels.length>0){
                let itemName = "";
                for(let i=0; i<labels.length; i++){
                    itemName += labels[i] + " ";
                }
                const item = itemName;
                addItem(item);
            }else{
                console.log("No labels generated");
            }

            
            //load into firestore database
            
            console.log("data", data);
        } catch(error){
            console.log(error);
        }

        }
        reader.readAsDataURL(file);
    }
    return (
        <div>
            <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        border: '1px dashed #ccc',
        padding: 2,
        borderRadius: 2,
        width: '100%',
        maxWidth: 400,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" color="textSecondary">
        Upload Image to Closet
      </Typography>
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="image">
        <Button variant="contained" component="span">
          Choose File
        </Button>
      </label>

    </Box>
        </div>
    )
}