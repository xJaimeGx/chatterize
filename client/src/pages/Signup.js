import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ 
    username: '', 
    email: '', 
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);



  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //using try/catch instead of promises to handle errors
    try {
      //execute addUser mutation and pass in data from the form
      const { data } = await addUser({
        variables: { ...formState }
      });
      
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='login-form'>
        <div className='card'>
          <h4 className='card-header login-header'>Join Chatterize!</h4>
          <div className='card-body'>
            <form className='login' onSubmit={handleFormSubmit}>
              <input
                className='field'
                placeholder='Username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='field'
                placeholder='Email Address'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='field'
                placeholder='Password (min. 8 characters)'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='login-btn submit' type='submit'>
                Sign Up
              </button>
            </form>

            {error && <div>Couldn't SignUp</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
