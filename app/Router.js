import React from 'react'

import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './providers/auth';


export default function Router(props){
    return(
        <AuthProvider>
            <NavigationContainer>
            </NavigationContainer>
        </AuthProvider>
    )
}