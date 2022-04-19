import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase';
import './Login.css'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                navigate('/')
            })
            .catch(error => alert(error.message))
    }
    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // test authentication token
                console.log(auth);
                if(auth){
                    navigate('/')
                }
            })
            .catch(error => alert(error.message))

    }

  return (
    <div className='login'>
        <Link to='/'>
            <img className='login_logo' src={require('./images/amazon_logo_black.png')} />
        </Link>
        <div className='login_container'>
            <h1>Sign-in</h1>
            <form>
                <h5>Email</h5>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}></input>

                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>

                <button type='submit' className='login_signInButton' onClick={signIn}>Sign In</button>

                <p>
                    By signing in you agree to PADDY's AMAZON CLONE Conditions of use and Sale. Please see our Privace Notice, our Cookies Notice and out Interest-Based Ads Notice.
                </p>

                <button className='login_registerButton' onClick={register}>Create a New Account</button>
            </form>
        </div>
    </div>
  )
}

export default Login