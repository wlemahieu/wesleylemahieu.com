import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@config': `${__dirname}/config`,
  '@routes': `${__dirname}/routes`,
  '@store': `${__dirname}/store`,
});

import configExpress from '@config/express';
import configRoutes from '@config/routes';
import configStaticFiles from '@config/staticFiles';

const [app] = configExpress();
configRoutes(app);
configStaticFiles(app);

const port = process.env.PORT || 2222;

app.listen(port, () => {
  console.log(`*~~% wesleylemahieu.com (port ${port}) %~~*`);
});
