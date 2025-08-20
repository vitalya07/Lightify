<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
$name = $data['your-name'];
$tel = $data['your-tel'];
$productName = $data['product-name']; // Получаем название продукта

// Контент письма
$title = 'Заявка с сайта'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>'.
        '<p>Телефон: <strong>'.$tel.'</strong></p>'.
        '<p>Продукт: <strong>'.$productName.'</strong></p>'; // Добавляем название продукта в тело письма

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;

    // Настройки почты отправителя
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'saifutdinov_vitalii@mail.ru'; // Логин на почте
    $mail->Password   = '1Y0EjHAQ82YzVCBtfb1G'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    $mail->setFrom('saifutdinov_vitalii@mail.ru', 'Заявка с сайта'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('saifutdinov_vitalii@mail.ru');

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send(); // Исправлено

    // Сообщение об успешной отправке
    echo json_encode(['message' => 'Сообщение отправлено успешно!']);

} catch (Exception $e) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'Сообщение не было отправлено! Причина ошибки: ' . $mail->ErrorInfo]);
}
