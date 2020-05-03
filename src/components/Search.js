import React, { useState, useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import { find_db_confirm } from "../electron/index";

import { get_store } from "../storage";

function Search() {
  const [text, setText] = useState("");
  const engSearch = useStoreActions(action => action.Dict.engSearch);

  useEffect(() => {
    let store_url = get_store("db_url");
    if (!store_url) {
      window.M.toast({ html: "store url not found" });
    }
  }, []);

  const onChange = e => {
    let value = e.target.value;

    setText(value);

    let store_url = get_store("db_url");
    if (!store_url) {
      window.M.toast({ html: "store url not found" });
      find_db_confirm();
    } else {
      // search db
      engSearch({ text: value, db_url: store_url });
    }
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="input-field">
        <input
          type="search"
          onChange={e => onChange(e)}
          value={text}
          id="search"
          placeholder="Search Word..."
          autoFocus
        />
        <label htmlFor="search" className="label-icon">
          <i className="material-icons">search</i>
        </label>
        <i className="material-icons">close</i>
      </div>
    </form>
  );
}

export default Search;
