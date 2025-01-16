import {VFile} from "https://esm.sh/vfile";

export default function parseTextToVFS(text) {
  console.groupCollapsed("Log the input text");
  console.dir({inputText: text}, {depth: null});
  console.groupEnd();

  const vfs = {};
  const files = text.split("================================================\n");
  
  console.groupCollapsed("Log the split files array")
  console.dir({splitFiles: files}, {depth: null});
  console.groupEnd();
  

  files.forEach((file, index) => {
    const lines = file.split("\n");
    const fileLine = lines[0].trim();

    console.groupCollapsed(index + " Log each file being processed");
    console.dir({
      processingFileIndex: index,
      fileContent: file,
      firstLine: fileLine,
      isFileMarker: fileLine.startsWith("File:")
    }, {depth: null});
    console.groupEnd();

    

    if (fileLine.startsWith("File:")) {
      const path = fileLine.substring(6).trim();
      const content = lines.slice(2).join("\n").trim();

      console.groupCollapsed(index + " Log the extracted path and content");
      console.dir({
        extractedPath: path,
        contentFirstLine: lines[3],
        contentLength: content.length,
        contentPreview: content.substring(0, 100)
      }, {depth: null});
      console.groupEnd();

      // Create a vfile for this file
      const fileObj = new VFile({
        path,
        contents: content,
      });
 
      vfs[path] = fileObj;
    }
  });

  console.groupCollapsed("Log the final VFS object");
  console.dir({finalVFS: vfs}, {depth: null});
  console.groupEnd();


  return vfs;
}
