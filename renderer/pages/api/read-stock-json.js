// // api/read-json.js

import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'resources', 'stock-data.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// api/read-stock-json.js

// export default (req, res) => {
//   // json-server will automatically handle reading data from stock-db.json
//   // and responding to the request
//   res.status(200).json(res.locals.data);
// };

