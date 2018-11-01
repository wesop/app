import Category from './category'

export default class Resume {
  /**
   * @typedef Resume
   * @property {string} title
   * @property {string} contents
   * @property {Category[]} categories
   *
   * @param {Resume} resume
   */
  constructor(resume = {
    title: '',
    contents: '',
    categories: []
  }) {
    this.title = resume.title;
    this.contents = resume.contents;
    this.categories = resume.categories;
  }
}
