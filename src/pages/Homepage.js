import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import passwordRules from '../rules';
import Rule from '../component/RuleUI';

export default function TextBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [rulesChecker, setRulesChecker] = useState(Array(20).fill(0));
    const X = 10;
    let rulesCounter=0;
    const [rulesComponents, setRulesComponents] = useState([]);

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        if (inputValue.toLowerCase().includes('cheat')) {
            setSearchTerm(passwordRules.cheatPassword());
        } else {
            setSearchTerm(inputValue);
        }
    }
    
    const checkRules = (words) => {
    const newRulesComponents = [];
    let allPassed = true;
    if (words.length != 0) {
        if (passwordRules.rule1(words)) {
            console.log('Rule 1 passed: Length greater than 5');
            rulesChecker[0] = 1;
            newRulesComponents.push(<Rule index={1} text="Your password must be at least 5 characters." passed={true} />);
        } else {
            console.log('Rule 1 failed: Length not greater than 5');
            newRulesComponents.unshift(<Rule index={1} text="Your password must be at least 5 characters." passed={false} />);
            allPassed = false;
            
        }
    }

    if (rulesChecker[0] == 1) {
        if (passwordRules.rule2(words)) {
            console.log('Rule 2 passed: Contains at least one digit');
            rulesChecker[1] = 1;
            newRulesComponents.push(<Rule index={2} text="Your password must include a number." passed={true} />);
        } else {
            console.log('Rule 2 failed: Does not contain any digit');
            newRulesComponents.unshift(<Rule index={2} text="Your password must include a number." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[1] == 1) {
        if (passwordRules.rule3(words)) {
            console.log('Rule 3 passed: Contains at least one uppercase letter');
            rulesChecker[2] = 1;
            newRulesComponents.push(<Rule index={3} text="Your password must include an uppercase letter." passed={true} />);
        } else {
            console.log('Rule 3 failed: Does not contain any uppercase letter');
            newRulesComponents.unshift(<Rule index={3} text="Your password must include an uppercase letter." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[2] == 1) {
        if (passwordRules.rule4(words)) {
            console.log('Rule 4 passed: Contains non-alphanumeric characters');
            rulesChecker[3] = 1;
            newRulesComponents.push(<Rule index={4} text="Your password must include a non-alphanumeric character." passed={true} />);
        } else {
            console.log('Rule 4 failed: Does not contain non-alphanumeric characters');
            newRulesComponents.unshift(<Rule index={4} text="Your password must include a non-alphanumeric character." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[3] == 1) {
        if (passwordRules.rule5(words, X)) {
            console.log(`Rule 5 passed: Sum of digits equals ${X}`);
            rulesChecker[4] = 1;
            newRulesComponents.push(<Rule index={5} text={`Sum of digits must equal ${X}`} passed={true} />);
        } else {
            console.log(`Rule 5 failed: Sum of digits does not equal ${X}`);
            newRulesComponents.unshift(<Rule index={5} text={`Sum of digits must equal ${X}`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[4] == 1) {
        if (passwordRules.rule6(words)) {
            console.log('Rule 6 passed: Contains month names');
            rulesChecker[5] = 1;
            newRulesComponents.push(<Rule index={6} text="Your password must include a month name." passed={true} />);
        } else {
            console.log('Rule 6 failed: Does not contain month names');
            newRulesComponents.unshift(<Rule index={6} text="Your password must include a month name." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[5] == 1) {
        if (passwordRules.rule7(words)) {
            console.log('Rule 7 passed: Contains Roman numerals');
            rulesChecker[6] = 1;
            newRulesComponents.push(<Rule index={7} text="Your password must include a Roman numeral." passed={true} />);
        } else {
            console.log('Rule 7 failed: Does not contain Roman numerals');
            newRulesComponents.unshift(<Rule index={7} text="Your password must include a Roman numeral." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[6] == 1) {
        if (passwordRules.rule8(words, passwordRules.countries)) {
            console.log('Rule 8 passed: Contains country names');
            rulesChecker[7] = 1;
            newRulesComponents.push(<Rule index={8} text="Your password must include a country name." passed={true} />);
        } else {
            console.log('Rule 8 failed: Does not contain country names');
            newRulesComponents.unshift(<Rule index={8} text="Your password must include a country name." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[7] == 1) {
        if (passwordRules.rule9(words, X)) {
            console.log(`Rule 9 passed: Product of Roman numerals equals ${X}`);
            rulesChecker[8] = 1;
            newRulesComponents.push(<Rule index={9} text={`Product of Roman numerals must equal ${X}`} passed={true} />);
        } else {
            console.log(`Rule 9 failed: Product of Roman numerals does not equal ${X}`);
            newRulesComponents.unshift(<Rule index={9} text={`Product of Roman numerals must equal ${X}`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[8] == 1) {
        rulesChecker[9] = 1;
        if (words.includes('🔥')){
            newRulesComponents.push(<Rule index={10} text={`Oh no! Your password is on fire 🔥. Quick, put it out!`} passed={false} />);
        }
        else{
            newRulesComponents.unshift(<Rule index={10} text={`Oh no! Your password is on fire 🔥. Quick, put it out!`} passed={true} />);
            allPassed = false;
        }
    }
    if (rulesChecker[9] == 1) {
        rulesChecker[10] = 1;
        newRulesComponents.push(<Rule index={11} text="Password must satisfy rule 11" passed={true} />);
        //allpased
    }

    if (rulesChecker[10] == 1) {
        const captcha = passwordRules.captchas[0];
        if (passwordRules.rule12(words, captcha)) {
            console.log('Rule 12 passed: Contains captcha');
            rulesChecker[11] = 1;
            newRulesComponents.push(<Rule index={12} text="Your password must include the captcha." passed={true} />);
        } else {
            console.log('Rule 12 failed: Does not contain captcha');
            newRulesComponents.unshift(<Rule index={12} text="Your password must include the captcha." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[11] == 1) {
        if (passwordRules.rule13(words)) {
            console.log('Rule 13 passed: Contains leap year');
            rulesChecker[12] = 1;
            newRulesComponents.push(<Rule index={13} text="Your password must include a leap year." passed={true} />);
        } else {
            console.log('Rule 13 failed: Does not contain leap year');
            newRulesComponents.unshift(<Rule index={13} text="Your password must include a leap year." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[12] == 1) {
        rulesChecker[13] = 1;
        newRulesComponents.push(<Rule index={14} text="Password must satisfy rule 14" passed={true} />);
        //allpases
    }

    if (rulesChecker[13] == 1) {
        const forbiddenLetters = ['a', 'e', 'i', 'o', 'u'];
        if (passwordRules.rule15(words, forbiddenLetters)) {
            console.log('Rule 15 passed: Does not contain forbidden letters');
            rulesChecker[14] = 1;
            newRulesComponents.push(<Rule index={15} text="Your password must not contain forbidden letters." passed={true} />);
        } else {
            console.log('Rule 15 failed: Contains forbidden letters');
            newRulesComponents.unshift(<Rule index={15} text="Your password must not contain forbidden letters." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[14] == 1) {
        if (passwordRules.rule16(words)) {
            console.log('Rule 16 passed: Contains IRK-related phrases');
            rulesChecker[15] = 1;
            newRulesComponents.push(<Rule index={16} text="Your password must include IRK-related phrases." passed={true} />);
        } else {
            console.log('Rule 16 failed: Does not contain IRK-related phrases');
            newRulesComponents.unshift(<Rule index={16} text="Your password must include IRK-related phrases." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[15] == 1) {
        const X17 = 20;
        if (passwordRules.rule17(words, X17)) {
            console.log(`Rule 17 passed: Percentage of digits is at least ${X17}%`);
            rulesChecker[16] = 1;
            newRulesComponents.push(<Rule index={17} text={`Percentage of digits must be at least ${X17}%`} passed={true} />);
        } else {
            console.log(`Rule 17 failed: Percentage of digits is less than ${X17}%`);
            newRulesComponents.unshift(<Rule index={17} text={`Percentage of digits must be at least ${X17}%`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[16] == 1) {
        if (passwordRules.rule18(words)) {
            console.log('Rule 18 passed: Contains length of text');
            rulesChecker[17] = 1;
            newRulesComponents.push(<Rule index={18} text="Your password must include the length of the text." passed={true} />);
        } else {
            console.log('Rule 18 failed: Does not contain length of text');
            newRulesComponents.unshift(<Rule index={18} text="Your password must include the length of the text." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[17] == 1) {
        if (passwordRules.rule19(words)) {
            console.log('Rule 19 passed: Length of text is a prime number');
            rulesChecker[18] = 1;
            newRulesComponents.push(<Rule index={19} text="Your password's length must be a prime number." passed={true} />);
        } else {
            console.log('Rule 19 failed: Length of text is not a prime number');
            newRulesComponents.unshift(<Rule index={19} text="Your password's length must be a prime number." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[18] == 1) {
        const currentTime = new Date();
        if (passwordRules.containsCurrentTime(words, currentTime)) {
            console.log('Your password must include the current time.');
            rulesChecker[19] = 1;
            newRulesComponents.push(<Rule index={20} text="Your password must include the current time." passed={true} />);
        } else {
            console.log('Does not contain current time in text');
            newRulesComponents.unshift(<Rule index={20} text="Your password must include the current time." passed={false} />);
            allPassed = false;
        }
    }
    if (rulesChecker[19]==1 && allPassed){
        console.log("win");
    }

    setRulesComponents(newRulesComponents);
};

    

    useEffect(() => {
        checkRules(searchTerm)
        console.log(searchTerm)
    }, [searchTerm])
    useEffect(() => {
        if (rulesChecker[8] === 1) {
          const intervalId = setInterval(() => {
            setSearchTerm(passwordRules.rule10); 
          }, 5000);
          return () => clearInterval(intervalId);
        }
      }, [rulesChecker, passwordRules.rule10,searchTerm]);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="PASSWORDS" variant="standard" value={searchTerm} onChange={handleSearch} />
      {/* <Rule index={1} text="Your password must be at least 5 characters." passed={rulesChecker[0]} />
      <Rule index={2} text="Your password must include a number." passed={rulesChecker[1]} /> */}
      {rulesComponents}
    </Box>
  );
}
