import React from "react"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  children: React.ReactNode
  duration?: number
  from?: string
}

const SlideComponent: React.FC<Props> = ({
  children,
  duration = 0.8,
  from = "left",
}) => {
  const variants = {
    hidden: { opacity: 0, x: from === "left" ? -60 : 60, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
  }

  return (
    <AnimatePresence initial={true}>
      <motion.div
        initial="hidden"
        animate="enter"
        variants={variants}
        transition={{ duration: duration, type: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default SlideComponent
