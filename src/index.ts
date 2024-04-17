import app from './app';
import db from './db';
const http = require('http');

const PORT = 9092;

async function main() {

  try {

    const args = process.argv
    .slice(2)
    .map(arg => arg.split('='))
    .reduce((args: any, [value, key]) => {
        args[value] = key;
        return args;
    }, {});

    const apiMode =  args.MODE;

    if(apiMode && apiMode === "SERVELESS"){

      app.listen( PORT, () => {
        console.log(`Serveless API running at ${PORT}`);
      });

    }else{
 
      const server = http.createServer(app);
      await db.connect();

      server.listen(PORT);
      console.log(`Server running at http://localhost:${PORT}`);
    }

  } catch (err: any) {
    console.log('API error', err?.message || '');
    process.exit(1);
  }
}

main();
