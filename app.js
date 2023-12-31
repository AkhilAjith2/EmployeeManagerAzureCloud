// const express = require('express');
// const mssql = require('mssql');
// const bodyParser = require('body-parser');
// const cors = require('cors');
//
// const app = express();
// const port = process.env.PORT || 3000;
//
// // Configuration for your Azure SQL Database
// const dbConfig = {
//   user: 'nosadminsql',
//   password: 'NOSpassword2',
//   server: 'nossqlserver.database.windows.net',
//   database: 'NOSDB',
//   options: {
//     encrypt: true,
//   },
// };
//
// // Middleware to enable CORS
// app.use(cors());
//
// // Middleware to parse JSON bodies
// app.use(bodyParser.json());
//
// // Function to check if the "Tasks" table exists
// async function checkIfTasksTableExists() {
//   try {
//     await mssql.connect(dbConfig);
//     const request = new mssql.Request();
//
//     const result = await request.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Tasks'");
//     return result.recordset.length > 0;
//   } catch (error) {
//     console.error('Error checking if Tasks table exists:', error.message);
//     throw error;
//   } finally {
//     mssql.close();
//   }
// }
//
// // Function to create the "Tasks" table
// async function createTasksTable() {
//   try {
//     await mssql.connect(dbConfig);
//     const request = new mssql.Request();
//
//     await request.query('CREATE TABLE Tasks (Tasks VARCHAR(255) NOT NULL)');
//     console.log('Tasks table created successfully');
//   } catch (error) {
//     console.error('Error creating Tasks table:', error.message);
//     throw error;
//   } finally {
//     mssql.close();
//   }
// }
//
// // Ensure the "Tasks" table exists before starting the server
// checkIfTasksTableExists()
//     .then((exists) => {
//       if (!exists) {
//         return createTasksTable();
//       }
//     })
//     .then(() => {
//       // Endpoint to add a task
//       app.post('/tasks', async (req, res) => {
//         try {
//           const { task } = req.body;
//
//           await mssql.connect(dbConfig);
//           const request = new mssql.Request();
//
//           // Use parameterized query to prevent SQL injection
//           await request.input('task', mssql.NVarChar, task)
//               .query('INSERT INTO Tasks (Tasks) VALUES (@task)');
//
//           res.status(201).send('Task added successfully');
//           console.log("Task added successfully")
//         } catch (error) {
//           console.error('Error adding task:', error.message);
//           res.status(500).send('Internal Server Error 1');
//         } finally {
//           mssql.close();
//         }
//       });
//
//
//       // Endpoint to get all tasks
//       app.get('/tasks', async (req, res) => {
//         try {
//           await mssql.connect(dbConfig);
//           const request = new mssql.Request();
//
//           // Retrieve all tasks from the Tasks table
//           const result = await request.query('SELECT * FROM Tasks');
//           const tasks = result.recordset.map(row => row.Tasks);
//           res.json(tasks);
//         } catch (error) {
//           console.error('Error fetching tasks:', error.message);
//           res.status(500).send('Internal Server Error 2');
//         } finally {
//           mssql.close();
//         }
//       });
//
//
//       // Start the server
//       app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//       });
//     })
//     .catch((error) => {
//       console.error('Error:', error.message);
//     });x

const express = require('express');
const mssql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const dbConfig = {
  user: 'nosadminsql',
  password: 'NOSpassword2',
  server: 'nossqlserver.database.windows.net',
  database: 'NOSDB',
  options: {
    encrypt: true,
  },
};

app.use(cors());
app.use(bodyParser.json());

async function checkIfCharactersTableExists() {
  try {
    await mssql.connect(dbConfig);
    const request = new mssql.Request();

    const result = await request.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Characters'");
    return result.recordset.length > 0;
  } catch (error) {
    console.error('Error checking if Characters table exists:', error.message);
    throw error;
  } finally {
    mssql.close();
  }
}

async function createCharactersTable() {
  try {
    await mssql.connect(dbConfig);
    const request = new mssql.Request();

    await request.query('CREATE TABLE Characters (ID INT PRIMARY KEY IDENTITY(1,1), Name NVARCHAR(255) NOT NULL, Email NVARCHAR(255) NOT NULL UNIQUE, AvatarUrl NVARCHAR(255))');
    console.log('Characters table created successfully');
  } catch (error) {
    console.error('Error creating Characters table:', error.message);
    throw error;
  } finally {
    mssql.close();
  }
}

checkIfCharactersTableExists()
    .then((exists) => {
      if (!exists) {
        return createCharactersTable();
      }
    })
    .then(() => {
      app.post('/characters', async (req, res) => {
        try {
          const { name, email, avatarUrl } = req.body;

          await mssql.connect(dbConfig);
          const request = new mssql.Request();

          await request.input('name', mssql.NVarChar, name)
              .input('email', mssql.NVarChar, email)
              .input('avatarUrl', mssql.NVarChar, avatarUrl)
              .query('INSERT INTO Characters (Name, Email, AvatarUrl) VALUES (@name, @email, @avatarUrl)');

          res.status(201).send('Character added successfully');
          console.log("Character added successfully");
        } catch (error) {
          console.error('Error adding character:', error.message);
          res.status(500).send('Internal Server Error 1');
        } finally {
          mssql.close();
        }
      });

      app.get('/characters', async (req, res) => {
        try {
          await mssql.connect(dbConfig);
          const request = new mssql.Request();

          const result = await request.query('SELECT * FROM Characters');
          const characters = result.recordset.map(row => ({
            name: row.Name,
            email: row.Email,
            avatarUrl: row.AvatarUrl,
          }));

          res.json(characters);
        } catch (error) {
          console.error('Error fetching characters:', error.message);
          res.status(500).send('Internal Server Error 2');
        } finally {
          mssql.close();
        }
      });

      app.delete('/characters/:email', async (req, res) => {
        try {
          const email = req.params.email;

          await mssql.connect(dbConfig);
          const request = new mssql.Request();

          await request.input('email', mssql.NVarChar, email)
              .query('DELETE FROM Characters WHERE Email = @email');

          res.status(200).send('Character deleted successfully');
          console.log("Character deleted successfully");
        } catch (error) {
          console.error('Error deleting character:', error.message);
          res.status(500).send('Internal Server Error');
        } finally {
          mssql.close();
        }
      });

      app.put('/characters/:email', async (req, res) => {
        try {
          const email = req.params.email;
          const { name, avatarUrl } = req.body;

          await mssql.connect(dbConfig);
          const request = new mssql.Request();

          await request
              .input('name', mssql.NVarChar, name)
              .input('avatarUrl', mssql.NVarChar, avatarUrl)
              .input('email', mssql.NVarChar, email)
              .query('UPDATE Characters SET Name = @name, AvatarUrl = @avatarUrl WHERE Email = @email');

          res.status(200).send('Character updated successfully');
          console.log("Character updated successfully");
        } catch (error) {
          console.error('Error updating character:', error.message);
          res.status(500).send('Internal Server Error');
        } finally {
          mssql.close();
        }
      });
      

      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
