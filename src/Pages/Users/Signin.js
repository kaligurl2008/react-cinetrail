import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext';
import './Sign.css'




function Signin() {

    const serverUrl=process.env.REACT_APP_SERVER_URL;

    //set up global state use CURLY BRACKETS here
    const {user, setUser, token, setToken} = React.useContext(UserContext);

    //activate Navigate
    let navigate = useNavigate();

    //create state for form inputs
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSignin = (e)=>{
        e.preventDefault();
        console.log(email, password)

        //make api call to login
        axios.post(`${serverUrl}/users/login`, {email, password})
        .then(res =>{
            console.log(res.data)
            //save user data and token
            setUser(res.data)
            setToken(res.data.token)
            //save values to local storage
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userInfo', JSON.stringify(res.data))
        })
        .catch(err => console.log(err))

        //navigate to homepage
        navigate('/')
    }

  return (
    <div className='sign-container'>
        <form className='signup-form' onSubmit={handleSignin}>
            <div className='title-container'>
                <h1>Sign In</h1>
                <p>Please fill in this form to sign in.</p>
            </div>
            <div className='input-wrapper'>
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='Enter email'
                    onChange={(e)=>setEmail(e.target.value)}
                        id='email' value = {email} required />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='pwd'>Password</label>
                <input type='password' placeholder='Enter password'
                    onChange={(e)=>setPassword(e.target.value)}
                        id='pwd' value = {password} required />
            </div>
            
            <div className='button-container'>
                <button type='reset' className='cancel-btn'>Cancel</button>
                <button type="submit" className='sign-btn'>Sign In</button>
            </div>
            <p className='sign-message'>Don't have an account? &nbsp;
                <Link to='/signup' className='red-text'>Signup</Link></p>
        </form>
    </div>
  )
}

export default Signin