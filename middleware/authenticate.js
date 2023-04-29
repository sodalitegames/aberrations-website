import { firebase, firestore } from 'lib/firebase-admin';

const authenticateMiddleware = async (req, res, next) => {
  let token;

  // Get token and check if it exists
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No authorization token was provided.' });
  }

  let decoded;

  // Decode the token
  try {
    decoded = await firebase.auth().verifyIdToken(token);
  } catch (err) {
    if (err.code === 'auth/id-token-expired') {
      return res.status(500).json({ status: 'error', message: 'Your authorization has expired.' });
    }

    return res.status(500).json({ status: 'error', message: 'You are not authorized to access this route.' });
  }

  let auth;
  let user;

  // Fetch auth user and collection user
  try {
    auth = await firebase.auth().getUser(decoded.uid);
    user = await firestore.collection('users').doc(auth.uid).get();
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'An error occured fetching user data.' });
  }

  // Save auth, user data and decoded token to req.body
  req.auth = auth;
  req.user = user.data();
  req.token = decoded;

  // Grant access to protected route
  return next();
};

export default authenticateMiddleware;
