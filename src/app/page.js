'use client';
import { useSession } from "next-auth/react";
import Image from 'next/image';

function HomePage() {
  const { data: session } = useSession();
  const username = session?.user?.name;
  const id = session?.user?.id;

  return (
    <div className="common_style">
      <section className="about_section">
        <div className="container">

          <h3>
            {username ? (<>Bienvenido/a <span style={{ fontWeight: 'bold', color: '#3498db' }}>{username}</span> a Nuestro Proyecto</>
            ) : 'Bienvenidos a Nuestro Proyecto'}
            </h3>

          <p>
            Nuestro objetivo es crear un puente de solidaridad que conecte a quienes desean ayudar con los niños y
            hogares que más lo necesitan. A través de esta plataforma, podrás:
          </p>

          <ul style={{ textAlign: 'left', margin: '20px auto', maxWidth: '800px' }}>
            <li>
              <strong>● Apadrinar a un niño</strong> mediante suscripciones mensuales, garantizando que reciba apoyo constante y necesario.
            </li>
            <li>
              <strong>● Donar directamente a un hogar</strong>, permitiendo que los administradores decidan cómo utilizar los fondos
              de manera eficiente para cubrir sus necesidades más urgentes.
            </li>
            <li>
              <strong>● Colaborar con donaciones específicas</strong>, como ropa, productos de higiene personal, o cualquier artículo
              esencial solicitado.
            </li>
          </ul>

          <p>
            Con esta iniciativa, buscamos no solo facilitar la ayuda material, sino también fomentar un impacto positivo y duradero
            en la vida de estos niños y sus hogares. ¡Únete y transforma vidas hoy mismo!
          </p>

          <div className="about_img">
            <Image
              src="https://logo-cert3-linuxwindows-ba-ng.s3.us-east-1.amazonaws.com/about.png"
              alt="Imagen del proyecto"
              width={500}
              height={300}
            />
          </div>

          <div className="button-group" style={{ marginTop: '20px' }}>

            <a href="childrens" className="btn">
              Niños protegidos
            </a>

            <a href="residences" className="btn">
              Hogares
            </a>

            <a href={`historial?user_id=${id}`} className="btn">
              Historial de donaciones
            </a>

          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
