<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class RegisterController extends Controller
{
    // GET
    public function showRegistrationForm(): View|\Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return view('app');
    }

    // POST
    public function register(): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return $this->redirectTo('/register');
    }
}
