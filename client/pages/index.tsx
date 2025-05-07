import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Flex,
  SimpleGrid,
  Avatar,
  Image,
} from '@chakra-ui/react';
import TypewriterText from '../components/TypewriterText';
import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Portfolio - Full Stack Developer</title>
        <meta name="description" content="Personal portfolio and blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        {/* Hero Section */}
        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 36 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={{ base: '110%', sm: '120%', md: '110%' }}
              minHeight={{ base: '87px', sm: '87px', md: '132px' }}
            >
              Hi, I'm<br />
              <TypewriterText
                  as={'span'}
                  color={'brand.500'}
                  texts={['Vincent', 'Full Stack Developer', 'AWS Developer', 'Creator']}
                  typingSpeed={120}
                  deletingSpeed={50}
              />
            </Heading>
            <Text color={useColorModeValue('gray.500', 'gray.400')}>
              Full Stack Developer specializing in Node.js, Python, Golang, Next.js, and React.
              I build modern web applications with a focus on performance, scalability, and user experience.
            </Text>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}
            >
              <NextLink href="/about" passHref>
                <Button
                  colorScheme={'blue'}
                  bg={'brand.500'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'brand.600',
                  }}
                >
                  About Me
                </Button>
              </NextLink>
              <NextLink href="/blog" passHref>
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                  Read My Blog
                </Button>
              </NextLink>
              <Box>
                <Icon
                  as={Arrow}
                  color={useColorModeValue('gray.800', 'gray.300')}
                  w={71}
                  position={'absolute'}
                  right={-71}
                  top={'10px'}
                />
                <Text
                  fontSize={'lg'}
                  fontFamily={'Caveat'}
                  position={'absolute'}
                  right={'-125px'}
                  top={'-15px'}
                  transform={'rotate(10deg)'}
                >
                  Learn more about me
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Container>

        {/* Featured Projects Section */}
        <Box py={12} bg={useColorModeValue('gray.50', 'gray.800')}>
          <Container maxW={'6xl'}>
            <Heading as="h2" size="xl" mb={8} textAlign="center">
              Featured Projects
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {[1, 2, 3].map((id) => (
                <Box
                  key={id}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  rounded={'md'}
                  p={6}
                  overflow={'hidden'}
                >
                  <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                    <Image
                      src={`https://via.placeholder.com/600x400?text=Project+${id}`}
                      fill="orange.500"
                      alt={`Project ${id}`}
                    />
                  </Box>
                  <Stack>
                    <Text
                      color={'brand.500'}
                      textTransform={'uppercase'}
                      fontWeight={800}
                      fontSize={'sm'}
                      letterSpacing={1.1}
                    >
                      {id === 1 ? 'Web App' : id === 2 ? 'Mobile App' : 'API'}
                    </Text>
                    <Heading
                      color={useColorModeValue('gray.700', 'white')}
                      fontSize={'2xl'}
                      fontFamily={'body'}
                    >
                      Project Title {id}
                    </Heading>
                    <Text color={useColorModeValue('gray.500', 'gray.400')}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                  </Stack>
                  <Button mt={4} colorScheme="blue" size="sm">
                    View Project
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Latest Blog Posts Section */}
        <Box py={12}>
          <Container maxW={'6xl'}>
            <Heading as="h2" size="xl" mb={8} textAlign="center">
              Latest Blog Posts
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {[1, 2].map((id) => (
                <Box
                  key={id}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'md'}
                  rounded={'md'}
                  p={6}
                  overflow={'hidden'}
                >
                  <Stack>
                    <Text
                      color={'brand.500'}
                      textTransform={'uppercase'}
                      fontWeight={800}
                      fontSize={'sm'}
                      letterSpacing={1.1}
                    >
                      {id === 1 ? 'Golang' : 'Next.js'}
                    </Text>
                    <Heading
                      color={useColorModeValue('gray.700', 'white')}
                      fontSize={'2xl'}
                      fontFamily={'body'}
                    >
                      Blog Post Title {id}
                    </Heading>
                    <Text color={useColorModeValue('gray.500', 'gray.400')}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                  </Stack>
                  <Flex mt={6} align={'center'}>
                    <Avatar src={'https://via.placeholder.com/150'} size="sm" />
                    <Stack ml={2}>
                      <Text fontWeight={600}>Vincent</Text>
                      <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize={'sm'}>
                        Feb 08, 2023 · 6min read
                      </Text>
                    </Stack>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
            <Flex justify="center" mt={8}>
              <NextLink href="/blog" passHref>
                <Button colorScheme="blue" variant="outline">
                  View All Posts
                </Button>
              </NextLink>
            </Flex>
          </Container>
        </Box>
      </Box>
    </>
  );
};

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

export default Home;
