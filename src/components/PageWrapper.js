import { Container } from "@mui/material"
import { motion } from "framer-motion"
import React from "react"

const PageWrapper = ({ children, containerWidth }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Container maxWidth="md">{children}</Container>
    </motion.div>
  )
}

export default PageWrapper
