import TokenAuthService from '../services/TokenAuthService';
import { TokenUser } from '../models';
import tokenConfigGenerator from '../config/tokenConfigGenerator';

const hoursBeforeExpire = process.env.JWT_HOURS_BEFORE_EXPIRE || 1;
const algorithm = process.env.JWT_ALGORITHM || 'HS256';
const privateKey = process.env.JWT_KEY_PRIVATE || null;
const publicKey = process.env.JWT_KEY_PUBLIC || null;

const keys = {};

if (algorithm.charAt(0) === 'H' && typeof privateKey === 'string') {
  keys.privateKey = privateKey;
}
if (algorithm.charAt(0) === 'R') {
  if (typeof privateKey === 'string') {
    keys.privateKey = privateKey;
  }
  if (typeof publicKey === 'string') {
    keys.publicKey = publicKey;
  }
}

export default {
  constructible: TokenAuthService,
  deps: {
    models: {
      TokenUser
    },
    tokenConfig: tokenConfigGenerator({
      expireTokensEveryNHours: hoursBeforeExpire,
      algorithm,
      keys,
    }),
  },
  locateDeps: {
    events: 'events',
  },
};
