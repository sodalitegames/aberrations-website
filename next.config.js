module.exports = {
  reactStrictMode: true,
  generateBuildId: () => 'build',
  webpack: cfg => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['body'] },
    });
    return cfg;
  },
};
