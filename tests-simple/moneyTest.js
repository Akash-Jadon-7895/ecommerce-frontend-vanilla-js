import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suite: formatCurrency');

console.log('convert cents to dollars');

if(formatCurrency(2095) === '20.95'){
  console.log('Passed');
}else{
  console.log('Failed');
}

console.log('works with zero');

if(formatCurrency(0) === '0.00'){
  console.log('Passed');
}else{
  console.log('Failed');
}

console.log('rounds correctly to nearest cent');

if(formatCurrency(2000.5) === '20.01'){
  console.log('Passed');
} else{
  console.log('Failed');
}

if(formatCurrency(2000.4) === '20.00'){
  console.log('Passed');
} else{
  console.log('Failed');
}
