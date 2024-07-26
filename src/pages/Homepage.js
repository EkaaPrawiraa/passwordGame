import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import passwordRules from '../rules';
import Rule from '../component/RuleUI';
import Typography from '@mui/material/Typography';

export default function TextBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [rulesChecker, setRulesChecker] = useState(Array(20).fill(0));
    const [rulesComponents, setRulesComponents] = useState([]);
    const[allPassed,setAllPassed]=useState(true);
    // const [fireActive, setFireActive] = useState(false); 
    const [firstTime,setFirstTime]=useState(true);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const X = 10;
    const countries = ['indonesia', 'united states', 'france', 'germany', 'japan', 'brazil', 'australia', 'russia', 'canada', 'italy'];
    const captchas = ['captcha1', 'captcha2', 'captcha3', 'captcha4', 'captcha5', 'captcha6', 'captcha7'];
    const captcha = captchas[0];
    const [fireActive, setFireActive] = useState(false);
    const [addsEgg,setAddsEgg]=useState(true);


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
    
    if (true) {
        if (passwordRules.rule1(words)) {
            rulesChecker[0] = 1;
            newRulesComponents.unshift(<Rule index={1} text="Your password must be at least 5 characters." passed={true} />);
        } else {
            
            newRulesComponents.unshift(<Rule index={1} text="Your password must be at least 5 characters." passed={false} />);
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
        if (passwordRules.rule5(words, X)) {
           
            rulesChecker[4] = 1;
            newRulesComponents.unshift(<Rule index={5} text={`Sum of digits must equal ${X}`} passed={true} />);
        } else {
             
            newRulesComponents.unshift(<Rule index={5} text={`Sum of digits must equal ${X}`} passed={false} />);
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
        if (passwordRules.rule8(words, countries)) {
            
            rulesChecker[7] = 1;
            newRulesComponents.unshift(<Rule index={8} text="Your password must include a country name." passed={true} />);
        } else {
             
            newRulesComponents.unshift(<Rule index={8} text="Your password must include a country name." passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[7] == 1) {
        if (passwordRules.rule9(words, X)) {
            rulesChecker[8] = 1;
            newRulesComponents.unshift(<Rule index={9} text={`Product of Roman numerals must equal ${X}`} passed={true} />);
        } else {
           
            newRulesComponents.unshift(<Rule index={9} text={`Product of Roman numerals must equal ${X}`} passed={false} />);
            allPassed = false;
        }
    }

    if (rulesChecker[8] === 1 && !fireActive && !searchTerm.includes('🔥')&& !firstTime ) {
        let x = Math.floor(Math.random() * 26);
        console.log(x);
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
        if (passwordRules.rule12(words, captcha)) {
            rulesChecker[11] = 1;
            newRulesComponents.unshift(<Rule index={12} text="Your password must include this CAPTCHA." passed={true} />);
        } else {
            
            newRulesComponents.unshift(<Rule index={12} text="Your password must include this CAPTCHA." passed={false} />);
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
        let x = 2;
        let y =2;
        if (!searchTerm.includes('🐔') && searchTerm.includes('🥚')) {
            let newstr = searchTerm.replace('🥚','🐔');
            setSearchTerm(newstr);
        }
        newRulesComponents.unshift(<Rule index={14} text={`🐔 Paul has hatched ! Please don’t forget to feed him. He eats ${x} 🐛 every ${y} second`} passed={true} />);
        if (words.includes('🐔')){
            rulesChecker[13] = 1;
        }else{
            allPassed=false;
        }
        
    }

    if (rulesChecker[13] == 1) {
        const forbiddenLetters = [''];
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
        const X17 = 20;
        if (passwordRules.rule17(words, X17)) {

            rulesChecker[16] = 1;
            newRulesComponents.unshift(<Rule index={17} text={`Percentage of digits must be at least ${X17}%`} passed={true} />);
        } else {
           
            newRulesComponents.unshift(<Rule index={17} text={`Percentage of digits must be at least ${X17}%`} passed={false} />);
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
    const burnInterval = setInterval(() => {
      if (searchTerm.length > 0) {
        const lastCharIndex = searchTerm.length - 3;
        const newSearchTerm = searchTerm.substring(0, lastCharIndex) + '🔥';
        setSearchTerm(newSearchTerm);
      } else {
        setFireActive(false);
      }
    }, 1000); 
    return () => clearInterval(burnInterval);
  }
}, [rulesChecker, fireActive, searchTerm]);


// useEffect (()=>{
//     if (rulesChecker[12] == 1 && !searchTerm.includes('🐔') && searchTerm.includes('🥚')) {
//         let newstr = searchTerm.replace('🥚','🐔');
//         setSearchTerm(newstr);
//     }
// },[rulesChecker,searchTerm]);

useEffect (()=>{
    if (rulesChecker[12] === 1 && searchTerm.includes('🐔')) {
        const burnInterval = setInterval(() => {
        if (searchTerm.length > 0) {
            if (searchTerm.split('🐛').length - 1 < 2){
                setGameOver(true);
            }
            else{
                let newstr = searchTerm.replace(new RegExp('🐛', 'g'), '')
                searchTerm(newstr);
            }
        } else {
            setGameOver(true);
            console.log(gameOver);
        }
    }, 2000); 
    return () => clearInterval(burnInterval);
    }
    else{
        setGameOver(true);
    }
},[rulesChecker,searchTerm]);





    // algo gameover
    useEffect(()=> {
        if (rulesChecker[10]==1 && !searchTerm.includes('🥚') && !rulesChecker[13]==1 ){
            setGameOver(true);
            console.log(gameOver);
        }
        },[searchTerm]);
    
    

    useEffect(() => {
        checkRules(searchTerm);
    }, [searchTerm]);

    
      


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
                    {searchTerm.length-(searchTerm.split('🔥').length - 1)- (searchTerm.split('🥚').length - 1)-(searchTerm.split('🐛').length - 1)} 
                </Typography>
            </Box>
            {rulesComponents}
        </Box>
    );
}