import { Operation, action, expect, run, resource, suspend } from "https://raw.githubusercontent.com/cowboyd/instructional-effection/v0.0.0/mod.ts";
import { serve, Handler } from "https://deno.land/std@0.155.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.117.0/http/file_server.ts";

await run(function*() {
  yield* useServer((req) => serveFile(req, "./index.html"));

  yield* action<void>(function*(resolve) {
    try {
      Deno.addSignalListener('SIGINT', resolve);
      yield* suspend();
    } finally {
      Deno.removeSignalListener('SIGINT', resolve);
    }
  });
});

function useServer(handler: Handler): Operation<void> {
  return resource(function* (provide) {
    let controller = new AbortController();
    let closed = serve(handler, { signal: controller.signal });
    try {
      yield* provide();
    } finally {
      controller.abort();
      yield* expect(closed);
    }
  })
}
