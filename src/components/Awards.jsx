import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Leaf, Sparkles } from 'lucide-react'
import './Awards.css'

const awards = [
    { year: '2022', label: 'Medalha de Ouro' },
    { year: '2023', label: 'Medalha de Ouro' },
    { year: '2024', label: 'Medalha de Ouro' },
]

const differentials = [
    {
        icon: <Trophy size={28} />,
        title: 'Tricampeão LocalBest',
        text: 'Eleito o melhor Salão de Festas de Promissão por três anos consecutivos — uma conquista que reflete a confiança e o carinho de nossos clientes.',
    },
    {
        icon: <Leaf size={28} />,
        title: 'Natureza Exuberante',
        text: 'Uma área externa deslumbrante, ideal para cerimônias ao ar livre, ensaios fotográficos e eventos que buscam uma atmosfera romântica e acolhedora.',
    },
    {
        icon: <Sparkles size={28} />,
        title: 'Infraestrutura Completa',
        text: 'Ambientes versáteis para diferentes tamanhos e estilos de festa, garantindo conforto total das 6h da manhã até o amanhecer do dia seguinte.',
    },
]

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Awards() {
    return (
        <section className="awards" id="premiacoes">
            <div className="awards__bg-text">OURO</div>

            <div className="container">
                {/* Trophy Timeline */}
                <motion.div
                    className="awards__header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={container}
                >
                    <motion.span className="awards__tag" variants={item}>Premiações</motion.span>
                    <motion.h2 className="awards__title" variants={item}>
                        Três vezes <em>o melhor</em>
                    </motion.h2>
                    <motion.p className="awards__sub" variants={item}>
                        Prêmio LocalBest — Categoria &ldquo;Salão de Festas&rdquo; — Promissão-SP
                    </motion.p>
                </motion.div>

                {/* Gold Medals Row */}
                <motion.div
                    className="awards__medals"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={container}
                >
                    {awards.map((a) => (
                        <motion.div key={a.year} className="medal" variants={item}>
                            <div className="medal__ring">
                                <Trophy size={32} />
                            </div>
                            <span className="medal__year">{a.year}</span>
                            <span className="medal__label">{a.label}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Cards */}
                <motion.div
                    className="awards__cards"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={container}
                >
                    {differentials.map((d, i) => (
                        <motion.div key={i} className="diff-card" variants={item}>
                            <div className="diff-card__icon">{d.icon}</div>
                            <h3 className="diff-card__title">{d.title}</h3>
                            <p className="diff-card__text">{d.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
