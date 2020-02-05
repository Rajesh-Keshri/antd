module.exports = {
  globals: {
    '__UMI_HTML_SUFFIX': true,
  },
  testURL: 'http://localhost:8000',
  collectCoverageFrom:[
    'src/**/**.{js,jsx}',
    '!src/*.{js,jsx}',
    '!**/layouts/**',
    '!**/mockData/**',
    '!**/classModels/**',
    '!**/locales/**',
    '!src/models/**',
    '!**/utils/auth/**',
    '!**/services/user.js',
    '!**/**/**/selectors**',
    '!**/**/**/selectors/**',
    '!**/components/SiderMenu/**',
    '!**/components/**/breadCrumbMap**',
    '!**/components/GlobalHeader/**',
    '!src/components/ModalContent/ModalContext.js',
    '!ModalContext'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json']
};
