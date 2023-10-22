<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Redis;

function redisGet(string $key): ?string
{
    try {
        $res = Redis::get($key);

        return $res ? json_decode($res, true) : null;
    } catch (\Throwable|RedisException $e) {
        \Log::error('redisGet has error', [
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ]);

        return null;
    }
}

function redisSetTTL(string $key, mixed $val, int $ttl): void
{
    try {
        // @phpstan-ignore-next-line
        Redis::set($key, json_encode($val), 'EX', $ttl);
    } catch (\Throwable|RedisException $e) {
        \Log::error('redisSetTTL has error', [
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ]);
    }
}

function redisDel(array $keys): void
{
    try {
        Redis::del($keys);
    } catch (\Throwable|RedisException $e) {
        \Log::error('redisDel has error', [
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ]);
    }
}
