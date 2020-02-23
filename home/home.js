const electron = require('electron');
const fs = require('fs');
// new db
const Database = require('../db/index');
// u to z
const word_arr = require('../db/word_arr')

// dom
function _(data){
  return document.querySelector(data);
}
// electron 
const { remote:{dialog},ipcRenderer } = electron;


class Dictionary {
  static Main(){
    this.dict = null;
  }

  static Init(){
    let dictPath = window.localStorage.getItem('dict-path');
    try{
      // check dictionary file path
      fs.lstatSync(dictPath).isFile();

      if(dictPath){
        this.dict = new Database(dictPath,'dictionary');
      }else{
        this.dict = undefined; 
        window.localStorage.setItem('dict-path',null);
      }
    }catch(err){
      this.dict = undefined;
      window.localStorage.setItem('dict-path',null); 
    }
  }

  static show_word(rows){
  //reclear
   _('.found-word').innerHTML = '';
  //init
  let li = '';
  //loop
  rows.forEach(row =>{
    li += `
      <li>
				<strong>English:</strong>
				${row.word}
				<br />
				<strong>Myanmar:</strong>
				${row.definition}
				<br />
      </li>
    `;
  })
  if(rows.length == 0){
    li = `
      <li>
				<h3>Not Found Word!</h3>
      </li>
    `;
  }
  //set html
  _('.found-word').innerHTML = li;
  }

  static async changeSearchInput(word){
    try {
      if(word == '') return _('.found-word').innerHTML = '';
      
      word = word.replace(' ','');
      let words = [];
      if(this.check_len(word)){
        // search english
        words = await this.dict.search_word(word);
      }else{
        // search myanmar
        words = await this.dict.search_mm(word);
      }

      // show word
      this.show_word(words);
    } catch (err) {
      console.log(err);
    }
  }

  static check_len(word){
    return word_arr.find(w => w == word[0])
    
  }


}


// open file
ipcRenderer.on('open-file',(e)=>{
  // open file
  const file = dialog.showOpenDialogSync(
    {
      properties:['openFile'],
      filters: [
        { name: 'Sqlite3 File', extensions: ['db'] },
      ]
    }
  );

  if(file){
    //set local storage
    window.localStorage.setItem('dict-path',file[0]);
    // call init
    Dictionary.init();
  }
})

// history clear
ipcRenderer.on('history-clear',e =>{
  window.localStorage.removeItem('word-history');
  Dictionary.showWordHistory();
})

// search form submit
_('#form').addEventListener('submit',async (e)=>{
  e.preventDefault();

  let text = _('#search-word').value;
  if(text === '') return false;
  
  Dictionary.changeSearchInput(text);

})

// event listener
_('#search-word').addEventListener('input',(e)=>{
  setTimeout(()=>{
    if(e.target.value == ''){
      _('.found-word').innerHTML = '';
    }
    Dictionary.changeSearchInput(e.target.value);
  },300);
});


// window init
Dictionary.Main();

window.onload = ()=>{
  Dictionary.Init();
}

window.addEventListener('focus',e =>{
  _('#search-word').value = '';
  _('#search-word').focus()
  document.execCommand('paste');
})