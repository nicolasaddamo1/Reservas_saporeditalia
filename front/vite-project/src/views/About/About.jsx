import React, { useState } from 'react';
import styles from "./About.module.css";

const About = () => {
    const [showContent, setShowContent] = useState(false);
  
    const handleShowContent = () => {
      setShowContent(true);
    };

  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.h2}>¡Bienvenido a Sapore d'Italia</h2>
      <p className={styles.p}>
        Ubicado en el corazón de la bulliciosa ciudad, emerge un rincón de Italia que te transporta a la calidez y la autenticidad de la cocina mediterránea: "Sapore d'Italia Grill". Este nuevo restaurante fusiona la pasión por las tradiciones culinarias italianas con la maestría de una parrilla gourmet, ofreciendo una experiencia gastronómica única que deleitará tanto a los conocedores como a los paladares más exigentes.
      </p>
      <p className={styles.p}>
        Desde el momento en que atraviesas las puertas de madera tallada, te envuelve una atmósfera acogedora y familiar. La decoración rústica, con paredes de ladrillo visto y mesas de madera pulida, crea un ambiente cálido y acogedor que invita a relajarse y disfrutar de la comida. El aroma tentador de especias y hierbas frescas flota en el aire, anticipando el festín que está por venir.
      </p>
      <p className={styles.p}>
        La carta de "Sapore d'Italia Grill" es un homenaje a la riqueza culinaria de Italia, con platos que van desde las clásicas pastas caseras hasta las delicias de la parrilla más exquisitas. Para comenzar, te recomiendo probar la burrata fresca con tomates cherry y albahaca, una explosión de sabores frescos y cremosos que despiertan el paladar y preparan el camino para los platos principales.
      </p>
      {showContent ? (
        <div>
      <p className={styles.p}>
            La estrella de la casa son las carnes a la parrilla, cuidadosamente seleccionadas y cocinadas a la perfección. Desde suculentos filetes de ternera hasta tiernos cortes de cordero, cada bocado es una experiencia sublime. El secreto radica en la combinación de ingredientes de alta calidad y técnicas de cocina artesanales, que resaltan los sabores naturales de los ingredientes.
          </p>
          <p className={styles.p}>
            Pero lo que realmente distingue a "Sapore d'Italia Grill" es su enfoque en las tradiciones culinarias italianas. Cada plato está imbuido del espíritu y la historia de la cocina italiana, desde las recetas transmitidas de generación en generación hasta los ingredientes frescos y de temporada que se utilizan con esmero. Es como si cada bocado te transportara a las colinas de la Toscana o a las costas de Sicilia, despertando recuerdos y emociones perdidas en el tiempo.
          </p>
          <p className={styles.p}>
            Además de la deliciosa comida, "Sapore d'Italia Grill" ofrece un servicio impecable y una atención personalizada que te hace sentir como en casa. El personal, cálido y atento, está siempre dispuesto a hacer recomendaciones y satisfacer cualquier solicitud especial, garantizando una experiencia gastronómica memorable en cada visita.
          </p>
          <h2 className={styles.h2}>¡Gracias por tu visita!</h2>
          <br />            
        </div>
      ) : (
        <button className={styles.button} onClick={handleShowContent}>Ver más</button>
      )}
    </div>
  );
}

export default About;
