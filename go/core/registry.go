package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEntryEntityFunc func(client *FreeDictionarySDK, entopts map[string]any) FreeDictionaryEntity

