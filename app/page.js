'use client'

import {useState, useEffect} from 'react'
import { Box,Stack, Typography, Button, Modal, TextField} from '@mui/material'
import { firestore } from '@/firebase'

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

export default function Home(){
  const [open, setOpen] = useState(false)
  const [clothing, setClothing] = useState('')
  const [closet, setCloset] = useState([])

  const updateCloset = async () =>{
    const snapshot = query(collection(firestore, 'closet'))
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

  const addItem = async(item) => {
    const docRef = doc(collection(firestore, 'closet'), item)
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
    const docRef = doc(collection(firestore, 'closet'), item)
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

  return(
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', gap: 2, height: '100vw', width: '100wv'}}>
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
            <Button variant = 'outlined' 
            onClick = {() => {addItem(clothing)
              setClothing('')
              handleClose()
            }}>
              Add
            </Button>
            </Stack>
          </Box>

        </Modal>
        <Button variant = 'contained' onClick = {handleOpen}>Add Item</Button>
        <Box border = {'1px solid #333'}>
          <Box
          width='800px'
          height='100px'
          bgcolor = {'#ADD8E6'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          >
            <Typography variant = 'h2' color = {'#333'} textAlign={'center'}>
              Your Closet
            </Typography>
          </Box>
          <Stack width='800px' height='300px' spacing={2} overflow={'auto'}>
            {closet.map(({clothing, quantity}) => (
              <Box key = {clothing} display={'flex'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'#f0f0f0'} paddingX={5}>
                <Typography variant = 'h3' color='#333' textAlign = {'center'}>{clothing.charAt(0).toUpperCase()+ clothing.slice(1)}</Typography>
                <Typography variant = 'h3' color='#333' textAlign = {'center'}>Quantity: {quantity}</Typography>
                <Button variant = 'contained' onClick = {() => {removeItem(clothing)}}>Remove
                  </Button>
              </Box>
  ))}
          </Stack>
        </Box>
      <Typography variant="h2">Clueless Closet</Typography>
      </Box>
  )
  }