import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight, Tent, User, Mail, Send } from 'lucide-react'
import './Booking.css'

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTHS = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const eventTypes = ['Casamento', '15 Anos', 'Formatura', 'Corporativo', 'Outro']

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay()
}
function isSameDay(a, b) {
    return a && b &&
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
}
function isBetween(date, start, end) {
    if (!start || !end) return false
    const [s, e] = start <= end ? [start, end] : [end, start]
    return date > s && date < e
}
function formatDate(d) {
    if (!d) return ''
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    return `${day}/${month}/${d.getFullYear()}`
}
function daysBetween(a, b) {
    if (!a || !b) return 0
    const diff = Math.abs(b - a)
    return Math.round(diff / (1000 * 60 * 60 * 24))
}

export default function Booking() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [viewYear, setViewYear] = useState(today.getFullYear())
    const [viewMonth, setViewMonth] = useState(today.getMonth())

    // Range selection state
    const [rangeStart, setRangeStart] = useState(null)
    const [rangeEnd, setRangeEnd] = useState(null)
    const [hoverDay, setHoverDay] = useState(null)

    // Form state
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [tipo, setTipo] = useState('')
    const [tipoOutro, setTipoOutro] = useState('')
    // const [convidados, setConvidados] = useState('') // Removed convidados state

    const daysInMonth = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewYear, viewMonth])
    const firstDay = useMemo(() => getFirstDayOfMonth(viewYear, viewMonth), [viewYear, viewMonth])

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
        else setViewMonth(m => m - 1)
    }
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
        else setViewMonth(m => m + 1)
    }

    const makeDateForDay = (day) => {
        const d = new Date(viewYear, viewMonth, day)
        d.setHours(0, 0, 0, 0)
        return d
    }

    const isPast = (day) => makeDateForDay(day) < today
    const isStart = (day) => rangeStart && isSameDay(makeDateForDay(day), rangeStart)
    const isEnd = (day) => rangeEnd && isSameDay(makeDateForDay(day), rangeEnd)

    // Preview range while hovering after first click
    const effectiveEnd = rangeEnd || hoverDay

    const isInRange = (day) => {
        if (!rangeStart || !effectiveEnd) return false
        const d = makeDateForDay(day)
        const [s, e] = rangeStart <= effectiveEnd
            ? [rangeStart, effectiveEnd]
            : [effectiveEnd, rangeStart]
        return d > s && d < e
    }

    const handleDayClick = (day) => {
        if (isPast(day)) return
        const clicked = makeDateForDay(day)

        if (!rangeStart || (rangeStart && rangeEnd)) {
            // Start fresh selection
            setRangeStart(clicked)
            setRangeEnd(null)
            setHoverDay(null)
        } else {
            // Second click: set end (allow before start for backwards travel)
            const [s, e] = clicked >= rangeStart
                ? [rangeStart, clicked]
                : [clicked, rangeStart]
            setRangeStart(s)
            setRangeEnd(e)
            setHoverDay(null)
        }
    }

    const handleDayHover = (day) => {
        if (rangeStart && !rangeEnd) {
            setHoverDay(makeDateForDay(day))
        }
    }

    // Computed string for display
    const rangeLabel = useMemo(() => {
        if (!rangeStart) return ''
        if (!rangeEnd) return `${formatDate(rangeStart)} → ...`
        const nights = daysBetween(rangeStart, rangeEnd)
        // Inclusive count: same day = 1 dia, 23→24 = 2 dias, etc.
        const dias = nights + 1
        return `${formatDate(rangeStart)} → ${formatDate(rangeEnd)} (${dias} dia${dias !== 1 ? 's' : ''})`
    }, [rangeStart, rangeEnd])

    const totalDays = rangeEnd ? daysBetween(rangeStart, rangeEnd) + 1 : (rangeStart ? 1 : 0)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!rangeStart || !nome || !tipo || !email) return

        const dateStr = rangeEnd
            ? `${formatDate(rangeStart)} até ${formatDate(rangeEnd)} (${daysBetween(rangeStart, rangeEnd) + 1} dia${daysBetween(rangeStart, rangeEnd) + 1 !== 1 ? 's' : ''})`
            : formatDate(rangeStart)

        const eventName = tipo === 'Outro' && tipoOutro ? `Outro (${tipoOutro})` : tipo

        const msg = `Olá! Meu nome é *${nome}* e gostaria de solicitar um orçamento.

📋 *Tipo de Evento:* ${eventName}
📅 *Período:* ${dateStr}
✉️ *E-mail:* ${email}

Podemos conversar?`

        const phone = '5514997656869'
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
    }

    return (
        <section className="booking" id="agendar">
            <div className="container">
                <motion.div
                    className="booking__header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="booking__tag">Agendamento</span>
                    <h2 className="booking__title">
                        Reserve a <em>sua data</em>
                    </h2>
                    <p className="booking__sub">
                        Selecione um dia único ou um bloco de dias — basta clicar na data de início
                        e depois na data de fim. Você será direcionado ao nosso WhatsApp para
                        um atendimento rápido e exclusivo.
                    </p>
                </motion.div>

                <motion.div
                    className="booking__body"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* ---- Calendar ---- */}
                    <div className="calendar">
                        <div className="calendar__nav">
                            <button onClick={prevMonth} aria-label="Mês anterior">
                                <ChevronLeft size={20} />
                            </button>
                            <span className="calendar__month">
                                {MONTHS[viewMonth]} {viewYear}
                            </span>
                            <button onClick={nextMonth} aria-label="Próximo mês">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="calendar__grid">
                            {WEEKDAYS.map(w => (
                                <span key={w} className="calendar__weekday">{w}</span>
                            ))}

                            {Array.from({ length: firstDay }).map((_, i) => (
                                <span key={`e-${i}`} className="calendar__day calendar__day--empty" />
                            ))}

                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1
                                const past = isPast(day)
                                const start = isStart(day)
                                const end = isEnd(day)
                                const inRange = isInRange(day)

                                let cls = 'calendar__day'
                                if (past) cls += ' calendar__day--past'
                                if (start) cls += ' calendar__day--start'
                                if (end) cls += ' calendar__day--end'
                                if (inRange) cls += ' calendar__day--range'
                                if ((start || end) && rangeStart && rangeEnd) {
                                    cls += ' calendar__day--cap'
                                }

                                return (
                                    <button
                                        key={day}
                                        className={cls}
                                        onClick={() => handleDayClick(day)}
                                        onMouseEnter={() => handleDayHover(day)}
                                        onMouseLeave={() => { }}
                                        disabled={past}
                                    >
                                        <span className="calendar__day-inner">{day}</span>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Range info */}
                        <div className={`calendar__range-info ${rangeStart ? 'calendar__range-info--visible' : ''}`}>
                            <CalendarDays size={16} />
                            <span>
                                {!rangeStart && 'Clique numa data para iniciar a seleção'}
                                {rangeStart && !rangeEnd && 'Clique na data de saída para definir o período'}
                                {rangeStart && rangeEnd && rangeLabel}
                            </span>
                            {(rangeStart || rangeEnd) && (
                                <button
                                    className="calendar__clear"
                                    onClick={() => { setRangeStart(null); setRangeEnd(null); setHoverDay(null) }}
                                >
                                    Limpar
                                </button>
                            )}
                        </div>

                        {/* Legend */}
                        <div className="calendar__legend">
                            <span><span className="legend-dot legend-dot--start" />Entrada</span>
                            <span><span className="legend-dot legend-dot--range" />Período</span>
                            <span><span className="legend-dot legend-dot--end" />Saída</span>
                        </div>
                    </div>

                    {/* ---- Form ---- */}
                    <form className="booking__form" onSubmit={handleSubmit}>

                        {/* Selected Range Summary at top of form */}
                        {rangeStart && (
                            <div className="booking__range-summary">
                                <CalendarDays size={18} />
                                <div>
                                    <span className="booking__range-label">Período selecionado</span>
                                    <span className="booking__range-value">{rangeLabel}</span>
                                </div>
                            </div>
                        )}

                        <div className="field">
                            <label htmlFor="b-nome"><User size={16} /> Nome Completo</label>
                            <input
                                id="b-nome"
                                type="text"
                                placeholder="Ex: Maria Clara Silva"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="tipo"><Tent size={16} /> Tipo do Evento</label>
                            <select
                                id="tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione...</option>
                                <option value="Casamento">Casamento</option>
                                <option value="Aniversário / 15 Anos">Aniversário / 15 Anos</option>
                                <option value="Corporativo">Corporativo</option>
                                <option value="Retiro / Encontro">Retiro / Encontro Espiritual</option>
                                <option value="Festa Infantil">Festa Infantil</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <AnimatePresence>
                            {tipo === 'Outro' && (
                                <motion.div
                                    className="field"
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: '-0.5rem' }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <label htmlFor="tipoOutro" style={{ fontSize: '0.8rem', color: '#8a9490' }}>
                                        Especifique:
                                    </label>
                                    <input
                                        type="text"
                                        id="tipoOutro"
                                        placeholder="Ex: Bodas de Ouro..."
                                        value={tipoOutro}
                                        onChange={(e) => setTipoOutro(e.target.value)}
                                        required
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="field">
                            <label htmlFor="email"><Mail size={16} /> E-mail de Contato</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="seuemail@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="booking__submit"
                            disabled={!rangeStart || !nome || !tipo || !email}
                        >
                            <Send size={18} />
                            Solicitar Orçamento no WhatsApp
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}
