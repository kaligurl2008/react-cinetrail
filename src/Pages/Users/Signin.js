import React from 'react'
import { Link } from 'react-router-dom'
import './Sign.css'


function Signin() {

    //create state for form inputs
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSignin = ()=>{

    }

  return (
    <div>
        <form className='signin-form' onSubmit={handleSignin}>
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
            
            <div className='button-container'>
                <button type='reset' className='cancel-btn'>Cancel</button>
                <button type="submit" className='sign-btn'>Sign Up</button>
            </div>
            <p className='sign-message'>Don't have an account? &nbsp;
                <Link to='/signup' className='red-text'>Signup</Link></p>
        </form>
    </div>
  )
}

export default Signin