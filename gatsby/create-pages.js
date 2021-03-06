'use strict'

const path = require('path')
const _ = require('lodash')
const createCategoriesPages = require('./pagination/create-categories-pages.js')
const createTagsPages = require('./pagination/create-tags-pages.js')
const createPostsPages = require('./pagination/create-posts-pages.js')
const createProjectsPages = require('./pagination/create-projects-pages.js')

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js')
  })

  // Tags list
  createPage({
    path: '/tags',
    component: path.resolve('./src/templates/tags-list-template.js')
  })

  // Categories list
  createPage({
    path: '/categories',
    component: path.resolve('./src/templates/categories-list-template.js')
  })

  // Posts list
  createPage({
    path: '/articles',
    component: path.resolve('./src/templates/index-template.js')
  })

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const { edges } = result.data.allMarkdownRemark

  _.each(edges, edge => {
    const { slug } = edge.node.fields
    if (_.get(edge, 'node.frontmatter.template') === 'page') {
      createPage({
        path: slug,
        component: path.resolve('./src/templates/page-template.js'),
        context: { slug }
      })
    } else if (_.get(edge, 'node.frontmatter.template') === 'post') {
      createPage({
        path: slug,
        component: path.resolve('./src/templates/post-template.js'),
        context: { slug }
      })
    } else if (_.get(edge, 'node.frontmatter.template') === 'project') {
      createPage({
        path: slug,
        component: path.resolve('./src/templates/project-template.js'),
        context: { slug }
      })
    }
  })

  // Feeds
  await createTagsPages(graphql, actions)
  await createCategoriesPages(graphql, actions)
  await createProjectsPages(graphql, actions)
  await createPostsPages(graphql, actions)
}

module.exports = createPages
