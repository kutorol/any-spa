<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class LoginController extends Controller
{
    // GET
    public function showLoginForm(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('app');
    }

    // POST
    public function login(): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return redirect('login');
    }

    // POST
    public function logout(): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return redirect('logout');
    }
}
