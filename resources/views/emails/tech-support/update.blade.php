<?php
/**
 * @var \App\Models\TechSupport\TechSupport $entity
 * @var ?string $adminComment
 * @var string $urlTo
 */
?>
<x-mail::message>
{{ __('support.mail.greeting', ['num' => $entity->id, 'status' => '"'.__('support.status.'.$entity->status).'"']) }}
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