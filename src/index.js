import h from "hyperscript";
import hh from "hyperscript-helpers";
import "./styles.css";

const { div, button } = hh(h);

const count = 0;

const INCREMENT = "plus";

const DECREMENT = "minus";

function view(dispatch, model) {
  return div([
    div(`Count: ${model}`),
    button(
      "+",
      { className: "f6 link dim br2 ph3 pv2 mb2 dib white bg-near-black" },
      { onclick: () => dispatch(INCREMENT) }
    ),
    button(
      "-",
      { className: "f6 link dim br2 ph3 pv2 mb2 dib white bg-near-black" },
      { onclick: () => dispatch(DECREMENT) }
    )
  ]);
}

function update(msg, model) {
  switch (msg) {
    case INCREMENT:
      return model + 1;
    case DECREMENT:
      return model - 1;
    default:
      return model;
  }
}

function app(update, view, count, node) {
  let model = count;
  let currentView = view(dispatch, model);
  node.appendChild(currentView);
  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    node.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}

const rootNode = document.getElementById("app");

app(update, view, count, rootNode);
