import React from 'react'
import { MapPin, Clock, Instagram, Heart } from 'lucide-react'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                {/* Top */}
                <div className="footer__top">
                    <div className="footer__brand">
                        <h3 className="footer__logo">Maria Luiza</h3>
                        <p className="footer__tagline">
                            Onde os sonhos se encontram com a natureza — Promissão, SP.
                        </p>
                        <div className="footer__social">
                            <a href="https://www.instagram.com/marialuizaespaco/" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="footer__col">
                        <h4>Endereço</h4>
                        <p>
                            <MapPin size={16} />
                            Av. da Saudade, 970 — Centro<br />
                            Promissão - SP, 16370-000
                        </p>
                    </div>

                    <div className="footer__col">
                        <h4>Atendimento</h4>
                        <p>
                            <Clock size={16} />
                            Eventos diurnos, noturnos e de madrugada. Flexibilidade total para a montagem da sua festa.
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer__bottom">
                    <span>&copy; {new Date().getFullYear()} Espaço Maria Luiza. Todos os direitos reservados.</span>
                    <span className="footer__credit">
                        Feito com <Heart size={12} className="footer__heart" /> por{' '}
                        <a href="#" target="_blank" rel="noreferrer">Téchne</a>
                    </span>
                </div>
            </div>
        </footer>
    )
}
