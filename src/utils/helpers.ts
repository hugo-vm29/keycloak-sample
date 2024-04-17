
export const getCORSConfig = () => {
    
  /** CORS setup **/
  const configDomains = process.env.ALLOWED_DOMAINS;
  let allowedDomains: string[] = [];

  if (configDomains && configDomains !== '') {
    allowedDomains = [...configDomains.split(',')];
  }

  const corsOptions = {
    origin: function (
      requestOrigin: string | undefined,
      callback: (err: Error | null, origin: boolean | string[]) => void,
    ) {
      if (
        !requestOrigin ||
        allowedDomains.some((domain) => new URL(requestOrigin).hostname === domain)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), allowedDomains);
      }
    },
    credentials: true,
  };

  return corsOptions;
}
