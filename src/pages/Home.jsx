// src/pages/Home.jsx
import React from 'react';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Pastikan Navbar ditambahkan

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar /> {/* Menambahkan Navbar */}
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Selamat Datang di Travel Umroh Kami
        </Heading>
        <Text color={'gray.500'}>
          Kami menyediakan paket umroh terbaik dengan harga terjangkau dan layanan profesional.
        </Text>
        <Stack direction={'row'} spacing={4} justify={'center'} mt={6}>
          <Button
            colorScheme={'teal'}
            onClick={() => navigate('/packages')}
          >
            Lihat Paket
          </Button>
          <Button
            colorScheme={'blue'}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            variant={'outline'}
            colorScheme={'blue'}
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
