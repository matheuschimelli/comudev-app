import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';

function Editor() {
    return (
        <CodeMirror
          value="console.log('hello world!');"
          height="700px"
          width = "auto"
          theme={dracula}
          extensions={[javascript({ jsx: true })]}
          onChange={(value, viewUpdate) => {
            console.log('value:', value);
          }}
        />
      );
}
export default Editor;