const argon2 = require('argon2');

const hashPassword = async (password) => {
  const hash = await argon2.hash(password, {
    type: argon2.argon2id, // Strongest version
    memoryCost: 2 ** 16,  // 64 MB
    timeCost: 4,          // Number of iterations
    parallelism: 2        // Number of threads
  });
  return hash;
};

const verifyPassword = async (password, hash) => {
  return await argon2.verify(hash, password);
};

module.exports = { hashPassword, verifyPassword };