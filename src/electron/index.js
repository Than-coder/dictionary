const electron = window.require("electron");
// import electron from "electron";

const {
  remote: {
    dialog: { showOpenDialogSync, showMessageBoxSync }
  },
  ipcRenderer
} = electron;

export function get_db_path() {
  let dir = showOpenDialogSync({
    properties: ["openFile"],
    filters: [{ name: "DB File", extensions: ["sqlite", "db"] }]
  });
  if (dir) {
    return dir[0];
  } else {
    return null;
  }
}

export function find_db_confirm() {
  let res = showMessageBoxSync(null, {
    title: "Find DB Path",
    buttons: ["Find", "Cancel"],
    detail: `DB URL Not Found!!!`,
    defaultId: 0
  });
  if (res === 0) {
    let db_path = get_db_path();

    if (db_path) {
      window.localStorage.setItem("db_url", db_path);
      window.M.toast({ html: "DB Path Choosed" });
    }
  }
}

// listener
ipcRenderer.on("open-file", () => {
  let db_path = get_db_path();

  if (db_path) {
    window.localStorage.setItem("db_url", db_path);
    window.M.toast({ html: "DB Path Choosed" });
  }
});
