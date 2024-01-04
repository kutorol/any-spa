<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Closure;
use DateTime;
use Illuminate\Console\Command;
use Log;
use Psr\Log\LoggerInterface;
use Throwable;

abstract class CommandsLogAbstract extends Command
{
    public const LOG_CHANNEL = 'cron';

    private function log(): LoggerInterface
    {
        return Log::channel(self::LOG_CHANNEL);
    }

    protected function logMiddleware(Closure $cb)
    {
        $this->log()->info('cron_middleware__start', ['command' => $this->signature]);
        $startTime = now();

        $res = false;
        try {
            $res = $cb();
            $method = $res ? 'info' : 'error';
        } catch (Throwable $e) {
            $this->log()->error('cron_middleware__middle_error', [
                'msg' => $e->getMessage(),
                'code' => $e->getCode(),
            ]);
            $method = 'error';
        } finally {
            $endTime = now();
        }

        $interval = $startTime->diff($endTime);

        if ($interval->d > 0) {
            $format = $interval->format('%Dd, %Hh, %Im, %Ss, %fms');
        } elseif ($interval->h > 0) {
            $format = $interval->format('%Hh, %Im, %Ss, %fms');
        } elseif ($interval->i > 0) {
            $format = $interval->format('%Im, %Ss, %fms');
        } elseif ($interval->s > 0) {
            $format = $interval->format('%Ss, %fms');
        } else {
            $ms = (int)floor($interval->f / 1000);
            $micr = $interval->f - $ms;
            $micr = $micr > 0 ? $micr : 0;
            $format = "{$micr} microseconds ({$ms}ms)";
        }

        $this->log()->{$method}(
            'cron_middleware__end',
            [
                'status' => $res,
                'command' => $this->signature,
                'executed_time' => $format,
                'total_ms' => $this->timeDiffMs($startTime, $endTime),
            ]
        );

        return $res;
    }

    private function timeDiffMs(DateTime $start, DateTime $end): int
    {
        $endMs = (int)$end->format('Uv');
        $startMs = (int)$start->format('Uv');

        return $endMs - $startMs;
    }
}
