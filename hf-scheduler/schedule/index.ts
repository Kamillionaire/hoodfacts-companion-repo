import demo from './demo';
import * as mongoose from 'mongoose';
console.log(demo.nextInvocation());

mongoose.connect(process.env.MONGO_URI);
