let config = {
    security: {
        Bcrypt_Level: 10,
        jwt: {
            jwtSecretString: 'somesecretstringforcrypting',
            codingAlgorithm: 'HS256',
            expiresIn: '1D'
        }
    },
    dbName: 'OlivkinDb'
};

module.exports = config;
