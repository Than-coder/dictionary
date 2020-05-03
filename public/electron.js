const electron  = require('electron');
const path = require('path');
const is_dev = require('electron-is-dev')

const { app,BrowserWindow,Menu,dialog:{showMessageBox} } = electron;

let mainWindow;


function init(){
    mainWindow = new BrowserWindow({
        title:'English Myanmar Dictionary',
        icon:path.join(__dirname,'icon/icon.png'),
        minWidth:600,
        minHeight:400,
        width:600,
        height:400,
        webPreferences:{
            nodeIntegration:true
        }
    });
    // dev
    if(is_dev){
      mainWindow.loadURL('http://localhost:3000');
      mainWindow.webContents.openDevTools();
    }else{
      //load html
      mainWindow.loadFile(path.join(__dirname,'index.html'));
    }
    //menu 
    const menu = [
        {
          label:'File',
          submenu:[
            {
              label:'DB',
              submenu:[
                {
                  label:'Choose DB File',
                  click(){
                    mainWindow.webContents.send('open-file');
                  }
                }
              ]
            },
            {
              label:'Exit',
              accelerator:'Ctrl+Q',
              click(){
                app.quit();
              }
            }
          ]
        },
        {
          label:'View',
          submenu:[
            {role:'reload'},
            {role:'toggledevtools'}
          ]
        },
        {
          label:'Help',
          submenu:[
            {
              label:'About',
              click(){
                show_about();
              }
            }
          ]
        }
    ]
    // build menu
    const buildMenu = Menu.buildFromTemplate(menu);
    // set menu
    Menu.setApplicationMenu(buildMenu);
    // development
    // mainWindow.webContents.openDevTools(); 
    // when main window close all window close
    mainWindow.on('closed',()=>{
      app.quit();
      addWindow = null;
    })
    
};

// show about
function show_about(){
  showMessageBox(null,{
    title:'About',
    type:'info',
    message:'English Myanmar Dictionary',
    detail:`
      Version:1.0.0
      Developed By: Than
      Eelctron: 7.1.12
    `,
    buttons:['OK']
  },e =>{
    // console.log(e)
  });
}

app.on('ready',init);