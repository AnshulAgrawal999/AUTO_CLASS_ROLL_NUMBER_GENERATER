import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const [count, setCount] = useState( '' )  ;
  const [separator, setSeparator] = useState("")  ;
  const [inputGroups, setInputGroups] = useState([{ className: "" }]); // Default group added
  const [rollNumbers, setRollNumbers] = useState([]);
  const toast = useToast();
  const queryClient = useQueryClient();

  const generateRollNumbers = useMutation(
    ({ count, inputGroups, separator }) => {
      // Validation checks
      if (count <= 0) {
        throw new Error("Please enter a count greater than 0.");
      }
      if (inputGroups.length === 0) {
        throw new Error("Please add at least one Class.");
      }
      if (inputGroups.some((group) => !group.className)) {
        throw new Error("Please fill out all Class fields.");
      }
  
      // Combine class names with the separator
      const combinedClassName = inputGroups
        .map((group) => group.className)
        .join(separator);
  
      // Generate roll numbers
      const newRollNumbers = [];
      for (let i = 1; i <= count; i++) {
        const formattedRollNumber = `${combinedClassName}${separator}${i}`;
        newRollNumbers.push(formattedRollNumber);
      }
  
      return newRollNumbers;
    },
    {
      onSuccess: (newRollNumbers) => {
        setRollNumbers(newRollNumbers);
        toast({
          title: "Roll Numbers Generated",
          description: `${count} roll numbers have been added for the combined classes.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );
  

  const addInputGroup = () => {
    setInputGroups([...inputGroups, { className: "" }]);
  };

  const updateInputGroup = (index, value) => {
    const updatedGroups = [...inputGroups];
    updatedGroups[index].className = value;
    setInputGroups(updatedGroups);
  };

  const removeInputGroup = (index) => {
    const updatedGroups = inputGroups.filter((_, i) => i !== index);
    setInputGroups(updatedGroups);
  };

  const resetHandler = () => {
    setCount(0);
    setSeparator("-");
    setInputGroups([{ className: "" }]); // Reset to default group
    setRollNumbers([]);
    toast({
      title: "Reset Successful",
      description: "All fields have been cleared.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleGenerateRollNumbers = () => {
    if (inputGroups.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one Class.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (inputGroups.some((group) => !group.className)) {
      toast({
        title: "Error",
        description: "Please fill out all Class fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    generateRollNumbers.mutate({ count, inputGroups, separator });
  };

  return (
    <Box p={5} maxW="600px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Auto Class Roll Number Generator
      </Text>
      <VStack spacing={4} align="stretch">
        {inputGroups.map((group, index) => (
          <Box key={index} borderWidth="1px" borderRadius="md" p={3}>
            <FormControl mb={2}>
              <FormLabel> Field </FormLabel>
              <Input
                type="text"
                placeholder="Enter Class"
                value={group.className}
                onChange={(e) => updateInputGroup(index, e.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="red"
              size="sm"
              mt={2}
              onClick={() => removeInputGroup(index)}
            >
              Remove Field
            </Button>
          </Box>
        ))}

        <Button colorScheme="blue" onClick={addInputGroup}>
          Add More Fields
        </Button>

        <FormControl>
          <FormLabel>Count</FormLabel>
          <Input
            type="number"
            placeholder="Enter Count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Separator (e.g., -, /, _)</FormLabel>
          <Input
            type="text"
            placeholder="Enter Separator"
            value={separator}
            onChange={(e) => setSeparator(e.target.value ) }
          />
        </FormControl>
        <Button
          colorScheme="teal"
          onClick={handleGenerateRollNumbers}
          isDisabled={
            inputGroups.length === 0 || inputGroups.some((group) => !group.className)
          }
        >
          Generate Roll Numbers
        </Button>
        <Button colorScheme="red" onClick={resetHandler}>
          Reset
        </Button>

        <VStack align="stretch" spacing={2}>
          {rollNumbers.map((num, index) => (
            <Text key={index} p={2} borderWidth="1px" borderRadius="md">
              Roll Number: {num}
            </Text>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

export default App;
