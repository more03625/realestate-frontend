import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const LoggedInProtected = (props) => {
    const history = useHistory();

    let Component = props.component;

    useEffect(() =>{
        if(localStorage.getItem('token')){
            history.push("/home");
        }
    }, []);
    
    return(
        <>
            <Component />
        </>
    );
} 

export default LoggedInProtected;