import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const Protected = (props) => {
    const history = useHistory();

    let Component = props.component;

    useEffect(() =>{
        if(!localStorage.getItem('token')){
            history.push("/login");
        }
    }, []);
    
    return(
        <>
            <Component />
        </>
    );
} 

export default Protected;