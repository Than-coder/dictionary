import { action, thunk } from "easy-peasy";
import DB from "../electron/sql/index";

export default {
  dictionary: [],
  add: action((state, value) => {
    state.dictionary = value;
  }),
  engSearch: thunk(async (actions, context) => {
    try {
      if (context.text === "") {
        actions.add([]);
        return false;
      }
      DB.main(context.db_url);

      let res = await DB.find_eng(context.text);
      actions.add(res);
    } catch (err) {
      console.log(`DB find word error ${err}`);
    }
  })
};
