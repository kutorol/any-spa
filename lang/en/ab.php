<?php

declare(strict_types=1);

return [
    'upsert' => [
        'fail' => 'Failed to update A/B test',
        'success' => 'A/B test successfully updated',
        'no_values' => 'You did not provide A/B test variants',
    ],
    'create' => [
        'fail' => 'Failed to create A/B test',
        'success' => 'A/B test successfully created',
    ],
    'delete' => [
        'fail' => 'Failed to delete A/B test',
        'success' => 'A/B test successfully deleted',
    ],
];
