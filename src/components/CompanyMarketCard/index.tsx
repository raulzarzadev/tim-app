import Image from 'next/image'
import { CompanyType } from '@/types/company'
import './styles.css'
import { Button } from '@mui/material'
import Link from 'next/link'

const CompanyMarketCard = ({ company }: { company: CompanyType }) => {
  return (
    <>
      <article className="card relative">
        <Image
          className="card__background "
          src={company.image || '/images/icons/icon-384x384.png'}
          alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
          width="1920"
          height="2193"
        />
        <div className="card__content | flow">
          <div className="card__content--container | flow">
            <h2 className="card__title">{company.name}</h2>
            <p className="card__description">{company.description}</p>
          </div>
          <Button
            LinkComponent={Link}
            href={`/${company.name}`}
            className="card__button"
          >
            Read more
          </Button>
        </div>
      </article>
    </>
  )
}

export default CompanyMarketCard
