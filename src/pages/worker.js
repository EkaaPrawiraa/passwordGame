onmessage = function(event) {
    const { words, sleepDuration } = event.data;
    let tempWords = words;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function burnLetters() {
        // let index = tempWords.length - 1;
        while (tempWords.includes('🔥')) {
            console.log("sini");
            if (!tempWords.includes('🔥' || tempWords.length()==0)) {
                break;
            } else {
                tempWords = tempWords.slice(0, -3) + '🔥';
                postMessage({ tempWords });
                await sleep(sleepDuration);
            }
        }
        postMessage({ done: true });
    }

    burnLetters();
};
