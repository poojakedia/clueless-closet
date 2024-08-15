import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {auth} from '../firebase'

function App({Component, pageProps}){
    const router = useRouter();

    useEffect(() => {
        const existingUser = auth.onAuthStateChanged(user => {
            if(user){
                router.push('/');
            }
            else{
                router.push('/landing');
            }
        });

        return() => existingUser();
        }, [router]);
        return <Component {...pageProps} />;
}
export default App;