import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ReactNode } from 'react';
import NextLink from 'next/link';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={10}
        spacing={4}
        justify={'space-between'}
        align={'center'}
      >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} mb={4}>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              About
            </Text>
            <Link as={NextLink} href="/about">About Me</Link>
            <Link as={NextLink} href="/cv">CV</Link>
            <Link as={NextLink} href="/certificates">Certificates</Link>
            <Link as={NextLink} href="/badges">Badges</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Blog
            </Text>
            <Link as={NextLink} href="/blog">All Posts</Link>
            <Link as={NextLink} href="/blog?tag=golang">Golang</Link>
            <Link as={NextLink} href="/blog?tag=nextjs">Next.js</Link>
            <Link as={NextLink} href="/blog?tag=react">React</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Contact
            </Text>
            <Link href={'mailto:lehoangdung.hcmus@gmail.com'}>Email</Link>
            <Link href={'https://www.facebook.com/le.hoangdung.37'}>LinkedIn</Link>
            <Link href={'https://github.com/lehoangdung0412'}>GitHub</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Legal
            </Text>
            <Link as={NextLink} href="/privacy">Privacy Policy</Link>
            <Link as={NextLink} href="/terms">Terms of Service</Link>
          </Stack>
        </SimpleGrid>
        <Text>© {new Date().getFullYear()} Vincent. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'GitHub'} href={'https://github.com/lehoangdung0412'}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'LinkedIn'} href={'https://www.facebook.com/le.hoangdung.37'}>
            <FaLinkedin />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'https://www.instagram.com/hoangdung.nth'}>
            <FaInstagram />
          </SocialButton>
          {/*<SocialButton label={'YouTube'} href={'https://youtube.com/c/yourchannel'}>*/}
          {/*  <FaYoutube />*/}
          {/*</SocialButton>*/}
          {/*<SocialButton label={'LinkedIn'} href={'https://linkedin.com/in/dung-le-hoang-131aba160'}>*/}
          {/*  <FaLinkedin />*/}
          {/*</SocialButton>*/}
          {/*<SocialButton label={'Twitter'} href={'https://twitter.com/yourusername'}>*/}
          {/*  <FaTwitter />*/}
          {/*</SocialButton>*/}
        </Stack>
      </Container>
    </Box>
  );
}
