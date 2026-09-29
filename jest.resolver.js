module.exports = (request, options) => {
  try {
    return options.defaultResolver(request, options);
  } catch {
    return options.defaultResolver(request, {
      ...options,
      conditions: [...(options.conditions ?? []), "import"],
    });
  }
};
