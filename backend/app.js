const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const esbuild = require('esbuild');

// Enable CORS for all routes
app.use(cors());

app.get('/', async (req, res) => {
   try {
      const result = await esbuild.build({
         entryPoints: ['login-page.tsx'],
         bundle: true,
         write: false,
         format: 'esm',
         target: 'esnext',
         loader: { '.tsx': 'tsx', '.jsx': 'jsx' },
      });

      res.setHeader('Content-Type', 'application/javascript');
      res.send(result.outputFiles[0].text);
   } catch (error) {
      res.status(500).send(error.message);
   }
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
