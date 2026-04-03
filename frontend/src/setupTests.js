/**
 * Test Setup Configuration
 * ========================
 * This file runs before every test file.
 * Imports @testing-library/jest-dom for custom DOM matchers like:
 * - toBeInTheDocument()
 * - toHaveTextContent()
 * - toBeVisible()
 */
import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for Jest's jsdom environment
// Required by react-router v7 which uses these APIs internally
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
