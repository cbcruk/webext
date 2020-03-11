const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8,
    color: 'inherit',
    textDecoration: 'none',
    '& + &': {
      borderTop: '1px solid #434343'
    },
    '&:hover img': {
      filter: 'grayscale(0)'
    }
  },
  body: {
    paddingRight: 8
  },
  title: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'keep-all',
    color: 'rgba(255, 255, 255, 0.87)',
    '> mark': {
      paddingRight: 2,
      paddingLeft: 2,
      borderRadius: 9999
    }
  },
  status: {
    '&.is-sale': {
      color: '#fb6400'
    },
    '&.is-escrow': {
      color: '#03c75a'
    },
    '&.is-sold_out': {
      color: '#959595',
      textDecoration: 'line-through'
    }
  },
  cost: {
    fontWeight: 'bold'
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    '> svg': {
      color: 'currentColor'
    }
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    '> svg': {
      marginRight: 2
    },
    '& + &': {
      marginLeft: 4
    }
  },
  media: {
    '> img': {
      width: 70.67,
      height: 70.67,
      objectFit: 'cover',
      filter: 'grayscale(1)',
      transition: 'all 0.3s'
    }
  }
}

export default styles
