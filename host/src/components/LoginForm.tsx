import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { login } from '../redux/features/auth/authSlice';
import {
  Button,
  Input,
  Label,
  BusyIndicator,
  Title,
  FlexBox,
  FlexBoxDirection,
  FlexBoxAlignItems,
  FlexBoxJustifyContent,
  Card,
  MessageStrip
} from '@ui5/webcomponents-react';


export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loading, error } = useAppSelector((state) => state.auth);
  
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username && password) {
        dispatch(login({ username, password }));
    }
  };

  return (
    <FlexBox
      direction={FlexBoxDirection.Column}
      justifyContent={FlexBoxJustifyContent.Center}
      alignItems={FlexBoxAlignItems.Center}
      style={{ minHeight: '100vh', background: '#f5f6f7' }}
    >
      <Card
        header={<Title level="H4" style={{ padding: '1rem' }}>Login</Title>}
        style={{ width: '320px', padding: '1rem' }}
      >
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <Label for="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={username}
              onInput={(e: any) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="Password"
              placeholder="Enter password"
              value={password}
              onInput={(e: any) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button design="Emphasized" type="Submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Logging in…' : 'Login'}
          </Button>

          {error && <MessageStrip design='Negative'>{typeof error === 'string' ? error : error.message}</MessageStrip>}

        </form>

        {loading && (
          <BusyIndicator active size="M" style={{ marginTop: '1rem', width: '100%' }} />
        )}
      </Card>
    </FlexBox>
  );
};