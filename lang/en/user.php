<?php

declare(strict_types=1);

return [
    'created' => 'User created',
    'bad_role' => 'You do not have the right permissions',
    'not_created' => 'User registration failed. Please try again',
    'not_created_exists' => 'User registration failed. Email is already registered on the site',
    'not_found' => 'User not found',
    'deleted' => 'User deleted',
    'not_deleted' => 'Failed to delete user',
    'not_updated' => 'Failed to update user',
    'updated_with_email' => 'User updated. Confirmation email has been sent',
    'updated' => 'User updated',

    'block' => [
        'comment_head' => 'Administrator comment',
        'until' => 'Until the end of the block',
        'title' => 'Your account is blocked',
    ],
    'profile' => [
        'email_occupied' => 'Profile not updated. Enter a different email',
        'success_change' => 'Profile updated',
        'success_change_email_send' => 'Profile updated. Confirmation email has been sent to the specified address: :email',
        'fail_save_confirmed_agreement' => 'Failed to save your agreement confirmation',
        'not_pass_avatar' => 'You did not provide an avatar',
        'avatar_change_success' => 'Avatar changed',
        'avatar_change_fail' => 'Failed to change the avatar. Please try again or contact technical support',
        'change_locale_success' => 'Language changed successfully',
    ],
    'email' => [
        'no_verification' =>'You cannot log in until you confirm your email',
    ],
];
