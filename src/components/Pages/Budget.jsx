
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#319795", "#3182ce", "#e53e3e", "#d69e2e", "#805ad5", "#dd6b20"];

const Budget = ({ transactions }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");

  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryMap = {};
  expenses.forEach((t) => {
    if (categoryMap[t.category]) {
      categoryMap[t.category] += Number(t.amount);
    } else {
      categoryMap[t.category] = Number(t.amount);
    }
  });

  const chartData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const top3 = [...chartData].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <Box px={6} py={8} maxW="1200px" mx="auto" w="100%">
      <Heading size="lg" mb={6}>Budget Overview</Heading>

      <Flex gap={6} flexDirection={{ base: "column", md: "row" }} align="start">

        {/* Chart Section */}
        <Box flex={2} p={6} borderRadius="xl" boxShadow="md" bg={cardBg} w="100%">
          <Heading size="md" mb={4}>Spending by Category</Heading>

          {chartData.length === 0 ? (
            <Text color="gray.500">No expense data yet. Add transactions first!</Text>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>

        {/* Top 3 Expenses */}
        <Box flex={1} p={6} borderRadius="xl" boxShadow="md" bg={cardBg} w="100%">
          <Heading size="md" mb={4}>Top 3 Expenses</Heading>

          {top3.length === 0 ? (
            <Text color="gray.500">No expenses yet!</Text>
          ) : (
            <VStack spacing={4} align="start">
              {top3.map((item, index) => (
                <HStack key={item.name} w="100%" justify="space-between">
                  <HStack>
                    <Text fontSize="xl">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </Text>
                    <Text fontWeight="semibold" color={textColor} textTransform="capitalize">
                      {item.name}
                    </Text>
                  </HStack>
                  <Text fontWeight="bold" color="red.500">
                    ₹{item.value}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
        </Box>

      </Flex>
    </Box>
  );
};

export default Budget;