tailwind.config = {
  theme: {
    extend: {
      colors: {
        'royal-gold': '#FFD700',
        'midnight-blue': '#1C1F33',
        'electric-aqua': '#00E0FF',
        'bold-crimson': '#D72638',
        'jet-black': '#000000'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 224, 255, 0.3)',
        'gold-glow': '0 0 15px rgba(255, 215, 0, 0.3)',
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'hover'],
      textColor: ['active', 'hover'],
      borderColor: ['active', 'hover'],
      transform: ['hover', 'focus'],
    }
  }
}
