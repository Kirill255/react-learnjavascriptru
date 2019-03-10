import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import CommentsPagination from "../CommentsPagination";

// main component
const CommentsPage = ({ match }) => {
  if (match.isExact) return <Redirect to="/comments/1" />;
  return <Route path="/comments/:page" render={getCommentsPaginator} />;
};

// handle component
const getCommentsPaginator = ({ match }) => {
  return <CommentsPagination page={match.params.page} />;
};

CommentsPage.propTypes = {};

export default CommentsPage;
