import { Redirect } from 'react-router-dom';

const Logout = () => {
    if(localStorage.getItem("token") !== null){
        localStorage.removeItem('token');
        return <Redirect to="/home"/>
    }else{
        return <Redirect to="/home"/>
    }
}
export default Logout;