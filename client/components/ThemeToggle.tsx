import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      color={useColorModeValue('gray.600', 'white')}
      _hover={{
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    />
  );
};

export default ThemeToggle;