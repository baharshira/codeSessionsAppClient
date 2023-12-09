import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // Example for the Okaidia theme
import 'prismjs/components/prism-javascript';
import './CodeBlock.css';


//const socket = io('http://localhost:3001');
const socket = io('https://code-session-app-server.onrender.com');




const CodeBlock = (props) => {
    const codeRef = useRef(null);
    const savedSelectionRef = useRef(null);

    const saveSelection = () => {
        if (window.getSelection) {
            const sel = window.getSelection();
            if (sel.rangeCount > 0) {
                return sel.getRangeAt(0).cloneRange();
            }
        }
        return null;
    };

    const restoreSelection = (range, codeElement) => {
        if (range && window.getSelection && codeElement) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    };

    useEffect(() => {
        // Set initial code
        if (codeRef.current) {
            codeRef.current.textContent = props.code;
        }
        Prism.highlightAll();
    }, [props.code]); // Only re-run if props.code changes

    // const handleCodeChange = () => {
    //     props.setSolution(codeRef.current.textContent);
    //     const saveSelectionResult = saveSelection();
    //     console.log(`saveSelectionResult is: ${saveSelectionResult}`)
    //     savedSelectionRef.current = saveSelectionResult;
    //     // console.log(`Sending code change: ${codeRef.current.textContent}`)
    //     socket.emit('codeChange', codeRef.current.textContent);
    //     // No need to update state here
    // };

    const handleCodeChange = () => {
        savedSelectionRef.current = saveSelection();
        props.setSolution(codeRef.current.textContent);
        socket.emit('codeChange', codeRef.current.textContent);
    };

    useEffect(() => {
        if (savedSelectionRef.current && codeRef.current) {
            restoreSelection(savedSelectionRef.current, codeRef.current);
            savedSelectionRef.current = null;
        }
    }); // This effect runs on every render

    useEffect(() => {
        socket.on('codeUpdate', (updatedCode) => {
            if (codeRef.current) {
                codeRef.current.textContent = updatedCode;
                Prism.highlightAll();
            }
        });
    }, []);

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
