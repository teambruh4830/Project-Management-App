const fs = require('fs');
const path = require('path');

const DIST_PATH = path.join(__dirname, '/dist');

function processFilesInDir(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filepath = path.join(directory, file);

    if (fs.statSync(filepath).isDirectory()) {
      processFilesInDir(filepath);
    } else if (path.extname(file) === '.js') {
      let content = fs.readFileSync(filepath, 'utf8');

      // Append .js to all local imports that don't have it
      content = content.replace(/import\s+(.*)\s+from\s+['"](\..*?)(\.js)?['"];/g, (match, importList, importPath) => {
        return `import ${importList} from '${importPath}.js';`;
      });

      fs.writeFileSync(filepath, content);
    }
  }
}

processFilesInDir(DIST_PATH);
