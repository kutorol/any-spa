<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Email\VerifyEmailRequest;
use App\Repositories\UserRepository;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class VerificationController extends Controller
{
    public function __construct()
    {
        $this->middleware(['signed', 'throttle:6,1'])->only('verify');
    }

    // GET показ страницы удачной/неудачной верификацией
    public function verifyNotice(): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return redirect('/');
    }

    /**
     * GET проверка ссылки подтверждения email.
     * @throws AuthorizationException
     */
    public function verify(VerifyEmailRequest $request, UserRepository $userRep): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        $user = $userRep->findByID((int)$request->route('id'));
        if (!hash_equals((string) $request->route('id'), (string) $user->getKey())) {
            throw new AuthorizationException;
        }

        if (! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            throw new AuthorizationException;
        }

        if (!$user->hasVerifiedEmail() && $user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect('/login');
    }
}
