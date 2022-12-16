export default () => {
  switch (import.meta.env.PROD) {
    case true:
      return '';
    default:
      return 'http://localhost:2222';
  }
};
