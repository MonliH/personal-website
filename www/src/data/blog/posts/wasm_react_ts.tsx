import React from "react";
import { BlogEntry } from "../entries";

export const entry: BlogEntry = {
  title: "Setting up a WASM + React + TypeScript project",
  contents: (
    <div>
      I love writing{" "}
      <a href="https://www.rust-lang.org/" rel="noopener noreferrer" target="_blank">
        Rust
      </a>
      . Recently, I've gotten interested in using Rust for web development, via
      web assembly (WASM). It turns out setting up WASM with React and
      TypeScript is harder than it looks&mdash;that's why I'm writing this post.
    </div>
  ),
  date: new Date("2020-09-25"),
  url: "wasm-react-ts",
};
