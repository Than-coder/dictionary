const electron = require('electron');
const fs = require('fs');

// new db
const Database = require('../db/index');
// dom
function _(data){
  return document.querySelector(data);
}
const { remote:{dialog} } = electron;
let dict;

// init
function init(){
  let dictPath = window.localStorage.getItem('dict-path');
  try{
    // check dictionary file path
    fs.lstatSync(dictPath).isFile();

    if(dictPath){
      dict = new Database(dictPath,'dictionary');
    }else{
      dict = undefined; 
      window.localStorage.setItem('dict-path',null);
    }
  }catch(err){
    dict = undefined;
    window.localStorage.setItem('dict-path',null); 
  }

}

let isAddWord = null;

async function searchWord(value){
  if(value == '') return _('.add-eng').style.background = '#fff';
  // search word
  let rows = await dict.findWord(value);
  if(rows){
    _('.add-eng').style.background = 'red';
    isAddWord = false;
  }else{
    _('.add-eng').style.background = '#fff';
    isAddWord = true;
  }
  
}

// add word
async function addFormSubmit(e){
  e.preventDefault();
  const word = _('.add-eng').value;
  const mm = _('.add-mm').value;
  if(!word || !mm) return window.alert('please fill all fields');
  if(isAddWord === true){
    // set db
    try{
      await dict.addDict(word,mm);
      _('.add-eng').value = '';
      _('.add-mm').value = '';
      // alert success
      window.alert('dictionary word added');
    }catch(err){
      console.log(err);
    }
  }
}


// event listener
_('.add-eng').addEventListener('input',e =>{
  setTimeout(()=>{
    searchWord(e.target.value);
  },500);
})

_('.add-form').addEventListener('submit',addFormSubmit);

window.onload = init();
