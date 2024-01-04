<?php

declare(strict_types=1);

return [
    'not_found' => 'News not found',
    'like' => [
        'error' => 'Failed to perform the action',
    ],
    'admin' => [
        'duplicate_not_found' => 'No duplicating article with such language exists',
        'fail_save_main_image' => 'Error saving the main news image',
        'create' => [
            'no_image' => 'You did not provide the main news image',
            'success' => 'News created',
        ],
        'edit' => [
            'success' => 'News edited',
            'no_image' => 'You did not provide an image',
            'duplicate_locale_not_found' => 'The duplicating news has a non-existent language',
            'duplicate_such_locale' => 'The duplicating news has the same language as the original news',
        ],
        'delete' => [
            'fail' => 'The news has not been deleted',
            'success' => 'News deleted',
        ],
    ],
];
