import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Container maxW="container.xl" flex="1" pt={20} pb={8}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
