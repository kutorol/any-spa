<?php

declare(strict_types=1);

return [
    'failed' => 'Username and password do not match.',
    'password' => 'Incorrect password entered',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    'success_login' => 'Authorization successful',
    'you_in_forbidden_zone' => 'You are trying to access a protected zone',
    'pass_reset_no_token' => 'Password reset. Log into your account with the new password',
    'logout_failed' => 'Failed to log out. Please try again',
    'not_guest' => 'You must not be logged in',
    'email' => [
        'subject_mail' => 'Email Confirmation at :site_name!',
        'click_btn_to_verify' => 'Click the button below to confirm your email:',
        'verify_btn' => 'Confirm Email',
        'hello' => 'Hello!',
        'salutation' => 'Thank you for registering :)',
        'salutation_change_email' => 'Thank you for confirming your email ;)',
        'verify_send_again' => 'Email confirmation message successfully resent',
        'already_verify' => 'Your email is already confirmed',
    ],
    'pass' => [
        'subject_mail' => 'Password Recovery at :site_name!',
        'click_btn_to_change_pass' => 'Click the button below to set a new password:',
        'action_btn' => 'Recover Password',
        'salutation' => 'We hope password recovery will not be difficult :)',
        'reset' => [
            'link_not_send' => 'Password reset link not sent',
            'link_send' => 'Password reset link sent to the specified email',
            'success' => 'Password reset. You have successfully logged into your account',
            'fail' => 'Failed to reset the password. Please try again',
            'token_invalid' => 'Password cannot be set as the provided data is not valid!',
        ],
        'fail_change' => 'Failed to update the password. Please try again',
        'success_change' => 'Password updated',
    ],

    'token' => [
        'not_created' => 'Authorization token was not created. Please try again',
        'invalid' => 'The provided authorization token is not valid',
        'failed_check_type' => 'An error occurred while checking the token type',
        'not_exists' => 'The provided authorization token does not exist',
    ],
    'register' => [
        'success' => 'You are registered. A confirmation email has been sent to the specified email.',
    ],
    'login' => [
        'fail' => 'Authentication error',
        'success' => 'Authorization successful',
    ],
    'logout' => [
        'success' => 'You have successfully logged out',
    ],
];
