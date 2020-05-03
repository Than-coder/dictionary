import React from "react";
import { useStoreState } from "easy-peasy";

import Result from "../components/ResultList";

function Home() {
  const dictionary = useStoreState(state => state.Dict.dictionary);
  return (
    <div>
      <Result result={dictionary} />
    </div>
  );
}

export default Home;
