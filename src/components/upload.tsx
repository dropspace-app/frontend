import { useState, useRef } from 'react';
import { create } from 'ipfs-http-client';
import {
  Box,
  Center,
  Button,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

const Upload = () => {
  const [cid, setCid] = useState('');
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = async event => {
    event.preventDefault();
    setDragging(false);

    const files = event.dataTransfer.files;
    const file = files[0];

    try {
      setLoading(true);
      const fileAdded = await ipfs.add(file);
      const cid = fileAdded.cid.toString();
      setCid(cid);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleDragOver = event => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileInput = async event => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      try {
        setLoading(true);
        const fileAdded = await ipfs.add(file);
        const cid = fileAdded.cid.toString();
        setCid(cid);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      p={10}
      mt={10}
      bg="gray.800"
      borderRadius="lg"
      textAlign="center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      w={{ base: '100%', md: '100%', lg: '100%' }}
      m="auto"
      opacity={cid ? '0.7' : '1'}
      cursor="pointer"
      role="button"
      tabIndex="0"
      aria-label="Click or drag and drop to upload a file"
    >
      <Center mb={4}>
        <Heading size="md">Upload a File to IPFS</Heading>
      </Center>

      <Box mb={4}>
        <Input
          type="file"
          id="file-input"
          onChange={handleFileInput}
          display="none"
          ref={fileInputRef}
        />
        <Button
          colorScheme="purple"
          onClick={handleButtonClick}
          isDisabled={loading}
        >
          {loading ? 'Uploading...' : 'Choose File'}
        </Button>
      </Box>

      {cid && (
        <Box mb={4}>
          <Text fontWeight="bold" mb={2}>
            CID:
          </Text>
          <Input value={cid} isReadOnly />
        </Box>
      )}

      {error && <Text color="red.500">{error}</Text>}

      <Center mt={4}>
        <Box
          colorScheme="blue"
          isDisabled={dragging}
          border={dragging ? '2px dashed blue' : '2px solid blue'}
          borderRadius="lg"
          py={8}
          textAlign="center"
        >
          {cid ? 'Upload Another' : 'Upload'}
        </Box>
      </Center>
    </Box>
  );
};

export default Upload;
