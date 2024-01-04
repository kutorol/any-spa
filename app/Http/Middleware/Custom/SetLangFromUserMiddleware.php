<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom;

use App;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class SetLangFromUserMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // у юзера может отличаться язык, а не быть как в заголовках
        // поэтому сохраняем юзеру язык, раз он сам решил его обновить
        $user = User::getCurrentUser();
        if ($user && $user->locale->value !== App::getLocale()) {
            $user->locale = App\Enums\Common\Locale::from(App::getLocale());
            $user->save();
        }

        return $next($request);
    }
}
