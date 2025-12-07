import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../Layout'

describe('Layout Component', () => {
  test('renderiza el header con el título', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </BrowserRouter>
    )

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(screen.getByText('Eventos')).toBeInTheDocument()
  })

  test('renderiza el contenido children', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Test Content Here</div>
        </Layout>
      </BrowserRouter>
    )

    expect(screen.getByText('Test Content Here')).toBeInTheDocument()
  })
  test('renderiza el footer', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Test</div>
        </Layout>
      </BrowserRouter>
    )

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('tiene la estructura correcta de header, main y footer', () => {
    const { container } = render(
      <BrowserRouter>
        <Layout>
          <div>Test</div>
        </Layout>
      </BrowserRouter>
    )

    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('main')).toBeInTheDocument()
    expect(container.querySelector('footer')).toBeInTheDocument()
  })
})
