import {
  Box,
  Heading,
  Text,
  Stack,
  Container,
  SimpleGrid,
  Tag,
  HStack,
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishDate: string;
  tags: string[];
}

const Blog: NextPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { tag } = router.query;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/blog');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback data in case API is not available
        setPosts([
          {
            id: '1',
            title: 'Getting Started with Golang',
            summary: 'A beginner\'s guide to Golang programming',
            content: 'This is a placeholder for the blog content...',
            publishDate: '2023-05-01',
            tags: ['golang', 'programming', 'tutorial'],
          },
          {
            id: '2',
            title: 'Next.js and Chakra UI: A Perfect Combination',
            summary: 'How to build beautiful UIs with Next.js and Chakra UI',
            content: 'This is a placeholder for the blog content...',
            publishDate: '2023-05-15',
            tags: ['nextjs', 'chakraui', 'frontend', 'tutorial'],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term and tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchTerm
      ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;

    const matchesTag = tag
      ? post.tags.some((t) => t.toLowerCase() === tag.toString().toLowerCase())
      : true;

    return matchesSearch && matchesTag;
  });

  return (
    <>
      <Head>
        <title>Blog | My Portfolio</title>
        <meta name="description" content="Read my latest blog posts about programming and technology" />
      </Head>

      <Container maxW="container.xl" py={10}>
        <Stack spacing={8}>
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              Blog
            </Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              Thoughts, tutorials, and insights about programming and technology
            </Text>
          </Box>

          <Box>
            <InputGroup mb={6}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search posts by title, summary, or tags"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            {tag && (
              <HStack mb={6}>
                <Text>Filtered by tag:</Text>
                <Tag colorScheme="blue" size="md">
                  {tag}
                </Tag>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push('/blog')}
                >
                  Clear filter
                </Button>
              </HStack>
            )}
          </Box>

          {loading ? (
            <Text>Loading posts...</Text>
          ) : filteredPosts.length === 0 ? (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg">No posts found matching your criteria.</Text>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </>
  );
};

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <NextLink href={`/blog/${post.id}`} passHref>
      <Box
        as="a"
        display="block"
        p={6}
        rounded="lg"
        shadow="md"
        bg={useColorModeValue('white', 'gray.700')}
        _hover={{ shadow: 'lg', transform: 'translateY(-5px)', transition: 'all 0.3s ease' }}
      >
        <Stack spacing={3}>
          <HStack spacing={2}>
            {post.tags.slice(0, 3).map((tag) => (
              <Tag
                key={tag}
                size="sm"
                colorScheme="blue"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/blog?tag=${tag}`;
                }}
              >
                {tag}
              </Tag>
            ))}
          </HStack>
          <Heading as="h3" size="md">
            {post.title}
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>{post.summary}</Text>
          <Flex mt={4} align="center">
            <Avatar size="sm" src="https://via.placeholder.com/150" mr={2} />
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              Vincent • {formattedDate}
            </Text>
          </Flex>
        </Stack>
      </Box>
    </NextLink>
  );
};

export default Blog;