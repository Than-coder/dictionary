export function get_store(key) {
  let value = window.localStorage.getItem(key);
  if (!value) return null;
  return value;
}

export function set_store(key, value) {
  // return new Promise((resolve,reject)=>{
  //     window.localStorage.setItem(key,value);
  //     resolve('added');
  // })
  window.localStorage.setItem(key, value);
  return "success";
}
