import Link from 'next/link'

const Navigation = () => {
  const navList = [
    { label: 'Home', route: '/' },
    { label: 'about', route: '/about' }
  ]
  return (
    <div>
      <nav>
        {navList.map((item) => (
          <Link key={item.route} href={item.route}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Navigation
