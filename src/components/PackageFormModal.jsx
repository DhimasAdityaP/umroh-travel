// src/components/PackageFormModal.jsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

const PackageFormModal = ({ isOpen, onClose, refreshPackages, existingPackage }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [facilities, setFacilities] = useState('');
  const [schedule, setSchedule] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (existingPackage) {
      setName(existingPackage.name);
      setPrice(existingPackage.price);
      setDuration(existingPackage.duration);
      setFacilities(existingPackage.facilities);
      setSchedule(existingPackage.schedule);
      setImageUrl(existingPackage.image_url);
    } else {
      // Reset form jika tidak ada paket yang ada
      setName('');
      setPrice('');
      setDuration('');
      setFacilities('');
      setSchedule('');
      setImageFile(null);
      setImageUrl('');
    }
  }, [existingPackage]);

  const handleSubmit = async () => {
    let uploadedImageUrl = imageUrl;

    if (imageFile) {
      // Upload gambar ke Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('package-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return;
      }

      // Mendapatkan URL publik gambar
      const { publicURL, error: urlError } = supabase.storage
        .from('package-images')
        .getPublicUrl(filePath);

      if (urlError) {
        console.error('Error getting public URL:', urlError);
        return;
      }

      uploadedImageUrl = publicURL;
    }

    if (existingPackage) {
      // Update paket yang ada
      const { data, error } = await supabase
        .from('packages')
        .update({
          name,
          price,
          duration,
          facilities,
          schedule,
          image_url: uploadedImageUrl,
        })
        .eq('id', existingPackage.id);

      if (error) {
        console.error('Error updating package:', error);
        return;
      }
    } else {
      // Menambah paket baru
      const { data, error } = await supabase
        .from('packages')
        .insert([
          {
            name,
            price,
            duration,
            facilities,
            schedule,
            image_url: uploadedImageUrl,
          },
        ]);

      if (error) {
        console.error('Error adding package:', error);
        return;
      }
    }

    refreshPackages();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{existingPackage ? 'Edit Paket Umroh' : 'Tambah Paket Umroh'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name" mb={4} isRequired>
            <FormLabel>Nama Paket</FormLabel>
            <Input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </FormControl>
          
          <FormControl id="price" mb={4} isRequired>
            <FormLabel>Harga (Rp)</FormLabel>
            <Input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
            />
          </FormControl>
          
          <FormControl id="duration" mb={4} isRequired>
            <FormLabel>Durasi (Hari)</FormLabel>
            <Input 
              type="number" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)} 
            />
          </FormControl>
          
          <FormControl id="facilities" mb={4}>
            <FormLabel>Fasilitas</FormLabel>
            <Textarea 
              value={facilities} 
              onChange={(e) => setFacilities(e.target.value)} 
            />
          </FormControl>
          
          <FormControl id="schedule" mb={4} isRequired>
            <FormLabel>Jadwal Keberangkatan</FormLabel>
            <Input 
              type="date" 
              value={schedule} 
              onChange={(e) => setSchedule(e.target.value)} 
            />
          </FormControl>
          
          <FormControl id="image" mb={4}>
            <FormLabel>Gambar Paket</FormLabel>
            <Input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files[0])} 
            />
            {imageUrl && (
              <Image src={imageUrl} alt="Package" boxSize="100px" mt={2} />
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            {existingPackage ? 'Update' : 'Tambah'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Batal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PackageFormModal;
