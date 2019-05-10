const buildSeedObject = (data) => {
  return {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

module.exports = buildSeedObject;