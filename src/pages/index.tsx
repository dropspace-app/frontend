import MainLayout from '@/Layout/Main.layout';
import { Heading, Text, Link } from '@chakra-ui/react';
import Upload from './../components/upload';

const Home = () => {
  return (
    <MainLayout>
      <Heading size="4xl">Dropspace</Heading>
      <Text fontSize="lg" maxW="2xl" mt={4}>
        All in one storage solution for your Community!
      </Text>

      <Link _hover={{ textDecor: 'none' }} href="#" isExternal>
        <Upload />
      </Link>
    </MainLayout>
  );
};

export default Home;

{
  /* <Button
          _active={{
            bg: 'blackAlpha.800',
            transform: 'scale(0.95)',
          }}
          _hover={{ bg: 'blackAlpha.600' }}
          bg="blackAlpha.700"
          color="white"
          mt={4}
          rounded="full"
          shadow="lg"
          size="lg"
        >
          <Icon as={FiGithub} mr={2} />
          Star on GitHub
        </Button> */
}
