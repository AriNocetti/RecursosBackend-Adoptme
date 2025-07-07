import { dirname } from 'path';
import { fileURLToPath } from 'url';


// @ts-expect-error TS(7016): Could not find a declaration file for module 'bcry... Remove this comment to see the full error message
import bcrypt from 'bcrypt';

export const createHash = async (password: any) => {
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};

export const passwordValidation = async (user: any, password: any) => bcrypt.compare(password, user.password);


// @ts-expect-error TS(1470): The 'import.meta' meta-property is not allowed in ... Remove this comment to see the full error message
const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

export default dirName;
