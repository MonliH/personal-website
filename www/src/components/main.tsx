import React, { lazy, Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "../history";
import Err from "./error";
import Loading from "./loading";

import { Globals } from "react-spring";

// Disable animations if firefox resist fingerprinting is on
// Really laggy/buggy if it's on
if (performance.mark && performance.getEntries) {
  performance.mark("dummy_check");
  const entries = performance.getEntries();
  Globals.assign({
    skipAnimation: entries && entries.length === 0,
  });
}

const Blog = lazy(() => import("./blog/index"));
const AdminPanel = lazy(() => import("./admin/index"));
const Home = lazy(() => import("./home/index"));
const ThankYouContact = lazy(() => import("./thank_you"));

const Main = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
          <Route path="/thank-you-contact">
            <ThankYouContact />
          </Route>
          <Route path="*">
            <Err />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Main;
