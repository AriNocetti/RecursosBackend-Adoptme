import { dirname } from 'path';
import { fileURLToPath } from 'url';

import bcrypt from 'bcrypt';

export const createHash = async password => {
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};

export const passwordValidation = async (user, password) => bcrypt.compare(password, user.password);

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

export default dirName;
