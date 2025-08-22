<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
$name = $data['your-name'] ?? null; // Используем null coalescing для безопасности
$tel = $data['your-tel'] ?? null;
$productName = $data['product-name'] ?? null; // Получаем название продукта

// Проверка на наличие необходимых данных
if (empty($name) || empty($tel)) {
    echo json_encode(['error' => 'Не все данные были переданы']);
    exit;
}

// Контент письма
$title = 'Заявка с сайта'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>'.
        '<p>Телефон: <strong>'.$tel.'</strong></p>';

if (!empty($productName)) {
    $body .= '<p>Продукт: <strong>'.$productName.'</strong></p>'; // Добавляем название продукта, если оно есть
}

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;

    // Настройки почты отправителя
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'danilchenkovitalya@yandex.ru'; // Логин на почте
    $mail->Password   = 'qgkweieduaqollhd'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    $mail->setFrom('danilchenkovitalya@yandex.ru', 'Заявка с сайта'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('danilchenkovitalya@yandex.ru');

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
