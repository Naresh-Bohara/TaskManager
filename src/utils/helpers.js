const generateRandomString = (len = 100) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = chars.length;
    let random = ""; 
    for (let i = 0; i < len; i++) {
        const randomPosition = Math.floor(Math.random() * length);
        random += chars[randomPosition];
    }
    return random;
};

export {generateRandomString}
