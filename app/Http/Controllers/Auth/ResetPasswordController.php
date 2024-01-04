<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class ResetPasswordController extends Controller
{
    // GET Форма ввода нового пароля
    public function showResetForm(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('app');
    }

    // POST
    public function reset(): \Illuminate\Foundation\Application|Redirector|Application|RedirectResponse
    {
        return $this->redirectTo('/');
    }
}
