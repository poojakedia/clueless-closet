import { Camera } from "react-camera-pro";
import { Button, Stack, Box } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export function CameraComponent({ addItem }) {
    const [image, setImage] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const camera = useRef(null);

    useEffect(() => {
        if (camera.current) {
            setIsCameraReady(true);
        }
    }, []);

    const capture = async () => {
        if (!isCameraReady) {
            alert('Camera is not ready');
            return;
        }

        const src = camera.current.takePhoto();
        setImage(src);

        try {
            const response = await fetch('/api/vision', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: src }) 
            });

            const data = await response.json();
            const labels = data.labels;

            if (labels && labels.length > 0) {
                let itemName = labels.join(" "); 
                addItem({ item: itemName });
            } else {
                console.log("No labels generated");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const reset = ()=>{
        setImage(null);
    }

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                width: '300px', 
                height: '300px', 
            }}
        >
            {!image? (
                <Box 
                sx={{
                    width: '100%', 
                    height: '100%', 
                    transform: 'scale(0.75)', 
                    transformOrigin: 'top right',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 8,
                }}
            >
            <Stack sx={{flexDirection: 'column'
            }} spacing={2}>
             <Camera ref={camera} />
            
            <Button variant = 'contained' onClick={capture} sx={{ mt: 2 }}>Capture</Button>
            </Stack>
            </Box>):(
                <Box>
                    <Image src={image} alt="Captured image" width={200} height={200} />
                    <div>
                    <Button variant = 'contained' onClick={reset}> New Photo</Button>
                    </div>
                </Box>
            )}
        </Box>
    );
}
