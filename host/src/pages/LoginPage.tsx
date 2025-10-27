import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { LoginForm } from '../components/LoginForm';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

return (
    <>
        <LoginForm/>
    </>
    );
};