module.exports.random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
module.exports.capital = (string) => {
    return string[0].toUpperCase()+string.substring(1)
}