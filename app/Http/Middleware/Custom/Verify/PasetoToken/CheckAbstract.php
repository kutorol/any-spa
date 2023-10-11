<?php

declare(strict_types=1);

namespace App\Http\Middleware\Custom\Verify\PasetoToken;

use Closure;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;

abstract class CheckAbstract
{
    protected Request $r;

    /** @var Closure(Request): (Response|RedirectResponse) */
    protected Closure $next;

    /** @var array<string,mixed> - это то, что после предыдущих проверок было возвращено */
    protected array $lastCheckData = [];

    /**
     * @param Request $r
     * @param Closure $next
     * @param array<string,mixed> $lastCheckData - это то, что после предыдущей проверки было возвращено
     */
    public function __construct(Request $r, Closure $next, array $lastCheckData = [])
    {
        $this->r = $r;
        $this->next = $next;
        $this->lastCheckData = $lastCheckData;

        $this->init();
    }

    // Проверяет условие. Если false, то будет вызван метод beforeErrorResponse и после errorResponse
    abstract public function check(): bool;

    // Инициализирует нужные данные для дальнейшей обработки
    public function init(): void
    {

    }

    // Возвращает ошибочный ответ сервера после проверки $this->check()
    public function errorResponse(): JsonResponse|Redirector|Application|RedirectResponse|Response
    {
        return $this->doNext();
    }

    // Производит нужные действия перед возвращением ошибочного ответа после проверки $this->check()
    public function beforeErrorResponse(): self
    {
        return $this;
    }

    // Возвращает данные после успешной проверки метода $this->check()
    public function getData(): mixed
    {
        return null;
    }

    // Двигает дальше по миддлаварям
    protected function doNext(): JsonResponse|Redirector|Application|RedirectResponse|Response
    {
        return ($this->next)($this->r);
    }
}
