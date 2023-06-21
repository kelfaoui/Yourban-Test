import logo from "./logo.svg";
import "./App.css";
import SimpleTable from "./molecules/SimpleTable";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <SimpleTable></SimpleTable>
      </div>
    </ChakraProvider>
  );
}

export default App;
