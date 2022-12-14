import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import './Sign.css'


function Signup() {


    const baseUrl = "https://cinetrail-server.herokuapp.com";
    //create state for form inputs
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [success, setSuccess] = React.useState(false)

    const handleSignup = (e)=>{
        e.preventDefault();
        console.log(email, password, username);
        //make api call to create new user
        axios.post(`${baseUrl}/user/signup`, {email, password, username})
        .then(res=>{
            console.log(res.data)
            //status 409 means user already exists
            if (res.data.status === 409) {
                alert("email already exists")
            }
            else{
                //all good
                setSuccess(false);
                //clear the text boxes
                setEmail('')
                setPassword('')
                setUsername('')
            }
        })
        .catch(err => console.log(err))
    }


  return (
    <div className='sign-container'>
        <form className='signup-form' onSubmit={handleSignup}>
            <div className='title-container'>
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
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
            <div className='input-wrapper'>
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='Enter username'
                    onChange={(e)=>setUsername(e.target.value)}
                        id='username' value = {username} required />
            </div>
            <div className='button-container'>
                <button type='reset' className='cancel-btn'>Cancel</button>
                <button type="submit" className='sign-btn'>Sign Up</button>
            </div>
            {
                success ?
                <p>You are signed up successfully</p>
                :
                <p className='signin-message'>Already have an account? &nbsp;
                <Link to={'/signin'} className='red-text'>Signin</Link></p>
            }
        </form>
    </div>
  )
}

export default Signup