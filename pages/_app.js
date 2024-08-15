import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {auth} from '../firebase'

function App({Component, pageProps}){
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        const existingUser = auth.onAuthStateChanged(user => {
            /*if(user){
                router.push('/home');
            } else{
                router.push('/');
            }*/
           
            
        });

        return() => existingUser();
        }, [router]);
        return <Component {...pageProps} />;
}
export default App;