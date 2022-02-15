import { Box, Link, Typography } from "@mui/material"
import React from "react"

const Footer = () => {
  const getCopyrightYear = () => {
    const now = new Date()
    if (now.getFullYear() !== 2022) {
      return `2022 - ${now.getFullYear()}`
    } else {
      return `2022`
    }
  }
  return (
    <Box>
      <Typography align="center" variant="caption" display="block">
        All content &copy; {getCopyrightYear()}{" "}
        <Link href="mailto:fuertenerd@gmail.com" underline="none">
          David Andrews
        </Link>
      </Typography>
    </Box>
  )
}

export default Footer
