import ResidenceCard from "@/components/ResidenceCard";
import {conn} from '@/libs/mysql'

async function loadResidences() {
  const residences = await conn.query('SELECT * FROM residence')
  return residences
}

export const dynamic = 'force-dynamic'

async function ResidencesPage() {
  const residences = await loadResidences();

  return <div className="pt-10 px-3 grid gap-4 grid-cols-4">
    {residences.map(residence => (
        <ResidenceCard residence={residence} key={residence.id} />
    ))}
  </div>;
}


export default ResidencesPage;
