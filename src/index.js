module.exports = function check(str, bracketsConfig) {

  let bracketsPair = {
    ')': '(',
    ']': '[',
    '}': '{',
    '2': '1',
    '4': '3',
    '6': '5',
  };

  let identicalPair = ['|', '7', '8'];

  let openBracket = [];
  for (let i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] !== bracketsConfig[i][1]) {
      openBracket.push(bracketsConfig[i][0]);
    }
  }

  let closedBracket = [];
  for (let j = 0; j < bracketsConfig.length; j++) {
    if (bracketsConfig[j][0] !== bracketsConfig[j][1]) {
      closedBracket.push(bracketsConfig[j][1]);
    }
  }

  if (typeof str !== 'string' || str.length < 2 || str.length % 2 !== 0) {
    return false;
  }

  let stack = [];

  for (let s = 0; s < str.length; s++) {

    let topElement = stack[stack.length - 1];

    if (identicalPair.includes(str[s])) {
      if (str.length === 2 && str[0] === str[1]) {
        return true;
      } else if (topElement === undefined) {
        stack.push(str[s])
      } else if (openBracket.includes(topElement)) {
        stack.push(str[s]);
      } else if (topElement === str[s]) {
        stack.pop();
      }
    }

    if (openBracket.includes(str[s])) {
      stack.push(str[s]);
      } else if (closedBracket.includes(str[s])) {
      if (stack.length === 0) {
        return false;
      }

      if (topElement === bracketsPair[str[s]]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}