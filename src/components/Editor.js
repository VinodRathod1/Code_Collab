import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import ACTIONS from '../Actions';
import './Editor.css';

export default function RealtimeCodeEditor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  const [code, setCode] = useState('// Write your code here');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python');

  const languageMap = { python: 71, cpp: 54, javascript: 63, java: 62 };
  // Apply code to editor and emit change
  const applyCode = (newCode, emit = false) => {
    if (newCode === code) return;
    setCode(newCode);
    // Only set editor value for remote updates
    if (!emit && editorRef.current) {
      editorRef.current.setValue(newCode);
    }
    if (emit) {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code: newCode });
      console.log(' Emitted code:', newCode);
      if (typeof onCodeChange === 'function') onCodeChange(newCode);
    }
  };

  // Local typing
  const handleChange = (value) => {
    if (typeof value === 'string') applyCode(value, true);
  };

  // Remote typing
  useEffect(() => {
    const handler = ({ code: remote }) => {
      console.log(' Received code:', remote);
      applyCode(remote, false);
    };
    socketRef.current?.on(ACTIONS.CODE_CHANGE, handler);
    return () => {
      socketRef.current?.off(ACTIONS.CODE_CHANGE, handler);
    };
  }, [socketRef, code]);

  // Keep editorRef on mount
  const handleMount = (editor) => {
    editorRef.current = editor;
    editor.setValue(code);
  };

  // Run button
  const run = async () => {
    const language_id = languageMap[language];
    try {
      const res = await fetch('/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language_id,
          stdin: input,
        }),
      });
      const result = await res.json();
      setOutput(result.stdout || result.stderr || result.compile_output || 'No output.');
    } catch (err) {
      setOutput('❌ ' + err.message);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <select
          className="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>
        <button onClick={run} className="run-button">Run</button>
      </div>

      <Editor
        height="60vh"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={handleChange}
        onMount={handleMount}
        options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
      />

      <div className="editor-io">
        <div className="editor-input">
          <label className="in">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input here"
          />
        </div>

        <div className="editor-output">
          <label className="out">Output</label>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}
