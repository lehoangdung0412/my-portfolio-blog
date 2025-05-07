import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Badge,
  List,
  ListItem,
  ListIcon,
  Divider,
  useColorModeValue,
  Button,
  Icon,
  SimpleGrid,
  Avatar,
  HStack,
  VStack,
  Tag,
  TagLabel,
  Image,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { CheckCircleIcon, DownloadIcon, EmailIcon } from '@chakra-ui/icons';
import { FaGithub, FaLanguage, FaAward, FaCertificate, FaFacebook } from 'react-icons/fa';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  position: string;
  year: string;
  description: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Award {
  name: string;
  issuer: string;
  year: string;
  description: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  description: string;
  imageUrl: string;
}

interface Badge {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  description: string;
  imageUrl: string;
}

interface Contact {
  email: string;
  linkedin: string;
  github: string;
}

interface CV {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  contact: Contact;
  education: Education[];
  experience: Experience[];
  skills: string[];
  softSkills: string[];
  languages: Language[];
  awards: Award[];
  certificates: Certificate[];
  badges: Badge[];
  summary: string[];
}

const CVPage: NextPage = () => {
  const [cv, setCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await axios.get('/api/cv');
        setCV(response.data);
      } catch (error) {
        console.error('Error fetching CV data:', error);
        // Fallback data in case API is not available
        setCV({
          // Personal Information
          name: "Vincent",
          title: "Full Stack Developer",
          description: "Passionate developer with expertise in Golang, Next.js, and more.",
          imageUrl: "https://via.placeholder.com/300",

          // Contact Information
          contact: {
            email: "your.email@example.com",
            linkedin: "https://linkedin.com/in/yourprofile",
            github: "https://github.com/yourusername",
          },

          // Professional Information
          education: [
            {
              institution: 'University Name',
              degree: 'Bachelor of Science in Computer Science',
              year: '2015-2019',
            },
            {
              institution: 'Another University',
              degree: 'Master of Science in Software Engineering',
              year: '2019-2021',
            },
          ],
          experience: [
            {
              company: 'Company Name',
              position: 'Software Engineer',
              year: '2019-2022',
              description: 'Developed and maintained web applications using Golang and React.',
            },
            {
              company: 'Another Company',
              position: 'Senior Developer',
              year: '2022-Present',
              description: 'Leading a team of developers building microservices with Golang.',
            },
          ],
          skills: [
            'Golang', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Docker', 'Kubernetes',
          ],
          softSkills: [
            'Team Leadership', 'Communication', 'Problem Solving', 'Agile Methodologies', 'Project Management',
          ],
          languages: [
            {
              name: 'English',
              proficiency: 'Fluent',
            },
            {
              name: 'Vietnamese',
              proficiency: 'Native',
            },
            {
              name: 'French',
              proficiency: 'Intermediate',
            },
          ],
          awards: [
            {
              name: 'Best Developer Award',
              issuer: 'Tech Conference 2022',
              year: '2022',
              description: 'Recognized for outstanding contributions to open source projects',
            },
            {
              name: 'Innovation Prize',
              issuer: 'Hackathon 2021',
              year: '2021',
              description: 'First place in annual coding competition',
            },
          ],

          // Additional Information
          certificates: [
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
          ],
          badges: [
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
          ],

          // Professional Summary
          summary: [
            'Over 5 years of experience in web development',
            'Specialized in building scalable applications',
            'Passionate about clean code and best practices',
            'Continuous learner and technology enthusiast',
          ],
        });
      } finally {
        // Sort education and experience to show most recent first
        if (setCV) {
          setCV(prevCV => {
            if (!prevCV) return prevCV;

            // Helper function to sort by year in descending order (most recent first)
            const sortByYearDesc = (a: { year: string }, b: { year: string }) => {
              // Extract the end year if there's a range (e.g., "2015-2019" -> "2019")
              const getEndYear = (yearStr: string) => {
                const match = yearStr.match(/(\d{4})(?:-(\d{4}|Present))?/);
                return match ? (match[2] || match[1]) : yearStr;
              };

              const yearA = getEndYear(a.year);
              const yearB = getEndYear(b.year);

              // Handle "Present" as the most recent
              if (yearA === 'Present') return -1;
              if (yearB === 'Present') return 1;

              return parseInt(yearB) - parseInt(yearA);
            };

            return {
              ...prevCV,
              education: [...prevCV.education].sort(sortByYearDesc),
              experience: [...prevCV.experience].sort(sortByYearDesc),
            };
          });
        }
        setLoading(false);
      }
    };

    fetchCV();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.md" py={10}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  // Format date function
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
        <title>CV | My Portfolio</title>
        <meta name="description" content="My professional curriculum vitae" />
      </Head>

      <Container maxW="container.xl" py={10}>
        {/* Header with Download Button */}
        <Flex 
          justify="space-between" 
          align="center" 
          mb={8}
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading as="h1" size="xl">
            Curriculum Vitae
          </Heading>
          <Button
            leftIcon={<Icon as={DownloadIcon} />}
            colorScheme="blue"
            size="lg"
            as="a"
            href="/api/cv/download"
            download
            target="_blank"
            boxShadow="md"
            _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            Download CV
          </Button>
        </Flex>

        {/* Personal Information */}
        <Box
          p={8}
          bg={useColorModeValue('white', 'gray.700')}
          shadow="lg"
          rounded="xl"
          mb={8}
          borderWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Flex 
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={8}
          >
            <Avatar 
              size="2xl" 
              src={cv?.imageUrl} 
              name={cv?.name}
              border="4px solid"
              borderColor="brand.500"
            />
            <Box flex="1">
              <Heading as="h2" size="xl" mb={2}>
                {cv?.name}
              </Heading>
              <Text 
                fontSize="xl" 
                fontWeight="bold" 
                color={useColorModeValue('brand.600', 'brand.300')}
                mb={3}
              >
                {cv?.title}
              </Text>
              <Text fontSize="lg" mb={4}>
                {cv?.description}
              </Text>

              <HStack spacing={4} mt={2}>
                <Button
                  leftIcon={<EmailIcon />}
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                  as="a"
                  href={`mailto:${cv?.contact?.email}`}
                >
                  Email
                </Button>
                <Button
                  leftIcon={<Icon as={FaGithub} />}
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                  as="a"
                  href={cv?.contact?.github}
                  target="_blank"
                >
                  GitHub
                </Button>
                <Button
                    leftIcon={<Icon as={FaFacebook} />}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    as="a"
                    href={cv?.contact?.linkedin}
                    target="_blank"
                >
                  Facebook
                </Button>
              </HStack>
            </Box>
          </Flex>
        </Box>

        {/* Professional Summary */}
        <Box
          p={8}
          bg={useColorModeValue('white', 'gray.700')}
          shadow="md"
          rounded="lg"
          mb={8}
          borderWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Heading as="h2" size="lg" mb={6}>
            Professional Summary
          </Heading>
          <List spacing={3}>
            {cv?.summary?.map((item, index) => (
              <ListItem key={index}>
                <ListIcon as={CheckCircleIcon} color="brand.500" />
                {item}
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Skills Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
          {/* Technical Skills */}
          <Box
            p={8}
            bg={useColorModeValue('white', 'gray.700')}
            shadow="md"
            rounded="lg"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            height="100%"
          >
            <Heading as="h2" size="lg" mb={6}>
              Technical Skills
            </Heading>
            <Wrap spacing={3}>
              {cv?.skills?.map((skill, index) => (
                <WrapItem key={index}>
                  <Tag 
                    size="lg" 
                    colorScheme="blue" 
                    borderRadius="full"
                    py={2}
                    px={4}
                  >
                    <TagLabel>{skill}</TagLabel>
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>

          {/* Soft Skills */}
          <Box
            p={8}
            bg={useColorModeValue('white', 'gray.700')}
            shadow="md"
            rounded="lg"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            height="100%"
          >
            <Heading as="h2" size="lg" mb={6}>
              Soft Skills
            </Heading>
            <Wrap spacing={3}>
              {cv?.softSkills?.map((skill, index) => (
                <WrapItem key={index}>
                  <Tag 
                    size="lg" 
                    colorScheme="teal" 
                    borderRadius="full"
                    py={2}
                    px={4}
                  >
                    <TagLabel>{skill}</TagLabel>
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </SimpleGrid>

        {/* Professional Experience */}
        <Box
          p={8}
          bg={useColorModeValue('white', 'gray.700')}
          shadow="md"
          rounded="lg"
          mb={8}
          borderWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Heading as="h2" size="lg" mb={6}>
            Professional Experience
          </Heading>
          <Stack spacing={8}>
            {cv?.experience?.map((exp, index) => (
              <Box key={index}>
                <Flex 
                  justify="space-between" 
                  align={{ base: "flex-start", md: "center" }}
                  direction={{ base: "column", md: "row" }}
                  gap={{ base: 2, md: 0 }}
                >
                  <Box>
                    <Heading as="h3" size="md">
                      {exp.position}
                    </Heading>
                    <Text fontSize="lg" fontWeight="medium" mt={1}>
                      {exp.company}
                    </Text>
                  </Box>
                  <Badge 
                    colorScheme="blue" 
                    fontSize="md" 
                    p={2}
                    borderRadius="md"
                  >
                    {exp.year}
                  </Badge>
                </Flex>
                <Text mt={3}>{exp.description}</Text>
                {index < cv.experience.length - 1 && <Divider mt={6} />}
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Certificates */}
        <Box
            p={8}
            bg={useColorModeValue('white', 'gray.700')}
            shadow="md"
            rounded="lg"
            mb={8}
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Heading as="h2" size="lg" mb={6}>
            <Flex align="center">
              <Icon as={FaCertificate} mr={2} />
              Certificates
            </Flex>
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {cv?.certificates?.map((cert) => (
                <Box
                    key={cert.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    bg={useColorModeValue('white', 'gray.700')}
                    shadow="md"
                    transition="transform 0.3s, box-shadow 0.3s"
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'xl',
                    }}
                >
                  <Image
                      src={cert.imageUrl}
                      alt={cert.name}
                      height="150px"
                      width="100%"
                      objectFit="cover"
                  />
                  <Box p={4}>
                    <Heading as="h3" size="md" mb={2}>
                      {cert.name}
                    </Heading>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text fontWeight="bold" color="brand.500">
                        {cert.issuer}
                      </Text>
                      <Badge colorScheme="blue">
                        {formatDate(cert.issueDate)}
                      </Badge>
                    </Flex>
                    <Text color={useColorModeValue('gray.600', 'gray.400')} noOfLines={2}>
                      {cert.description}
                    </Text>
                  </Box>
                </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Badges */}
        <Box
            p={8}
            bg={useColorModeValue('white', 'gray.700')}
            shadow="md"
            rounded="lg"
            mb={8}
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Heading as="h2" size="lg" mb={6}>
            Badges & Achievements
          </Heading>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={6} justifyItems="center">
            {cv?.badges?.map((badge) => (
                <Box
                    key={badge.id}
                    textAlign="center"
                >
                  <Box
                      borderRadius="full"
                      borderWidth="2px"
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                      overflow="hidden"
                      width="120px"
                      height="120px"
                      mb={3}
                      mx="auto"
                      transition="transform 0.3s, box-shadow 0.3s"
                      _hover={{
                        transform: 'scale(1.05)',
                        boxShadow: 'lg',
                      }}
                  >
                    <Image
                        src={badge.imageUrl}
                        alt={badge.name}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                    />
                  </Box>
                  <Heading as="h3" size="sm" noOfLines={1} mb={1}>
                    {badge.name}
                  </Heading>
                  <Text fontSize="xs" color="brand.500" fontWeight="bold" noOfLines={1} mb={1}>
                    {badge.issuer}
                  </Text>
                  <Badge colorScheme="blue" fontSize="xs">
                    {formatDate(badge.issueDate)}
                  </Badge>
                </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Education */}
        <Box
          p={8}
          bg={useColorModeValue('white', 'gray.700')}
          shadow="md"
          rounded="lg"
          mb={8}
          borderWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Heading as="h2" size="lg" mb={6}>
            Education
          </Heading>
          <Stack spacing={6}>
            {cv?.education?.map((edu, index) => (
              <Box key={index}>
                <Flex 
                  justify="space-between" 
                  align={{ base: "flex-start", md: "center" }}
                  direction={{ base: "column", md: "row" }}
                  gap={{ base: 2, md: 0 }}
                >
                  <Box>
                    <Heading as="h3" size="md">
                      {edu.institution}
                    </Heading>
                    <Text fontSize="lg" fontWeight="medium" mt={1}>
                      {edu.degree}
                    </Text>
                  </Box>
                  <Badge 
                    colorScheme="green" 
                    fontSize="md" 
                    p={2}
                    borderRadius="md"
                  >
                    {edu.year}
                  </Badge>
                </Flex>
                {index < cv.education.length - 1 && <Divider mt={6} />}
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Languages and Awards Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
          {/* Languages */}
          <Box
            p={8}
            bg={useColorModeValue('white', 'gray.700')}
            shadow="md"
            rounded="lg"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            height="100%"
          >
            <Heading as="h2" size="lg" mb={6}>
              <Flex align="center">
                <Icon as={FaLanguage} mr={2} />
                Languages
              </Flex>
            </Heading>
            <VStack align="stretch" spacing={4}>
              {cv?.languages?.map((lang, index) => (
                <Flex 
                  key={index} 
                  justify="space-between" 
                  p={3}
                  borderBottom="1px"
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                >
                  <Text fontWeight="bold">{lang.name}</Text>
                  <Badge colorScheme="purple">{lang.proficiency}</Badge>
                </Flex>
              ))}
            </VStack>
          </Box>

          {/* Awards */}
          <Box
            p={8}
            bg={useColorModeValue('white', 'gray.700')}
            shadow="md"
            rounded="lg"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            height="100%"
          >
            <Heading as="h2" size="lg" mb={6}>
              <Flex align="center">
                <Icon as={FaAward} mr={2} />
                Awards & Recognitions
              </Flex>
            </Heading>
            <VStack align="stretch" spacing={4}>
              {cv?.awards?.map((award, index) => (
                <Box 
                  key={index} 
                  p={3}
                  borderLeft="4px"
                  borderColor="yellow.400"
                  bg={useColorModeValue('yellow.50', 'gray.600')}
                  borderRadius="md"
                >
                  <Flex justify="space-between" align="center" mb={1}>
                    <Heading as="h4" size="sm">{award.name}</Heading>
                    <Badge colorScheme="yellow">{award.year}</Badge>
                  </Flex>
                  <Text fontWeight="medium" fontSize="sm" mb={1}>{award.issuer}</Text>
                  <Text fontSize="sm">{award.description}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default CVPage;
