import { useRef, useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import * as monaco from "https://esm.sh/monaco-editor@0.34.1";

export function MonacoEditor() {

  const ref = useRef(null);

  useEffect(() => {
    if (IS_BROWSER && ref.current) {
      monaco.editor.create(ref.current, {
        value: 'true',
        language: 'yaml',
      })
    }
  }, [ref]);

  return <div id="editor-container" ref={ref}></div>
}

export default MonacoEditor;
