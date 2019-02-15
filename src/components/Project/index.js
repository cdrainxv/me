import React from 'react'
import { Link } from 'gatsby'
import Author from '../Post/Author'
import Comments from '../Post/Comments'
import Content from '../Post/Content'
import Meta from '../Post/Meta'
import Tags from '../Post/Meta'
import styles from '../Post/Post.module.scss'

const Project = ({ project }) => {
  const { tags, title, date } = project.frontmatter
  console.log('projects: ', project.frontmatter)

  const { html } = project
  const { tagSlugs } = project.fields

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/projects">
        All Projects
      </Link>

      <div className={styles['post__content']}>
        <Content body={html} title={title} />
      </div>

      <div className={styles['post__footer']}>
        <Tags tags={tags} tagSlugs={tagSlugs} />
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments
          postSlug={project.fields.slug}
          postTitle={project.frontmatter.title}
        />
      </div>
    </div>
  )
}

export default Project