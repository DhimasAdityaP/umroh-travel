import React from 'react';
import { Box, Flex, Spacer, Button, Heading } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Flex bg="teal.500" p={4} color="white" align="center">
      <Heading size="md">Travel Umroh</Heading>
      <Spacer />
      <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
};

export default Navbar;
