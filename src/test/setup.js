import '@testing-library/jest-dom'
import { afterEach } from 'vitest'

window.scrollTo = () => {}

afterEach(() => sessionStorage.clear())
