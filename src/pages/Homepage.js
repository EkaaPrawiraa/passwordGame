import React, {useEffect, useState,useRef} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import passwordRules from '../rules';
import Rule from '../component/RuleUI';
import Typography from '@mui/material/Typography';
import GameModeSelector from '../component/GameModeUI';
import axios from 'axios';
import { Buffer } from 'buffer';


export default function TextBox() {
    const [searchTerm, setSearchTerm] = useState('');
    // const [gameState, setGameState] = useState({
    //     gameOver: false,
    //     gameWinning: false,
    //     allPassed: true,
    //     firstTime: true,
    //     score: 0,
    // });
    const [gameOver, setGameOver] = useState(false);
    const [gameWinning,setGameWinning]= useState(false);
    const [rulesChecker, setRulesChecker] = useState(Array(20).fill(0));
    const [rulesComponents, setRulesComponents] = useState([]);
    const[allPassed,setAllPassed]=useState(true);
    const [firstTime,setFirstTime]=useState(true);
    const [score, setScore]=useState(0);


    
    const [countries, setCountries] = useState([]);
    const [captchas, setCaptchas] = useState([]);
    const [captcha, setCaptcha] = useState('');
    
    const [captchasName,setCaptchasName]= useState([]);
    const [countryName,setCountryName]=useState([]);
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
    const forbiddenLetters = [''];


    useEffect(() => {
        const levelSettings = {
            easy: { wordLength: 5, timeInterval: 5000, sumDigit: 10, flags: 5, romanMul: 10, totalWorm: 1, percentageDigit: 10 },
            medium: { wordLength: 10, timeInterval: 4000, sumDigit: 15, flags: 4, romanMul: 25, totalWorm: 2, percentageDigit: 20 },
            hard: { wordLength: 15, timeInterval: 2000, sumDigit: 20, flags: 2, romanMul: 100, totalWorm: 3, percentageDigit: 40 }
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
        }
    }, [gameLevel]);
    

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        // if (inputValue.toLowerCase().includes('cheat')) {
        //     const validAnswer = generateValidAnswer(searchTerm);
        //     setSearchTerm(validAnswer);
        //     setCheatActive(true);
        //     return;
        // }

        // Logika untuk memeriksa cheat dan set password
        setSearchTerm(inputValue);
    }
    
    const checkRules = (words) => {
    const newRulesComponents = [];
    let allPassed = true;
    
    if (true) {
        if (passwordRules.rule1(words,wordLength)) {
            rulesChecker[0] = 1;
            newRulesComponents.unshift(<Rule index={1} text={`Your password must be at least ${wordLength} characters.`} passed={true}  />);
        } else {
            
            newRulesComponents.unshift(<Rule index={1} text={`Your password must be at least ${wordLength} characters.`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[0] == 1) {
        if (passwordRules.rule2(words)) {
             
            rulesChecker[1] = 1;
            newRulesComponents.unshift(<Rule index={2} text="Your password must include a number." passed={true} />);
        } else {
             
            newRulesComponents.unshift(<Rule index={2} text="Your password must include a number." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[1] == 1) {
        if (passwordRules.rule3(words)) {
          
            rulesChecker[2] = 1;
            newRulesComponents.unshift(<Rule index={3} text="Your password must include an uppercase letter." passed={true} />);
        } else {
            
            newRulesComponents.unshift(<Rule index={3} text="Your password must include an uppercase letter." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[2] == 1) {
        if (passwordRules.rule4(words)) {
        
            rulesChecker[3] = 1;
            newRulesComponents.unshift(<Rule index={4} text="Your password must include a non-alphanumeric character." passed={true} />);
        } else {
            newRulesComponents.unshift(<Rule index={4} text="Your password must include a non-alphanumeric character." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[3] == 1) {
        if (passwordRules.rule5(words, sumDigit)) {
           
            rulesChecker[4] = 1;
            newRulesComponents.unshift(<Rule index={5} text={`Sum of digits must equal ${sumDigit}`} passed={true} />);
        } else {
             
            newRulesComponents.unshift(<Rule index={5} text={`Sum of digits must equal ${sumDigit}`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[4] == 1) {
        if (passwordRules.rule6(words)) {
            
            rulesChecker[5] = 1;
            newRulesComponents.unshift(<Rule index={6} text="Your password must include a month name." passed={true} />);
        } else {
             
            newRulesComponents.unshift(<Rule index={6} text="Your password must include a month name." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[5] == 1) {
        if (passwordRules.rule7(words)) {
            
            rulesChecker[6] = 1;
            newRulesComponents.unshift(<Rule index={7} text="Your password must include a Roman numeral." passed={true} />);
        } else {
        
            newRulesComponents.unshift(<Rule index={7} text="Your password must include a Roman numeral." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[6] == 1) {
        if (passwordRules.rule8(words, countryName)) {
            rulesChecker[7] = 1;
            newRulesComponents.unshift(<Rule index={8} text="Your password must include a country name." passed={true} images={countries} />);
        } else {
             
            newRulesComponents.unshift(<Rule index={8} text="Your password must include a country name." passed={false} images={countries}/>);
            allPassed = false;
        }
    }

    if (rulesChecker[7] == 1) {
        if (passwordRules.rule9(words, romanMul)) {
            rulesChecker[8] = 1;
            newRulesComponents.unshift(<Rule index={9} text={`Product of Roman numerals must equal ${romanMul}`} passed={true} />);
        } else {
           
            newRulesComponents.unshift(<Rule index={9} text={`Product of Roman numerals must equal ${romanMul}`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[8] === 1 && !fireActive && !searchTerm.includes('🔥')&& !firstTime ) {
        let x = Math.floor(Math.random() * 26);
        // console.log(x);
        if (x === 7) {
            setSearchTerm(words.slice(0,-1)+'🔥');
        }
    }
    if (rulesChecker[8] === 1) {
        if (firstTime){
            setSearchTerm(words.slice(0,-1)+'🔥');
            setFirstTime(false);
        }
        if (searchTerm.includes('🔥')) {
          setFireActive(true);
        } else {
          setFireActive(false);
        }
        if (fireActive) {
          newRulesComponents.unshift(<Rule index={10} text={`Oh no! Your password is on fire 🔥. Quick, put it out!`} passed={false} />);
        } 
        if (!fireActive && !searchTerm.includes('🔥')){
          newRulesComponents.unshift(<Rule index={10} text={`Oh no! Your password is on fire 🔥. Quick, put it out!`} passed={true} />);
          if (!firstTime){
              rulesChecker[9] = 1;
          }
        }
        
    }

    if (rulesChecker[9] == 1) {
        if (addsEgg){
            setSearchTerm(words + '🥚')
            setAddsEgg(false);
            newRulesComponents.unshift(<Rule index={11} text="🥚 This is my chicken Paul. He hasn’t hatched yet. Please put him in your password and keep him safe" passed={true} />);
            rulesChecker[10] = 1;
        }else{
            newRulesComponents.unshift(<Rule index={11} text="🥚 This is my chicken Paul. He hasn’t hatched yet. Please put him in your password and keep him safe" passed={true} />);
        }
        
        //allpased
    }

    if (rulesChecker[10] == 1) {
        console.log(captchas[0].filename);
        if (passwordRules.rule12(words, captchasName[0])) {
            rulesChecker[11] = 1;
            newRulesComponents.unshift(<Rule index={12} text="Your password must include this CAPTCHA." passed={true} images={captchas}/>);
        } else {
            
            newRulesComponents.unshift(<Rule index={12} text="Your password must include this CAPTCHA." passed={false} images={captchas} />);
            allPassed = false;
        }
    }

    if (rulesChecker[11] == 1) {
        if (passwordRules.rule13(words)) {
            rulesChecker[12] = 1;
            newRulesComponents.unshift(<Rule index={13} text="Your password must include a leap year." passed={true} />);
        } else {
             
            newRulesComponents.unshift(<Rule index={13} text="Your password must include a leap year." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[12] == 1) {
        if (!searchTerm.includes('🐔') && searchTerm.includes('🥚')) {
            let newstr = searchTerm.replace('🥚','🐔');
            setSearchTerm(newstr);
        }
        newRulesComponents.unshift(<Rule index={14} text={`🐔 Paul has hatched ! Please don’t forget to feed him. He eats ${totalWorm} 🐛 every ${timeInterval/1000} second`} passed={true} />);
        if (words.includes('🐔')){
            rulesChecker[13] = 1;
        }else{
            allPassed=false;
        }
        
    }

    if (rulesChecker[13] == 1) {
        
        if (passwordRules.rule15(words, forbiddenLetters)) {
            rulesChecker[14] = 1;
            newRulesComponents.unshift(<Rule index={15} text="Your password must not contain forbidden letters." passed={true} />);
        } else {       
            newRulesComponents.unshift(<Rule index={15} text="Your password must not contain forbidden letters." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[14] == 1) {
        if (passwordRules.rule16(words)) {
           
            rulesChecker[15] = 1;
            newRulesComponents.unshift(<Rule index={16} text="Your password must contain one of the following words: I want IRK | I need IRK | I love IRK." passed={true} />);
        } else {
           
            newRulesComponents.unshift(<Rule index={16} text="Your password must contain one of the following words: I want IRK | I need IRK | I love IRK" passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[15] == 1) {
        if (passwordRules.rule17(words, percentageDigits)) {

            rulesChecker[16] = 1;
            newRulesComponents.unshift(<Rule index={17} text={`Percentage of digits must be at least ${percentageDigits}%`} passed={true} />);
        } else {
           
            newRulesComponents.unshift(<Rule index={17} text={`Percentage of digits must be at least ${percentageDigits}%`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[16] == 1) {
        if (passwordRules.rule18(words)) {
           
            rulesChecker[17] = 1;
            newRulesComponents.unshift(<Rule index={18} text="Your password must include the length of the text." passed={true} />);
        } else {
            
            newRulesComponents.unshift(<Rule index={18} text="Your password must include the length of the text." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[17] == 1) {
        if (passwordRules.rule19(words)) {
       
            rulesChecker[18] = 1;
            newRulesComponents.unshift(<Rule index={19} text="Your password's length must be a prime number." passed={true} />);
        } else {
            newRulesComponents.unshift(<Rule index={19} text="Your password's length must be a prime number." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[18] == 1) {
        const currentTime = new Date();
        if (passwordRules.rule20(words, currentTime)) {
            rulesChecker[19] = 1;
            newRulesComponents.unshift(<Rule index={20} text="Your password must include the current time." passed={true} />);
        } else {
            newRulesComponents.unshift(<Rule index={20} text="Your password must include the current time." passed={false} />);
            allPassed = false;
        }
    }
    if (rulesChecker[19]==1 && allPassed){
        console.log("win");
    }

    setRulesComponents(newRulesComponents);
    setAllPassed(allPassed);
};

    



useEffect(() => {
    if (rulesChecker[8] === 1 && fireActive) {
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
    if (rulesChecker[12] === 1 && searchTerm.includes('🐔')) {
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
    } else {
        setGameOver(true);
    }
}, [rulesChecker, searchTerm]);






    // algo gameover
    useEffect(()=> {
        if (rulesChecker[10]==1 && !searchTerm.includes('🥚') && !rulesChecker[13]==1 ){
            setGameOver(true);
            // console.log(gameOver);
        }
        },[searchTerm]);
    
    

    useEffect(() => {
        checkRules(searchTerm);
        console.log(captchas);
    }, [searchTerm,countries,captchas]);

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
                if (captchasWithImages.length > 0) {
                    setCaptcha(captchasWithImages[0]);
                }
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
    
    
   
    // const generateValidAnswer = (currentTerm) => {
    //     if (gameLevel=='easy'){
    //         let cheatanswer ='';

    //     }else if (gameLevel=='medium'){

    //     }else{

    //     }
    //     let newAnswer = currentTerm + 'ValidPassword123!';
    //     // newAnswer = newAnswer.replace(/🔥/g, ''); 
    //     // setRulesChecker(prev => prev.map((rule, index) => index === 10 || index === 14 ? 0 : rule));
    //     return newAnswer;
    // }
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
            rulesChecker[15] * 0.1 +
            rulesChecker[16] * 0.05 +
            rulesChecker[17] * 0.05 +
            rulesChecker[18] * 0.05 +
            rulesChecker[19] * 0.05;
        return totalScore;
    }
    
    // const updateScore = () => {
    //     const currentScore = calculateScore();
    //     setScore(currentScore);
    //     if (currentScore > highestScore) {
    //         setHighestScore(currentScore);
    //     }
    // }
    
      


      return (
        
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '45px',
                height: '100vh',
                backgroundColor: '#fdf4e3', // Ganti warna background di sini
                '& > :not(style)': { m: 1, width: '50%%' }, // Mengatur lebar TextField dan Rule components
            }}
            noValidate
            autoComplete="off"
            
        >
            <GameModeSelector  gameLevel={gameLevel} onLevelChange={setGameLevel} />
            <Box
                component="img"
                src="https://neal.fun/password-game/title.svg"
                alt="Title"
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    marginBottom: '20px',
                    paddingBottom:'60px',
                    paddingTop :'60px',
                }}
            />
            
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', marginTop: '20px' }}>
            Please choose a password
           </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '33%' // Mengatur lebar Box yang mengandung TextField dan Typography
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
                        width: '100%' // Mengatur lebar TextField
                    }} 
                />
                <Typography variant="body1" sx={{ paddingLeft :1, }}>
                    {(searchTerm.length-(searchTerm.split('🔥').length - 1)- (searchTerm.split('🥚').length - 1)-(searchTerm.split('🐛').length - 1)-(searchTerm.split('🐔').length - 1))} 
                </Typography>
            </Box>
            {rulesComponents}
        </Box>
    );
}