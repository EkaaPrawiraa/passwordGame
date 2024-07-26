
const moment = require('moment');






function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function rule1(text) {
  return text.length > 5;
}

function rule2(text) {
  return /\d/.test(text);
}

function rule3(text) {
  return /[A-Z]/.test(text);
}

function rule4(text) {
  return /[^a-zA-Z0-9]/.test(text);
}

function rule5(text, X) {
  const matches = text.match(/\d/g);
  if (!matches) return false;
  const sum = matches.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  return sum === X;
}

function rule6(text) {
  return /(january|february|march|april|may|june|july|august|september|october|november|december)/i.test(text);
}

function rule7(text) {
  return /[IVXLCDM]+/i.test(text);
}


function rule8(text, countries) {
  return new RegExp(`(${countries.join('|')})`, 'i').test(text);
}

function romanToInt(roman) {
  const romanNumerals = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };
  return roman.split('').reduce((total, char) => total + (romanNumerals[char] || 0), 0);
}

function rule9(text, X) {
  const matches = text.match(/[IVXLCDM]+/g);
  if (!matches) return false;

  const values = matches.map(match => romanToInt(match));
  
  const product = values.reduce((acc, value) => acc * value, 1);
  
  // console.log('Produk dari angka Romawi:', product);
  
  return product === X;
}

function rule10(text) {
  if (text.length === 0) return text;
  if (text.includes('🔥')) {
    if (text.length >= 2) {
      return text.slice(0, -3) + '🔥'; 
    } else {
      return '🔥';
    }
  } else {
    if (text.length >= 1) {
      return text.slice(0, -1) + '🔥'; 
    } else {
      return '🔥';
    }
  }
}

function rule11(text, X) {
  setInterval(() => {
    if (!text.includes('🥚')) {
      // console.log('Rule 11 failed: Emoji 🥚 is missing!');
      // console.log('YOU LOSE!');
      process.exit(1);
    }
  }, X);
  return true;
}

function rule12(text, captcha) {
  return text.includes(captcha);
}

function rule13(text) {
  const matches = text.match(/\d{4}/g);
  if (!matches) return false;
  return matches.some(year => isLeapYear(parseInt(year, 10)));
}

function rule14(text, X, Y) {
  text = text.replace('🥚', '🐔');
  setInterval(() => {
    const countWorms = (text.match(/🐛/g) || []).length;
    if (countWorms < Y) {
      process.exit(1);
    }
  }, X);
  return true;
}

function rule15(text, forbiddenLetters) {
  const pattern = new RegExp(`[${forbiddenLetters.join('')}]`, 'i');
  return !pattern.test(text);
}

function rule16(text) {
  return text.includes('I want IRK') || text.includes('I need IRK') || text.includes('I love IRK');
}

function rule17(text, X) {
  const numDigits = (text.match(/\d/g) || []).length;
  const totalChars = (text.length-(text.split('🔥').length - 1)- (text.split('🥚').length - 1)-(text.split('🐛').length - 1)-(text.split('🐔').length - 1));
  if (totalChars === 0) return false;
  const percentageDigits = (numDigits * 100) / totalChars;
  return percentageDigits >= X;
}

function rule18(text) {
  const lengthStr = (text.length-(text.split('🔥').length - 1)- (text.split('🥚').length - 1)-(text.split('🐛').length - 1)-(text.split('🐔').length - 1)).toString();
  return text.includes(lengthStr);
}

function rule19(text) {
  return isPrime(text.length);
}

function rule20(text, currentTime) {
  const currentTimeString = moment(currentTime).format('HH:mm');
  return text.includes(currentTimeString);
}
const cheatPassword = () => { //belum beres
  let words = "indonesiajuneX19000"

  return words;
}

const passwordRules = {
  rule1,
  rule2,
  rule3,
  rule4,
  rule5,
  rule6,
  rule7,
  rule8,
  rule9,
  rule10,
  rule11,
  rule12,
  rule13,
  rule14,
  rule15,
  rule16,
  rule17,
  rule18,
  rule19,
  rule20,
  romanToInt,
  isLeapYear,
  isPrime,
  cheatPassword,
};
export default passwordRules;