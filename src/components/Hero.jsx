import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import './Hero.css'

export default function Hero() {
    return (
        <section className="hero" id="home">
            {/* ---- Video Background ---- */}
            {/* Drop your video file as: public/hero-video.mp4 */}
            <video
                className="hero__video"
                src="/video_ML_hero.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="hero__overlay" />

            {/* Floating petals decoration */}
            <div className="hero__petals" aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                    <span key={i} className={`petal petal--${i + 1}`} />
                ))}
            </div>

            <div className="hero__content">
                <motion.span
                    className="hero__tag"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    CONFIRA NOSSAS DATAS DISPONÍVEIS
                </motion.span>

                <motion.h1
                    className="hero__title"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <span className="hero__title-line">Seu grande dia</span>
                    <span className="hero__title-script">merece um cenário inesquecível</span>
                </motion.h1>

                <motion.p
                    className="hero__subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.8 }}
                >
                    Na união perfeita entre a natureza e a elegância,
                    criamos o palco onde as histórias de amor mais bonitas de Promissão-SP começam.
                </motion.p>

                <motion.div
                    className="hero__actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                >
                    <a href="#agendar" className="hero__btn hero__btn--primary">
                        Verificar Datas
                    </a>
                    <a href="#sobre" className="hero__btn hero__btn--ghost">
                        Conhecer o Espaço
                    </a>
                </motion.div>
            </div>

            <motion.a
                href="#sobre"
                className="hero__scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                aria-label="Rolar para baixo"
            >
                <ChevronDown size={24} />
            </motion.a>
        </section>
    )
}
