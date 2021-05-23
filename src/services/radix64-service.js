const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
const ALPHABET_MAP = {}

ALPHABET.split("").forEach((i,v)=>{
    ALPHABET_MAP[i] = v
})

function int2radix64(num){
    let q = num
    let chars = []
    while(q>0){
        let r = q%64
        chars.push(ALPHABET.charAt(r))
        q = parseInt(q/64)
    }
    return chars.reverse().join("")
}

function radix64toint(s){
    let chars = s.split("").reverse()
    let sum = 0
    for(let i=0;i<chars.length;i++){
        sum+=ALPHABET_MAP[chars[i]]*Math.pow(64,i)
    }
    return sum
}

module.exports = {
    int2radix64,
    radix64toint
};


