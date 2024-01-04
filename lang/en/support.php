<?php

declare(strict_types=1);

use App\Enums\TechSupport\TechSupportStatus;

return [
    'send_success' => 'Request sent successfully',
    'error_create' => 'Failed to create a support request. Please try again',
    'not_save_attachment' => 'Resend the form with the request as the photo could not be saved',
    'request_create' => 'Request created successfully',
    'not_found' => 'Record not found',
    'not_delete' => 'Record not deleted. Please try again',
    'not_change_status' => 'Failed to change status',
    'admin' => [
        'deleted' => 'Record deleted',
        'edit' => [
            'same_status' => 'The record is already in this status',
            'success' => 'Status successfully changed',
        ],
        'delete' => [
            'success' => 'Attachment deleted',
            'ok_attach_not_delete' => 'Files deleted, but the database record was not deleted',
            'not_found_attach' => 'Attachment not found',
        ],
    ],
    'status' => [
        TechSupportStatus::STATUS_CREATED->value => 'created',
        TechSupportStatus::STATUS_IN_PROGRESS->value => 'in progress',
        TechSupportStatus::STATUS_DEFERRED->value => 'deferred',
        TechSupportStatus::STATUS_REJECTED->value => 'rejected',
        TechSupportStatus::STATUS_DONE->value => 'done',
    ],
    'mail' => [
        'update_mail_subject' => 'The status of your request #:num has changed on the site :site_name!',
        'greeting' => 'Hello! The status of request #:num has been changed to :status!',
        'your_request' => 'Your request',
        'admin_response' => 'Administrator response',
        'to_main_page' => 'Go to :site_name',
        'thanks' => 'Sincerely, the :site_name team!',
    ],
];
