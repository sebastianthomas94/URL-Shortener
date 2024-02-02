const randomGen = () => {
    const str = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    const length = process.env.RANDOM_LENGTH || 5;
    let res = ""
    for (let i = 1; i <= length; i++) {
        res += str[Math.floor(Math.random() * str.length)];
    }
    return res;
};

export { randomGen }