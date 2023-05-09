<!DOCTYPE html>
@php
    $manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
    $js_file = $manifest['index.html']['file'];
    $css_file = $manifest['index.css']['file'];
@endphp
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />

    <!-- Icon -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('static/favicon/apple-touch-icon.png') }}">
    <link rel="icon" href="{{ asset('static/favicon/favicon.ico') }}" />
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('static/favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('static/favicon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('static/favicon/site.webmanifest') }}">

    <!-- No caching -->
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta
      http-equiv="cache-control"
      content="no-cache, no-store, must-revalidate"
    />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />

    <title>{{ env('APP_NAME') }}</title>

    <!-- Static styles -->
    <link rel="stylesheet" href="{{ asset('static/normalize.css') }}" />
    <link rel="stylesheet" href="{{ asset('static/static.css') }}" />

    <!-- FE application -->

    <!-- Scripts -->
    <link href="{{ asset('build/' . $js_file) }}" crossorigin rel="preload" as="script">

    <!-- Styles -->
    <link href="{{ asset('build/' . $css_file) }}" rel="preload" as="style">
    <link href="{{ asset('build/' . $css_file) }}" rel="stylesheet">
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but frontend doesn't work properly without JavaScript
        enabled. Please enable it to continue.</strong
      >
    </noscript>
    <div id="root"></div>

    <script type="module" crossorigin src="{{ asset('build/' . $js_file) }}"></script>
  </body>
</html>
