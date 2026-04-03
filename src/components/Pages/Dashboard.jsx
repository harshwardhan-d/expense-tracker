// pages/Dashboard.jsx
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

const Dashboard = ({ transactions }) => {
  const cardBg = useColorModeValue("white", "gray.700");

  const balance = transactions.reduce((acc, t) => {
    if (t.type === "income") return acc + Number(t.amount);
    else return acc - Number(t.amount);
  }, 0);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  return (
    <Box px={6} py={8} maxW="1200px" mx="auto" w="100%">

      {/* Welcome */}
      <Box mb={8}>
        <Heading size="lg">Welcome Back! 👋</Heading>
        <Text color="gray.500" mt={1}>Here is your summary</Text>
      </Box>

      {/* 3 Cards */}
      <Flex gap={6} flexDirection={{ base: "column", md: "row" }} mb={8}>

        <Box flex={1} p={6} borderRadius="xl" boxShadow="md" bg={cardBg}>
          <Text color="gray.500" fontSize="sm">Total Balance</Text>
          <Text fontSize="2xl" fontWeight="bold" color={balance >= 0 ? "green.500" : "red.500"}>
            ₹{balance}
          </Text>
        </Box>

        <Box flex={1} p={6} borderRadius="xl" boxShadow="md" bg={cardBg}>
          <Text color="gray.500" fontSize="sm">Total Income</Text>
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            ₹{income}
          </Text>
        </Box>

        <Box flex={1} p={6} borderRadius="xl" boxShadow="md" bg={cardBg}>
          <Text color="gray.500" fontSize="sm">Total Expenses</Text>
          <Text fontSize="2xl" fontWeight="bold" color="red.500">
            ₹{expenses}
          </Text>
        </Box>

      </Flex>

      {/* Recent Transactions */}
      <Box p={6} borderRadius="xl" boxShadow="md" bg={cardBg}>
        <Heading size="md" mb={4}>Recent Transactions</Heading>

        {transactions.length === 0 ? (
          <Text color="gray.500">No transactions yet. Add some!</Text>
        ) : (
          <VStack align="stretch" spacing={3}>
            {transactions.slice(-5).reverse().map((t) => (
              <HStack key={t.id} justify="space-between">
                <Text fontWeight="medium" textTransform="capitalize">
                  {t.title}
                </Text>
                <Text
                  color={t.type === "income" ? "green.500" : "red.500"}
                  fontWeight="bold"
                >
                  {t.type === "income" ? "+" : "-"}₹{t.amount}
                </Text>
              </HStack>
            ))}
          </VStack>
        )}
      </Box>

    </Box>
  );
};

export default Dashboard;