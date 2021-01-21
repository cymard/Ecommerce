import React, {useEffect} from 'react';
import axios from 'axios';


function AdminAuth () {
    useEffect(()=>{
        axios.get('https://127.0.0.1:8000/admin/login')
        .then(function (response){
            // handle success
            console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    },[])
    return <></>
}

export default AdminAuth;