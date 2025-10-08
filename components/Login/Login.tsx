'use client';
import { useState } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Login.module.css';
import { loginUser } from '@/lib/user';
import { LoginType } from '@/types/components';

export default function Login(props: LoginType) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitLoginForm = async () => {
    setIsLoading(true);
    try {
      const res = await loginUser(email, password);
      props.checkAuth();
    } catch (err) {
      console.log('LOGIN ERROR!!!!!', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={[
        'flex-center',
        'flex-column',
        'flex-gap-20',
        classes.Login,
      ].join(' ')}
    >
      <Input
        labelText='Email'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        labelText='Password'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type='password'
      />
      <Button buttonText='LOGIN' type='Primary' onClick={submitLoginForm} />
      {isLoading && <Spinner />}
    </div>
  );
}
