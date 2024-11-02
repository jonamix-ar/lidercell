import React from 'react'
import { Helmet } from 'react-helmet'

const Seo = ({ title, description, keywords, image, url }) => {
  return (
    <Helmet>
      {/* Título de la página */}
      <title>{title}</title>

      {/* Meta descripción */}
      <meta name="description" content={description} />

      {/* Palabras clave */}
      <meta name="keywords" content={keywords} />

      {/* Open Graph para redes sociales */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Otros meta tags relevantes */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="LiderCell" />
    </Helmet>
  )
}

export default Seo
