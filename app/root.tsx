import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import PastedTextContext from "./context/PastedText";

export default function App() {
  const [pastedText, setPastedText] = useState<string>("");
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body onPaste={(ev) => {
        setPastedText(ev.clipboardData.getData("text/html"))
      }}>
        <PastedTextContext.Provider value={pastedText}><Outlet /></PastedTextContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
