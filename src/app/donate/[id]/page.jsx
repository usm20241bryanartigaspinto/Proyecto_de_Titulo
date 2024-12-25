'use client';

import DonationForm from "@/components/DonationForm";

async function DonatePage({ params }) {
  return (
    <div>
      <DonationForm childrenId={params.id} />
    </div>
  );
}

export default DonatePage;
