// Importing packages
import express from 'express';
import fs from 'fs';

// Initializing express app
const app = express();

// Defining port for app
const PORT = process.env.PORT || 4000;

// Testing endpoint to check app is working
app.get('/', (req, res) => {
  res.send(`App is ready to serve!!`);
});

// Endpoint resource to display date and time
app.get('/getDateTime', (req, res) => {
  // Date and time
  const date = new Date().toDateString();
  const time = new Date().toTimeString();

  // 1. Write API endpoint which will create a text file in a particular folder.
  fs.writeFile(
    `./server/${date} - ${time}.txt`,
    `Current Date - ${date} \nCurrent Time - ${time}`,
    (err) => {
      if (err) console.log(err);
    }
  );
  res.send(`Text File with timestamp created sucessfully!! ${date} ${time}`);
});

// 2. Write API endpoint to retrieve all the text files in that particular folder
app.get('/dirFiles', (req, res) => {
  // Defining folder to read and reading the directory which returns an array of files
  let folder = './server';
  let filenames = fs.readdirSync(folder);

  console.log('\nFilenames in folder server are:');

  // Iterating through each path and printing
  filenames.forEach((file) => {
    console.log('Filename:', file);
  });

  res.send('All Files present displayed sucessfully!!');
});

// Listening to server
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
