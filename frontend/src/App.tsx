import { Box, Button, Container, HStack } from '@chakra-ui/react';
import { ChatView } from './views/ChatView';
import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <div className="p-4">Página inicial</div>;
}


function App() {
  return (

    <Box>
      {/* Menu fixo no topo */}
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="gray.900"
        zIndex="1000"
        boxShadow="sm"
        padding={4}
      >

        <HStack
          justifySelf={"center"}
        >
          <Link to="/">
            <Button colorPalette="green" variant="solid">
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button colorPalette="green" variant="solid">
              chat
            </Button>
          </Link>
        </HStack>

        <Box paddingTop="80px">
          <Container maxW="container.md">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<ChatView />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
