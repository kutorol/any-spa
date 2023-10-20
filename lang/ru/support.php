<?php

declare(strict_types=1);

use App\Enums\TechSupport\TechSupportStatus;

return [
    'send_success' => 'Запрос успешно отправлен',
    'not_such_type' => 'Такого типа запроса в техническую поддержку не существует',
    'error_create' => 'Не удалось создать запрос в техническую поддержку. Попробуйте еще раз',
    'not_save_attachment' => 'Отправьте форму с запросом снова, т.к. не удалось сохранить фото',
    'request_create' => 'Запрос успешно создан',
    'success_changed_status' => 'Статус успешно изменен',
    'not_found' => 'Запись не найдена',
    'already_has_status' => 'Запись уже находиться в этом статусе',
    'deleted' => 'Запись удалена',
    'not_delete' => 'Запись не удалена. Попробуйте еще раз',
    'not_change_status' => 'Не удалось изменить статус',
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
