# FreeDictionary SDK utility: feature_add
module FreeDictionaryUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
