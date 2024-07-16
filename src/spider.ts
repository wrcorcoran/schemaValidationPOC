import { filePathToSchemas } from './utils';
import * as fs from 'fs';
import * as path from 'path';

const spider = (directory: string) => {
  const names = fs.readdirSync(directory, { withFileTypes: true });
  names.forEach((loc) => {
    const address = `${directory}/${loc.name}`;
    if (loc.isDirectory()) {
      console.log(`[RECURSIVELY SEARCHING]: ${address}`);
      spider(address);
    } else {
      filePathToSchemas(address);
    }
  });
};

const startDirectory = path.resolve(process.argv[2]);
spider(startDirectory);
