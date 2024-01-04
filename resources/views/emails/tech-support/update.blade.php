<?php
/**
 * @var \App\Models\TechSupport\TechSupport $entity
 * @var ?string $adminComment
 * @var string $urlTo
 */
?>
<x-mail::message>
  <style type="text/css">
    blockquote {
      background: #f9f9f9;
      border-left: 10px solid #ccc;
      margin: 1.5em 10px;
      padding: 0.5em 10px;
      quotes: "\201C""\201D""\2018""\2019";
    }

    blockquote:before {
      color: #ccc;
      content: open-quote;
      font-size: 4em;
      line-height: 0.1em;
      margin-right: 0.25em;
      vertical-align: -0.4em;
    }

    blockquote p {
      display: inline;
    }
  </style>
{{ __('support.mail.greeting', ['num' => $entity->id, 'status' => '"'.__('support.status.'.$entity->status->value).'"']) }}
---

{!! $entity->comment !!}


---

@if (isset($adminComment))
### {{ __('support.mail.admin_response') }}

{!! $adminComment !!}
@endif

<x-mail::button :url="$urlTo">
  {{ __('support.mail.to_main_page', ['site_name' => explode("//", Url::to('/'))[1] ?? Url::to('/')]) }}
</x-mail::button>

{{ __('support.mail.thanks', ['site_name' => config('app.name')]) }}
</x-mail::message>