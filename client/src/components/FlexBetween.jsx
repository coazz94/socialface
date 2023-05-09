import { Box } from "@mui/material"
import { styled } from "@mui/system"

// call FlexBetween if you want to add the properties to a component
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})

export default FlexBetween
