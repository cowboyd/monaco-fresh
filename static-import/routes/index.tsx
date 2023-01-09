import { Head } from "$fresh/runtime.ts";
import MonacoEditor from "../islands/monaco-editor.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Monaco Editor: static</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          This page fails to render on the server.
        </p>
        <MonacoEditor/>
      </div>
    </>
  );
}
