import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import SignIn from "./sign_in";
import DeletePost from "./delete_post";
import Panel from "./panel";
import PrivateRoute from "../utils/private_route";
import AdminBlogPage from "./admin_blog_page";
import BlogPageChanger from "../blog/blog_page_changer";
import EditPost from "./edit_post";

import { default_blog } from "../../data/blog";

import useBlogEntries from "../../hooks/useBlogEntries";
import { posts_per_page } from "../blog/index";

import useBg from "../../hooks/useBg";

const AdminPanel = () => {
  const location = useLocation();
  useBg("#FFFFFF");

  const [pages, page_no, set_page_no, blog_entries, loading] = useBlogEntries(
    posts_per_page
  );

  const split_path = location.pathname.split("/");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/admin/"}
        c={
          <>
            <BlogPageChanger
              current_page={page_no}
              set_page={set_page_no}
              total_pages={pages}
            />
            <Panel loading={loading} blog_entries={blog_entries} />
          </>
        }
      />
      <Route exact path={"/admin/sign-in"}>
        <SignIn />
      </Route>
      <PrivateRoute
        path={"/admin/*/delete"}
        c={<DeletePost blog_name={split_path[split_path.length - 2]} />}
      />
      <PrivateRoute
        path={"/admin/new"}
        c={<AdminBlogPage blog={default_blog()} show_url />}
      />
      <PrivateRoute
        path={"/admin/blog/*"}
        c={<EditPost blog_path={split_path[split_path.length - 1]} />}
      />
    </Switch>
  );
};

export default AdminPanel;