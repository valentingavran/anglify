const glob = require('glob');
const { readFile, writeFile, mkdir } = require('fs');

async function main() {
  const filePaths = await getFileNames('./projects/**/_variables.scss');
  const files = await Promise.all(
    filePaths.map(async path => {
      return { component: parseComponentNameFromPath(path), content: await readFileByPath(path) };
    })
  );
  const componentsWithVariables = files.map(file => {
    return { component: file.component, variables: extractCssVariables(file.content) };
  });
  for (const item of componentsWithVariables) {
    const dir = './projects/docs/src/assets/style-definitions/';
    await mkdir(dir, { recursive: true }, async err => {
      if (err) return;
      await writeFile(`${dir}${item.component}.json`, JSON.stringify(item.variables), 'utf8', () => {});
    });
  }
}

void main();

function extractCssVariables(content) {
  return content
    .split(';')
    .map(line => {
      const name = line.split(':')[0]?.replace(/\n/gm, '');
      const defaultValue = line.split(/\$.*:/gm)[1]?.trim();
      // ?.replace(/[\n\r]/gm, '');
      if (name && defaultValue) {
        return { name, defaultValue };
      }
    })
    .filter(variable => variable);
}

function parseComponentNameFromPath(path) {
  const splittedPath = path.split('/');
  return splittedPath[splittedPath.length - 2];
}

function readFileByPath(path) {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function getFileNames(pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, {}, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
}
