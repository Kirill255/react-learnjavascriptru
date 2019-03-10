const { Map, Record, OrderedMap } = require("immutable");
import {
  ADD_COMMENT,
  LOAD_ARTICLE_COMMENTS,
  START,
  SUCCESS,
  LOAD_COMMENTS_FOR_PAGE
} from "../constants";
import { arrToMap } from "../helpers";

const CommentRecord = Record({
  id: null,
  user: null,
  text: null
});

const ReducerState = Record({
  entities: new OrderedMap({}),
  pagination: new Map({}),
  total: null
});

const defaultComments = new ReducerState();

export default (commentsState = defaultComments, action) => {
  const { type, payload, randomId, response } = action;

  switch (type) {
    case ADD_COMMENT:
      return commentsState.setIn(
        ["entities", randomId],
        new CommentRecord({ ...payload.comment, id: randomId })
      );

    case LOAD_ARTICLE_COMMENTS + SUCCESS:
      return commentsState.update("entities", (entities) =>
        entities.merge(arrToMap(response, CommentRecord))
      );

    case LOAD_COMMENTS_FOR_PAGE + START:
      return commentsState.setIn(["pagination", payload.page, "loading"], true);

    case LOAD_COMMENTS_FOR_PAGE + SUCCESS:
      return commentsState
        .set("total", response.total)
        .mergeIn(["entities"], arrToMap(response.records, CommentRecord))
        .setIn(["pagination", payload.page, "ids"], response.records.map((comment) => comment.id))
        .setIn(["pagination", payload.page, "loading"], false);
  }

  return commentsState;
};
