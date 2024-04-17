/**
 * sets an authentication provider
 */

const getProvider = () => {
  // Auth0 authentication provider
  // eslint-disable-next-line global-require
  return require('./keycloakProvider');
};

const authProvider = getProvider();
export default authProvider;
