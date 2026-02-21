import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Heart, Sun } from 'lucide-react'
import Gallery from './Gallery'
import './About.css'

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }
    })
}

export default function About() {
    return (
        <section className="about" id="sobre">
            <div className="container">
                {/* ---- Text Block ---- */}
                <div className="about__grid">
                    {/* Left — Image Collage */}
                    <motion.div
                        className="about__images"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeUp}
                    >
                        <div className="about__img about__img--main">
                            <img
                                src="gallery/foto1.png"
                                alt="Cerimônia ao ar livre no Espaço Maria Luiza"
                            />
                        </div>
                        <div className="about__img about__img--accent">
                            <img
                                src="gallery/foto2.png"
                                alt="Detalhes florais do espaço"
                            />
                        </div>
                        <div className="about__float-badge">
                            <Heart size={20} />
                            <span>Feito com amor</span>
                        </div>
                    </motion.div>

                    {/* Right — Text */}
                    <div className="about__text">
                        <motion.span
                            className="about__tag"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            Sobre nós
                        </motion.span>

                        <motion.h2
                            className="about__title"
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            Onde os seus sonhos <em>ganham vida</em>
                        </motion.h2>

                        <motion.p
                            className="about__desc"
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            Rodeado pela natureza e com um cenário sem igual, o Espaço Maria Luiza
                            nasceu para ser o palco de histórias inesquecíveis. Nosso ambiente foi
                            cuidadosamente projetado para oferecer o equilíbrio perfeito entre o
                            charme rústico do campo e a elegância que o seu evento exige.
                        </motion.p>

                        <motion.p
                            className="about__desc"
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            Seja sob a luz do sol para uma cerimônia ao ar livre ou sob o brilho
                            das estrelas, cada detalhe aqui é pensado para celebrar o amor,
                            a alegria e a vida.
                        </motion.p>

                        <motion.div
                            className="about__features"
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className="about__feature">
                                <Leaf size={22} />
                                <span>Rodeado por natureza</span>
                            </div>
                            <div className="about__feature">
                                <Sun size={22} />
                                <span>Eventos diurnos & noturnos</span>
                            </div>
                            <div className="about__feature">
                                <Heart size={22} />
                                <span>Ambiente perfeito para o seu evento</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ---- Gallery Block ---- */}
                <motion.div
                    className="about__gallery-block"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="about__gallery-header">
                        <span className="about__tag">Galeria</span>
                        <h3 className="about__gallery-title">
                            Conheça o nosso <em>espaço</em>
                        </h3>
                        <p className="about__gallery-sub">
                            Cada canto foi projetado para criar cenários inesquecíveis.
                            Clique nas fotos para explorar em detalhe.
                        </p>
                    </div>
                    <Gallery />
                </motion.div>
            </div>
        </section>
    )
}
