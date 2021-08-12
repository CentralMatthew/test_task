const util = require('util');
const jwt = require('jsonwebtoken');

const verifyPromisify = util.promisify(jwt.verify);

const {
  tokensConstants: {
    ACCESS, EXPIRES_FOR_ACCESS, EXPIRES_FOR_REFRESH
  },
  tokens: {
    ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET
  }
} = require('../constants');

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: EXPIRES_FOR_ACCESS });
    const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: EXPIRES_FOR_REFRESH });

    return {
      access_token,
      refresh_token
    };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    const secretWord = tokenType === ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
    await verifyPromisify(token, secretWord);
  }

};
