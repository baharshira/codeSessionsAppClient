import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';

// Importing Prism for highlighting
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // Example for the Okaidia theme
import 'prismjs/components/prism-javascript';
import './CodeBlock.css';

// Initializing the socket connection
const socket = io('https://code-session-app-server.onrender.com'); // The Server's app URL, I used render to deploy the server

// CodeBlock component for displaying and editing code
const CodeBlock = (props) => {
    const codeRef = useRef(null);
    const savedSelectionRef = useRef(null);

    // Function to save the current text selection
    const saveSelection = () => {
        if (window.getSelection) {
            const sel = window.getSelection();
            if (sel.rangeCount > 0) {
                return sel.getRangeAt(0).cloneRange();
            }
        }
        return null;
    };

    // Function to restore a saved text selection
    const restoreSelection = (range, codeElement) => {
        if (range && window.getSelection && codeElement) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    };

    // Effect to set the initial code and highlight with Prism
    useEffect(() => {
        // Set initial code
        if (codeRef.current) {
            codeRef.current.textContent = props.code;
        }
        Prism.highlightAll();
    }, [props.code]); // Only re-run if props.code changes

    // Event handler for code changes
    const handleCodeChange = () => {
        savedSelectionRef.current = saveSelection();
        props.setSolution(codeRef.current.textContent);
        socket.emit('codeChange', codeRef.current.textContent);
    };

    // Effect to restore the text selection after each render
    useEffect(() => {
        if (savedSelectionRef.current && codeRef.current) {
            restoreSelection(savedSelectionRef.current, codeRef.current);
            savedSelectionRef.current = null;
        }
    }); // This effect runs on every render

    // Effect to handle code updates from the socket
    useEffect(() => {
        socket.on('codeUpdate', (updatedCode) => {
            if (codeRef.current) {
                codeRef.current.textContent = updatedCode;
                Prism.highlightAll();
            }
        });
    }, []);

    // Rendering the CodeBlock component with an editable code
    return (
        <pre>
            <code
                ref={codeRef}
                className="language-js"
                contentEditable
                spellCheck={false}
                onInput={handleCodeChange}
                suppressContentEditableWarning={false}
                onBlur={()=>{
                    Prism.highlightAll()
                }}
            >
                {/* Content is set directly via DOM */}
            </code>
        </pre>
    );
};

export default CodeBlock;
