import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const target = resolve('.env');

if (existsSync(target)) {
  console.log('.env already exists; left unchanged.');
  process.exit(0);
}

const secret = () => randomBytes(32).toString('base64url');
const values = {
  APP_KEYS: Array.from({ length: 4 }, secret).join(','),
  API_TOKEN_SALT: secret(),
  ADMIN_JWT_SECRET: secret(),
  TRANSFER_TOKEN_SALT: secret(),
  JWT_SECRET: secret(),
  ENCRYPTION_KEY: secret(),
};

let output = readFileSync(resolve('.env.example'), 'utf8');
for (const [name, value] of Object.entries(values)) {
  output = output.replace(new RegExp(`^${name}=.*$`, 'm'), `${name}=${value}`);
}

writeFileSync(target, output, { encoding: 'utf8', flag: 'wx', mode: 0o600 });
console.log('Created .env with generated secrets; values were not printed.');
