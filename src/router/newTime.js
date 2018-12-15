function getNow(){
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = time.getDate();
    let newTime = year + '/' + month + '/' + day;
    return newTime;
}

module.exports = getNow;