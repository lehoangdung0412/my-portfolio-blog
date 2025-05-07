import {
  Box,
  Container,
  Stack,
  Text,
  Heading,
  SimpleGrid,
  Avatar,
  Flex,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Icon,
} from '@chakra-ui/react';
import { CheckCircleIcon, CheckIcon, EmailIcon } from '@chakra-ui/icons';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProfileData {
  name: string;
  title: string;
  description: string;
  skills: string[];
  contact: {
    email: string;
    github: string;
    facebook: string;
  };
}

const About: NextPage = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Fallback data in case API is not available
        setProfile({
          name: 'Vincent',
          title: 'Full Stack Developer',
          description: 'Passionate developer with expertise in Golang, Next.js, and more.',
          skills: ['Golang', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Docker'],
          contact: {
            email: 'your.email@example.com',
            github: 'https://github.com/yourusername',
            facebook: 'https://www.facebook.com/le.hoangdung.37',
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.md" py={10}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>About Me | My Portfolio</title>
        <meta name="description" content="Learn more about me and my skills" />
      </Head>

      <Container maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Heading as="h1" size="xl">
              About Me
            </Heading>
            <Text
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="xl"
              fontWeight="bold"
            >
              {profile?.title}
            </Text>
            <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
              {profile?.description}
            </Text>

            <Box mt={8}>
              <Heading as="h2" size="md" mb={4}>
                My Skills
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                {profile?.skills.map((skill, index) => (
                  <List key={index} spacing={2}>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="brand.500" />
                      {skill}
                    </ListItem>
                  </List>
                ))}
              </SimpleGrid>
            </Box>

            <Box mt={8}>
              <Heading as="h2" size="md" mb={4}>
                Connect With Me
              </Heading>
              <Stack direction="row" spacing={4}>
                <Button
                  leftIcon={<Icon as={EmailIcon} />}
                  colorScheme="blue"
                  variant="outline"
                  as="a"
                  href={`mailto:${profile?.contact.email}`}
                >
                  Email
                </Button>
                <Button
                  leftIcon={<Icon as={FaGithub} />}
                  colorScheme="blue"
                  variant="outline"
                  as="a"
                  href={profile?.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Button>
                <Button
                    leftIcon={<Icon as={FaFacebook} />}
                    colorScheme="blue"
                    variant="outline"
                    as="a"
                    href={profile?.contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  Facebook
                </Button>
              </Stack>
            </Box>
          </Stack>

          <Flex
            justify="center"
            align="center"
            direction="column"
            bg={useColorModeValue('gray.50', 'gray.800')}
            p={10}
            borderRadius="lg"
          >
            <Avatar
              size="2xl"
              src="https://via.placeholder.com/300"
              mb={6}
              border="4px solid"
              borderColor="brand.500"
            />
            <VStack spacing={2} textAlign="center">
              <Heading as="h2" size="xl">
                {profile?.name}
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                {profile?.title}
              </Text>
            </VStack>

            <Box mt={10} w="full">
              <Heading as="h3" size="sm" mb={4} textAlign="center">
                Professional Summary
              </Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckIcon} color="brand.500" />
                  Over 5 years of experience in web development
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="brand.500" />
                  Specialized in building scalable applications
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="brand.500" />
                  Passionate about clean code and best practices
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="brand.500" />
                  Continuous learner and technology enthusiast
                </ListItem>
              </List>
            </Box>
          </Flex>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default About;