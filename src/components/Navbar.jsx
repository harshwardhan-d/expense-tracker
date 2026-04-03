// components/Navbar.jsx
import {
  Box,
  Flex,
  HStack,
  Text,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function Navbar({ activePage, setActivePage }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("teal.500", "gray.800");
  const color = useColorModeValue("white", "white");
  const { isOpen, onToggle } = useDisclosure();
  const activeLinkBg = useColorModeValue("teal.600", "gray.600");

  const handleNav = (page) => {
    setActivePage(page);
    onToggle(); // closes menu after clicking a link on mobile
  };

  return (
    <Box bg={bg} px={6} py={4} boxShadow="sm">
      {/* Main row */}
      <Flex align="center">
        {/* Logo */}
        <Text fontSize="xl" fontWeight="bold" color={color}>
          💰 SpendSmart
        </Text>

        {/* Desktop Links — hidden on mobile */}
        <HStack spacing={6} ml={10} display={{ base: "none", md: "flex" }}>
          <Link
            bg={activePage === "dashboard" ? activeLinkBg : "transparent"}
            color={color}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </Link>
          <Link
            bg={activePage === "transactions" ? activeLinkBg : "transparent"}
            color={color}
            onClick={() => setActivePage("transactions")}
          >
            Transactions
          </Link>
          <Link
            bg={activePage === "budget" ? activeLinkBg : "transparent"}
            color={color}
            onClick={() => setActivePage("budget")}
          >
            Budget
          </Link>
        </HStack>

        {/* Right side */}
        <HStack ml="auto" spacing={2}>
          {/* Dark mode toggle */}
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            color={color}
            _hover={{ bg: "teal.600" }}
          />

          {/* Hamburger — only visible on mobile */}
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            variant="ghost"
            color={color}
            _hover={{ bg: "teal.600" }}
            display={{ base: "flex", md: "none" }}
          />
        </HStack>
      </Flex>

      {/* Mobile Menu — shows when hamburger is clicked */}
      {isOpen && (
        <VStack
          display={{ base: "flex", md: "none" }}
          spacing={4}
          mt={4}
          align="start"
        >
          <Link color={color} onClick={() => handleNav("dashboard")}>
            Dashboard
          </Link>
          <Link color={color} onClick={() => handleNav("transactions")}>
            Transactions
          </Link>
          <Link color={color} onClick={() => handleNav("budget")}>
            Budget
          </Link>
        </VStack>
      )}
    </Box>
  );
}

export default Navbar;
