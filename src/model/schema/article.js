export default {
  schema: {
    title: { type: String },
    description: { type: String },
    url: { type: String },
    display_time: { type: Date, index: true },
    thumb: { type: String },
    type: { type: String },
    text: { type: String },
    article_id: { type: String }
  },
  name: 'Article',
  collection: 'article'
};
