// Initialize Ace editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight"); /* Use a dark theme for the editor */
//editor.session.setMode("ace/mode/javascript");

// Custom function to display output in the output area
function write(...args) {
  var outputElement = document.getElementById("output");
  var message = args.map(arg => String(arg)).join(" "); // Convert all arguments to strings and join them
  outputElement.textContent += message + "\n"; // Append the message to the output area
}
// Custom function to clear the output area
function clear(...args) {
  var outputElement = document.getElementById("output");
  outputElement.textContent = "";
}

// Function to run the code using eval
function runCode() {
  clearOutput();
  var code = editor.getValue();
  var outputElement = document.getElementById("output");

  try {
    var compiledCode = compileCode(code);
    var result = eval(compiledCode);
    //var result = eval(code);
    writeToOutput(result); // Log the result to the output area using the custom function
  } catch (error) {
    writeToOutput("Error: " + error.message); // Log the error message to the output area using the custom function
  }
}

function compileCode(input) {
  const lines = input.toString().split("\n");
  const processedLines = lines.map(line => line.replace("var", "let") + ";");
  const result = processedLines.join("\n");
  return result;
}

// Event listener for the Run button
document.getElementById("run-btn").addEventListener("click", runCode);
