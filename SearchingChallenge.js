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
