export default new class {
  removeComma(str) {
    if (!str || typeof str !== 'string') {
      return '';
    }
    const reg = /(,|，|。|.|!|\?)$/i;
    return str.replace(reg, '');
  }
};
