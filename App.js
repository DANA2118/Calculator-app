import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'; 
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const toggleSign = () => {
    if (input) {
      setInput((prevInput) => (prevInput.startsWith('-') ? prevInput.slice(1) : `-${prevInput}`));
    }
  };

  const calculateSquareRoot = () => {
    if (input) {
      const res = Math.sqrt(parseFloat(input));
      setResult(res.toString());
      setHistory([...history, `√(${input}) = ${res}`]);
    }
  };

  const calculateSquare = () => {
    if (input) {
      const res = Math.pow(parseFloat(input), 2);
      setResult(res.toString());
      setHistory([...history, `(${input})² = ${res}`]);
    }
  };

  const handleEqual = () => {
    try {
      let expression = input.replace(/x/g, '*').replace(/%/g, '/100'); // Handle 'x' as '*' and '%' as '/100'
      
      // Check for division by zero
      if (expression.includes('/0') || expression.includes('/ 0')) {
        setInput('Cannot divide by zero');
        return;
      }
  
      const res = eval(expression); // Evaluate the input expression
  
      // Check for Infinity results
      if (res === Infinity || res === -Infinity ) {
        setInput('Cannot divide by zero');
      } else {
        setHistory([...history, `${input} = ${res}`]); // Save the calculation to history
        setResult(res.toString());
      }
    } catch (error) {
      setInput('Error'); // Handle invalid expressions
    }
  };

  const handleOperator = (operator) => {
    // Check if the input is empty or the last character is already an operator
    if (input === '' || ['+', '-', 'x', '/', '%'].includes(input[input.length - 1])) {
      return; // Do not append the operator
    }
    setInput(input + operator);
  };

  const handleNumberInput = (number) => {
    if (result !== '') {
      // If there's already a result displayed, reset the input and show the new number
      setInput(number);
      setResult(''); // Clear the result when a new number is entered
    } else {
      // Append the new number if no result is displayed
      setInput((prevInput) => prevInput + number);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.valubox}>
        <View style={styles.titlebox}>
          <Ionicons name="calculator-outline" size={30} color="#f9f9f9" />
          <Text style={styles.title}>Calculator</Text>
        </View>
        <Text style={styles.Calculation_Text}>{input || ' '}</Text> {/* Displays the ongoing calculation */}
        <Text style={styles.Result_Text}>{result || ' '}</Text>     {/* Displays the result */}
      </View>
      <View style={styles.btnbox}>
        {/* First Row */}
        <View style={styles.btnrow}>
          <TouchableOpacity style={styles.btn} onPress={() => { setInput(''); setResult(''); }}>
            <Text style={styles.symbolitic_Text}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => setInput(input.slice(0, -1))}>
            <Ionicons name="backspace-outline" size={25} color="#00ff7f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleOperator('%')}>
            <Text style={styles.symbolitic_Text}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleOperator('/')}>
            <Text style={styles.symbolitic_Text}>/</Text>
          </TouchableOpacity>
        </View>
        
        {/* New Row with Additional Buttons */}
        <View style={styles.btnrow}>
          <TouchableOpacity style={styles.btn} onPress={() => setShowHistory(!showHistory)}>
            <MaterialIcons name="history" size={30} color="#00ff7f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={toggleSign}>
            <Text style={styles.symbolitic_Text}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={calculateSquare}>
            <Text style={styles.symbolitic_Text}>x²</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={calculateSquareRoot}>
            <Text style={styles.symbolitic_Text}>√</Text>
          </TouchableOpacity>
        </View>

        {/* Number and Operation Rows */}
        <View style={styles.btnrow}>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('7')}>
            <Text style={styles.text}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('8')}>
            <Text style={styles.text}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('9')}>
            <Text style={styles.text}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleOperator('x')}>
            <Text style={styles.symbolitic_Text}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnrow}>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('4')}>
            <Text style={styles.text}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('5')}>
            <Text style={styles.text}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('6')}>
            <Text style={styles.text}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleOperator('-')}>
            <Text style={styles.symbolitic_Text}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnrow}>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('1')}>
            <Text style={styles.text}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('2')}>
            <Text style={styles.text}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('3')}>
            <Text style={styles.text}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleOperator('+')}>
            <Text style={styles.symbolitic_Text}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnrow}>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('0')}>
            <Text style={styles.text}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleNumberInput('.')}>
            <Text style={styles.text}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.equal_btn} onPress={handleEqual}>
            <Text style={styles.text}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showHistory && (
        <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Calculation History</Text>
      {history.length > 0 ? (
        history.map((item, index) => (
        <Text key={index} style={styles.historyItem}>
          {item}
        </Text>
      ))
    ) : (
      <Text style={styles.noHistoryText}>No History Available</Text>
    )}
  </View>
)}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#008080',
  },
  valubox: {
    flex: 0.8,
    padding: 10,
  },
  titlebox: {
    width: wp(40),
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  title: {
    color: '#f9f9f9',
    fontSize: 20,
  },
  Calculation_Text: {
    alignSelf: 'flex-end',
    fontSize: 30,
    color: '#f9f9f9',
    marginTop: 20,
  },
  Result_Text: {
    alignSelf: 'flex-end',
    fontSize: 45,
    color: '#f9f9f9',
    fontWeight: 'bold',
  },
  btnbox: {
    flex: 1.2,
    padding: 10,
    marginBottom: 200,
  },
  btnrow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  btn: {
    width: 75,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    color: '#f9f9f9',
  },
  symbolitic_Text: {
    fontSize: 25,
    color: '#00ff7f',
  },
  equal_btn: {
    backgroundColor: '#00ff7f',
    width: 150,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  
  historyContainer: {
    backgroundColor: '#004d4d',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  historyTitle: {
    color: '#00ff7f',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  historyItem: {
    color: '#f9f9f9',
    fontSize: 16,
    marginBottom: 5,
  },
  noHistoryText: {
    color: '#808080',
    fontSize: 16,
    textAlign: 'center',
  },
  
});
