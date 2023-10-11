<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class ConfirmPasswordController extends Controller
{
    // GET показывает форму с заменой пароля
    public function showFormWithPass(): \Illuminate\Foundation\Application|Factory|View|Application
    {
        return view('app');
    }

    // GET
    public function showConfirmForm(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return $this->showFormWithPass();
    }

    // POST
    public function confirm(): \Illuminate\Foundation\Application|Redirector|Application|RedirectResponse
    {
        return redirect('/');
    }
}
