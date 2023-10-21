<?php
    /** @var object $seo */
    $seo = app(App\Http\Controllers\Api\Seo\SeoController::class)
        ->pageInfo()
        ->getData()->data->seo;
?>


<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
{{--    sizes="any"--}}
    <link type="image/x-icon" rel="shortcut icon" href="{{secure_asset("assets/images/svg/common/favicon.ico")}}">
    <link type="image/svg" sizes="any" rel="icon" href="{{secure_asset("assets/images/svg/common/favicon.svg")}}">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="index, follow">

    <title>{{ $seo->title }}</title>
    <meta name="description" content="{{ $seo->desc }}">

    <meta name="og:title" property="og:title" content="{{ $seo->title }}">
    <meta name="og:description" property="og:description" content="{{ $seo->desc }}">
    <meta property="og:url" content="{{ url()->current() }}" />


    <link rel="dns-prefetch" href="//fonts.gstatic.com">
{{--    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">--}}
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
    />
    <script>
        window.siteLocale = `{{app()->getLocale()}}`;
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
