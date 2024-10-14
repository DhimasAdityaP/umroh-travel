import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        user_id,
        package_id,
        payment_status,
        created_at,
        packages (name, price)
      `)
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching orders:', error);
    else setOrders(data);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting order:', error);
    } else {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  return (
    <>
    <Navbar />
    <Box p={5}>
      <Heading mb={5}>Dashboard Admin</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>User ID</Th>
            <Th>Package</Th>
            <Th>Status Pembayaran</Th>
            <Th>Tanggal Pemesanan</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.user_id}</Td>
              <Td>{order.packages.name} - Rp {order.packages.price.toLocaleString()}</Td>
              <Td>{order.payment_status}</Td>
              <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
              <Td>
                {/* Implementasikan aksi edit jika diperlukan */}
                <IconButton 
                  aria-label="Delete Order" 
                  icon={<DeleteIcon />} 
                  colorScheme="red" 
                  onClick={() => handleDelete(order.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
    </>
  )}

export default AdminDashboard;
