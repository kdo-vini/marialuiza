import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import './Gallery.css'

/*
 * HOW TO USE:
 * Drop your real photos inside the `public/gallery/` folder.
 * Add their filenames to the array below.
 * Supported formats: .jpg, .jpeg, .webp, .png
 */
const PHOTOS = [
    { src: '/gallery/foto1.png', caption: 'Beleza exuberante da natureza' },
    { src: '/gallery/foto2.png', caption: 'Cenários para cerimônias inesquecíveis' },
    { src: '/gallery/foto3.png', caption: 'Infraestrutura completa e elegante' },
    { src: '/gallery/foto4.png', caption: 'Espaço Maria Luiza ao ar livre' },
    { src: '/gallery/fot5.png', caption: 'Detalhes que encantam' },
]

export default function Gallery() {
    const [current, setCurrent] = useState(0)
    const [lightbox, setLightbox] = useState(null) // index of open lightbox
    const [isHovered, setIsHovered] = useState(false)

    const total = PHOTOS.length

    const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])
    const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])

    // Auto-advance carousel
    useEffect(() => {
        if (isHovered) return
        const t = setInterval(next, 4000)
        return () => clearInterval(t)
    }, [next, isHovered])

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (lightbox === null) return
        const handler = (e) => {
            if (e.key === 'ArrowLeft') setLightbox(l => (l - 1 + total) % total)
            if (e.key === 'ArrowRight') setLightbox(l => (l + 1) % total)
            if (e.key === 'Escape') setLightbox(null)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [lightbox, total])

    // Visible slides: show 3 centered
    const getVisible = () => {
        const indices = []
        for (let i = -1; i <= 1; i++) {
            indices.push((current + i + total) % total)
        }
        return indices
    }

    return (
        <div className="gallery" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="gallery__track">
                {/* Prev/Next */}
                <button className="gallery__arrow gallery__arrow--left" onClick={prev} aria-label="Anterior">
                    <ChevronLeft size={22} />
                </button>
                <button className="gallery__arrow gallery__arrow--right" onClick={next} aria-label="Próxima">
                    <ChevronRight size={22} />
                </button>

                {/* Slides */}
                <div className="gallery__slides">
                    {PHOTOS.map((photo, idx) => {
                        const visible = getVisible()
                        const pos = visible.indexOf(idx) // -1 = hidden, 0 = left, 1 = center, 2 = right
                        const isCenter = idx === current
                        const isLeft = idx === (current - 1 + total) % total
                        const isRight = idx === (current + 1) % total

                        if (!isCenter && !isLeft && !isRight) return null

                        return (
                            <motion.div
                                key={photo.src}
                                className={`gallery__slide ${isCenter ? 'gallery__slide--center' : 'gallery__slide--side'}`}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: isCenter ? 1 : 0.45,
                                    scale: isCenter ? 1 : 0.82,
                                    x: isLeft ? '-55%' : isRight ? '55%' : '0%',
                                    zIndex: isCenter ? 2 : 1,
                                }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div
                                    className="gallery__img-wrap"
                                    style={{ cursor: isCenter ? 'zoom-in' : 'pointer' }}
                                    onClick={() => {
                                        if (isLeft) prev()
                                        if (isRight) next()
                                        if (isCenter) setLightbox(idx)
                                    }}
                                >
                                    <img src={photo.src} alt={photo.caption} loading="lazy" />
                                    {isCenter && (
                                        <div className="gallery__zoom-hint">
                                            <ZoomIn size={18} />
                                        </div>
                                    )}
                                </div>
                                {isCenter && (
                                    <p className="gallery__caption">{photo.caption}</p>
                                )}
                            </motion.div>
                        )
                    })}
                </div>

                {/* Dots */}
                <div className="gallery__dots">
                    {PHOTOS.map((_, i) => (
                        <button
                            key={i}
                            className={`gallery__dot ${i === current ? 'gallery__dot--active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Ir para foto ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                    >
                        <button className="lightbox__close" onClick={() => setLightbox(null)}>
                            <X size={24} />
                        </button>
                        <button className="lightbox__nav lightbox__nav--left" onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + total) % total) }}>
                            <ChevronLeft size={28} />
                        </button>
                        <motion.div
                            className="lightbox__img-wrap"
                            key={lightbox}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.3 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <img src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].caption} />
                            <p className="lightbox__caption">{PHOTOS[lightbox].caption}</p>
                        </motion.div>
                        <button className="lightbox__nav lightbox__nav--right" onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % total) }}>
                            <ChevronRight size={28} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
