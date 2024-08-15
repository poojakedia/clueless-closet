'use client'
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import { Box,Stack, Typography, Button, Modal, TextField, createTheme, ThemeProvider} from '@mui/material'
import { firestore } from '@/firebase'
import { ImageUpload } from '../app/components/imageUpload'
import {
  collection,
  doc,
  getDocs,
  query,
  deleteDoc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column', 
  gap: 3
}
import Closet from '../app/components/closet'
import getLPTheme from '../app/design/theme'

import { auth } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { Router } from 'next/router'


export default function Home(){
  const uid = auth.currentUser?.uid;
  const theme = createTheme(getLPTheme())
  const [open, setOpen] = useState(false)
  const [clothing, setClothing] = useState('')
  const [closet, setCloset] = useState([])

  const router = useRouter();

  const updateCloset = async () =>{
    const snapshot = query(collection(firestore, `users/${uid}/closet`))
    const docs = await getDocs(snapshot)
    const closetList = []
    docs.forEach(doc => {
      closetList.push({clothing: doc.id, ...doc.data()})
    })
    setCloset(closetList)
  }
    useEffect(()=>{
      updateCloset()
    },[])

  
  /* basically queries the closet collection in firestore and updates the local state
  which is our registry of items, the useEffect hook updates the closet inventory whenever the component
  mounts, meaning this block will run everytime the closet inventory is updated
  */

  const addItem = async({item}) => {
    if (!item || item.trim() === "") {
      console.error("Item is undefined or empty");
      return;
    }
    const docRef = doc(collection(firestore, `users/${uid}/closet`), item)
    console.log(docRef)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const { quantity } = docSnap.data()
        await updateDoc(docRef, { quantity: quantity + 1 })
        
      } else {
        await setDoc(docRef, {quantity: 1})
      }
    
        await updateCloset(); // after creating update your local state by fetching the new dat from Firestore
  }
  const removeItem = async(item) => {
    const docRef = doc(collection(firestore, `users/${uid}/closet`), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const { quantity } = docSnap.data()
      if(quantity === 1) {
        await deleteDoc(docRef)// deletes the item from the closet if the quantity is 1
      } else{
        await setDoc(docRef, { quantity: quantity - 1})// decrements the item by 1 if there are multiple
      }
    }
      await updateCloset();
    }

  /*manage the modal state- determining whether a component is visible or hidden*/
  const handleOpen = () => {
    setOpen(true)
    }
  const handleClose = () =>{
    setOpen(false)
  }
  const handleSignOut = ()=>{
    signOut(auth).then(()=>{
      router.push('/login');
    }).catch((error)=>{
      console.log(error)
    })
  }

  return(
    <ThemeProvider theme={theme}>
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
      height: '100vh', gap: 2, height: '100vw', width: '100wv', backgroundColor: '#333', overflowY: 'hidden'}}>
        <Box sx={{display: 'flex', justifyContent:'flex-start', width: '100%', marginBottom: 2}}>
        <Typography variant="h1" color="#ffff">Clueless Closet</Typography>
        <Box component={"img"} sx={{
          width: 50,
          marginLeft: 1
        }}
        src='/assets/hanger.png'/>
        <Button onClick={handleSignOut}> Sign Out </Button>
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
            <Stack width = '100%' direction = {'row'} spacing = {2}>
            <TextField id="outlined-basic" label = "Item" variant = "outlined" fullWidth value = {clothing} onChange ={(e) => setClothing(e.target.value)}
            />
            <Button sx={{backgroundColor: '#dfc28a !important',
    '&:hover': {
      backgroundColor: '#bfa268 !important', 
    },
    '&:active': {
      backgroundColor: '#9f8a48 !important'}}}
            onClick = {() => {addItem({ item: clothing})
              setClothing('')
              handleClose()
            }}>
              Add
            </Button>

            </Stack>
          </Box>

        </Modal>
        <Button variant = 'contained' onClick = {handleOpen}>Add Item</Button>
        <ImageUpload addItem={addItem} />
        <Box border = {'1px solid #fbf7f5'} sx={{height: 800, overflowY: 'auto', borderRadius:5}}>
          <Box
          width='800px'
          height='100px'
          bgcolor = {'#dfc28a'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{borderRadius: 5}}
          marginBottom={1}
          
          >
            <Typography variant = 'h2' color = {'#333'} textAlign={'center'}>
              Your Closet
            </Typography>
          </Box>
          <Closet closet={closet} removeItem= {removeItem}/>
        </Box>
        
        
      
      </Box>
      </ThemeProvider>
  )
  }