import { Box, Text } from "@chakra-ui/react"
import Head from "next/head"

export default function DefaultLayout({ title, children }) {
    return (
        <Box display="flex" flexDir="column">
            <Head>
                <title></title>
            </Head>
            <Box display="flex" flexDir="row" p="4" backgroundColor="blackAlpha.100">
                <Text fontWeight="bold" fontSize="xl">ComuDEV</Text>
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    )
}