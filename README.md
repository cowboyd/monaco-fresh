## Monaco (VSCode) Editor in Fresh.

This repository is an attempt to embed the [Monaco][] editor which powers
[VSCode][] as an island into the [Fresh][] framework.

There are two failure modes demonstrated here.

## Static Import

The editor cannot imported into an island because the `monaco-editor`
module contains a static reference to `document`, and so any island
that even imports the monaco editor will fail on server side
render. Technically, I'd rate this as a problem with Monaco and not
Fresh since you should at least be able to evaluate an ES module
without it blowing up. However, "bad behaving" modules are a fact of
life, and it would be nice to have some sort of workaround when we
encounter them.

To reproduce this issue, cd into the `static-import` directory and run
`deno task start`. When you load the site, you should see a server
side stack trace where the monaco editor module fails to load because
it is trying to access the `document` in a static context.

``` shellsession
$ cd static-import
$ deno task start
Task start deno run -A --watch=static/,routes/ dev.ts
Watcher Process started.
The manifest has been generated for 3 routes and 1 islands.
error: Uncaught ReferenceError: document is not defined
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:17:6542
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:2:450
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:17:39525
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:2:450
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:17:48749
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:2:450
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:608:218
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:2:450
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:608:9871
    at https://esm.sh/v102/monaco-editor@0.34.1/deno/monaco-editor.js:2:450
Watcher Process finished. Restarting on file change...
```

## Dynamic Import

An alternative to avoid the static import prolem is to dynamically
import the editor module only on the client. However, this also fails
in Safari, and in some cases on Chrome due to a CORS errror. It's
unclear if this is a problem with Monaco, Fresh, [esm.sh][] or a
combination of all three together.

To reproduce this issue, cd into the `dynamic-import` directory before
running `deno task start`. When you open the page, the server should
render the page successfully, but then when the island is running on
the client, it fails to load the `monaco-editor` module from `esm.sh`
because of a CORS error. You should see something like this in your
developer console.

``` text
Access to script at 'https://esm.sh/v102/monaco-editor@0.34.1/es2022/monaco-editor.js' from origin 'https://playground.esm.sh' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
monaco-editor.js:1          Failed to load resource: net::ERR_FAILED
```

In your developer console.

[Monaco]: https://microsoft.github.io/monaco-editor
[VSCode]: https://code.visualstudio.com
[Fresh]: https://fresh.deno.dev
[esm.sh]: https://esm.sh
