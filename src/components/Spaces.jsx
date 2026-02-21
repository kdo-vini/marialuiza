import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import './Spaces.css'

const categories = [
    {
        id: 'casamentos',
        title: 'Casamentos',
        subtitle: 'O "Sim" mais inesquecível da sua vida',
        desc: 'Crie memórias eternas em um cenário que une a serenidade da natureza com a sofisticação que seu grande dia merece. Do rústico ao clássico, nosso espaço se molda ao seu sonho.',
        image: '/spaces/casamentos.png',
    },
    {
        id: 'aniversarios',
        title: 'Aniversários & 15 Anos',
        subtitle: 'Celebre cada ciclo com brilho',
        desc: 'Transforme sua data especial em um evento épico. Com infraestrutura completa e ambientes versáteis, garantimos que cada detalhe da sua festa seja celebrado em grande estilo.',
        image: '/spaces/aniversarios.png',
    },
    {
        id: 'corporativo',
        title: 'Eventos Corporativos',
        subtitle: 'Excelência para o seu negócio',
        desc: 'O local ideal para workshops, treinamentos ou confraternizações. Fuja do ambiente cinza da cidade e traga sua equipe para um espaço que inspira criatividade e foco.',
        image: '/spaces/corporativos.png',
    },
]

export default function Spaces() {
    const [active, setActive] = useState(0)
    const current = categories[active]

    return (
        <section className="spaces" id="espacos">
            <div className="container">
                <motion.div
                    className="spaces__header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="spaces__tag">Nossos Espaços</span>
                    <h2 className="spaces__title">
                        Momentos perfeitos para <em>cada ocasião</em>
                    </h2>
                </motion.div>

                <div className="spaces__showcase">
                    {/* Tabs */}
                    <div className="spaces__tabs">
                        {categories.map((s, i) => (
                            <button
                                key={s.id}
                                className={`spaces__tab ${i === active ? 'spaces__tab--active' : ''}`}
                                onClick={() => setActive(i)}
                            >
                                <span className="spaces__tab-num">0{i + 1}</span>
                                <span className="spaces__tab-label">{s.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="spaces__display">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                className="spaces__slide"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="spaces__slide-img">
                                    <img src={current.image} alt={current.title} />
                                </div>
                                <div className="spaces__slide-text">
                                    <span className="spaces__slide-subtitle">{current.subtitle}</span>
                                    <h3>{current.title}</h3>
                                    <p>{current.desc}</p>
                                    <a href="#agendar" className="spaces__slide-cta">
                                        Solicitar Orçamento <ArrowRight size={18} />
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
