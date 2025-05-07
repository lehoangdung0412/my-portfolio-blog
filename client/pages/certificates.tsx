import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Badge,
  Flex,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  description: string;
  imageUrl: string;
}

const CertificatesPage: NextPage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('/api/certificates');
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        // Fallback data in case API is not available
        setCertificates([
          {
            id: '1',
            name: 'AWS Certified Developer',
            issuer: 'Amazon Web Services',
            issueDate: '2022-01-15',
            description: 'Certification for AWS cloud development',
            imageUrl: 'https://via.placeholder.com/300x200?text=AWS+Certificate',
          },
          {
            id: '2',
            name: 'Certified Kubernetes Administrator',
            issuer: 'Cloud Native Computing Foundation',
            issueDate: '2022-06-20',
            description: 'Certification for Kubernetes administration',
            imageUrl: 'https://via.placeholder.com/300x200?text=Kubernetes+Certificate',
          },
          {
            id: '3',
            name: 'Google Cloud Professional Developer',
            issuer: 'Google',
            issueDate: '2021-11-05',
            description: 'Professional certification for Google Cloud Platform development',
            imageUrl: 'https://via.placeholder.com/300x200?text=GCP+Certificate',
          },
          {
            id: '4',
            name: 'Microsoft Certified: Azure Developer Associate',
            issuer: 'Microsoft',
            issueDate: '2022-03-10',
            description: 'Certification for developing solutions on Microsoft Azure',
            imageUrl: 'https://via.placeholder.com/300x200?text=Azure+Certificate',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head>
        <title>Certificates | My Portfolio</title>
        <meta name="description" content="My professional certificates and qualifications" />
      </Head>

      <Container maxW="container.xl" py={10}>
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="2xl" mb={4}>
            Professional Certificates
          </Heading>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
            My professional qualifications and certifications
          </Text>
        </Box>

        {loading ? (
          <Text textAlign="center">Loading certificates...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {certificates.map((certificate) => (
              <LinkBox
                key={certificate.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg={useColorModeValue('white', 'gray.700')}
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'xl',
                }}
              >
                <Image
                  src={certificate.imageUrl}
                  alt={certificate.name}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
                <Box p={6}>
                  <Stack spacing={3}>
                    <Heading as="h3" size="md">
                      <LinkOverlay href={`#certificate-${certificate.id}`}>
                        {certificate.name}
                      </LinkOverlay>
                    </Heading>
                    <Flex justify="space-between" align="center">
                      <Text fontWeight="bold" color="brand.500">
                        {certificate.issuer}
                      </Text>
                      <Badge colorScheme="blue">
                        {formatDate(certificate.issueDate)}
                      </Badge>
                    </Flex>
                    <Text color={useColorModeValue('gray.600', 'gray.400')}>
                      {certificate.description}
                    </Text>
                  </Stack>
                </Box>
              </LinkBox>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </>
  );
};

export default CertificatesPage;