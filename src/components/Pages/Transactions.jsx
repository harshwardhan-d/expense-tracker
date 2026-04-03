// pages/Transactions.jsx
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Input,
  Select,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const Transactions = ({ transactions, setTransactions }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const theadBg = useColorModeValue("gray.50", "gray.600");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  function addTrans(title, amount, type, category, date) {
    if (!title || !amount || !type || !category || !date) return;

    const transInfo = {
      id: Date.now(),
      title: title,
      amount: amount,
      type: type,
      category: category,
      date: date,
    };

    setTransactions([...transactions, transInfo]);
    setTitle("");
    setAmount("");
    setType("");
    setCategory("");
    setDate("");
  }

  function deleteTrans(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  return (
    <Box px={6} py={8} maxW="1200px" mx="auto" w="100%">
      <Flex gap={6} flexDirection={{ base: "column", md: "row" }} align="start">

        {/* Transaction List */}
        <Box flex={2} p={6} borderRadius="xl" boxShadow="md" bg={cardBg} w="100%">
          <Heading size="md" mb={4}>All Transactions</Heading>
          <Box maxH={{ base: "200px", md: "400px" }} overflowY="auto" overflowX="hidden" w="100%">
            <Table variant="simple" size="sm">
              <Thead bg={theadBg}>
                <Tr>
                  <Th>Title</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Category</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Type</Th>
                  <Th>Amount</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Date</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((Details) => (
                  <Tr key={Details.id}>
                    <Td>{Details.title}</Td>
                    <Td display={{ base: "none", md: "table-cell" }}>
                      {Details.category}
                    </Td>
                    <Td display={{ base: "none", md: "table-cell" }}>
                      <Text color={Details.type === "income" ? "green.500" : "red.500"}>
                        {Details.type}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={Details.type === "income" ? "green.500" : "red.500"}>
                        ₹{Details.amount}
                      </Text>
                    </Td>
                    <Td display={{ base: "none", md: "table-cell" }}>{Details.date}</Td>
                    <Td p={1}>
                      <Button
                        size="xs"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => deleteTrans(Details.id)}
                      >
                        Del
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>

        {/* Add Transaction Form */}
        <Box flex={1} p={6} borderRadius="xl" boxShadow="md" bg={cardBg} w="100%">
          <Heading size="md" mb={4}>Add Transaction</Heading>
          <VStack spacing={4}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              type="number"
            />
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Select Type"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Select Category"
            >
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
            </Select>
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
            <Button
              onClick={() => addTrans(title, amount, type, category, date)}
              colorScheme="teal"
              w="full"
            >
              Add Transaction
            </Button>
          </VStack>
        </Box>

      </Flex>
    </Box>
  );
};

export default Transactions;
