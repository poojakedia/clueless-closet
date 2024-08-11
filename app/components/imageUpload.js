import * as React from 'react'
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
import { firestore } from '@/firebase';


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
            <input type="file" id="image" name="image" onChange={handleImageChange}/>
        </div>
    )
}