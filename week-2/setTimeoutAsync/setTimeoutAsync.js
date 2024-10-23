function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
    console.log("main is called");
}

setTimeoutPromisified(5000).then(main);