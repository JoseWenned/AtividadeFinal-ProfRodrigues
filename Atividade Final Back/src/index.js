const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
// const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const uri = "mongodb+srv://Prof-Rodrigues:ProfR1234@atividadefinaldb.4drdw.mongodb.net/?retryWrites=true&w=majority&appName=AtividadeFinalDB";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado com MongoDB com sucesso.");
}).catch((err) => {
  console.error("Erro ao conectar ao MongoDB.");
});

const JWT_SECRET = "your_secret_key";

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

const Student = mongoose.model("student",{
    name: String,
    email: String,
    password: String,
    course: String,
});

// middleware para veririficar o token!

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).send({error: "Token não fornecido!"});
  };

  const token = authHeader.split(" ")[1];

  jwt.verify(token,JWT_SECRET,(err, user) => {
    if(err){
      return res.status(403).send({error: "Token inválido!"})
    };
    req.user = user;
    next();
  });
};

// Methods HTTP

// Router Post Student

app.post("/students", async(req, res) => {
  try {
    const {name, email, password, course} = req.body;

    const existingStudent = await Student.findOne({email});
    if(existingStudent){
      return res.status(400).send({error: "E-mail já cadastrado!"});
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashPassword,
      course
    });
  
    await student.save();
    return res.status(201).send({message: "Aluno criado com sucesso!", student});

  } catch (error) {
    res.status(500).send({error: "Erro ao criar aluno!"});
  };
});

// Router Read Student

app.get("/students", authenticateToken, async(req, res) => {
  try {
    const students = await Student.find();
    return res.send(students);
  } catch (error) {
    return res.status(500).send({error: "Error ao buscar alunos!"});
  };
});

// Router Put Student

app.put("/students/:id", async(req, res) => {
  const studentId = await Student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    course: req.body.course
  }, {
    new: true
  });

  return res.send(studentId);
});

// Router Delete Student

app.delete("/students/:id", async(req, res) => {
  const studentId = await Student.findByIdAndDelete(req.params.id);
  return res.send(studentId);
});

// Router Login Student

app.post("/login", async(req, res) => {
  try {
    const {email, password} = req.body;

    const students = await Student.findOne({ email });

    if(!students){
      return res.status(404).send({error: "Aluno não encontrado!"});
    };

    const isPasswordValid = await bcrypt.compare(password, students.password);
    if(!isPasswordValid){
      return res.status(401).send({error: "credenciais inválidas"});
    };

    const token = jwt.sign(
      {id: students._id, email: students.email},
      JWT_SECRET,
      {expiresIn: "1h"}
    );

    return res.send({message: "Login bem-sucedido", token});

  } catch (error) {
    return res.status(500).send({error: "error ao fazer o login"});
  };
});

