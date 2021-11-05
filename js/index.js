const ASCII_LENGTH = 256;

const onEncrypt = _=>{
    const text = document.getElementById('text').value;
    const key = document.getElementById('key').value;
    const keyFilled = fillKey(text.length, key);
    document.getElementById('encrypted').textContent = encrypt(text, keyFilled);
}
const onDecrypt = _ =>{
    const text = document.getElementById('encrypted').value;
    const key = document.getElementById('key').value;
    const keyFilled = fillKey(text.length, key);
    const decrypted = decrypt(text, keyFilled);
    document.getElementById('decrypted').value = decrypted;
}

const fillKey = (plainTextLength, key)=>{
    // key is the same lenght as the plain text
    if(key.length>plainTextLength) return key.substr(0,plainTextLength);
    else{
        // key needs to be filled
        let keyFilled = key;
        let index = 0;
        while(keyFilled.length<plainTextLength){
            keyFilled+=key[index];
            if(index===(key.length-1)) index = 0;
            else index++;
        }
        return keyFilled;
    }
}

const encrypt = (text, key)=>{
    const encrypted = [...text].map((character, i)=>{
        const charCode = (character.charCodeAt(0) + key[i].charCodeAt(0)) % ASCII_LENGTH;
        return String.fromCharCode(charCode);
    });
    return encrypted.join('');
}

const decrypt = (text, key) =>{
    const decrypted = [...text].map((character,i)=>{
        const charAC = character.charCodeAt(0); // Ascii code of the character
        const keyAC = key[i].charCodeAt(0); // Ascii code of the key at index i
        return (charAC - keyAC)>=0 
            ? String.fromCharCode((charAC - keyAC) % ASCII_LENGTH)
            : String.fromCharCode((charAC - keyAC + ASCII_LENGTH) % ASCII_LENGTH);
    });
    return decrypted.join('');
}

const init = ()=>{
    document.getElementById('btn_encrypt').addEventListener('click', onEncrypt)
    document.getElementById('btn_decrypt').addEventListener('click', onDecrypt)
}

init();