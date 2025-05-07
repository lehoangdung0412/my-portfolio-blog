import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Tag,
  HStack,
  Avatar,
  Flex,
  Divider,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
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

const BlogPostPage: NextPage = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`/api/blog/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        // Fallback data in case API is not available
        setPost({
          id: id as string,
          title: 'Getting Started with Golang',
          summary: 'A beginner\'s guide to Golang programming',
          content: `
# Getting Started with Golang

Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.

## Why Go?

Go was designed at Google to solve problems with existing languages and tools while natively taking advantage of modern hardware architectures. It has gone on to become one of the fastest-growing languages in the industry.

Some key features of Go include:

- **Simplicity**: Go is designed to be simple to read, write, and maintain.
- **Efficiency**: Go compiles to machine code and has a lightweight runtime.
- **Concurrency**: Go has built-in concurrency with goroutines and channels.
- **Strong Standard Library**: Go comes with a rich standard library.

## Setting Up Your Environment

To get started with Go, you'll need to:

1. Download and install Go from [golang.org](https://golang.org)
2. Set up your GOPATH environment variable
3. Create a workspace directory structure

## Your First Go Program

Here's a simple "Hello, World!" program in Go:

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

Save this to a file named \`hello.go\` and run it with:

\`\`\`
go run hello.go
\`\`\`

## Next Steps

Now that you've written your first Go program, you can explore more advanced topics like:

- Functions and methods
- Structs and interfaces
- Error handling
- Concurrency with goroutines and channels
- Testing and benchmarking

Happy coding!
          `,
          publishDate: '2023-05-01',
          tags: ['golang', 'programming', 'tutorial'],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Function to convert markdown-like content to HTML
  const formatContent = (content: string) => {
    // This is a very simple implementation
    // In a real app, you'd use a proper markdown parser like 'marked'
    let formattedContent = content
      // Convert headers
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // Convert bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Convert code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Convert inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Convert lists
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      // Convert paragraphs (any line that doesn't start with a special character)
      .replace(/^(?!<[h|p|u|o|l]|$)(.*$)/gm, '<p>$1</p>')
      // Convert links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    return formattedContent;
  };

  return (
    <>
      <Head>
        <title>{post?.title || 'Blog Post'} | My Portfolio</title>
        <meta name="description" content={post?.summary || 'Blog post'} />
      </Head>

      <Container maxW="container.md" py={10}>
        <NextLink href="/blog" passHref>
          <Button leftIcon={<ArrowBackIcon />} mb={8} variant="ghost">
            Back to Blog
          </Button>
        </NextLink>

        {loading ? (
          <Text>Loading post...</Text>
        ) : post ? (
          <Stack spacing={8}>
            <Box>
              <Heading as="h1" size="2xl" mb={4}>
                {post.title}
              </Heading>
              <HStack spacing={2} mb={4}>
                {post.tags.map((tag) => (
                  <Tag key={tag} colorScheme="blue" size="md">
                    {tag}
                  </Tag>
                ))}
              </HStack>
              <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} mb={6}>
                {post.summary}
              </Text>
              <Flex align="center" mb={8}>
                <Avatar size="md" src="https://via.placeholder.com/150" mr={4} />
                <Box>
                  <Text fontWeight="bold">Vincent</Text>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    {formatDate(post.publishDate)} · 5 min read
                  </Text>
                </Box>
              </Flex>
              <Divider mb={8} />
            </Box>

            <Box
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              sx={{
                'h1': {
                  fontSize: '2xl',
                  fontWeight: 'bold',
                  my: 4,
                },
                'h2': {
                  fontSize: 'xl',
                  fontWeight: 'bold',
                  my: 3,
                },
                'h3': {
                  fontSize: 'lg',
                  fontWeight: 'bold',
                  my: 2,
                },
                'p': {
                  my: 2,
                },
                'ul, ol': {
                  ml: 6,
                  my: 2,
                },
                'li': {
                  ml: 4,
                },
                'code': {
                  bg: useColorModeValue('gray.100', 'gray.700'),
                  p: 1,
                  borderRadius: 'md',
                  fontFamily: 'monospace',
                },
                'pre': {
                  bg: useColorModeValue('gray.100', 'gray.700'),
                  p: 4,
                  borderRadius: 'md',
                  my: 4,
                  overflow: 'auto',
                },
                'pre code': {
                  bg: 'transparent',
                  p: 0,
                },
                'a': {
                  color: 'blue.500',
                  textDecoration: 'underline',
                },
                'strong': {
                  fontWeight: 'bold',
                },
                'em': {
                  fontStyle: 'italic',
                },
              }}
            />
          </Stack>
        ) : (
          <Box textAlign="center" py={10}>
            <Heading as="h2" size="xl" mb={4}>
              Post Not Found
            </Heading>
            <Text>The blog post you're looking for doesn't exist or has been removed.</Text>
          </Box>
        )}
      </Container>
    </>
  );
};

export default BlogPostPage;