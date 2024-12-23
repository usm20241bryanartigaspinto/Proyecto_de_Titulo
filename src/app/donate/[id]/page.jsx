'use client';

import DonationForm from "@/components/DonationForm"; // Asegúrate de que el formulario esté correctamente importado

async function DonatePage({ params }) {
  return (
    <div>
      <DonationForm childrenId={params.id} />  {/* Pasa el id del niño al formulario */}
    </div>
  );
}

export default DonatePage;
