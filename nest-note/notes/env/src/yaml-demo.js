import yaml from 'js-yaml';
import * as fs from 'fs';

const config = fs.readFileSync('./hello.yaml');

console.log(yaml.load(config));
