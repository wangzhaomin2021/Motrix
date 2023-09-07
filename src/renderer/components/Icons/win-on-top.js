import Icon from '@/components/Icons/Icon'
console.log('icon', Icon);
Icon.register({
  'win-on-top': {
    'width': 12,
    'height': 12,
    'raw': `<line x1="1" y1="2" x2="11" y2="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="6" y1="2" x2="6" y2="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="3 6 6 2 9 6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    'g': {
      'stroke': 'currentColor',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '1'
    }
  }
})
