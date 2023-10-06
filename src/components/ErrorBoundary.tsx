'use client'
import { Component, ReactNode } from 'react'

interface Props {
  hasError?: boolean
  fallback?: ReactNode
  children?: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logErrorToMyService(error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || <>¡Ups! Hubo un problema.</>
    }

    return this.props.children || <></>
  }
}

const logErrorToMyService = (...props: any[]) => {
  console.log('logErrorToMyService', props)
}

export default ErrorBoundary
