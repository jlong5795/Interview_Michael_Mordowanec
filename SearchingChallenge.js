// Have the function BracketMatcher(str) take the str parameter being passed and return 1 if the brackets are correctly matched and each one is accounted for. Otherwise return 0. For example: if str is "(hello (world))", then the output should be 1, but if str is "((hello (world))" the the output should be 0 because the brackets do not correctly match up. Only "(" and ")" will be used as brackets. If str contains no brackets return 1.

function SearchingChallenge(str) {

    // code goes here  
    const openBracket = '(';
    const closingBracket = ')';
    let openCount = 0;

    Array.from(str).map((char) => {
        if (char === openBracket) {
            openCount++;
        } else if (char === closingBracket) {
            openCount--
        }
        if (openCount < 0) {
            return 0;
        }
    });
    return openCount === 0 ? 1 : 0;
}

// keep this function call here 
console.log(SearchingChallenge(readline()));
