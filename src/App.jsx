import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { useState } from "react";
// Add these at the top
import Dashboard from "./components/Pages/Dashboard";
import Transactions from "./components/Pages/Transactions";
import Budget from "./components/Pages/Budget";

function App() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const [activePage, setActivePage] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);

  const renderPage = () => {
    if (activePage === "dashboard")
      return <Dashboard transactions={transactions} />;
    if (activePage === "transactions")
      return (
        <Transactions
          transactions={transactions}
          setTransactions={setTransactions}
        />
      );
    if (activePage === "budget") return <Budget transactions={transactions} />;
  };

  return (
    <Box bg={bg} minH="100vh">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
    </Box>
  );
}

export default App;
