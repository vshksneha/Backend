const fs = require('fs');
const path = require('path');

function listDirectoryContents(directoryPath) {
  // Check if the provided path exists and is a directory
  if (!fs.existsSync(directoryPath)) {
    console.log(`Directory '${directoryPath}' does not exist.`);
    return;
  }

  if (!fs.statSync(directoryPath).isDirectory()) {
    console.log(`'${directoryPath}' is not a directory.`);
    return;
  }

  // Read the contents of the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    console.log(`Contents of directory '${directoryPath}':`);
    files.forEach(file => {
      // Get the full path of each file/directory
      const filePath = path.join(directoryPath, file);
      
      // Check if it's a directory or a file
      if (fs.statSync(filePath).isDirectory()) {
        console.log(`[Directory] ${file}`);
      } else {
        console.log(`- ${file}`);
      }
    });
  });
}

// Example usage:
// Replace 'directoryPath' with the path of the directory you want to list
const directoryPath = '/path/to/your/directory';
listDirectoryContents(directoryPath);
