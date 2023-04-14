// eslint-disable-next-line react/jsx-sort-props
/* eslint-disable react/jsx-sort-props */
import React, { useState, useRef } from 'react';
import { Box, Button, Center, Heading, Input, Text } from '@chakra-ui/react';
import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

const Upload = () => {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cid, setCid] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    if (!file) {
      return;
    }

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    try {
      setLoading(true);
      const fileAdded = await ipfs.add(file);
      const cid = fileAdded.cid.toString();
      setCid(cid);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Box>
      <Heading textAlign="center" mb={4}>
        IPFS File Uploader
      </Heading>
      <Center>
        <Box
          borderRadius="lg"
          border={dragging ? '2px dashed blue' : '2px solid blue'}
          py={8}
          textAlign="center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          cursor="pointer"
          // eslint-disable-next-line react/jsx-sort-props
        >
          {loading ? (
            <Text>Uploading...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : cid ? (
            <>
              <Text color="green.500" mb={2}>
                Upload Successful!
              </Text>
              <Input value={cid} isReadOnly mb={2} />
              <Button onClick={() => navigator.clipboard.writeText(cid)}>
                Copy CID
              </Button>
            </>
          ) : (
            <Text>Drag and drop a file here or click to select a file</Text>
          )}
        </Box>
      </Center>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onDrop={handleDrop}
      />
    </Box>
  );
};

export default Upload;
