<?php

declare(strict_types=1);

namespace App\Mail\TechSupport;

use App\Models\TechSupport\TechSupport;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use URL;

class TechSupportUpdate extends Mailable
{
    use Queueable, SerializesModels;

    public TechSupport $entity;

    public ?string $adminComment;

    /**
     * Create a new message instance.
     */
    public function __construct(TechSupport $entity, ?string $adminComment)
    {
        $this->entity = $entity;
        $this->adminComment = $adminComment;
    }

    /**
     * Заголовки.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: config('mail.from.address'),
            subject: __('support.mail.update_mail_subject', ['num' => $this->entity->id, 'site_name' => explode('//', Url::to('/'))[1] ?? Url::to('/')]),
        );
    }

    /**
     * Само сообщение.
     */
    public function content(): Content
    {
        return new Content(
            // view: 'to.blade', // так можно указать шаблон
            markdown: 'emails.tech-support.update',
            with: [
                'entity' => $this->entity,
                'adminComment' => $this->adminComment,
                'urlTo' => URL::secure('/'),
            ]
        );
    }
}
