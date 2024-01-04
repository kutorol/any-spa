<?php

declare(strict_types=1);

return [
    'not_found' => 'Новость не найдена',
    'like' => [
        'error' => 'Не удалось выполнить действие',
    ],
    'admin' => [
        'duplicate_not_found' => 'Такой дублирующей статьи с таким языком не существует',
        'fail_save_main_image' => 'Ошибка сохранения главной картинки новости',
        'create' => [
            'no_image' => 'Вы не передали главную картинку новости',
            'success' => 'Новость создана',
        ],
        'edit' => [
            'success' => 'Новость отредактирована',
            'no_image' => 'Вы не передали картинку',
            'duplicate_locale_not_found' => 'У дублирующей новости передан несуществующий язык',
            'duplicate_such_locale' => 'Дублирующая новость имеет такой же язык, как и оригинальная новость',
        ],
        'delete' => [
            'fail' => 'Новость не удалена',
            'success' => 'Новость удалена',
        ],
    ],
];
