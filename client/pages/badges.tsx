import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Badge as ChakraBadge,
  useColorModeValue,
  Circle,
  Tooltip,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Badge {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  description: string;
  imageUrl: string;
}

const BadgesPage: NextPage = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get('/api/badges');
        setBadges(response.data);
      } catch (error) {
        console.error('Error fetching badges:', error);
        // Fallback data in case API is not available
        setBadges([
          {
            id: '1',
            name: 'Hacktoberfest 2022',
            issuer: 'DigitalOcean',
            issueDate: '2022-10-31',
            description: 'Participated in Hacktoberfest 2022',
            imageUrl: 'https://via.placeholder.com/150?text=Hacktoberfest',
          },
          {
            id: '2',
            name: 'Google Cloud Certified',
            issuer: 'Google',
            issueDate: '2023-02-15',
            description: 'Certified in Google Cloud Platform',
            imageUrl: 'https://via.placeholder.com/150?text=GCP',
          },
          {
            id: '3',
            name: 'GitHub Star',
            issuer: 'GitHub',
            issueDate: '2022-12-10',
            description: 'Recognized as a GitHub Star for contributions to open source',
            imageUrl: 'https://via.placeholder.com/150?text=GitHub+Star',
          },
          {
            id: '4',
            name: 'Stack Overflow Gold Badge',
            issuer: 'Stack Overflow',
            issueDate: '2023-01-20',
            description: 'Earned gold badge for Golang tag on Stack Overflow',
            imageUrl: 'https://via.placeholder.com/150?text=SO+Gold',
          },
          {
            id: '5',
            name: 'Docker Captain',
            issuer: 'Docker',
            issueDate: '2022-09-15',
            description: 'Selected as Docker Captain for expertise in containerization',
            imageUrl: 'https://via.placeholder.com/150?text=Docker+Captain',
          },
          {
            id: '6',
            name: 'AWS Community Builder',
            issuer: 'Amazon Web Services',
            issueDate: '2023-03-01',
            description: 'Recognized as an AWS Community Builder',
            imageUrl: 'https://via.placeholder.com/150?text=AWS+Community',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <>
      <Head>
        <title>Badges | My Portfolio</title>
        <meta name="description" content="My earned badges and achievements" />
      </Head>

      <Container maxW="container.xl" py={10}>
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="2xl" mb={4}>
            Badges & Achievements
          </Heading>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
            Recognition and accomplishments from the tech community
          </Text>
        </Box>

        {loading ? (
          <Text textAlign="center">Loading badges...</Text>
        ) : (
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={10} justifyItems="center">
            {badges.map((badge) => (
              <Tooltip
                key={badge.id}
                label={`${badge.name} - ${badge.description}`}
                placement="top"
                hasArrow
              >
                <Box textAlign="center">
                  <Circle
                    size="150px"
                    borderWidth="2px"
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    overflow="hidden"
                    bg={useColorModeValue('white', 'gray.700')}
                    mb={3}
                    transition="transform 0.3s, box-shadow 0.3s"
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow: 'lg',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={badge.imageUrl}
                      alt={badge.name}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Circle>
                  <Stack spacing={1}>
                    <Heading as="h3" size="sm" noOfLines={1}>
                      {badge.name}
                    </Heading>
                    <Text fontSize="sm" color="brand.500" fontWeight="bold" noOfLines={1}>
                      {badge.issuer}
                    </Text>
                    <ChakraBadge alignSelf="center" colorScheme="blue" fontSize="xs">
                      {formatDate(badge.issueDate)}
                    </ChakraBadge>
                  </Stack>
                </Box>
              </Tooltip>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </>
  );
};

export default BadgesPage;