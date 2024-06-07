import Image from 'next/image';

function HomePage () {
  return (
<div class="common_style">

<section className="about_section">
      <div className="container">
        <div className="row">
          
          <div className="col-md-6">
            <div className="about_detail-box">
              <h3>
                Sobre el proyecto
              </h3>
              <p>
                El propósito fundamental de este proyecto es abordar las necesidades prácticas de los niños que residen 
                en el Servicio Nacional de Menores (SENAME) como también en un hogar de 
                menores, proporcionando una plataforma digital que facilite la donación de artículos esenciales como 
                ropa, productos de higiene personal y demás. Además, la aplicación busca digitalizar el proceso de 
                apadrinamiento de niños, permitiendo a los usuarios realizar donaciones monetarias para que los hogares 
                de menores puedan adquirir los artículos necesarios de manera eficiente.
              </p>
              <div className="col-md-6">
            <div className="about_img-container">
              <Image src="/about.png" alt="" width={500} height={300} />
            </div>
          </div>
              <div className="Apadrinar">
                <a href="galeria.html" className="btn">
                  Apadrinar
                </a>
              </div> 
            </div>
          </div>
        </div>
      </div>
      
    </section>
    </div>
  );
}
export default HomePage