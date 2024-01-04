<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom;

use App;
use App\Enums\Common\Locale;
use App\Http\Controllers\Api\BaseController;
use Closure;
use Illuminate\Http\Request;

class SetLangMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->header(BaseController::HEADER__X_REQUEST_LOCALE);
        $l = Locale::tryFrom($locale ?? '') ?? Locale::RU;
        App::setLocale($l->value);

        return $next($request);
    }
}
