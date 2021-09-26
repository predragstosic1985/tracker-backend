const axios = require("axios");
const secretKey = require("../firebaseConfig.json");

// post login
exports.loginUser = async (req, res, next) => {
  const myKey = secretKey.apiKey;
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${myKey}`,
      {
        email: req.body.email,
        password: req.body.password,
        returnSecureToken: true,
      }
    );
    const objectToSend = {
      email: response.data.email,
      token: response.data.idToken,
      refreshToken: response.data.refreshToken,
      expiresIn: response.data.expiresIn,
    };
    res.send(objectToSend);
  } catch (error) {
    next(error);
  }
};
