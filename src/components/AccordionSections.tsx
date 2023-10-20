import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export type AccordionSection = {
  title: string
  subTitle: string
  content: React.ReactNode
}
export default function AccordionSections({
  sections
}: {
  sections: AccordionSection[]
}) {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <div>
      {sections?.map((section, i) => (
        <Accordion
          key={section.title}
          expanded={expanded === `panel${i}`}
          onChange={handleChange(`panel${i}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {section.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {section.subTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{section.content}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
