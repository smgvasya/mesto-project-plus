// Импортируем типы для объектов запроса и ответа Express
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Создаём экземпляр приложения Express
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})

// app.get('/', (req: Request, res: Response) => {
//     res.send(
//         `<html>
//         <body>
//             <p>Ответ на сигнал из далёкого космоса</p>
//         </body>
//         </html>`
//     );
// });