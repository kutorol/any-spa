<?php

declare(strict_types=1);

return [
    'origin' => env('RECAPTCHAV3_ORIGIN', 'https://www.recaptcha.net/recaptcha'),
    'sitekey' => env('VITE_RECAPTCHAV3_SITEKEY', ''),
    'secret' => env('RECAPTCHAV3_SECRET', ''),
    'locale' => env('RECAPTCHAV3_LOCALE', ''),
];
