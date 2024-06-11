<?php

use JohannSchopplich\ContentTranslator\Translator;
use Kirby\Toolkit\I18n;

return [
    'content-translator' => [
        'props' => [
            'label' => fn ($label = null) => I18n::translate($label, $label),
            'confirm' => fn ($confirm = true) => $confirm === true,
            'import' => fn ($import = true) => $import === true,
            'fieldTypes' => function ($fieldTypes = null) {
                if (is_array($fieldTypes)) {
                    return array_map('strtolower', $fieldTypes);
                }

                return $fieldTypes;
            },
            'includeFields' => function ($includeFields = null) {
                if (is_array($includeFields)) {
                    return array_map('strtolower', $includeFields);
                }

                return $includeFields;
            },
            'excludeFields' => function ($excludeFields = null) {
                if (is_array($excludeFields)) {
                    return array_map('strtolower', $excludeFields);
                }

                return $excludeFields;
            },
            'title' => fn ($title = false) => $title === true,
            'slug' => fn ($slug = false) => $slug === true
        ],
        'computed' => [
            'fields' => function () {
                return Translator::resolveModelFields($this->model);
            },
            'config' => function () {
                /** @var \Kirby\Cms\App $kirby */
                $kirby = $this->kirby();
                $config = $kirby->option('johannschopplich.content-translator', []);

                // Don't leak the API key to the Panel frontend
                if (isset($config['DeepL']['apiKey'])) {
                    $config['DeepL'] = [
                        'apiKey' => !empty($config['DeepL']['apiKey'])
                    ];
                }

                $config['translateFn'] = isset($config['translateFn']) && is_callable($config['translateFn']);

                return $config;
            }
        ]
    ]
];
