module.exports = function () {
  return {
    visitor: {
      StringLiteral(path) {
        const value = path.node.value;
        // 检查是否已经被 t() 包裹，如果没有，则进行包裹
        if (value && !value.startsWith('t(')) {
          path.replaceWithSourceString(`t('${value}')`);
        }
      }
    }
  };
};
