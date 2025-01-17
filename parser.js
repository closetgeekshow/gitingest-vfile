/**
 * Parses text content into a virtual file system structure
 * @param {string} text - Raw text content with file delimiters
 * @returns {Object} Virtual file system object
 * @throws {Error} If text is invalid or parsing fails
 */

import {VFile} from "https://esm.sh/vfile";

export default function parseTextToVFS(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid input: text must be a non-empty string');
  }
  const FILE_DELIMITER = "================================================\n";

  const vfs = {};
  
  // Find the first delimiter and remove everything before it
  const startIndex = text.indexOf(FILE_DELIMITER);
  const contentSection = text.slice(startIndex);
  
  // Split remaining content on delimiter
  const files = contentSection.split(FILE_DELIMITER);
  
  files.forEach((file, index) => {   
    const lines = file.split("\n");
    const fileLine = lines[0].trim();

    if (fileLine.startsWith("File:")) {
      const path = fileLine.substring(6).trim();
      
      const fileObj = new VFile({
        path,
        contents: files[index+1],
      });
 
      vfs[path] = fileObj;
    }
  });

  return vfs;
}
