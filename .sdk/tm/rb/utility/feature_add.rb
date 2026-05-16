# Mock SDK utility: feature_add
module MockUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
