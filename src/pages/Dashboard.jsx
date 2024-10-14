import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, SimpleGrid, Card, CardBody, Image, Button } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [packages, setPackages] = useState([]);
    useEffect(() => {
    fetchPackages()
}, []);

    const fetchPackages = async () => {
    const { data, error } = await supabase
        .from('packages')
        .select('*');

    if (error) console.error('Error fetching packages:', error);
    else setPackages(data);
    };

    const handleOrder = (pkg) => {
    // Implementasikan logika pemesanan
    alert(`Anda telah memesan paket: ${pkg.name}`);
    };

    return (
    <>
    <Navbar />
    <Box p={5}>
        <Heading mb={5}>Paket Umroh Tersedia</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {packages.map(pkg => (
            <Card key={pkg.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={pkg.image_url} alt={pkg.name} />

            <CardBody>
                <Heading size="md">{pkg.name}</Heading>
                <Text mt={2}>Harga: Rp {pkg.price.toLocaleString()}</Text>
                <Text>Durasi: {pkg.duration} Hari</Text>
                <Button mt={4} colorScheme="teal" onClick={() => handleOrder(pkg)}>
                Pesan Sekarang
                </Button>
            </CardBody>
            </Card>
        ))}
        </SimpleGrid>
    </Box>
    </>
)};

export default Dashboard;
