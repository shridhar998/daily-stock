// api/write-json.js

import fs from 'fs';
import path from 'path';
const { randomBytes } = require('crypto');

// Generate a UUID
const generateUUID = () => {
  const bytes = randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  
  return bytes.toString('hex').match(/.{1,2}/g).join('-');
};

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'resources', 'stock-data.json');

  if (req.method === 'POST') {
    try {
 
       // Add new item(s)
       const newData = req.body;
       newData[newData.length - 1].uuid = generateUUID();
      //  console.log("NEW Data>>>>",newData)
       // Write updated data back to the file
       const jsonString = JSON.stringify(newData, null, 2);
       fs.writeFileSync(filePath, jsonString, 'utf-8');

      res.status(200).json({ message: 'JSON data written successfully' });
    } catch (error) {
      console.error('Error writing JSON file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
