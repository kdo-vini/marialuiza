import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Espaços', href: '#espacos' },
    { label: 'Agendar', href: '#agendar' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
            <div className="navbar__inner container">
                <a href="#" className="navbar__logo">
                    <span className="navbar__logo-script">Maria Luiza</span>
                </a>

                <nav className="navbar__links">
                    {navLinks.map(l => (
                        <a key={l.href} href={l.href} className="navbar__link">{l.label}</a>
                    ))}
                    <a href="#agendar" className="navbar__cta">Reserve sua Data</a>
                </nav>

                <button
                    className="navbar__burger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="navbar__mobile"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map(l => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="navbar__mobile-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </a>
                        ))}
                        <a
                            href="#agendar"
                            className="navbar__cta"
                            onClick={() => setMenuOpen(false)}
                        >
                            Reserve sua Data
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
