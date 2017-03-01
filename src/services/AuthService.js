import { Buffer } from 'buffer';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const AUTH_KEY = 'auth';
const USER_KEY = 'user';

class AuthService {
  getAuthInfo(callback) {
    AsyncStorage.multiGet([
      AUTH_KEY,
      USER_KEY
    ], (err, val) => {
      if (err) {
        return callback(err);
      }
      if (!val) {
        return callback();
      }

      // const zippedObj = _.zipObject(val);
      const zippedObj = _.fromPairs(val);

      if (!zippedObj[AUTH_KEY]) {
        return callback();
      }

      const authInfo = {
        header: {
          Authorization: `Basic ${zippedObj[AUTH_KEY]}`
        },
        user: JSON.parse(zippedObj[USER_KEY])
      };

      // console.log(authInfo.user);

      return callback(null, authInfo);
    });
  }

  login(credentials, callback) {
    const userPass = Buffer(`${credentials.username}:${credentials.password}`);
    const encodedAuth = userPass.toString('base64');

    window.fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Basic ${encodedAuth}`
      }
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      throw {
        badCredentials: response.status === 401,
        unknownError: response.status !== 401
      };
    })
    .then((response) => {
      return response.json();
    })
    .then((resutls) => {
      AsyncStorage.multiSet([
        [AUTH_KEY, encodedAuth],
        [USER_KEY, JSON.stringify(resutls)]
      ], (error) => {
        if (error) {
          throw error;
        }

        callback({ success: true });
      });
    })
    .catch((error) => {
      // console.log(error);
      callback(error);
    });
  }
}

export default new AuthService();
