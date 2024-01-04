<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Redirector;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function redirectTo(string $to = ''): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return self::redirect($to);
    }

    public static function redirect(string $to = ''): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return redirect(self::getRedirectURL($to));
    }

    public static function getRedirectURL(string $to = ''): string
    {
        $to = ltrim($to, '/');

        return sprintf('/%s/%s', App::getLocale(), $to);
    }
}
