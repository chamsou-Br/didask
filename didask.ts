document.getElementById("start")?.addEventListener("click", () => {
    start();
  });
  

  
  // Function to render Markdown content in chunks
  const renderMarkdown = (chunk: string): void => {

    const markdownContainer = document.getElementById("markdown-output") as HTMLElement;

    const codeBlocks = (chunk.match(/```([\s\S]*?)```/g) || [] ).map(block => block.replace(/```/g, '').trim())
  
    const newChunk = chunk.replace(/```[\s\S]*?```/g, "__multi__").trim();
  
    const lines = newChunk.split("\n");
    lines.forEach((line, i) => {
      if (line.trim() === "__multi__") {
        const multiline = codeBlocks.pop() || "";
        let pre = document.createElement("pre");
        multiline.split("\n").forEach((line : string) => {
          pre.textContent += line ? line.trim() + "\n" : "\n";
        });
        markdownContainer!.appendChild(pre);
      } else {
        const htmlElement = parseMarkdownLine(chunk, line.trimStart(), i);
        if (htmlElement) markdownContainer!.appendChild(htmlElement);
      }
    });
  }
  
  // Parse a line of Markdown and return an HTML element
  const parseMarkdownLine = (chunk: string, line: string, i: number): HTMLElement | undefined => {
    if (!line) return;
  
    if (line.startsWith("###")) {
      return createHTMLElement("h3", line.slice(4));
    } else if (line.startsWith("##")) {
      return createHTMLElement("h2", line.slice(3));
    } else if (line.startsWith("#")) {
      return createHTMLElement("h1", line.slice(2));
    }
  
    const match = line.match(/^(.*?)(`[^`]+`)(.*)$/);
  
    if (match) {
      const beforeCode = match[1];
      const codeContent = match[2].slice(1, -1); 
      const afterCode = match[3];
  
      const div = document.createElement("div");
      div.textContent = beforeCode;
  
      const pre = document.createElement("pre");
      pre.style.display = "inline";
      pre.textContent = codeContent;
  
      div.appendChild(pre);
      div.append(afterCode);
  
      return div;
    }
  
    const divAnc = document.getElementById(`line_${i - 1}`);
    if (divAnc && divAnc.tagName === "DIV") {
      divAnc.textContent += " " + line;
    } else {
      return createHTMLElement("div", line, `line_${i}`);
    }
  }
  
  // Helper function to create an HTML element with optional ID
  const  createHTMLElement = (tagName: string, text: string, id: string = ""): HTMLElement =>{
    const element = document.createElement(tagName);
    element.textContent = text;
    if (id) element.id = id;
    return element;
  }
  

  
  // Start function to simulate chunked rendering
  async function start(): Promise<void> {

    const markdownString : string = `# Hello World

    Let's start with simple
    things.  
    Some code: \`console.log('Hello World')\`
    
    ### Getting harder
    
    Some more code:
    \`\`\`js
    const foobar = 42
    
    const barfoo = 24
    \`\`\`
    `

    const rawMarkdown = document.getElementById("markdown") as HTMLElement;
    renderMarkdown(markdownString);
  
    for (let i = 0; i < markdownString.length; ) {
      const chunkSize = Math.floor(Math.random() * 5) + 1;
      const chunk = markdownString.slice(i, i + chunkSize);
      rawMarkdown.textContent += chunk;
      i += chunkSize;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  