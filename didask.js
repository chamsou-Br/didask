var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
(_a = document.getElementById("start")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    start();
});
// Function to render Markdown content in chunks
var renderMarkdown = function (chunk) {
    var markdownContainer = document.getElementById("markdown-output");
    var codeBlocks = (chunk.match(/```([\s\S]*?)```/g) || []).map(function (block) { return block.replace(/```/g, '').trim(); });
    var newChunk = chunk.replace(/```[\s\S]*?```/g, "__multi__").trim();
    var lines = newChunk.split("\n");
    lines.forEach(function (line, i) {
        if (line.trim() === "__multi__") {
            var multiline = codeBlocks.pop() || "";
            var pre_1 = document.createElement("pre");
            multiline.split("\n").forEach(function (line) {
                pre_1.textContent += line ? line.trim() + "\n" : "\n";
            });
            markdownContainer.appendChild(pre_1);
        }
        else {
            var htmlElement = parseMarkdownLine(chunk, line.trimStart(), i);
            if (htmlElement)
                markdownContainer.appendChild(htmlElement);
        }
    });
};
// Parse a line of Markdown and return an HTML element
var parseMarkdownLine = function (chunk, line, i) {
    if (!line)
        return;
    if (line.startsWith("###")) {
        return createHTMLElement("h3", line.slice(4));
    }
    else if (line.startsWith("##")) {
        return createHTMLElement("h2", line.slice(3));
    }
    else if (line.startsWith("#")) {
        return createHTMLElement("h1", line.slice(2));
    }
    var match = line.match(/^(.*?)(`[^`]+`)(.*)$/);
    if (match) {
        var beforeCode = match[1];
        var codeContent = match[2].slice(1, -1);
        var afterCode = match[3];
        var div = document.createElement("div");
        div.textContent = beforeCode;
        var pre = document.createElement("pre");
        pre.style.display = "inline";
        pre.textContent = codeContent;
        div.appendChild(pre);
        div.append(afterCode);
        return div;
    }
    var divAnc = document.getElementById("line_".concat(i - 1));
    if (divAnc && divAnc.tagName === "DIV") {
        divAnc.textContent += " " + line;
    }
    else {
        return createHTMLElement("div", line, "line_".concat(i));
    }
};
// Helper function to create an HTML element with optional ID
var createHTMLElement = function (tagName, text, id) {
    if (id === void 0) { id = ""; }
    var element = document.createElement(tagName);
    element.textContent = text;
    if (id)
        element.id = id;
    return element;
};
// Start function to simulate chunked rendering
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var markdownString, rawMarkdown, i, chunkSize, chunk;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    markdownString = "# Hello World\n\n    Let's start with simple\n    things.  \n    Some code: `console.log('Hello World')`\n    \n    ### Getting harder\n    \n    Some more code:\n    ```js\n    const foobar = 42\n    \n    const barfoo = 24\n    ```\n    ";
                    rawMarkdown = document.getElementById("markdown");
                    renderMarkdown(markdownString);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < markdownString.length)) return [3 /*break*/, 4];
                    chunkSize = Math.floor(Math.random() * 5) + 1;
                    chunk = markdownString.slice(i, i + chunkSize);
                    rawMarkdown.textContent += chunk;
                    i += chunkSize;
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
