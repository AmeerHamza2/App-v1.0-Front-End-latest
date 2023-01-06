import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "fontsource-roboto";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";


Sentry.init({
  dsn: "https://a680520d13d94cc2841a1fc5de3a4512@o4504142230716416.ingest.sentry.io/4504142232551424", //paste copied DSN value here
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0, //lower the value in production
});


ReactDOM.render(
  <Router>
    <SnackbarProvider maxSnack={2}>
      <App />
    </SnackbarProvider>
  </Router>,

  document.getElementById("root")
);
