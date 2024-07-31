import React, {useEffect, useState,useRef} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import passwordRules from '../rules';
import Rule from '../component/RuleUI';
import Typography from '@mui/material/Typography';
import GameModeSelector from '../component/GameModeUI';
import axios from 'axios';
import ForbiddenLetterUI from '../component/forbiddenLetterUI';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function TextBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [gameWinning,setGameWinning]= useState(false);
    const [rulesChecker, setRulesChecker] = useState(Array(20).fill(0));
    const [rulesComponents, setRulesComponents] = useState([]);
    const[allPassed,setAllPassed]=useState(true);
    const [firstTime,setFirstTime]=useState(true);


    
    const [countries, setCountries] = useState([]);
    const [captchas, setCaptchas] = useState([]);
    const [captchaShown, setCaptchasShown] = useState();
    const [captchasName,setCaptchasName]= useState([]);
    const [captchaNameShown, setCaptchaNameShown] = useState();
    const [countryName,setCountryName]=useState([]);
    const [countryShown,setCountryShown]=useState([]);
    const [countryNameShown,setCountryNameShown]=useState([]);

    const [fireActive, setFireActive] = useState(false);
    const [addsEgg,setAddsEgg]=useState(true);
    const wormsIntervalRef = useRef(null);
    const burnIntervalRef = useRef(null);

    
    const [gameLevel, setGameLevel] = useState('easy');

    const [wordLength, setWordLength] = useState(5);
    const [timeInterval,setTimeInterval]=useState(5000);
    const [sumDigit,setSumDigit]=useState(5);
    const [flags,setFlags]=useState(5);
    const [romanMul,setRomanMul]=useState(10);
    const [totalWorm,setTotalWorm]=useState(1);
    const [percentageDigits,setPercentageDigit]=useState(10);
    const [forbiddenLetters, setForbiddenLetters] = useState([]);
    const [forbidSum,setForbidSum]=useState(1);
    const navigate = useNavigate();
    const [cheatActive,setCheatActive]=useState(false);
    const [highestScore,setHighestScore]=useState(0);
    const [score,setScore]=useState(0);


    const handleSetForbiddenLetters = (letters) => {
      setForbiddenLetters(letters);
    };
  
    // const colorIndices = [1, 3, 5]; // Indeks
    // const color = "red"; 
  
    // const formatSearchTerm = (term, indices, color) => {
    //   return term.split('').map((char, index) => {
    //     if (indices.includes(index)) {
    //       return <span key={index} style={{ color }}>{char}</span>;
    //     }
    //     return char;
    //   });
    // };

    useEffect(() => {
        if (gameWinning || gameOver) {
            const resultMessage = gameWinning ? 'win' : 'game over';
            navigate('/result', { state: { resultMessage, highest : calculateScore(),score: score, searchTerm } });
        }
    }, [gameWinning, gameOver, navigate]);

    // useEffect(() => {
    //     if (gameLevel != 'easy')
    //         window.location.reload();
    // }, [gameLevel]);

    useEffect(() => {
        const levelSettings = {
            easy: { wordLength: 5, timeInterval: 5000, sumDigit: 20, flags: 5, romanMul: 10, totalWorm: 1, percentageDigit: 10,forbidSum:1 },
            medium: { wordLength: 10, timeInterval: 4000, sumDigit:30, flags: 4, romanMul: 25, totalWorm: 2, percentageDigit: 20, forbidSum : 2 },
            hard: { wordLength: 15, timeInterval: 2000, sumDigit: 40, flags: 2, romanMul: 100, totalWorm: 3, percentageDigit: 40,forbidSum : 3}
        };
        const settings = levelSettings[gameLevel];
        if (settings) {
            setWordLength(settings.wordLength);
            setTimeInterval(settings.timeInterval);
            setSumDigit(settings.sumDigit);
            setFlags(settings.flags);
            setRomanMul(settings.romanMul);
            setTotalWorm(settings.totalWorm);
            setPercentageDigit(settings.percentageDigit);
            setForbidSum(settings.forbidSum);
        }
    }, [gameLevel]);
    

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        if (inputValue.toLowerCase().includes('cheat')) {
            const validAnswer = cheatActivate(searchTerm.replace('chea',''));
            setSearchTerm(validAnswer);
            setCheatActive(true);
            return;
        }

        // Logika untuk memeriksa cheat dan set password
        setSearchTerm(inputValue);
    }
    
    const checkRules = (words) => {
        // console.log(countryShown);
    const newRulesComponents = [];
    const anewRulesComponents = [];
    let allPassed = true;
    let newScore=0;
    
    
    if (true) {
        if (passwordRules.rule1(words,wordLength)) {
            rulesChecker[0] = 1;
            newRulesComponents.unshift(<Rule index={1} text={`Your password must be at least ${wordLength} characters.`} passed={true}  />);
            newScore +=1;
        } else {
            
            anewRulesComponents.unshift(<Rule index={1} text={`Your password must be at least ${wordLength} characters.`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[0] === 1) {
        if (passwordRules.rule2(words)) {
            newScore+=1;
            rulesChecker[1] = 1;
            newRulesComponents.unshift(<Rule index={2} text="Your password must include a number." passed={true} />);
        } else {
             
            anewRulesComponents.unshift(<Rule index={2} text="Your password must include a number." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[1] === 1) {
        if (passwordRules.rule3(words)) {
            newScore+=1;
            rulesChecker[2] = 1;
            newRulesComponents.unshift(<Rule index={3} text="Your password must include an uppercase letter." passed={true} />);
        } else {
            
            anewRulesComponents.unshift(<Rule index={3} text="Your password must include an uppercase letter." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[2] === 1) {
        if (passwordRules.rule4(words)) {
            newScore+=1;
            rulesChecker[3] = 1;
            newRulesComponents.unshift(<Rule index={4} text="Your password must include a non-alphanumeric character." passed={true} />);
        } else {
            anewRulesComponents.unshift(<Rule index={4} text="Your password must include a non-alphanumeric character." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[3] === 1) {
        if (passwordRules.rule5(words, sumDigit)) {
            newScore+=10;
            rulesChecker[4] = 1;
            newRulesComponents.unshift(<Rule index={5} text={`Sum of digits must equal ${sumDigit}`} passed={true} />);
        } else {
             
            anewRulesComponents.unshift(<Rule index={5} text={`Sum of digits must equal ${sumDigit}`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[4] === 1) {
        if (passwordRules.rule6(words)) {
            newScore+=5;
            rulesChecker[5] = 1;
            newRulesComponents.unshift(<Rule index={6} text="Your password must include a month name." passed={true} />);
        } else {
             
            anewRulesComponents.unshift(<Rule index={6} text="Your password must include a month name." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[5] === 1) {
        if (passwordRules.rule7(words)) {
            newScore+=5;
            rulesChecker[6] = 1;
            newRulesComponents.unshift(<Rule index={7} text="Your password must include a Roman numeral." passed={true} />);
        } else {
        
            anewRulesComponents.unshift(<Rule index={7} text="Your password must include a Roman numeral." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[6] === 1) {
        if (passwordRules.rule8(words, countryNameShown)) {
            rulesChecker[7] = 1;
            newScore+=5;
            newRulesComponents.unshift(<Rule index={8} text="Your password must include a country name." passed={true} images={countryShown} buttons={true} refreshImages={refreshImagesCountry} />);
        } else {
             
            anewRulesComponents.unshift(<Rule index={8} text="Your password must include a country name." passed={false} images={countryShown} buttons={true} refreshImages={refreshImagesCountry}/>);
            allPassed = false;
        }
    }

    if (rulesChecker[7] === 1) {
        if (passwordRules.rule9(words, romanMul)) {
            rulesChecker[8] = 1;
            newScore+=5;
            newRulesComponents.unshift(<Rule index={9} text={`Product of Roman numerals must equal ${romanMul}`} passed={true} />);
        } else {
           
            anewRulesComponents.unshift(<Rule index={9} text={`Product of Roman numerals must equal ${romanMul}`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[8] === 1 && !fireActive && !searchTerm.includes('🔥')&& !firstTime && !cheatActive) {
        let randomsnum = Math.floor(Math.random() * 26);
        if (randomsnum === 7) {
            setSearchTerm(words.slice(0,-1)+'🔥');
        }
    }
    if (rulesChecker[8] === 1) {
        
        if (firstTime && !cheatActive){
            setSearchTerm(words.slice(0,-1)+'🔥');
            setFirstTime(false);
        }
        if (searchTerm.includes('🔥')) {
          setFireActive(true);
        } else {
          setFireActive(false);
        }
        if (fireActive) {
          anewRulesComponents.unshift(<Rule index={10} text={`Oh no! Your password is on fire 🔥. Quick, put it out!`} passed={false} />);
        } 
        if (!fireActive && !searchTerm.includes('🔥')){
          newRulesComponents.unshift(<Rule index={10} text={`Oh no! Your password is on fire 🔥. Quick, put it out!`} passed={true} />);
          
          if (!firstTime){
              rulesChecker[9] = 1;
              newScore+=5;
          }
        }
        
    }

    if (rulesChecker[9] === 1) {
        if (addsEgg && !cheatActive){
            setSearchTerm(words + '🥚')
            setAddsEgg(false);
            newRulesComponents.unshift(<Rule index={11} text="🥚 This is my chicken Paul. He hasn’t hatched yet. Please put him in your password and keep him safe" passed={true} />);
            rulesChecker[10] = 1;
            newScore+=5;
        }else{
            newRulesComponents.unshift(<Rule index={11} text="🥚 This is my chicken Paul. He hasn’t hatched yet. Please put him in your password and keep him safe" passed={true} />);
            newScore+=5;
        }
        
        //allpased
    }

    if (rulesChecker[10] === 1) {
        if (passwordRules.rule12(words, captchaNameShown)) {
            rulesChecker[11] = 1;
            newScore+=5;
            newRulesComponents.unshift(<Rule index={12} text="Your password must include this CAPTCHA." passed={true} images={[captchaShown]} buttons={true} refreshImages={refreshImagesCaptchas}/>);
        } else {
            
            anewRulesComponents.unshift(<Rule index={12} text="Your password must include this CAPTCHA." passed={false} images={[captchaShown]} buttons={true} refreshImages={refreshImagesCaptchas}/>);
            allPassed = false;
        }
    }

    if (rulesChecker[11] === 1) {
        if (passwordRules.rule13(words)) {
            rulesChecker[12] = 1;
            newScore+=10;
            newRulesComponents.unshift(<Rule index={13} text="Your password must include a leap year." passed={true} />);
        } else {
             
            anewRulesComponents.unshift(<Rule index={13} text="Your password must include a leap year." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[12] === 1) {
        if (!searchTerm.includes('🐔') && searchTerm.includes('🥚')) {
            let newstr = searchTerm.replace('🥚','🐔');
            setSearchTerm(newstr);
        }
        newRulesComponents.unshift(<Rule index={14} text={`🐔 Paul has hatched ! Please don’t forget to feed him. He eats ${totalWorm} 🐛 every ${timeInterval/1000} second`} passed={true} />);
        if (words.includes('🐔') || cheatActive){
            rulesChecker[13] = 1;
            newScore+=10;
        }else{
            allPassed=false;
        }
        
    }

    if (rulesChecker[13] === 1) {
        if (passwordRules.rule15(words, forbiddenLetters) && forbiddenLetters.length === forbidSum) {
            rulesChecker[14] = 1;
            newScore+=10;
            newRulesComponents.unshift(<Rule index={15} text={`Your password must not contain forbidden letters. Choose ${forbidSum} letters.`} passed={true} />);
        } else {
            anewRulesComponents.unshift(<Rule index={15} text={`Your password must not contain forbidden letters. Choose ${forbidSum} letters.`} passed={false} />);
            allPassed = false;
        }
    }
    

    if (rulesChecker[14] === 1) {
        if (passwordRules.rule16(words)) {
            newScore+=1;
            rulesChecker[15] = 1;
            newRulesComponents.unshift(<Rule index={16} text="Your password must contain one of the following words: I want IRK | I need IRK | I love IRK." passed={true} />);
        } else {
           
            anewRulesComponents.unshift(<Rule index={16} text="Your password must contain one of the following words: I want IRK | I need IRK | I love IRK" passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[15] === 1) {
        if (passwordRules.rule17(words, percentageDigits)) {
            newScore+=5;
            rulesChecker[16] = 1;
            newRulesComponents.unshift(<Rule index={17} text={`Percentage of digits must be at least ${percentageDigits}%`} passed={true} />);
        } else {
           
            anewRulesComponents.unshift(<Rule index={17} text={`Percentage of digits must be at least ${percentageDigits}%`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[16] === 1) {
        if (passwordRules.rule18(words)) {
            newScore+=5;
            rulesChecker[17] = 1;
            newRulesComponents.unshift(<Rule index={18} text="Your password must include the length of the text." passed={true} />);
        } else {
            
            anewRulesComponents.unshift(<Rule index={18} text="Your password must include the length of the text." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[17] === 1) {
        if (passwordRules.rule19(words)) {
            newScore+=5;
            rulesChecker[18] = 1;
            newRulesComponents.unshift(<Rule index={19} text="Your password's length must be a prime number." passed={true} />);
        } else {
            anewRulesComponents.unshift(<Rule index={19} text="Your password's length must be a prime number." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[18] === 1) {
        const currentTime = new Date();
        if (passwordRules.rule20(words, currentTime)) {
            rulesChecker[19] = 1;
            newScore+=5;
            newRulesComponents.unshift(<Rule index={20} text="Your password must include the current time (HH:MM). " passed={true} />);
        } else {
            anewRulesComponents.unshift(<Rule index={20} text="Your password must include the current time (HH:MM). " passed={false} />);
            allPassed = false;
        }const currentTimeString = moment(currentTime).format('HH:mm');
        // let matches = currentTimeString.match(/\d/g);
        // let sum = matches.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        // let matches1 = words.match(/\d/g);
        // let sum1 = matches1.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        // if (sum+sum1>sumDigit){
        //     setGameOver(true);
        // }

        
    }
    if (rulesChecker[19]===1 && allPassed){
        newScore+=5;
        if (!cheatActive){
            setScore(newScore);
        }else{
            setScore(100);
        }
        setGameWinning(true);
    }
    setScore(newScore);
    setRulesComponents(anewRulesComponents.concat(newRulesComponents));
    setAllPassed(allPassed);
};

useEffect(() => {
    if (rulesChecker[8] === 1 && fireActive && searchTerm.includes('🔥')) {
        if (burnIntervalRef.current) {
            clearInterval(burnIntervalRef.current);
        }
        
        burnIntervalRef.current = setInterval(() => {
            if (searchTerm.length > 0) {
                const lastCharIndex = searchTerm.length - 3;
                const newSearchTerm = searchTerm.substring(0, lastCharIndex) + '🔥';
                setSearchTerm(newSearchTerm);
            } else {
                setFireActive(false);
            }
        }, timeInterval);

        return () => clearInterval(burnIntervalRef.current);
    }
}, [rulesChecker, fireActive, searchTerm]);




useEffect(() => {
    if (rulesChecker[12] === 1 && searchTerm.includes('🐔') && !cheatActive) {
        if (wormsIntervalRef.current) {
            clearInterval(wormsIntervalRef.current);
        }

        wormsIntervalRef.current = setInterval(() => {
            if (searchTerm.length > 0) {
                if (searchTerm.split('🐛').length - 1 < totalWorm) {
                    setGameOver(true);
                    // console.log(gameOver);
                } else {
                    let newstr = searchTerm.replace(new RegExp('🐛', 'g'), '');
                    setSearchTerm(newstr);
                    setGameOver(false);
                }
            } else {
                setGameOver(true);
                // console.log(gameOver);
            }
        }, timeInterval);

        return () => clearInterval(wormsIntervalRef.current);
    } else if (rulesChecker[12]===1 && !searchTerm.includes('🐔') &&!cheatActive) {
        setGameOver(true);
    }
}, [rulesChecker, searchTerm]);






    // algo gameover
    useEffect(()=> {
        if (rulesChecker[10]===1 && !searchTerm.includes('🥚') && rulesChecker[12]===0 && !cheatActive){
            setGameOver(true);
        }
        },[searchTerm]);
    
    

   
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:5001/countries');
                const countriesWithImages = response.data.map(item => {
                    const base64String = btoa(
                        new Uint8Array(item.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    return {
                        ...item,
                        imageSrc: `data:${item.contentType};base64,${base64String}`
                    };
                });
                setCountries(countriesWithImages);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
    
        fetchCountries();
    }, []);
    
    useEffect(() => {
        const fetchCaptchas = async () => {
            try {
                const response = await axios.get('http://localhost:5001/captchas');
                const captchasWithImages = response.data.map(item => {
                    const base64String = btoa(
                        new Uint8Array(item.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    return {
                        ...item,
                        imageSrc: `data:${item.contentType};base64,${base64String}`
                    };
                });
                setCaptchas(captchasWithImages);
            } catch (error) {
                console.error('Error fetching captchas:', error);
            }
        };
    
        fetchCaptchas();
    }, []);

    useEffect(() => {
        const transformFilenames = (list) => 
          list.map(item => item.filename.replace('.png', ''));
        setCountryName(transformFilenames(countries));
        setCaptchasName(transformFilenames(captchas));
      }, [countries, captchas]);

    useEffect(()=>{
        refreshImagesCountry();
    },[gameLevel,countries,flags]);
    useEffect(()=>{
        refreshImagesCaptchas();
    },[gameLevel,captchas]);

    
   
    const calculateScore = () => {
        let totalScore = 
            rulesChecker[0] * 0.01 +
            rulesChecker[1] * 0.01 +
            rulesChecker[2] * 0.01 +
            rulesChecker[3] * 0.01 +
            rulesChecker[4] * 0.1 +
            rulesChecker[5] * 0.05 +
            rulesChecker[6] * 0.05 +
            rulesChecker[7] * 0.05 +
            rulesChecker[8] * 0.05 +
            rulesChecker[9] * 0.05 +
            rulesChecker[10] * 0.05 +
            rulesChecker[11] * 0.05 +
            rulesChecker[12] * 0.1 +
            rulesChecker[13] * 0.1 +
            rulesChecker[14] * 0.1 +
            rulesChecker[15] * 0.01 +
            rulesChecker[16] * 0.05 +
            rulesChecker[17] * 0.05 +
            rulesChecker[18] * 0.05 +
            rulesChecker[19] * 0.05;
        return Math.round(totalScore * 100);
    }
    const refreshImagesCaptchas = () => {
        let x = (Math.floor(Math.random() * 6))
        setCaptchaNameShown(captchasName.at(x));
        setCaptchasShown(captchas.at(x));
      };
    const refreshImagesCountry = () => {
        let x = Math.floor(Math.random() * 10);
        if (x + flags > 9)
        {   
            x=Math.floor(Math.random() * 5);
        }
        let newCountry = countries.slice(x,x+flags);
        let newCountryName= countryName.slice(x,x+flags);
        setCountryShown(newCountry);
        setCountryNameShown(newCountryName);
      };

      useEffect(() => {
        checkRules(searchTerm);
    }, [searchTerm,captchaShown,countryShown]);

    
    const cheatActivate = (words) => {
        setRulesChecker(Array(20).fill(1));
        let cheatAnswer = words;
    
        const currentTime = new Date();
        if (!passwordRules.rule20(cheatAnswer, currentTime)) {
            cheatAnswer += moment(currentTime).format('HH:mm');
        }
    
        if (!passwordRules.rule16(cheatAnswer)) {
            cheatAnswer += ' I want IRK';
        }
    
        if (!passwordRules.rule12(cheatAnswer, captchaNameShown)) {
            cheatAnswer += captchaNameShown;
        }
    
        if (!passwordRules.rule9(cheatAnswer, romanMul)) {
            const matches = cheatAnswer.match(/[VXLCDM]+/g);
            if (matches) {
                cheatAnswer = cheatAnswer.replace(/[VXLCDM]+/g, match => match.toLowerCase());
            }
            if (romanMul === 10) {
                cheatAnswer += ' X';
            } else if (romanMul === 25) {
                cheatAnswer += ' V V';
            } else {
                cheatAnswer += ' X X';
            }
        }
    
        if (!passwordRules.rule8(cheatAnswer, countryNameShown)) {
            cheatAnswer += ' ' + countryNameShown[0];
        }
        if (!passwordRules.rule6(cheatAnswer)) {
            cheatAnswer += 'june';
        }
        if (!passwordRules.rule15(cheatAnswer, forbiddenLetters) || (forbiddenLetters.length ===0)) {
            const alphabet = 'abcdefghijklmnopqrstuvwxyz';
            const forbiddenLettersCheat = alphabet.split('').filter(letter => !cheatAnswer.includes(letter));
            setForbiddenLetters(forbiddenLettersCheat.slice(0,forbidSum));
        }

        if (!passwordRules.rule13(cheatAnswer)) {
            cheatAnswer += ' 0000';
        }

        if (!passwordRules.rule4(cheatAnswer)) {
            cheatAnswer += '@';
        }

        
        if (!passwordRules.rule14(cheatAnswer)) {
            cheatAnswer += '🐔';
        }
    
        if (!passwordRules.rule17(cheatAnswer, percentageDigits)) {
            const requiredDigits = Math.ceil((percentageDigits / 100) * cheatAnswer.length);
            const currentDigits = (cheatAnswer.match(/\d/g) || []).length;
            
            if (currentDigits < requiredDigits) {
                cheatAnswer += '0'.repeat(requiredDigits - currentDigits);
            }
        }

        if (!passwordRules.rule5(cheatAnswer, sumDigit)) {
            let digits = cheatAnswer.match(/\d/g) || [];
            let sum = digits.reduce((acc, num) => acc + parseInt(num), 0);
            if (sum > sumDigit) {
                return 'failed';
            } else {
                while (sum < sumDigit) {
                    cheatAnswer += '1';
                    sum += 1;
                }
            }
        }

        if (!passwordRules.rule19(cheatAnswer)) {
            const nextPrime = (num) => {
                num +=2;
                if (num % 2 === 0) num++;
                while (!passwordRules.isPrime(num)) {
                    num += 2;
                }
                return num;
            };
            const targetLength = nextPrime(cheatAnswer.length+2);
            console.log('target' +targetLength);
            cheatAnswer = cheatAnswer.padEnd(targetLength-2, '0');
        }

        if (!passwordRules.rule18(cheatAnswer)) {
            const removeSubstringsOfOne = (str, n) => {
                const replacement = '0'.repeat(n);
                return str.replace('1'.repeat(n), replacement);
            };
            let lengthAnswer = cheatAnswer.length+2;
            let first = Math.floor(lengthAnswer/10);
            let second = lengthAnswer%10;
            
            cheatAnswer = removeSubstringsOfOne(cheatAnswer, first);
            cheatAnswer = removeSubstringsOfOne(cheatAnswer, second);
            cheatAnswer += cheatAnswer.length+2;
        }
        if (!passwordRules.rule5(cheatAnswer, sumDigit)) {
            let digits = cheatAnswer.match(/\d/g) || [];
            let sum = digits.reduce((acc, num) => acc + parseInt(num), 0);
        
            if (sum < sumDigit) {
                let cheatArray = cheatAnswer.split('');
                
                for (let i = cheatArray.length-2; i > 20; i--) {
                    if (cheatArray[i] === '0' ) {
                        for (let replaceDigit = 9; replaceDigit >= 1; replaceDigit--) {
                            if (sum + replaceDigit <= sumDigit) {
                                cheatArray[i] = replaceDigit.toString();
                                sum += replaceDigit;
                                break;
                            }
                        }
                    }
                    if (sum === sumDigit) {
                        break;
                    }
                }
                
                cheatAnswer = cheatArray.join('');
            }
        }
        
        return cheatAnswer;
    };
    


    return (
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '45px',
            height: '100vh',
            backgroundColor: '#fdf4e3',
            '& > :not(style)': { m: 1, width: '50%' },
          }}
          noValidate
          autoComplete="off"
        >

          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center',padding:'10px',gap: '10px' }}>
          <Typography variant="body1" sx={{}}>
              Highest Score : {calculateScore().toString().slice(0,2)}
            </Typography>
            <GameModeSelector gameLevel={gameLevel} onLevelChange={setGameLevel}  />
            {rulesChecker[13] === 1 && (<ForbiddenLetterUI setForbiddenLetters={handleSetForbiddenLetters} />  )}
        </Box>
           {rulesChecker[13]===1 && (<p>Forbidden Letters: {forbiddenLetters.join(', ')}</p>)} 
          <Box
            component="img"
            src="https://neal.fun/password-game/title.svg"
            alt="Title"
            sx={{
              width: '100%',
              maxWidth: '500px',
              marginBottom: '20px',
              paddingBottom: '60px',
              paddingTop: '60px',
            }}
          />
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', marginTop: '20px' }}>
            Please choose a password
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', 
                width: '33%',
                gap: '10px',
                margin: 'auto' ,
                padding: '5px',
                position: 'relative'
            }}
          >
            <TextField 
              id="standard-basic" 
              variant="outlined" 
              value={searchTerm} 
              onChange={handleSearch}
              sx={{
                borderRadius: '15px',
                backgroundColor: '#fff',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '15px',
                    borderColor: 'black',
                  },
                },
                
                width: '100%', 
              }} 
            />

            <Typography variant="body1" sx={{position: 'absolute', right: '-30px',  }}>
              {(searchTerm.length - (searchTerm.split('🔥').length - 1) - (searchTerm.split('🥚').length - 1) - (searchTerm.split('🐛').length - 1) - (searchTerm.split('🐔').length - 1))}
            </Typography>
          </Box>
          {rulesComponents}
        </Box>
      );
    };
    
