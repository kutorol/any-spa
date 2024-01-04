<?php

declare(strict_types=1);

use App\Enums\TechSupport\TechSupportStatus;

return [
    'send_success' => 'Запрос успешно отправлен',
    'error_create' => 'Не удалось создать запрос в техническую поддержку. Попробуйте еще раз',
    'not_save_attachment' => 'Отправьте форму с запросом снова, так как не удалось сохранить фото',
    'request_create' => 'Запрос успешно создан',
    'not_found' => 'Запись не найдена',
    'not_delete' => 'Запись не удалена. Попробуйте еще раз',
    'not_change_status' => 'Не удалось изменить статус',
    'admin' => [
        'deleted' => 'Запись удалена',
        'edit' => [
            'same_status' => 'Запись уже находиться в этом статусе',
            'success' => 'Статус успешно изменен',
        ],
        'delete' => [
            'success' => 'Вложение удалено',
            'ok_attach_not_delete' => 'Файлы удалены, но запись в бд не удалена',
            'not_found_attach' => 'Такого вложения не найдено',
        ],
    ],

    'status' => [
        TechSupportStatus::STATUS_CREATED->value => 'создан',
        TechSupportStatus::STATUS_IN_PROGRESS->value => 'в работе',
        TechSupportStatus::STATUS_DEFERRED->value => 'отложен',
        TechSupportStatus::STATUS_REJECTED->value => 'отклонен',
        TechSupportStatus::STATUS_DONE->value => 'выполнен',
    ],
    'mail' => [
        'update_mail_subject' => 'Статус вашей заявки #:num изменился на сайте :site_name!',
        'greeting' => 'Привет! Статус заявки #:num изменен на :status!',
        'your_request' => 'Ваш запрос',
        'admin_response' => 'Ответ администратора',
        'to_main_page' => 'Перейти на :site_name',
        'thanks' => 'С Уважением от команды :site_name!',
    ],

];
