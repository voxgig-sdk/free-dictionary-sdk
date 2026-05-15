<?php
declare(strict_types=1);

// FreeDictionary SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FreeDictionaryFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FreeDictionaryBaseFeature();
            case "test":
                return new FreeDictionaryTestFeature();
            default:
                return new FreeDictionaryBaseFeature();
        }
    }
}
