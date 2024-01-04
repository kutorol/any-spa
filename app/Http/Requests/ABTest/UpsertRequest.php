<?php

declare(strict_types=1);

namespace App\Http\Requests\ABTest;

use Illuminate\Foundation\Http\FormRequest;

class UpsertRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'nullable|integer|sometimes|num_exists_or_null:ab_test_group,id',
            'nameTest' => 'required|string',
            'isActive' => 'required|boolean',
            'comment' => 'required|string',
            'totalPercentFromUsers' => 'required|integer|min:1',
            'maxCountUsersInTest' => 'required|integer|min:1',
            // 1 значение минимально
            'values' => 'required|array|min:1',
            // если id > 0, то оно должно существовать в таблице уже
            'values.*.id' => 'nullable|integer|num_exists_or_null:ab_test_values,id',
            // минимум 1 знак должно быть у значения a/b теста
            'values.*.value' => 'required|string|min:1',
        ];
    }
}
