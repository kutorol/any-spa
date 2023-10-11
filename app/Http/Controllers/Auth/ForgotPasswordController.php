<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class ForgotPasswordController extends Controller
{
    // GET Экран показа формы с указанием email
    public function showLinkRequestForm(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('app');
    }

    // POST
    public function sendResetLinkEmail(): \Illuminate\Foundation\Application|Redirector|Application|RedirectResponse
    {
        return redirect('/');
    }
}
