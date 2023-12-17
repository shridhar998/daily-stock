// api/read-json.js

import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'resources', 'data.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
