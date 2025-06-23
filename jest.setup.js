require('@testing-library/jest-dom');

// Mock CSS modules
const mockCssModule = {
  button: 'button',
  contained: 'contained',
  text: 'text',
  outlined: 'outlined',
  colorPrimary: 'colorPrimary',
  colorSecondary: 'colorSecondary',
  colorSuccess: 'colorSuccess',
  colorError: 'colorError',
  colorDisabled: 'colorDisabled',
  small: 'small',
  medium: 'medium',
  large: 'large',
};


if (typeof window !== 'undefined') {
  Object.defineProperty(window.HTMLDialogElement.prototype, 'showModal', {
    value: function() {
      this.setAttribute('open', '');
    },
    writable: true
  });

  Object.defineProperty(window.HTMLDialogElement.prototype, 'close', {
    value: function() {
      this.removeAttribute('open');
    },
    writable: true
  });

  Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
    value: function() { 
    },
    writable: true
  });
}

module.exports = { mockCssModule }; 