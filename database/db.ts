import mongoose from 'mongoose';

// 0 = disconected
// 1 = conected
// 2 = conecting
// 3 = diconecting

const mongoConnection = {
  isConected: 0,
};

export const conecct = async () => {
  if (mongoConnection.isConected) {
    console.log('ya estabamos conectados');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConected = mongoose.connections[0].readyState;

    if (mongoConnection.isConected === 1) {
      console.log('usendo conecion anterior');
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '', {});
  mongoose.set('strictQuery', false);
  mongoConnection.isConected = 1;
  // console.log('conectado a mongodb', process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;
  if (mongoConnection.isConected === 0) return;

  await mongoose.disconnect();
  console.log('Deconectando de mongoDb');
};
