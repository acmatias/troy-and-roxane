import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText'
// import { useInView } from 'react-intersection-observer'

const Banner = () => {
    // const [ref, inView] = useInView({
    //     threshold: 0.5,
    //     // triggerOnce: true
    // })

    // Define headline animations
    const [replay, setReplay] = useState(true)
    // Placeholder text data, as if from API
    const placeholderText = [{ type: 'heading1', text: 'Troy & Roxane' }]
    const container = {
        visible: {
            transition: {
                staggerChildren: 0.025,
            },
        },
    }
    const handleReplay = () => {
        setReplay(!replay)
        setTimeout(() => {
            setReplay(true)
        }, 600)
    }

    const headline = {
        hidden: { opacity: 0, y: -15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.15,
                type: 'spring',
                damping: 100,
                mass: 4,
            },
        },
    }
    return (
        <div>
            <motion.div
                className="flower"
                animate={{ y: 10, opacity: 1 }}
                transition={{
                    delay: 1,
                    y: { type: 'spring', stiffness: 100 },
                    default: { duration: 3 },
                }}
            ></motion.div>
            <motion.div
                className="flowerCircle"
                animate={{ scale: [0.85, 0.9, 0.85] }}
                transition={{
                    delay: 1,
                    duration: 10,
                    // repeat: Infinity,
                }}
            >
                <div className="heading">
                    <h1>Save The Date</h1>
                </div>
                <div className="title">
                    <motion.div
                        initial="hidden"
                        // animate="visible"
                        animate={replay ? 'visible' : 'hidden'}
                        variants={container}
                    >
                        <div className="container">
                            {placeholderText.map((item, index) => {
                                return <AnimatedText {...item} key={index} />
                            })}
                        </div>
                    </motion.div>
                </div>
                <div className="date">
                    <h1>22.10.2022</h1>
                </div>
            </motion.div>
            <div className="ps">
                <h1>Formal invitation to follow</h1>
            </div>
            <div className="flowerBottom"></div>
        </div>
    )
}
export default Banner
