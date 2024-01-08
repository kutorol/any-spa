<?php
    /** @var object $seo */
    $seo = app(App\Http\Controllers\Api\Seo\SeoController::class)
        ->pageInfo()
        ->getData()->data->seo;
?>


<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <script defer>
        {{--  -------- START SEO Yandex SPA -------- --}}

        {{-- https://yandex.ru/support/webmaster/yandex-indexing/rendering.html --}}
        {{-- Данные переменные важны для индексации SPA яндексом без SSR --}}
        {{-- window.AppIsInit - переменная станет true, когда приложение полностью зарендериться --}}
        {{-- window.YandexRotorSettings.WaiterEnabled - сообщает яндексу, что нужно подождать загрузки контента --}}
        {{-- window.YandexRotorSettings.NoJsRedirectsToMain - сообщает яндексу, что при history.back() не обрабатывать,
                    т.к. может быть коллизии на главной страницей с других страниц --}}
        {{-- window.YandexRotorSettings.IsLoaded(): boolean - возвращает яндексу, что приложение загрузило все данные --}}

        window.AppIsInit = false;
        window.YandexRotorSettings = {
            WaiterEnabled: true,
            NoJsRedirectsToMain: true,
            IsLoaded: function (){
                return window.AppIsInit;
            }
        }
        {{--  -------- END SEO Yandex SPA -------- --}}
    </script>

{{--    sizes="any"--}}
    <link type="image/x-icon" rel="shortcut icon" href="{{secure_asset("assets/svg/common/favicon.ico")}}">
    <link type="image/svg" sizes="any" rel="icon" href="{{secure_asset("assets/svg/common/favicon.svg")}}">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $seo->title ?? __('seo.no_exists_such_page_seo') }}</title>
    <meta name="description" content="{{ $seo->desc ?? '' }}">

    <meta name="og:title" property="og:title" content="{{ $seo->title ?? __('seo.no_exists_such_page_seo') }}">
    <meta name="og:description" property="og:description" content="{{ $seo->desc ?? '' }}">
    <meta name="og:url" property="og:url" content="{{ url()->current() }}" />
    <meta name="og:image" property="og:image" content="{{ $seo->image ?? '' }}" />


    <link rel="dns-prefetch" href="//fonts.gstatic.com">
{{--    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">--}}
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
    />
    <script>
        try {
            window.siteLocale = `{{app()->getLocale()}}`;
        } catch (e) {
            console.error("initial data is wrong", e);
        }
    </script>

    <!-- Styles -->
    @viteReactRefresh
    @vite(['resources/js/app.ts'])
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app"></div>
</body>
</html>
