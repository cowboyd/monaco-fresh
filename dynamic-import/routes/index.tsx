import { Head } from "$fresh/runtime.ts";
import MonacoEditor from "../islands/monaco-editor.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Monaco Island: Dynamic</title>
      </Head>
      <div>
        <img
          src="/logo.svg"
          width="128"
          height="128"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p>
          Open up the developer console in order to see the CORS error. In some cases, there may be partial functionality.
        </p>
        <MonacoEditor/>
      </div>
    </>
  );
}
