module.exports = () => {
    const aZ = 'abcdefghijklmnopqrstuvwxyz';
    const array = aZ.split('').map((n) => {
        let set1 = aZ[Math.floor(Math.random() * 26)];
        let set2 = aZ.indexOf(`${n}`);
        return set1.concat(Math.floor(Math.random() * set2));
    }).join('');
    const keyArray = array.match(/.{1,4}/g).join('-');
    console.info("New Connection! ssKey was be created:", keyArray);
    return keyArray;
}
