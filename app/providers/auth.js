import React, {useMemo, useReducer, useContext} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, {initialState, LOGGED_IN, LOGGED_OUT} from "../../reducer";

// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const keys = [TOKEN_KEY, USER_KEY];

// CONTEXT ===================================
const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    // Get Auth state
    const getAuthState = async () => {
        try {
            //GET TOKEN && USER
            let token = await AsyncStorage.getItem(TOKEN_KEY);
            let data = await AsyncStorage.getItem(USER_KEY);
            data = JSON.parse(data);
            // console.debug("getAuthState",token)
            
            if (token !== null && data!== null) await handleLogin({token, data});
            else await handleLogout();

            return {token, data};
        } catch (error) {
            throw new Error(error)
        }
    };

    // Handle Login
    const handleLogin = async (data) => {
        try{
            let user = data.data;
            let token = data.token;
            let data_ = [[USER_KEY,JSON.stringify(user)],[TOKEN_KEY, token]];
            // console.log("handle_login",JSON.parse(data.token));
            // console.log("data_",data);
            await AsyncStorage.multiSet(data_);

            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            // console.debug("handle_login",user);
            // const userDispatch = !!(data.user) ? data.user : data.data;
            // console.log("data_login",data.data);
            // console.log(data.data)
            dispatch({type: LOGGED_IN, user:data.data});
        }catch (error) {
            throw new Error(error);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try{
            //REMOVE DATA
            await AsyncStorage.multiRemove(keys);

            //AXIOS AUTHORIZATION HEADER
            delete axios.defaults.headers.common["Authorization"];

            //DISPATCH TO REDUCER
            dispatch({type: LOGGED_OUT});
        }catch (error) {
            throw new Error(error);
        }
    };

    // //UPDATE USER LOCAL STORAGE DATA AND DISPATCH TO REDUCER
    // const updateUser = async (user) => {
    //     try {
    //         await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    //         dispatch({type: LOGGED_IN, user}); //DISPATCH TO REDUCER
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // };

    const value = useMemo(() => {
        return {state, getAuthState, handleLogin, handleLogout};
    }, [state]);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth }
export default AuthProvider;