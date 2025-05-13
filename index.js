const mysql = require('mysql');
const os = require('os');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path'); // Импортируем модуль path для работы с путями

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'viems')));
app.set('view engine', 'ejs');

// Используйте body-parser для обработки данных, отправленных в теле запроса
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

// Исправлено на корректный путь
app.get('/main.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html')); // Используем path.join для корректного формирования пути
});

app.post('/check-password', (req, res) => {
    const password = req.body.password; // Получаем пароль из тела запроса
    console.log(req.body);

    if (password === "") { // Проверяем, пустой ли пароль
        res.redirect('/'); // Перенаправляем на главную страницу
    } else {
        res.sendFile(path.join(__dirname, 'main.html')); // Отправляем HTML файл
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is started: http://localhost:${PORT}`); // Исправлено форматирование строки
});