import { Box, Text, useColorModeValue, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

const Logo = () => {
  // Use different colors for light and dark mode
  const textColor = useColorModeValue('brand.600', 'brand.300');
  const bgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <Link
      as={NextLink}
      href="/"
      _hover={{ textDecoration: 'none' }}
    >
      <Box 
        display="flex" 
        alignItems="center" 
        bg={bgColor}
        p={2}
        borderRadius="md"
      >
        <Text
          fontFamily="heading"
          fontWeight="bold"
          fontSize="xl"
          color={textColor}
        >
          <Box as="span" color={useColorModeValue('gray.800', 'white')}>My</Box>
          <Box as="span" color={textColor}>Portfolio</Box>
        </Text>
      </Box>
    </Link>
  );
};

export default Logo;