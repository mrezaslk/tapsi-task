import { AppRoutes } from "@client/Routes/AppRoutes";
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { initialData } from "@shared/types";
import { InitialDataProvider } from "@client/context/InitialDataContext";

export function renderHtml(url: string, initialData: initialData) {
  const app = (
    <StaticRouter location={url}>
      <InitialDataProvider value={initialData}>
        <AppRoutes />
      </InitialDataProvider>
    </StaticRouter>
  );
  const appHtml = ReactDOMServer.renderToString(app);
  const initialDataJson = JSON.stringify(initialData).replace(/</g, "\\u003c");
  const html = `
  <!doctype html>
  <html lang="fa">
    <head>
      <meta charset="utf-8" />
      <title>تپسی دکتر:مشاوره آنلاین|لیست پزشکان انلاین</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <!-- Vite dev client for HMR/react-refresh -->
      <script type="module" src="http://localhost:5173/@vite/client"></script>
      <!-- React Refresh preamble (required for @vitejs/plugin-react-swc in SSR HTML) -->
      <script type="module">
        import RefreshRuntime from "http://localhost:5173/@react-refresh";
        RefreshRuntime.injectIntoGlobalHook(window);
        window.$RefreshReg$ = () => {};
        window.$RefreshSig$ = () => (type) => type;
        window.__vite_plugin_react_preamble_installed__ = true;
      </script>
    </head>
    <body dir="rtl">
      <div id="root">${appHtml}</div>
       <script>
        window.__INITIAL_DATA__ = ${initialDataJson};
      </script>
      <!-- Client entry -->
      <script type="module" src="http://localhost:5173/src/client/main.tsx"></script>
    </body>
  </html>
  `;
  return html;
}
