import React, { useState } from 'react';
import { Box, Heading, Input, Button, FormControl, FormLabel, Stack, Alert, AlertIcon } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
    });

    if (error) {
        setError(error.message);
    } else {
        if (user.user_metadata.is_admin) {
        navigate('/admin');
    } else {
        navigate('/dashboard');
    }
    }
};
return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
        <Heading mb={6} textAlign="center">Login</Heading>
        {error && (
        <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
        </Alert>
    )}
        <Stack spacing={4}>
        <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            />
        </FormControl>
        <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            />
        </FormControl>
        <Button colorScheme="teal" onClick={handleLogin}>
            Login
        </Button>
        </Stack>
    </Box>
    );
};

export default Login;
