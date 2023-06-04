const express = require('express');
const bodyParser = require('body-parser');
const OpenGraph = require('opengraph-io');
const TelegramBot = require('node-telegram-bot-api');



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const telegramBotToken = '6012447970:AAFI5u4GSJ0l9lZTI820LnwYBYbfYRfKjaQ';
const bot = new TelegramBot(telegramBotToken, { polling: true });

function send_message(recipientPhoneNumber, message, metadata) {
  bot.sendMessage(recipientPhoneNumber, message, metadata);
}

app.get('/', (req, res) => {
  res.render('invitation_form');
});

app.post('/send_invitation', async (req, res) => {
  try {
    // Получение данных из формы
    const recipientPhoneNumber = req.body.recipient_phone_number;
    const senderName = 'Сергей '; 
    const brideName = req.body.bride_name;
    const groomName = req.body.groom_name;
    const weddingDate = req.body.wedding_date;
    const weddingPlace = req.body.wedding_place
    const invitationLink = 'http://your_app_url/invitation'; // Замените на URL вашего приложения


      // Сохранение данных в базе данных или другом хранилище
    // ...


    // Генерация метаданных ссылки с использованием node-open-graph
    const og = await OpenGraph.fetch(invitationLink);
	  const ogData = og.data;
  	const ogMetadata = {
  		title: brideName + ' и ' + groomName + ' приглашают Вас на  свадьбу!',
  		description: 'Свадьба ' + brideName + ' и ' + groomName + ', ' + weddingDate + ', ' + 'будет проходить' + weddingPlace, 
 		 image: ogData?.image?.url || 'http://your_app_url/invitation.jpg' // Замените на URL изображения, предполагаемого для метаданных ссылки
		};

    // Формирование текста сообщения
    const message = `Привет! Тебя приглашают на свадьбу ${brideName} и ${groomName}, которая состоится ${weddingDate}, место проведения. Нажми на ссылку ниже, чтобы узнать подробности:\n${invitationLink}`;

    // Отправка сообщения через мессенджер Telegram
    send_message(recipientPhoneNumber, message, og.toObject());

    res.send('Приглашение успешно отправлено!');
  } catch (error) {
    res.send(`Ошибка при отправке приглашения: ${error.message}`);
  }
});

app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001');
});
