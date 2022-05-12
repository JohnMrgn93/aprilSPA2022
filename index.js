import { Header, Nav, Main, Footer } from "./components";
import * as Store from "./Store";
import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo("/");

function render(state = Store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav(Store.Links)}
    ${Main(state)}
    ${Footer()}
  `;
  router.updatePageLinks();
  AfterRender();
}

function AfterRender() {
  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
}

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(Store[view]);
    }
  })
  .resolve();
