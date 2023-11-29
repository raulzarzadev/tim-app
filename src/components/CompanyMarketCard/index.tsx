import Image from 'next/image'
import './styles.css'
import { CompanyType } from '@/types/company'
import Link from 'next/link'

const CompanyMarketCard = ({ company }: { company: CompanyType }) => {
  return (
    <div>
      <article className="card w-64 aspect-[2/3]">
        <Image
          className="card__background "
          // fill
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
          <Link href={`/${company.name}`} className="card__button">
            Visita
          </Link>
        </div>
      </article>
    </div>
  )
}

export default CompanyMarketCard
