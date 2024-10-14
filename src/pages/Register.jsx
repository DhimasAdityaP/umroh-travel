// src/pages/Register.jsx
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Alert,
  AlertIcon,
  Checkbox,
} from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(''); // Reset error message sebelum proses

    // Validasi email dan password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email tidak valid');
      return;
    }

    if (password.length < 6) {
      setError('Password harus minimal 6 karakter');
      return;
    }

    try {
      // Mendaftar pengguna menggunakan Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Simpan informasi pengguna ke tabel users
      const { error: dbError } = await supabase
        .from('users')
        .insert([{ email, is_admin: isAdmin }]); // Hanya menyimpan email dan status admin

      if (dbError) {
        console.error("Error inserting user:", dbError);
        setError(dbError.message);
      } else {
        alert('Registrasi berhasil! Silakan login.');
        navigate('/login');
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError('Terjadi kesalahan, silakan coba lagi.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading mb={6} textAlign="center">Register</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Stack spacing={4}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </FormControl>
        <FormControl id="isAdmin">
          <Checkbox 
            isChecked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          >
            Daftarkan sebagai Admin
          </Checkbox>
        </FormControl>
        <Button colorScheme="teal" onClick={handleRegister}>
          Register
        </Button>
      </Stack>
    </Box>
  );
};

export default Register;
