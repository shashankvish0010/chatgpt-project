import mongoose from 'mongoose';

// const options: mongoose.ConnectOptions = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   };

mongoose.connect('mongodb://127.0.0.1:27017/chatGPT').then(()=> console.log("Database connected")).catch((error)=> console.log(error))